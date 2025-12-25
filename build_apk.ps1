$env:Path = "C:\Program Files\nodejs;" + $env:Path
Write-Host "Starting Cloud Build for Android APK..."
Write-Host "This will require you to log in to your Expo account."
& "C:\Program Files\nodejs\npx.cmd" eas build -p android --profile preview
