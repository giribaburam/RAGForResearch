"# RAGForResearch" 

How to Setup Git

1. Check if Git is Installed

Open:

Terminal

Run:

git --version

If installed, you will see:

git version 2.x.x

If Git is missing, macOS will prompt you to install Command Line Tools.

Install:

xcode-select --install

Verify:

git --version
2. Configure Git Identity

Set your GitHub username:

git config --global user.name "YourGitHubUsername"

Example:

git config --global user.name "research-ai-user"

Set your GitHub email:

git config --global user.email "your-email@example.com"

Example:

git config --global user.email "researcher@example.com"

Verify:

git config --list

Expected:

user.name=research-ai-user
user.email=researcher@example.com


Install Development Tools
Homebrew

Check:

brew --version

If missing:

Install from:

Homebrew Official Website

Install common tools:

brew install python
brew install node
brew install git
brew install wget
brew install jq


Verify:
python3 --version

node --version

git --version


Create Project Folder

Example:

cd ~/Documents

Create project:

mkdir rag-research-system

Enter:

cd rag-research-system

Initialize Git Repository

Run:

git init

git remote add origin https://github.com/giribaburam/RAGForResearch.git

git pull origin main

How to add change back to github

git add .
git commit -m "any notes"
git push origin main

