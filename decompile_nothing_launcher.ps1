# Decompile Nothing Launcher into readable Java / Kotlin source code
$jadx = "C:\Users\Pratik\AndroidDevTools\jadx\bin\jadx.bat"
$apk = "NothingLauncher-v4.0.20-Official-Full.apk"
$outDir = "NothingPhone_SourceCode"

Write-Host "Decompiling $apk to $outDir using JADX..."
& $jadx -d $outDir -j 4 --no-res $apk
Write-Host "Decompilation complete!"
