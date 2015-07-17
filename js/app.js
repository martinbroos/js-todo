(function () {
    'use strict';

    /**
     * Init Todo list app
     * @constructor
     */
    function Todo() {
        this.view = new app.View();
        this.model = new app.Model();
        this.controller = new app.Controller(this.view, this.model);
    };

    var todo = new Todo();
})();
