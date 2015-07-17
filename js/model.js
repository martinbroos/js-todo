(function (window) {
    'use strict';

    function Model() {

        this.dbName = 'todo';

        // When local db does not exist create it.
        if (!localStorage[this.dbName]) {
            var data = {
                tasks: []
            };

            localStorage[this.dbName] = JSON.stringify(data);
        }
    };

    Model.prototype.findAll = function () {
        return JSON.parse(localStorage[this.dbName]);
    };

    Model.prototype.create = function (title, callback) {
        var title = title || '';
        var callback = callback || function () {};

        // create task object
        // Todo make this a real class ?
        var task = {
            'id': new Date().getTime(),
            'title': title.trim(),
            'completed': false
        };

        // save task
        var data = JSON.parse(localStorage[this.dbName]);
        var tasks = data.tasks;
        tasks.push(task);

        localStorage[this.dbName] = JSON.stringify(data);

        // return data to callback function
        callback.call(this, data);
    };

    Model.prototype.update = function (task, callback) {
        // find task
        var data = JSON.parse(localStorage[this.dbName]);
        var tasks = data.tasks;

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id == task.id) {
                // update given data wihin task
                for (var key in task) {
                    tasks[i][key] = task[key];
                }

                task = tasks[i]; // update return element
                break;
            }
        }

        // save
        localStorage[this.dbName] = JSON.stringify(data);

        // return task to callback function
        callback.call(this, task);
    };

    // Export to window
    window.app = window.app || {};
    window.app.Model = Model;
})(window);
