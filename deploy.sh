#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
echo 'xueyu.studio' > CNAME

git init
git add .
git commit -m 'deploy'

git remote add origin git@github.com:xueyu-book/xueyu-book.git
git branch -M main
git push -f git@github.com:xueyu-book/xueyu-book.git main:gh-pages

cd -
