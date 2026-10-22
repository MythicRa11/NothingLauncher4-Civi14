# Setup script for Kotlin, Gradle, and Android Build Tools
$toolsDir = "C:\Users\Pratik\AndroidDevTools"
if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir | Out-Null
}

function Download-And-Extract ($url, $zipName, $destFolder) {
    $zipPath = Join-Path $toolsDir $zipName
    $targetDir = Join-Path $toolsDir $destFolder
    if (-not (Test-Path $targetDir)) {
        Write-Host "Downloading $url ..."
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($url, $zipPath)
        Write-Host "Extracting $zipName to $targetDir ..."
        Expand-Archive -Path $zipPath -DestinationPath $targetDir -Force
        Remove-Item $zipPath -Force
        Write-Host "Successfully installed $destFolder."
    } else {
        Write-Host "$destFolder already exists at $targetDir."
    }
}

# 1. Install Kotlin Compiler (kotlinc)
Write-Host "=== Setting up Kotlin CLI & Compiler ==="
$kotlinUrl = "https://github.com/JetBrains/kotlin/releases/download/v2.1.0/kotlin-compiler-2.1.0.zip"
Download-And-Extract $kotlinUrl "kotlin-compiler.zip" "kotlin"

# 2. Install Gradle (Modern Android Build System)
Write-Host "=== Setting up Gradle ==="
$gradleUrl = "https://services.gradle.org/distributions/gradle-8.10.2-bin.zip"
Download-And-Extract $gradleUrl "gradle-bin.zip" "gradle"

# 3. Install Android Command Line Tools (SDK Manager)
Write-Host "=== Setting up Android SDK Command-line Tools ==="
$androidSdkUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
Download-And-Extract $androidSdkUrl "cmdline-tools.zip" "android-sdk"

# Reorganize cmdline-tools structure if needed (Android SDK expects cmdline-tools/latest/bin)
$sdkRoot = "C:\Users\Pratik\AndroidDevTools\android-sdk"
$cmdlineDir = Join-Path $sdkRoot "cmdline-tools"
$latestDir = Join-Path $cmdlineDir "latest"
if ((Test-Path (Join-Path $sdkRoot "cmdline-tools\bin")) -and (-not (Test-Path $latestDir))) {
    Write-Host "Structuring cmdline-tools into $latestDir..."
    New-Item -ItemType Directory -Path $latestDir -Force | Out-Null
    Move-Item (Join-Path $sdkRoot "cmdline-tools\bin") $latestDir -Force
    Move-Item (Join-Path $sdkRoot "cmdline-tools\lib") $latestDir -Force
    Move-Item (Join-Path $sdkRoot "cmdline-tools\source.properties") $latestDir -Force
    if (Test-Path (Join-Path $sdkRoot "cmdline-tools\NOTICE.txt")) {
        Move-Item (Join-Path $sdkRoot "cmdline-tools\NOTICE.txt") $latestDir -Force
    }
}

Write-Host "=== All Core Tools Downloaded and Extracted ==="
