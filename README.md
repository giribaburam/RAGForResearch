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
