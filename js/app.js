var Sudoku = typeof Sudoku != 'undefined' ? Sudoku : {};

(function() {

    var $lastCellClicked;

    $('.cell').click(function(ev) {
        // Save the cell that was clicked
        $lastCellClicked = $(ev.currentTarget);

        // Determine which numbers are available for the spot
        var usedNumbers = [],
            $section = $lastCellClicked.parents('.board-section').first(),
            $cells = $section.find('.cell');

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
    });

})();
