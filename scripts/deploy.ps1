# Builds the site and publishes it to S3 + invalidates CloudFront.
# Usage: npm run deploy
param(
  [string]$Stack = 'lucas-lemosp-site',
  [string]$Region = 'us-east-1'
)
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }

$outputs = aws cloudformation describe-stacks --region $Region --stack-name $Stack --query 'Stacks[0].Outputs' --output json | ConvertFrom-Json
$bucket = ($outputs | Where-Object OutputKey -eq 'BucketName').OutputValue
$distId = ($outputs | Where-Object OutputKey -eq 'DistributionId').OutputValue
if (-not $bucket -or -not $distId) { throw "Stack $Stack outputs not found. Run scripts/infra.ps1 first." }

# Hashed bundles: cache for a year
aws s3 sync dist/assets "s3://$bucket/assets" --delete --cache-control 'public,max-age=31536000,immutable'
# Other static files (avatar, favicon, robots): short cache
aws s3 sync dist "s3://$bucket" --delete --exclude 'assets/*' --exclude 'index.html' --cache-control 'public,max-age=3600'
# Entry point: always revalidate
aws s3 cp dist/index.html "s3://$bucket/index.html" --cache-control 'no-cache' --content-type 'text/html; charset=utf-8'
if ($LASTEXITCODE -ne 0) { throw 'Upload failed.' }

aws cloudfront create-invalidation --distribution-id $distId --paths '/*' --query 'Invalidation.Id' --output text
Write-Host "Published to https://lucas.lemosp.com (CloudFront $distId)"
