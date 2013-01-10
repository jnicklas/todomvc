// Todo

var Todo = Serenade.Model.extend()

Todo.belongsTo('app', {
  inverseOf: 'todos',
  as: function() { return App; }
});

Todo.property('title', { serialize: true });

Todo.property('completed', { serialize: true });

Todo.property('incomplete', {
  dependsOn: 'completed',
  get: function() { return !this.completed; }
});

Todo.property('edit');

Todo.property('classes', {
  dependsOn: ['completed', 'edit'],
  get: function() {
    return [this.edit ? 'editing' : void 0, this.completed ? 'completed' : void 0];
  }
});

Todo.prototype.remove = function() {
  this.app.todos.delete(this);
};

// App

var App = Serenade.Model.extend()

App.localStorage = true;


App.hasMany('todos', {
  inverseOf: 'app',
  serialize: true,
  as: function() { return Todo; }
});

App.selection('incompleteTodos', { from: 'todos', filter: 'incomplete' });

App.selection('completedTodos', { from: 'todos', filter: 'completed' });

App.property('left', {
  get: function() {
    if (this.incompleteTodosCount === 1) {
      return 'item left';
    } else {
      return 'items left';
    }
  }
});

App.property('allCompleted', {
  get: function() {
    return this.incompleteTodosCount === 0;
  },
  set: function(value) {
    this.todos.forEach(function(todo) {
      todo.completed = value;
    });
  }
});

App.property('newTitle');

App.property('page');

App.property('currentTodos', {
  get: function() {
    switch (this.page) {
      case 'active':
        return this.incompleteTodos;
      case 'completed':
        return this.completedTodos;
      default:
        return this.todos;
    }
  }
});


// AppController

var AppController = function(app) {
  this.app = app;
}

AppController.prototype.newTodo = function() {
  var title = this.app.newTitle.trim();
  if (title) {
    this.app.todos.push({
      title: title
    });
  }
  this.app.newTitle = '';
};

AppController.prototype.clearCompleted = function() {
  this.app.todos = this.app.incompleteTodos;
};

// TodoController

var TodoController = function(todo) {
  this.todo = todo;
}

TodoController.prototype.removeTodo = function() {
  this.todo.remove();
};

TodoController.prototype.edit = function() {
  this.todo.edit = true;
  this.field.select();
};

TodoController.prototype.edited = function() {
  if (this.todo.title.trim()) {
    if (this.todo.edit) {
      this.todo.edit = false;
    }
  } else {
    this.todo.remove();
  }
  this.todo.app.save();
};

TodoController.prototype.loadField = function(field) {
  this.field = field;
};

// Setup

var app = App.find(1)

Router({
  '/': function() { app.page = 'all'; },
  '/active': function() { app.page = 'active'; },
  '/completed': function() { app.page = 'completed'; }
}).init();

Serenade.view('app', document.getElementById('app').innerHTML);
Serenade.view('todo', document.getElementById('todo').innerHTML);
Serenade.controller('app', AppController);
Serenade.controller('todo', TodoController);

element = Serenade.render('app', app);
document.body.insertBefore(element, document.body.children[0]);
