#!/usr/bin/env bash

echo "🚀 Starting deployment..."

# 1. Build project
npm run build

# 2. Add CNAME back
echo "soulrain.studio" > dist/CNAME

# 3. Add dist changes
git add dist -f

# 4. Commit changes
git commit -m "Auto deploy" || true

# 5. Create temp branch
git subtree split --prefix dist -b gh-pages-temp

# 6. Push to gh-pages
git push origin gh-pages-temp:gh-pages --force

# 7. Cleanup temp branch
git branch -D gh-pages-temp

echo "🎉 Deployment completed! Visit: https://soulrain.studio"