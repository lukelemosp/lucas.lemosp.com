# Creates/updates the hosting stack (S3 + CloudFront + ACM + Route 53).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/infra.ps1
param(
  [string]$Domain = 'lucas.lemosp.com',
  [string]$ParentZone = 'lemosp.com',
  [string]$Stack = 'lucas-lemosp-site',
  [string]$Region = 'us-east-1',
  # Extra CloudFormation overrides, e.g. -Extra 'GitHubOidcProviderArn=arn:aws:iam::123:oidc-provider/token.actions.githubusercontent.com'
  [string[]]$Extra = @()
)
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

$zoneId = aws route53 list-hosted-zones-by-name --dns-name "$ParentZone." --query "HostedZones[?Name=='$ParentZone.' && Config.PrivateZone==``false``].Id | [0]" --output text
if (-not $zoneId -or $zoneId -eq 'None') { throw "Hosted zone $ParentZone not found in Route 53." }
$zoneId = $zoneId -replace '^/hostedzone/', ''
Write-Host "Hosted zone: $ParentZone ($zoneId)"

aws cloudformation deploy `
  --region $Region `
  --stack-name $Stack `
  --template-file infra/site.yml `
  --parameter-overrides "DomainName=$Domain" "HostedZoneId=$zoneId" @Extra `
  --capabilities CAPABILITY_IAM `
  --tags Project=lucas-lemosp-site `
  --no-fail-on-empty-changeset
if ($LASTEXITCODE -ne 0) { throw 'CloudFormation deploy failed.' }

aws cloudformation describe-stacks --region $Region --stack-name $Stack --query 'Stacks[0].Outputs' --output table
