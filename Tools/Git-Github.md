---
## 1. SETUP & CONFIGURATION
```bash
git config --global user.name "Your Name"
```
Sets commit username
```bash
git config --global user.email "you@example.com"
```
Sets commit email identity
```bash
git config --list
```
View configuration values
```bash
git help <command>
```
Help documentation
---

## 2. REPOSITORY BASICS

```bash
git init
```

Create new repository

```bash
git clone <url>
```

Clone remote repository

```bash
git status
```

## Check file status

## 3. STAGING & UNSTAGING

```bash
git add <file>
```

Stage selected file

```bash
git add .
```

Stage all changes

```bash
git restore <file>
```

## Discard working directory changes

## 4. COMMIT

```bash
git commit -m "message"
```

Commit staged changes

```bash
git commit -am "message"
```

## Stage + commit tracked files

![Git Workflow](images/git.png)

## 5. BRANCHING

```bash
git branch
```

List branches

```bash
git branch <name>
```

Create branch

```bash
git checkout <name>
```

Switch branch

```bash
git checkout -b <name>
```

Create + switch

```bash
git switch <name>
```

Modern branch switch

```bash
git switch -c <name>
```

## Create + switch (modern)

## 6. MERGE & REBASE

```bash
git merge <branch>
```

Merge branch

```bash
git rebase <branch>
```

Rebase onto branch

```bash
git merge --abort
```

## Cancel merge

## 7. REMOTE OPERATIONS

```bash
git remote -v
```

List remotes

```bash
git remote add origin <url>
```

Add remote repo

```bash
git push -u origin <branch>
```

Push and set upstream

```bash
git push
```

Push commits

```bash
git pull
```

Pull + merge

```bash
git fetch
```

## Fetch without merging

![Git and GitHub](images/Git-and-github.png)

## 8. STASH

```bash
git stash
```

Save uncommitted changes

```bash
git stash pop
```

Restore stashed changes

```bash
git stash list
```

## View stash list

## 9. LOGS & HISTORY

```bash
git log
```

View commit history

```bash
git log --oneline --graph --decorate
```

Compact visual log

```bash
git show <commit>
```

Show commit details

```bash
git diff
```

## Compare changes

## 10. UNDO & FIX

```bash
git reset --soft HEAD~1
```

Undo commit (keep staged)

```bash
git reset --hard HEAD~1
```

Undo commit (remove changes)

```bash
git revert <commit>
```

Safely undo commit
