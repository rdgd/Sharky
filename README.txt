README
-------------------

Dependencies
1. Web browser


Recommended
1. Node (nodejs.org)
2. Grunt - npm install -g grunt grunt-cli


Basic Execution
To watch the game play out, just open the examples/example1.html file, open the console,
and refresh the page. Or, navigate to the dist/ dir in your terminal and run `node DeckOfCards.js`.


Development
To do anything other than observe the result of the game, which uses the bundled/built file, you are going to
need to install some additional dependencies. Fortunately, npm allows us to do just that in a very
convenient way. `npm install`

To run the tests, navigate to the project root and run the `grunt unit` command. If you do not have
grunt installed globally as recommended, you will need to specify the path to the binary local to
this project. './node_modules/grunt-cli/bin/grunt unit'

If you want to develop on this project, then you'll want to understand all of the handy automated task running
that is available to you... We are using grunt to automate a number of tasks for us: static code analysis (linting, standards
compliance), asset bundling, minification, and testing. Simply run command `grunt watch`, and then get developing. As you make
changes to certain files, different actions will be performed, and the result will be output to your console.
If something goes wrong, you will receive a desktop notification, so that you know to look back to
the console.


Retrospective
I'm happy with the way everything turned out generally speaking. I only spent one night on it,
so there were more clever things that I'm sure I could have done, and certainly could have had more test coverage.
