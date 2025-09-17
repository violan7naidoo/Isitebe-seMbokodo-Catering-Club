$imagePath = "public\images"
$files = Get-ChildItem -Path $imagePath -Filter "*.*" -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|gif|webp)$' }

$counter = 1
foreach ($file in $files) {
    $newName = "gallery-$counter$($file.Extension)"
    $newPath = Join-Path -Path $imagePath -ChildPath $newName
    
    # Check if file with new name already exists to avoid conflicts
    if (Test-Path $newPath) {
        $counter++
        $newName = "gallery-$counter$($file.Extension)"
        $newPath = Join-Path -Path $imagePath -ChildPath $newName
    }
    
    Rename-Item -Path $file.FullName -NewName $newName
    Write-Host "Renamed $($file.Name) to $newName"
    $counter++
}

Write-Host "All images have been renamed successfully!"
