(function() {
  var App, Controller, Todo, element,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Todo = (function(_super) {

    __extends(Todo, _super);

    function Todo() {
      Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.property("done", {
      serialize: true
    });

    Todo.property("title", {
      serialize: true
    });

    Todo.property("status", {
      dependsOn: "done",
      get: function() {
        if (this.done) {
          return "completed";
        } else {
          return "";
        }
      }
    });

    return Todo;

  })(Serenade.Model);

  App = (function(_super) {

    __extends(App, _super);

    function App() {
      App.__super__.constructor.apply(this, arguments);
    }

    App.localStorage = true;

    App.hasMany("todos", {
      serialize: true,
      as: function() {
        return Todo;
      }
    });

    App.property("todosCount", {
      dependsOn: "todos",
      get: function() {
        return this.todos.length;
      }
    });

    App.property("incompleteTodos", {
      dependsOn: "todos:done",
      get: function() {
        return this.todos.filter(function(todo) {
          return !todo.done;
        });
      }
    });

    App.property("completeTodos", {
      dependsOn: "todos:done",
      get: function() {
        return this.todos.filter(function(todo) {
          return todo.done;
        });
      }
    });

    App.property("completedCount", {
      dependsOn: "completeTodos",
      get: function() {
        return this.completeTodos.length;
      }
    });

    App.property("incompleteCount", {
      dependsOn: "incompleteTodos",
      get: function() {
        return this.incompleteTodos.length;
      }
    });

    App.property("left", {
      dependsOn: "incompleteCount",
      get: function() {
        if (this.incompleteCount === 1) {
          return "item left";
        } else {
          return "items left";
        }
      }
    });

    App.property("allCompleted", {
      dependsOn: "todos.done",
      get: function() {
        return this.incompleteCount === 0;
      },
      set: function(value) {
        return this.todos.forEach(function(todo) {
          return todo.set("done", value);
        });
      }
    });

    return App;

  })(Serenade.Model);

  Controller = (function() {

    function Controller(app) {
      this.app = app;
    }

    Controller.prototype.newTodo = function() {
      var title;
      title = this.app.newTitle.trim();
      if (title) {
        this.app.todos.push({
          title: title
        });
      }
      return this.app.set("newTitle", "");
    };

    Controller.prototype.clearCompleted = function() {
      return this.app.set("todos", this.app.incompleteTodos);
    };

    Controller.prototype.removeTodo = function(todo) {
      return this.app.todos["delete"](todo);
    };

    Controller.prototype.edit = function(todo, target) {
      var li;
      li = target.parentNode;
      todo.set("edit", true);
      return li.getElementsByClassName("edit")[0].select();
    };

    Controller.prototype.edited = function(todo) {
      if (todo.title.trim()) {
        if (todo.edit) return todo.set("edit", false);
      } else {
        return this.removeTodo(todo);
      }
    };

    return Controller;

  })();

  element = Serenade.view(document.getElementById("app").innerHTML).render(App.find(1), Controller);

  document.body.insertBefore(element, document.body.children[0]);

}).call(this);
