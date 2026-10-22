# Verify Android & Kotlin Tools
$ErrorActionPreference = "Continue"

$java = "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot\bin\java.exe"
$kotlinc = "C:\Users\Pratik\AndroidDevTools\kotlin\kotlinc\bin\kotlinc.bat"
$gradle = "C:\Users\Pratik\AndroidDevTools\gradle\gradle-8.10.2\bin\gradle.bat"
$jadx = "C:\Users\Pratik\AndroidDevTools\jadx\bin\jadx.bat"
$aapt2 = "C:\Users\Pratik\AndroidDevTools\android-sdk\build-tools\34.0.0\aapt2.exe"
$adb = "C:\Users\Pratik\AndroidDevTools\android-sdk\platform-tools\adb.exe"

Write-Host "================ TOOLCHAIN VERIFICATION ================"
Write-Host "1. Java Version:"
& $java -version

Write-Host "`n2. Kotlin Compiler:"
& $kotlinc -version

Write-Host "`n3. Gradle Version:"
& $gradle -v | Select-Object -First 6

Write-Host "`n4. JADX Decompiler:"
& $jadx --version

Write-Host "`n5. Android SDK Build-Tools (AAPT2):"
& $aapt2 version

Write-Host "`n6. Android SDK Platform-Tools (ADB):"
& $adb version

Write-Host "========================================================"
