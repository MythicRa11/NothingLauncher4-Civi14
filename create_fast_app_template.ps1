# Create FastAndroidApp project structure and files
$baseDir = "C:\Users\Pratik\FastAndroidApp"

$directories = @(
    "$baseDir\app\src\main\java\com\mythic\fastapp",
    "$baseDir\app\src\main\res\layout",
    "$baseDir\app\src\main\res\values",
    "$baseDir\app\src\main\res\drawable",
    "$baseDir\gradle\wrapper"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Host "Directory structure created at $baseDir."
