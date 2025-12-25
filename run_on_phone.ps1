$env:Path = "C:\Program Files\nodejs;" + $env:Path
Write-Host "Starting Dr Trade on Expo..."
Write-Host "1. Make sure you have the 'Expo Go' app installed on your phone."
Write-Host "2. Scan the QR code below with your camera (iOS) or Expo app (Android)."
& "C:\Program Files\nodejs\npx.cmd" expo start
