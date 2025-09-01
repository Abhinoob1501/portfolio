# PowerShell script to download Google Fonts
$fontsDir = "public/fonts"

# Create fonts directory if it doesn't exist
if (!(Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force
}

# Font URLs
$fonts = @{
    "Geist" = "https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap"
    "Geist_Mono" = "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap"
    "Orbitron" = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
    "VT323" = "https://fonts.googleapis.com/css2?family=VT323&display=swap"
    "Press_Start_2P" = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    "Pixelify_Sans" = "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap"
}

Write-Host "Downloading fonts..." -ForegroundColor Green

foreach ($fontName in $fonts.Keys) {
    Write-Host "Downloading $fontName..." -ForegroundColor Yellow
    $url = $fonts[$fontName]
    $outputFile = "$fontsDir/$fontName.css"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputFile
        Write-Host "Downloaded $fontName.css" -ForegroundColor Green
    }
    catch {
        Write-Host "Error downloading $fontName : $_" -ForegroundColor Red
    }
}

Write-Host "Font CSS files downloaded!" -ForegroundColor Green
Write-Host "Note: You'll need to manually download the .woff2 files referenced in the CSS files." -ForegroundColor Yellow
