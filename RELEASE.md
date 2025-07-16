# Release Process Guide

This monorepo uses a tag-based release workflow with Changesets for version management.

## Overview

1. **Development** happens on `main` branch
2. **Changesets** track changes that need to be released
3. **Version PRs** can be created automatically when changesets exist
4. **Tags** trigger the actual npm publish

## Release Workflow

### Step 1: Create a Changeset

When you make changes that should be released:

```bash
# Create a changeset for your changes
pnpm changeset

# Follow the prompts to:
# - Select which packages changed
# - Choose version bump type (patch/minor/major)
# - Write a summary of changes
```

### Step 2: Commit the Changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for [feature/fix description]"
git push origin main
```

### Step 3: Version the Packages

**Option A: Manual Versioning (Recommended)**

```bash
# Pull latest changes
git pull origin main

# Run version command - this updates package.json files and CHANGELOG.md
pnpm changeset:version

# Review the changes
git status
git diff

# Commit version changes
git add -A
git commit -m "chore: release packages"
git push origin main
```

**Option B: Automated Version PR**

If your commit message contains `[changeset]`, the CI will automatically create a version PR.

### Step 4: Create and Push a Release Tag

```bash
# After version changes are in main, create a tag
# The tag should match the version in the root package.json
git tag v1.0.1  # Replace with your version

# Or use the helper script
pnpm version:tag

# Push the tag - this triggers the release
git push origin v1.0.1
```

### Step 5: Monitor the Release

1. Check GitHub Actions for the release workflow
2. Verify packages are published to npm
3. Check the GitHub release is created

## Quick Release Commands

For a complete local release flow:

```bash
# 1. Create changeset
pnpm changeset

# 2. Version and tag in one command
pnpm release:local

# 3. Push changes and tag
git push origin main --tags
```

## Version Types

- **Patch** (1.0.0 → 1.0.1): Bug fixes, documentation
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Important Notes

1. **NPM Token**: Ensure `NPM_TOKEN` is set in GitHub repository secrets
2. **Synchronized Versions**: All packages release together with the same version
3. **No Direct npm publish**: Always use tags to trigger releases
4. **Changesets Required**: You must create changesets for version bumps

## Troubleshooting

### Release workflow not triggering
- Ensure tag starts with `v` (e.g., `v1.0.0`)
- Check GitHub Actions permissions

### Version mismatch
- All packages use synchronized versioning
- Check `.changeset/config.json` for `fixed` configuration

### Publishing fails
- Verify NPM_TOKEN has publish permissions
- Check package names are available on npm
- Ensure `publishConfig.access: "public"` in package.json files