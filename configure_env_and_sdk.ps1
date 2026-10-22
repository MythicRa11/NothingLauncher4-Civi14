# Configure Environment Variables and Install Android SDK Packages
$ErrorActionPreference = "Stop"

$jdkPath = "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"
$androidHome = "C:\Users\Pratik\AndroidDevTools\android-sdk"
$kotlinHome = "C:\Users\Pratik\AndroidDevTools\kotlin\kotlinc"
$gradleHome = "C:\Users\Pratik\AndroidDevTools\gradle\gradle-8.10.2"

Write-Host "Setting User Environment Variables..."
[Environment]::SetEnvironmentVariable("JAVA_HOME", $jdkPath, "User")
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $androidHome, "User")
[Environment]::SetEnvironmentVariable("KOTLIN_HOME", $kotlinHome, "User")
[Environment]::SetEnvironmentVariable("GRADLE_HOME", $gradleHome, "User")

# Also set in current process session
$env:JAVA_HOME = $jdkPath
$env:ANDROID_HOME = $androidHome
$env:ANDROID_SDK_ROOT = $androidHome
$env:KOTLIN_HOME = $kotlinHome
$env:GRADLE_HOME = $gradleHome

# Update PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$newPaths = @(
    "$kotlinHome\bin",
    "$gradleHome\bin",
    "$androidHome\cmdline-tools\latest\bin",
    "$androidHome\platform-tools",
    "$androidHome\build-tools\34.0.0"
)

foreach ($p in $newPaths) {
    if ($currentPath -notlike "*$p*") {
        $currentPath = "$p;$currentPath"
        Write-Host "Added to PATH: $p"
    }
}
[Environment]::SetEnvironmentVariable("Path", $currentPath, "User")
$env:Path = "$currentPath;$env:Path"

Write-Host "Verifying tool versions in session..."
& "$kotlinHome\bin\kotlinc.bat" -version
& "$gradleHome\bin\gradle.bat" -v

# Install SDK packages via sdkmanager
Write-Host "Accepting Android SDK licenses..."
$sdkmanager = "$androidHome\cmdline-tools\latest\bin\sdkmanager.bat"

# Auto-accept licenses
$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = "cmd.exe"
$processInfo.Arguments = "/c `"$sdkmanager`" --licenses"
$processInfo.RedirectStandardInput = $true
$processInfo.RedirectStandardOutput = $true
$processInfo.UseShellExecute = $false
$p = [System.Diagnostics.Process]::Start($processInfo)
for ($i = 0; $i -lt 20; $i++) {
    $p.StandardInput.WriteLine("y")
}
$p.StandardInput.Close()
$output = $p.StandardOutput.ReadToEnd()
$p.WaitForExit()

Write-Host "Installing platform-tools, platforms;android-34, build-tools;34.0.0..."
& "$sdkmanager" "platform-tools" "platforms;android-34" "build-tools;34.0.0"

Write-Host "=== SDK Setup Complete ==="
