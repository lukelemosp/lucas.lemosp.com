#!/usr/bin/env bash
# Publishes an already-built dist/ to S3 and invalidates CloudFront.
# Used by GitHub Actions (.github/workflows/deploy.yml); run `npm run build` first when using locally.
set -euo pipefail

STACK="${STACK:-lucas-lemosp-site}"
REGION="${AWS_REGION:-us-east-1}"
cd "$(dirname "$0")/.."

[ -f dist/index.html ] || { echo "dist/ not found. Run npm run build first." >&2; exit 1; }

out() {
  aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}
BUCKET="$(out BucketName)"
DIST_ID="$(out DistributionId)"
URL="$(out Url)"

# Hashed bundles: cache for a year
aws s3 sync dist/assets "s3://$BUCKET/assets" --delete --cache-control 'public,max-age=31536000,immutable'
# Other static files (avatar, favicon, robots): short cache
aws s3 sync dist "s3://$BUCKET" --delete --exclude 'assets/*' --exclude 'index.html' --cache-control 'public,max-age=3600'
# Entry point: always revalidate
aws s3 cp dist/index.html "s3://$BUCKET/index.html" --cache-control 'no-cache' --content-type 'text/html; charset=utf-8'

INV_ID="$(aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths '/*' --query 'Invalidation.Id' --output text)"
echo "Published to $URL (invalidation $INV_ID)"
