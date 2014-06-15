var Sudoku = typeof Sudoku != 'undefined' ? Sudoku : {};

(function() {

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
