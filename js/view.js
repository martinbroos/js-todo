(function (window) {
    'use strict';

    /**
     * Handle all updates to the view and listen for events triggered by the view
     * @constructor
     */
    function View() {
        this.form = document.querySelector('.js-form-tasks');
        this.inputAddTask = document.querySelector('.js-add-task');
        this.taskList = document.getElementById('task-list');

        //prevent form submit
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
        });
    };

    View.prototype.bind = function (event, handler) {
        var _this = this;

        if (event === 'addTask') {
            _this.inputAddTask.addEventListener('change', function () {
                handler(_this.inputAddTask.value);
                _this.inputAddTask.value = ''; // clear field
            });
        }

        if (event === 'toggleCheckTask') {
            document.addEventListener('click', function (e) {
                if (e.target.matches('.js-task')) {
                    e.stopPropagation();

                    var taskId = e.target.getAttribute('data-id');
                    if (taskId) {
                        handler({
                            'id': taskId,
                            'completed': !e.target.classList.contains('is-completed')
                        });
                    }
                }
            });
        }
    };

    /**
     * Render view elements based on commands
     * @param cmd
     * @param data
     */
    View.prototype.render = function (cmd, data) {
        var _this = this,
            source = document.getElementById('tasks-template').innerHTML,
            template = Handlebars.compile(source);

        if (cmd === 'updateList' || cmd === 'showList') {
            _this.taskList.innerHTML = template(data);
        }

        else if (cmd === 'setTaskComplete') {
            var el = document.querySelector('[data-id="'+data.id+'"]');
            if (el) {
                el.classList.add('is-completed');
                var icon = document.createElement('i');
                icon.className = 'glyphicon glyphicon-ok';
                el.insertBefore(icon, el.firstChild);
            }
        }

        else if (cmd === 'setTaskInComplete') {
            var el = document.querySelector('[data-id="'+data.id+'"]');
            if (el) {
                el.classList.remove('is-completed');
                var icon = el.getElementsByTagName('i')[0];
                el.removeChild(icon);
            }
        }
    };

    // Export to window
    window.app = window.app || {};
    window.app.View = View;
})(window);
