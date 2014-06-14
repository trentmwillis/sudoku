var Sudoku = typeof Sudoku != 'undefined' ? Sudoku : {};

(function() {

    var $lastCellClicked;

    $('.cell').click(function(ev) {
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
            if ($(cell).text()) {
                usedNumbers.push($(cell).text());
            }
        });

        $('.number-cell').forEach(function(cell) {
            $(cell).toggleClass('disabled', $.inArray($(cell).text(), usedNumbers) !== -1);
        });

        // Reveal the number grid
        $('#number-grid').removeClass('hide');
    });

    $('.number-cell').click(function(ev) {
        var $cell = $(ev.currentTarget);

        if ($cell.hasClass('disabled')) {
            return;
        }

        $lastCellClicked.text($cell.text());
        $('#number-grid').addClass('hide');
        Sudoku.validate();
    });

    Sudoku.validate = function() {
        var valid = true;

        $('.cell').forEach(function(cell) {
            if (!$(cell).text()) {
                valid = false;
            }
        });

        if (valid) {
            alert("Yay!");
        }
    };

})();
