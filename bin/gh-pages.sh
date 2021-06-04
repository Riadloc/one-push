#!/usr/bin
GITHUB_ACTOR=$1
REPOSITORY_PATH=$2
CUR_DIR=$(pwd)
TODAY=$(TZ=UTC-8 date +%F)
DIR="$CUR_DIR/schedule/spider/$TODAY"
PAGE_BRANCH="gh-pages"
git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
cd $DIR
git init
git remote add origin "${REPOSITORY_PATH}"
git fetch origin $PAGE_BRANCH
git add --all
git commit --allow-empty -m ":rocket: "`TZ=UTC-8 date +%F\*%T`
git push origin $PAGE_BRANCH --force
echo $?
FILES=$(ls)
JSON_PATH="$CUR_DIR/constants/$TODAY.txt"
echo $FILES
echo $FILES >> $JSON_PATH
cd $CUR_DIR
git pull
git add $JSON_PATH
git commit -m 'chore: add ariticle json'
git push origin main
echo $?