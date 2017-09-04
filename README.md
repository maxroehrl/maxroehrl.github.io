# The website maxroehrl.github.io

## Build
```gulp build``` to build the website in the dist directory.

```gulp clean``` to clean the dist directory.

```gulp watch``` to rebuild on change.

## Deploy
To push the changes in dist to the master branch:
```
git subtree push --prefix dist origin master
```