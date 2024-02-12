#!/usr/bin/env bash

#for dir in */; do
  dir="platform/"
  plugin=$(echo $dir | rev | cut -c2- | rev)
  version=$(cat package.json | jq -r '.version')

  find package.json -type f -exec sed -i '' 's/npm run leia/leia/g' {} +
  find docs/index.md -type f -exec sed -i '' 's/node:14-alpine/node:18-alpine/g' {} +
  find .lando.yml -type f -exec sed -i '' 's/node:14/node:18/g' {} +



#   # Checkout new branch
#   git checkout -b isolate-update

   php ../str_replace.php .

#   # Switch 3-dev to 3-dev-slim
#   find .github/workflows -type f -exec sed -i '' 's/3-dev/3-dev-slim/g' {} +

#   # replace yarn with node run in netlify.toml
#   find netlify.toml -type f -exec sed -i '' 's/yarn/npm run/g' {} +

#   # replace yarn with node run in package.json
#   find package.json -type f -exec sed -i '' 's/yarn/npm run/g' {} +

#   # remove bundled dependencies block from package.json
#   find package.json -type f -exec sed -i '' '/bundledDependencies/,/]/d' {} +

#   # Add yarn.lock to .gitignore
#   echo "yarn.lock" >> .gitignore

#   # remove yarn.lock
#   rm yarn.lock

#   # run npm install to generate package-lock.json
#   npm install

#   # Add instructions
#   find docs -type f -exec sed -i '' 's/yarn add/npm install/g' {} +


#   # Modify changelog
#   # new_version=$(awk -F. -v minor=1 -v patch=0 '{print $1, $2+minor, patch}' <<< "$version" | tr ' ' '.')
#   new_version="1.0.0"
#   echo "## v${new_version} - [December 7, 2023](https://github.com/lando/$plugin/releases/tag/v${new_version})
#     * Dialed fully for \`lando update\`
# " > changelog-update.md
#   cat CHANGELOG.md >> changelog-update.md
#   mv changelog-update.md CHANGELOG.md

#   rm *.bak
#   rm .github/workflows/*.bak

#   git add .
#   git commit -m "Fix some script-generated issues.";
#   git push
#   #gh pr create --fill
#   #sleep 10
#   cd ..
# done
