const { writeFile } = require('./utils/generateMarkdown');
const generatePage = require('./src/page-template');
const inquirer = require('inquirer');


function promptUser() {
    console.log('prompt for user data');

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'githubUsername',
                message: 'enter a GitHub username'
            },
            {

                type: 'input',
                name: 'emailAddress',
                message: 'enter an email address'
            }
        ]);
}

const promptProject = projectData => {
    console.log('prompt for project data')
    if (!projectData.projects) {
        projectData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'enter a project title'
            },
            {
                type: 'input',
                name: 'descr',
                message: 'enter a description'
            },
            {
                type: 'input',
                name: 'insta',
                message: 'enter installation instructions'
            },
            {
                type: 'input',
                name: 'usage',
                message: 'enter usage information'
            },
            {
                type: 'input',
                name: 'contr',
                message: 'enter contribution guidelines'
            },
            {
                type: 'input',
                name: 'tests',
                message: 'enter testing instructions'
            },
            {
                type: 'checkbox',
                name: 'licen',
                message: 'choose a license',
                choices: ['1', '2', '3']
            }
        ])
        .then(data => {
            projectData.projects.push(data);
            return data;
        });
};
promptUser()
    .then(promptProject)
    .then(projectData => {
        return generatePage(projectData);
    })
    .then(pageMD => {
        return writeFile(pageMD);
    })
    .catch(err => {
        console.log(err);
    });
