(function (window) {
    'use strict';

    /**
     * Manage interaction between view and model
     * @param view
     * @constructor
     */
    function Controller(view, model) {
        var _this = this;
        _this.view = view;
        _this.model = model;

        // render task list
        _this.view.render('showList', _this.model.findAll());

        // Bind events to the view
        _this.view.bind('addTask', function (title) {
            _this.addTask(title);
        });

        _this.view.bind('toggleCheckTask', function (task) {
           _this.updateTaskStatus(task);
        });
    };

    Controller.prototype.addTask = function (title) {
        var _this = this;

        _this.model.create(title, function (data){
            _this.view.render('updateList', data);
        });
    };

    Controller.prototype.updateTaskStatus = function (task) {
        var _this = this;

        _this.model.update(task, function (data) {
            if (data.completed) {
                _this.view.render('setTaskComplete', data);
            } else {
                _this.view.render('setTaskInComplete', data);
            }
        });
    };

    // Export to window
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
