## README


Commit rules:

1. Every logical change (i.e. everything from a bug fix to a new feature) must be isolated in its own commit, even if the commit will only be a single line or word. This makes it easy to selectively revert changes that are later discovered to be problematic, and to identify the commit in which a particular change was made. 
    
    - New dependencies or frameworks added to the codebase should, in particular, be isolated, so that it is clear what was in the original package and what the modifications/customizations are.

2. Commit messages should be capitalized and begin with a subject line of 50 characters or less that summarizes the change. The subject line should be a separated from the body with a blank line.

3. The body of a commit message, if included, should be wrapped at 72 characters.

    - This can be automatically configured in an editor. For example, in vim, add the following to the ~/.vimrc file: `autocmd Filetype gitcommit setlocal spell textwidth=72`


Branching/merging rules:

1. Workflow decisions should adhere to a variant of the [gitflow branching model](http://nvie.com/posts/a-successful-git-branching-model), described here:

    - A permanent master branch holds stable, in-production code, with tagged commits representing major release versions. 

    - A permanent develop branch holds a work-in-progress version of the product. Changes made here should be integration-tested in the staging environment before being merged into master.

    - Developer (a.k.a. feature) branches represent the work of individual contributors (e.g. henry-dev, jdshin-dev). To incorporate a commit or series of commits into the develop branch, the contributor should create a pull request; after a code review by another team member, the developer branch can be merged into develop with the `--no-ff` flag (see 2).

2. Merges that constitute decisions about stability and production readiness should be made with the `--no-ff` flag, so that a commit for the merge appears in the [repo history](http://nvie.com/posts/a-successful-git-branching-model/#incorporating-a-finished-feature-on-develop).

    - For example, if develop needs to be merged into master, use the following: `git merge develop --no-ff -m "Merging develop into master for beta release."`


Useful links:

[Git Tutorials from Atlassian](https://www.atlassian.com/git/tutorials)  
[Gitflow branching model](http://nvie.com/posts/a-successful-git-branching-model)  
[5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
