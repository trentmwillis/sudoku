# Uber Sudoku

A simple sudoku web-app made to be awesome. This application is based on Mustache for templating, Zepto for JavaScript utilities/DOM manipulation, and Sass for CSS preprocessing. Checkout http://www.trentwillis.net/sudoku to see it in action.

## Application Design
In my mind, the simplest way to break down the design of this application is into the large "language" components.

### HTML
On the markup front, the application makes extensive use of `table` elements. This decision is made because they are visually and semantically the closest to the structure of an actual sudoku game board.

This board is then represent by `row-group`s and `section`s. `row-group`s correspond to the top, middle, and bottom thirds of the game board; `section`s refer to the individual blocks of nine cells, in which you can't have a number repeat more then once. Sections and cells are common terminology to describe Sudoku game boards and the term `row-group` was chosen because it reflects to markup of the board.

Additionally, for each `cell`, rather than embedding an input into which the user types a number, a `click` event handler is bound. This event opens up another "grid" that allows the user to select which number to put into the `cell`.

### CSS (Sass)
For the styling of the app, I went with a simplistic aesthetic for two main reasons. First, was the time constraint, I didn't have the time to develop lots of fancy designs and images/icons to integrate into the application (plus, the current trend of flat, minimalism fit well). Secondly, I felt a lighter, simpler style reflected the leisurely nature of the game.

Technically, the Sass/CSS is very straightforward. The core file is `styles.scss` which imports all the other stylesheets to provide a singular output when compiled. `variables.scss` and `mixins.scss` are both self-explanatory files. `base.scss` provides some app-wide styles and simple resets, `board.scss` contains all the styles pertaining to the game board, and `number-grid.scss` provides the styles for the number grid that users use to enter numbers.

I think this setup allows for and promotes modular styling and lets the stylesheets scale nicely with the application.

### JavaScript


### Miscellaneous
I chose to use a small set of tools from Node.js. The main tool used was Grunt.js, with plugins for Uglify, Watch, and Sass. This allowed me to easily watch my `.scss` files for changes and build them without thinking during development as well as quickly minify my scripts for deployment when I went to test on a server.
