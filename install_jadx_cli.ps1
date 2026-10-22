$jadxDir = "C:\Users\Pratik\AndroidDevTools\jadx"
if (-not (Test-Path $jadxDir)) {
    $zipPath = "C:\Users\Pratik\AndroidDevTools\jadx.zip"
    Write-Host "Downloading JADX CLI..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13
    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile("https://github.com/skylot/jadx/releases/download/v1.5.1/jadx-1.5.1.zip", $zipPath)
    Write-Host "Extracting JADX CLI..."
    Expand-Archive -Path $zipPath -DestinationPath $jadxDir -Force
    Remove-Item $zipPath -Force
    Write-Host "JADX CLI installed."
}

# Add JADX to User Path if not present
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$jadxBin = "$jadxDir\bin"
if ($currentPath -notlike "*$jadxBin*") {
    $currentPath = "$jadxBin;$currentPath"
    [Environment]::SetEnvironmentVariable("Path", $currentPath, "User")
    Write-Host "Added $jadxBin to User PATH."
}
$env:Path = "$jadxBin;$env:Path"

& "$jadxBin\jadx.bat" --version
