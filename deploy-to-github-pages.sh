#!/bin/bash

# GitHub Pages Deployment Script
# This script merges your changes to master and triggers deployment

set -e

echo "🚀 GitHub Pages Deployment Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    git status --short
    echo ""
    read -p "Do you want to commit these changes first? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add -A
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
fi

echo ""
echo "📝 This will:"
echo "   1. Switch to master branch"
echo "   2. Merge $CURRENT_BRANCH into master"
echo "   3. Push to GitHub"
echo "   4. Trigger automatic deployment to GitHub Pages"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🔄 Switching to master branch..."
git checkout master

echo "🔀 Merging $CURRENT_BRANCH into master..."
git merge $CURRENT_BRANCH --no-edit

echo "📤 Pushing to GitHub..."
git push origin master

echo ""
echo "✅ Successfully pushed to master!"
echo ""
echo "🎉 GitHub Actions will now deploy your React app"
echo ""
echo "📊 Monitor deployment progress:"
echo "   https://github.com/jamesandfamily/real-estate-app/actions"
echo ""
echo "🌐 Your site will be live in 2-5 minutes at:"
echo "   https://jamesandfamily.github.io/real-estate-app/"
echo ""
echo "💡 Tip: Hard refresh (Ctrl+Shift+R) to see changes immediately"
echo ""
