var Sudoku = typeof Sudoku != 'undefined' ? Sudoku : {};

$(document).ready(function() {
    // Private variables and functions
    var $numberGrid = $('#number-grid'),
        $gameBoard = $('#board'),
        $lastCellClicked, $numberCells, $cells,

        closeNumberGrid = function() {
            $numberGrid.addClass('hide');
        },

        openNumberGrid = function() {
            $numberGrid.removeClass('hide');
        },

        onCellClicked = function(ev) {
            // Save the cell that was clicked
            $lastCellClicked = $(ev.currentTarget);

            // Determine which numbers are available for the spot
            var usedNumbers = [],
                $row = $lastCellClicked.parent('tr'),
                $section = $row.parents('.board-section').first(),
                $rowGroup = $section.parent('.row-group'),
                rowNum = ($row.index() + 1) + (3 * $rowGroup.index()),
                colNum = ($lastCellClicked.index() + 1) + (3 * $section.index()),
                $cells = $section.find('.cell'),
                $cells = $cells.add('.row-' + rowNum + ' > .cell'),
                $cells = $cells.add('.board-section:nth-child(' + ($section.index()+1) + ') .cell:nth-child(' + ($lastCellClicked.index()+1) + ')');

            $cells.forEach(function(cell) {
                var $cell = $(cell);

                if ($cell.text()) {
                    usedNumbers.push($cell.text());
                }
            });

            $numberCells.forEach(function(cell) {
                var $cell = $(cell);
                $cell.toggleClass('disabled', $.inArray($cell.text(), usedNumbers) !== -1);
            });

            // Reveal the number grid
            openNumberGrid();
        };

    // First function to get called that runs everything needed
    Sudoku.init = function() {
        Sudoku.renderGameBoard();
        Sudoku.renderNumberGrid();
    };

    // Renders the game board and then calls the setup function
    Sudoku.renderGameBoard = function() {
        var $board = $('#board'),
            numRowGroups = 3,
            numSections = 3;

        Sudoku.Templates.loadTemplates(['board-row-group', 'board-section'], function() {
            var boardNums = Sudoku.generateBoard({useDefault: true});

            for (var i=0; i<numRowGroups; i++) {
                var row = Sudoku.Templates.getTemplate('board-row-group');

                $board.append(Mustache.render(row, {id: i}));

                for (var j=0; j<numSections; j++) {
                    var section = Sudoku.Templates.getTemplate('board-section'),
                        start = i*27 + j*3,
                        cells = boardNums.slice(start, start+3);
                        cells = cells.concat(boardNums.slice(start + 9, start + 12), boardNums.slice(start + 18, start + 21));

                    $board.children('#row-group-' + i).append(Mustache.render(section, {
                        rows: [i*3+1, i*3+2, i*3+3],
                        cells: cells
                    }));
                }
            }

            Sudoku.setupGameBoard();
        });
    };

    // Renders the number grid for user selections
    Sudoku.renderNumberGrid = function() {
        Sudoku.Templates.loadTemplates(['number-grid'], function() {
            var grid = Sudoku.Templates.getTemplate('number-grid');
            console.log(grid);
            $numberGrid.append(grid);
            Sudoku.setupNumberGrid();
        });
    };

    // Sub-object to handle template-related stuff
    Sudoku.Templates = {
        templates: {},

        loadTemplates: function(names, callback) {
            var that = this;

            var loadTemplate = function(index) {
                var name = names[index];
                $.get('templates/' + name + '.mustache', function(template) {
                    that.templates[name] = template;
                    index++;
                    if (index < names.length) {
                        loadTemplate(index);
                    } else if (callback && $.isFunction(callback)) {
                        callback();
                    }
                });
            }

            loadTemplate(0);
        },

        getTemplate: function (name) {
            return this.templates[name];
        }
    };

    // Setup all the event handlers for the board
    Sudoku.setupGameBoard = function() {
        $cells = $('.cell');

        // Setup each cell
        $cells.forEach(function(cell) {
            var $cell = $(cell);

            if ($cell.text()) {
                $cell.addClass('starting-cell');
            } else {
                $cell.click(onCellClicked);
            }
        });
    };

    // Setup all the event handlers for the number grid
    Sudoku.setupNumberGrid = function() {
        var $closeNumberGrid = $numberGrid.find('#close-number-grid'),
            $clearCell = $numberGrid.find('#clear-cell');

        $numberCells = $('.number-cell');

        $numberCells.click(function(ev) {
            var $cell = $(ev.currentTarget);

            if ($cell.hasClass('disabled')) {
                return;
            }

            $lastCellClicked.text($cell.text());
            closeNumberGrid();
            Sudoku.validate();
        });

        $closeNumberGrid.click(closeNumberGrid);

        $clearCell.click(function() {
            $lastCellClicked.text('');
            closeNumberGrid();
        });
    }

    // TODO: Generate new game boards
    Sudoku.generateBoard = function(options) {
        if (options.useDefault) {
            return ['5','3','','','7','','','','',
                    '6','','','1','9','5','','','',
                    '','9','8','','','','','6','',
                    '8','','','','6','','','','3',
                    '4','','','8','','3','','','1',
                    '7','','','','2','','','','6',
                    '','6','','','','','2','8','',
                    '','','','4','1','9','','','5',
                    '','','','','8','','','7','9'];
        }
    };

    // Function to check if puzzle is solved
    Sudoku.validate = function() {
        var valid = true;

        $cells.forEach(function(cell) {
            if (!$(cell).text()) {
                valid = false;
            }
        });

        if (valid) {
            alert("Congratulations! You have succesfully completed the puzzle!");
        }
    };

    // Start everything!
    Sudoku.init();
})();
