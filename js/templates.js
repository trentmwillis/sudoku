(function() {
    
    Sudoku = Sudoku || {};

    Sudoku.Templates = {
        templates: {},

        loadTemplates: function(names, callback) {
            var that = this;

            var loadTemplate = function(index) {
                var name = names[index];
                $.get('templates/' + name + '.mustache', function(data) {
                    that.templates[name] = data;
                    index++;
                    if (index < names.length) {
                        loadTemplate(index);
                    } else if (callback && _.isFunction(callback)) {
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

}());
