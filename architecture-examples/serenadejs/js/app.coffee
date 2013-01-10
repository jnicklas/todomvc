class Todo extends Serenade.Model
  @belongsTo 'app', inverseOf: 'todos', as: -> App
  @property 'title', serialize: true

  @property 'completed', serialize: true
  @property 'incomplete',
    dependsOn: 'completed',
    get: -> not @completed

  @property 'edit'
  @property 'classes',
    dependsOn: ['completed', 'edit'],
    get: -> ['editing' if @edit, 'completed' if @completed]

  remove: ->
    @app.todos.delete(this)

class App extends Serenade.Model
  @localStorage = true

  @hasMany 'todos', inverseOf: 'app', serialize: true, as: -> Todo

  @selection 'incompleteTodos', from: 'todos', filter: 'incomplete'
  @selection 'completedTodos', from: 'todos', filter: 'completed'

  @property 'left',
    get: -> if @incompleteTodosCount is 1 then 'item left' else 'items left'

  @property 'allCompleted',
    get: -> @incompleteTodosCount is 0
    set: (value) -> todo.completed = value for todo in @todos

  @property 'newTitle'

  @property 'page'
  @property 'currentTodos',
    get: ->
      switch @page
        when 'active' then @incompleteTodos
        when 'completed' then @completedTodos
        else @todos

class AppController
  constructor: (@app) ->

  newTodo: ->
    title = @app.newTitle.trim()
    @app.todos.push(title: title) if title
    @app.newTitle = ''

  clearCompleted: ->
    @app.todos = @app.incompleteTodos

class TodoController
  constructor: (@todo) ->

  removeTodo: ->
    @todo.remove()

  edit: ->
    @todo.edit = true
    @field.select()

  edited: ->
    if @todo.title.trim()
      @todo.edit = false if @todo.edit
    else
      @todo.remove()
    @todo.app.save()

  loadField: (@field) ->

app = App.find(1)

router = Router
  '/': -> app.page = 'all'
  '/active': -> app.page = 'active'
  '/completed': -> app.page = 'completed'

router.init()

# boring setup
Serenade.view('app', document.getElementById('app').innerHTML)
Serenade.view('todo', document.getElementById('todo').innerHTML)
Serenade.controller('app', AppController)
Serenade.controller('todo', TodoController)

document.body.insertBefore(Serenade.render('app', app), document.body.children[0])
