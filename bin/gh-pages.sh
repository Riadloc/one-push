#!/usr/bin
GITHUB_ACTOR=$1
git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git fetch
git add --all
git commit -m 'chore: add ariticles'
git push origin main
echo $?