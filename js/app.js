var Sudoku = typeof Sudoku != 'undefined' ? Sudoku : {};

(function() {

    Sudoku.Templates = {
        templates: {},

        loadTemplates: function(names, callback) {
            var that = this;

            var loadTemplate = function(index) {
                var name = names[index];
                console.log(name);
                console.log("test");
                $.get('templates/' + name + '.mustache', function(data) {
                    that.templates[name] = data;
                    index++;
                    console.log("test");
                    if (index < names.length) {
                        loadTemplate(index);
                    } else if (callback) {
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

    var $cells = $('.cell'),
        $lastCellClicked,
        $numberGrid = $('#number-grid'),
        $numberCells = $('.number-cell'),
        $closeNumberGrid = $numberGrid.find('#close-number-grid'),
        $clearCell = $numberGrid.find('#clear-cell'),

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

    // Setup each cell
    $cells.forEach(function(cell) {
        var $cell = $(cell);

        if ($cell.text()) {
            $cell.addClass('starting-cell');
        } else {
            $cell.click(onCellClicked);
        }
    });

    $closeNumberGrid.click(closeNumberGrid);

    $clearCell.click(function() {
        $lastCellClicked.text('');
        closeNumberGrid();
    });

    $numberCells.click(function(ev) {
        var $cell = $(ev.currentTarget);

        if ($cell.hasClass('disabled')) {
            return;
        }

        $lastCellClicked.text($cell.text());
        closeNumberGrid();
        Sudoku.validate();
    });

    Sudoku.renderBoard = function() {
        var $board =$('#board'),
            numRowGroups = 3,
            numSections = 3;

        Sudoku.Templates.loadTemplates(['board-row-group', 'board-section'], function() {
            for (var i=1; i<=numRowGroups; i++) {
                var row = Sudoku.Templates.getTemplate('board-row-group');
                
                $board.append(Mustache.render(row, {id: i}));

                for (var j=1; j<=numSections; j++) {
                    var section = Sudoku.Templates.getTemplate('board-section');
                    $board.children('#row-group-' + i).append(Mustache.render(section, {rows: [1, 2, 3]}));
                }
            }
        })
    };

    Sudoku.validate = function() {
        var valid = true;

        $cells.forEach(function(cell) {
            if (!$(cell).text()) {
                valid = false;
            }
        });

        if (valid) {
            alert("Yay!");
        }
    };

})();
