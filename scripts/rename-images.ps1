# Path to the images directory
$imagePath = "c:\Users\Violan Work\Documents\Violan\WebDev\Isitebe seMbokodo Catering Club\Website\public\images"

# Get all image files
$files = Get-ChildItem -Path $imagePath -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|gif|webp)$' } | Sort-Object Name

# Counter for the new filenames
$counter = 1

# Create a log file to track the changes
$logFile = "$PSScriptRoot\rename-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
"Old Path,New Path" | Out-File -FilePath $logFile -Encoding UTF8

# Rename each file
foreach ($file in $files) {
    # Skip files that are already in the correct format
    if ($file.Name -match '^gallery-\d+\..+$') {
        Write-Host "Skipping already renamed file: $($file.Name)" -ForegroundColor Yellow
        continue
    }
    
    $extension = $file.Extension
    $newName = "gallery-$($counter)$($extension)"
    $newPath = Join-Path -Path $imagePath -ChildPath $newName
    
    # Check if the new filename already exists
    if (Test-Path $newPath) {
        Write-Host "File $newName already exists, skipping..." -ForegroundColor Red
        continue
    }
    
    try {
        # Rename the file
        Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
        
        # Log the change
        "$($file.Name),$newName" | Out-File -FilePath $logFile -Append -Encoding UTF8
        Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Green
        
        $counter++
    }
    catch {
        Write-Host "Error renaming $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host "`nRenaming complete! Check $logFile for a list of changes." -ForegroundColor Cyan
