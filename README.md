# Prosjekt

TDT4140 Programvareutvikling - Gruppe 18

GjørNo'
Sosial plattform for deling og organisering av aktiviteter.

# How to develop

## Dependencies

Assuming you have a terminal with bash/zsh.
On Windows, installing git provides a terminal and bash.
VSCode also has a terminal.

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) >= 15.8.0
  - Yarn (`$ npm install -g yarn`)
  - [Prettier](https://prettier.io/)
    - Available as a VSCode extension
  - [Stylelint](https://stylelint.io/)
    - Available as a VSCode extension
- [Python](https://www.python.org/)
  - virtualenv (`$ pip install virtualenv`)
  - [flake8](https://flake8.pycqa.org/en/latest/) (`$ pip install flake8`)
    - [Linting Python in VSCode](https://code.visualstudio.com/docs/python/linting)
  - [autopep8](https://pypi.org/project/autopep8/) (`$ pip install --upgrade autopep8`)
    - [Formatting Python in VSCode](https://code.visualstudio.com/docs/python/editing#_formatting)

## How to git

Clone repository  
With SSH:  
`$ git clone git@gitlab.stud.idi.ntnu.no:tdt4140/landsby-1/gruppe-18/prosjekt.git`  
With HTTPS:  
`$ git clone https://gitlab.stud.idi.ntnu.no/tdt4140/landsby-1/gruppe-18/prosjekt.git`

Set name and e-mail  
`$ git config user.name <name>`  
`$ git config user.email <user>@stud.ntnu.no`

Get latest version from upstream  
`$ git pull`

Create a branch  
`$ git checkout -b <branch_name>`

Check current status  
`$ git status`

Add, commit, and push changes upstream  
`$ git add <files>`  
`$ git commit`  
`$ git pull`  
`$ git push`
