GITHUB_ACTOR=$1
REPOSITORY_PATH=$2
CUR_DIR=$(pwd)
TODAY=$(TZ=UTC-8 date +%F)
DIR="$CUR_DIR/schedule/spider/$TODAY"
cd $DIR
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote add origin "${REPOSITORY_PATH}"
git add -all
git commit --allow-empty -m ":rocket: "`TZ=UTC-8 date +%F_%T`
git push origin ${REPOSITORY_PATH} --force
FILES=$(ls)
JSON_PATH="$CUR_DIR/constants/$TODAY.txt"
echo $FILES >> JSON_PATH
cd $CUR_DIR
git add JSON_PATH
git push origin main