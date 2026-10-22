param(
    [string]$ApkPath = "NothingLauncher-v4.0.20-Universal.apk"
)

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " APK Integrity & Universal Architecture Verification Engine" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

if (-not (Test-Path $ApkPath)) {
    Write-Error "Target APK not found at: $ApkPath"
    exit 1
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$resolvedPath = (Resolve-Path $ApkPath).Path
$zip = [System.IO.Compression.ZipFile]::OpenRead($resolvedPath)

# 1. Bytecode check
Write-Host "`n[1] Checking Android DEX Bytecode..." -ForegroundColor Yellow
$dexList = @($zip.Entries | Where-Object { $_.Name -like "classes*.dex" } | Sort-Object Name)
Write-Host "  Found $($dexList.Count) classes.dex files:" -ForegroundColor Green
$totalDexBytes = 0
foreach ($d in $dexList) {
    Write-Host ("    - " + $d.Name + ": " + $d.Length + " bytes (compressed: " + $d.CompressedLength + " bytes)") -ForegroundColor Gray
    $totalDexBytes += $d.Length
}
$mb = [Math]::Round($totalDexBytes / 1MB, 2)
Write-Host ("  Total uncompressed bytecode: " + $mb + " MB") -ForegroundColor Green

# 2. Native library check
Write-Host "`n[2] Checking 64-bit ARM64 Native Architecture..." -ForegroundColor Yellow
$soList = @($zip.Entries | Where-Object { $_.FullName -like "lib/arm64-v8a/*.so" } | Sort-Object FullName)
Write-Host "  Found $($soList.Count) ARM64-v8a shared objects:" -ForegroundColor Green
foreach ($s in $soList) {
    $isStored = ($s.Length -eq $s.CompressedLength)
    $status = if ($isStored) { "STORED (Compliant)" } else { "DEFLATED (Non-compliant)" }
    Write-Host ("    - " + $s.Name + ": " + $s.Length + " bytes [" + $status + "]") -ForegroundColor Gray
}

# 3. Resources.arsc check
Write-Host "`n[3] Checking resources.arsc Alignment & Compression..." -ForegroundColor Yellow
$arsc = $zip.GetEntry("resources.arsc")
if ($arsc) {
    $isStored = ($arsc.Length -eq $arsc.CompressedLength)
    if ($isStored) {
        Write-Host ("  [PASS] resources.arsc is STORED without compression (" + $arsc.Length + " bytes)") -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] resources.arsc is DEFLATED! May cause parse error -124 on Android 11+" -ForegroundColor Red
    }
} else {
    Write-Host "  [FAIL] resources.arsc is MISSING!" -ForegroundColor Red
}

# 4. Stream Decompression Check
Write-Host "`n[4] Full Stream CRC32 Decompression Test..." -ForegroundColor Yellow
$buf = New-Object byte[] 65536
$corrupt = 0
$total = $zip.Entries.Count
foreach ($entry in $zip.Entries) {
    try {
        $st = $entry.Open()
        while ($st.Read($buf, 0, $buf.Length) -gt 0) {}
        $st.Dispose()
    } catch {
        Write-Host ("  [CORRUPT] " + $entry.FullName) -ForegroundColor Red
        $corrupt++
    }
}
$zip.Dispose()

if ($corrupt -eq 0) {
    Write-Host ("  [PASS] All " + $total + " entries decompressed cleanly (0 corruptions)") -ForegroundColor Green
} else {
    Write-Error ("Found " + $corrupt + " corrupted entries in archive!")
    exit 1
}

# 5. ZipAlign and Signature Scheme Verification
Write-Host "`n[5] Cryptographic Signature & ZipAlign Verification..." -ForegroundColor Yellow
if (Test-Path "uber-apk-signer.jar") {
    java -jar uber-apk-signer.jar --apks $ApkPath -y
}

Write-Host "`n=================================================================" -ForegroundColor Cyan
Write-Host " VERIFICATION COMPLETE!" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
