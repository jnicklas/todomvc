class Todo extends Serenade.Model
  @belongsTo 'app', inverseOf: 'all', as: -> App
  @property 'title', serialize: true

  @property 'completed', serialize: true
  @property 'incomplete',
    dependsOn: 'completed',
    get: -> not @completed

  @property 'edit'

  remove: ->
    @app.all.delete(this)

class App extends Serenade.Model
  @localStorage = true

  @hasMany 'all', inverseOf: 'app', serialize: true, as: -> Todo

  @selection 'active', from: 'all', filter: 'incomplete'
  @selection 'completed', from: 'all', filter: 'completed'

  @property 'label',
    get: -> if @activeCount is 1 then 'item left' else 'items left'

  @property 'allCompleted',
    get: -> @activeCount is 0
    set: (value) -> todo.completed = value for todo in @all

  @property 'newTitle'

  @property 'filter', value: 'all'
  @property 'filtered', get: -> @[@filter]
  @property 'filterAll', get: -> @filter is 'all'
  @property 'filterActive', get: -> @filter is 'active'
  @property 'filterCompleted', get: -> @filter is 'completed'

class AppController
  constructor: (@app) ->

  newTodo: ->
    title = @app.newTitle.trim()
    @app.all.push(title: title) if title
    @app.newTitle = ''

  clearCompleted: ->
    @app.all = @app.active

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
  '/': -> app.filter = 'all'
  '/active': -> app.filter = 'active'
  '/completed': -> app.filter = 'completed'

router.init()

# boring setup
Serenade.view('app', document.getElementById('app').innerHTML)
Serenade.view('todo', document.getElementById('todo').innerHTML)
Serenade.controller('app', AppController)
Serenade.controller('todo', TodoController)

document.body.insertBefore(Serenade.render('app', app), document.body.children[0])
