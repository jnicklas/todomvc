class Todo extends Serenade.Model
  @property 'completed', serialize: true
  @property 'title', serialize: true
  @property 'incomplete', dependsOn: 'completed', get: -> not @completed
  @property 'edit'

  @property 'classes',
    dependsOn: ['completed', 'edit'],
    get: -> ['editing' if @edit, 'completed' if @completed]

class App extends Serenade.Model
  @localStorage = true

  @hasMany 'todos', serialize: true, as: -> Todo

  @selection 'incompleteTodos', from: 'todos', filter: 'incomplete'
  @selection 'completedTodos', from: 'todos', filter: 'completed'

  @property 'left', get: ->
    if @incompleteTodosCount is 1 then 'item left' else 'items left'

  @property 'allCompleted',
    get: -> @incompleteTodosCount is 0
    set: (value) -> todo.completed = value for todo in @todos

  @property 'newTitle'

class Controller
  constructor: (@app) ->

  newTodo: ->
    title = @app.newTitle.trim()
    @app.todos.push(title: title) if title
    @app.newTitle = ''

  clearCompleted: ->
    @app.todos = @app.incompleteTodos

  removeTodo: (target, todo) ->
    @app.todos.delete(todo)

  edit: (target, todo, event) ->
    todo.edit = true

    @field.focus()
    @field.select()

  edited: (target, todo) ->
    if todo.title.trim()
      todo.edit = false if todo.edit
    else
      @removeTodo(target, todo)
    @app.save()

  loadField: (@field) ->

template = document.getElementById('app').innerHTML
element = Serenade.view(template).render(App.find(1), Controller)

document.body.insertBefore(element, document.body.children[0])
