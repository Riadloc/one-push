dir=$0
GITHUB_ACTOR=$1
REPOSITORY_PATH="gh-pages"
cd ${dir}
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote add origin "${REPOSITORY_PATH}"
git add -all
git commit --allow-empty -m ":rocket: "`TZ=UTC-8 date +%F_%T`
git push origin ${REPOSITORY_PATH} --force