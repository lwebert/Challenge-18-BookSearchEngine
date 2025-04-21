# Challenge-18-BookSearchEngine
University of Denver Coding Bootcamp Week 18 MERN Challenge

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Description
This is a MERN stack application built with MongoDB database, Express.js, React, and Node.js that serves as a functioning Google Books API search engine. The API was refactored to be a GraphQL API build with Apollo Server. Users are able to create accounts on the application, search for books, save books to their personal account, view all saved books, and remove any saved books. 


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)


## Installation
To install the application locally, do the following in your terminal:

1. Clone the repository to your local computer.  
   `git clone git@github.com:lwebert/Challenge-18-BookSearchEngine.git`
2. Check that node.js is installed.  
   `node -v`
3. Install dependencies.  
   `npm i`

## Usage
The application is deployed to Render, and can be found [here](https://challenge-18-booksearchengine.onrender.com).


To run the application locally, open an instance of the application in your terminal. 
Run the following:
1. `npm run build`.
2. `npm run develop`. 
3. Open the application in your browser at [http://localhost:3000/](http://localhost:3000/).


## Contributing
This application's API was refactored by Lauren Webert. Here are some guidelines on ways to contribute:

Report a bug fix.

1. Create a new Issue in the GitHub repo.

Make local changes to push up.

1. Create a new branch (`git checkout -b <your-feature-branch-name>`)
2. Make your changes locally
3. Push the code back to the GitHub repo (`git push origin <your-feature-branch-name>`)
4. Create a pull request to merge your changes

## Tests
The application is working correctly if, when the application first loads, users are directed to the Book Search page, where they can search for any book using the Google Books API. Users can signup or login without errors. When logged in, users can save books to their account, then navigate to the 'See Your Books' tab, where users can view all books they have previously saved, as well as remove any books from that list.

![](./client/src/assets/BookSearch.jpg)

## License
The application is covered under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).   
https://www.apache.org/licenses/LICENSE-2.0.txt


## Questions
- GitHub username: [lwebert](https://github.com/lwebert).
- Reach me at [lauren@weberts.org](lauren@weberts.org) with additional questions.
