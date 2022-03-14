#!/usr/bin/env bash

set -e

DEFAULT_REMOTE="origin"
DEFAULT_BRANCH="master"
TAG_PREFIX="v"

# Validate the given tag name
VERSION="$1"
if [ -z "$VERSION" ]; then
    echo "Tag name is missing"
    exit 1
fi

# Make sure we're on the default branch
# CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$DEFAULT_BRANCH" ]; then
    echo "This script must be run only from the default branch ($DEFAULT_BRANCH). Current branch is $CURRENT_BRANCH."
    exit 1
fi

# Make sure there are no uncommitted changes (command will fail with non-zero
# exit code if working copy changes exist)
git diff-index --quiet HEAD

# Update the version in each project's package.json file
for DIR in ./projects/*/
do
    pushd "${DIR}"
    npm version --no-git-tag-version "$VERSION"
    git add "package.json"
    popd > /dev/null
done

# Update top-level package.json file
npm version --no-git-tag-version "$VERSION"
git add "package.json"

# Commit and push changes
git commit -m "Update package versions to $VERSION"
git push "$DEFAULT_REMOTE" "$DEFAULT_BRANCH"

# Create git tag (intentionally after the commit push, so that if that failed
# for some reason, we won't get this far)
TAG_NAME="${TAG_PREFIX}${VERSION}"
git tag -a "$TAG_NAME" -m "$TAG_NAME"

# Push the tag and let CI build and publish the packages
git push "$DEFAULT_REMOTE" "$TAG_NAME"
