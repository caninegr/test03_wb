# fix-eslint-warnings.ps1

$files = @(
    "site\src\@elegantstack\solid-ui-theme\breakpoints.js",
    "site\src\@elegantstack\solid-ui-theme\colors.js",
    "site\src\pages\_styles.js",
    "site\src\pages\_theme.js",
    "site\src\pages\about\_styles.js",
    "site\src\pages\boarding\_styles.js",
    "site\src\pages\privacy\_styles.js",
    "site\src\pages\rehab\_styles.js",
    "site\src\pages\services\_styles.js",
    "site\src\pages\termsofuse\_styles.js",
    "site\src\pages\training\_styles.js"
)

Write-Host "Fixing ESLint warnings..." -ForegroundColor Cyan

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "`nProcessing: $file" -ForegroundColor Yellow
        
        $content = Get-Content -Path $file -Raw
        
        # Check if it's already fixed
        if ($content -match 'const \w+ =') {
            Write-Host "  Already fixed, skipping" -ForegroundColor Gray
            continue
        }
        
        # Pattern: export default [...]
        if ($content -match 'export default (\[[\s\S]*?\])') {
            $varName = "breakpoints"
            $newContent = $content -replace 'export default (\[[\s\S]*?\])', "const $varName = `$1`r`n`r`nexport default $varName"
            Set-Content -Path $file -Value $newContent -NoNewline
            Write-Host "  Fixed array export" -ForegroundColor Green
        }
        # Pattern: export default {...}
        elseif ($content -match 'export default (\{[\s\S]*\})') {
            # Determine variable name based on file
            $fileName = (Get-Item $file).BaseName
            if ($fileName -eq "colors") { $varName = "colors" }
            elseif ($fileName -eq "_styles") { $varName = "styles" }
            elseif ($fileName -eq "_theme") { $varName = "theme" }
            else { $varName = "config" }
            
            $newContent = $content -replace 'export default (\{[\s\S]*\})', "const $varName = `$1`r`n`r`nexport default $varName"
            Set-Content -Path $file -Value $newContent -NoNewline
            Write-Host "  Fixed object export" -ForegroundColor Green
        }
    } else {
        Write-Host "`nFile not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "ESLint warnings fixed!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
