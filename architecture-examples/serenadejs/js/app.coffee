class Todo extends Serenade.Model
  @property "done", serialize: true
  @property "title", serialize: true
  @property "status", dependsOn: "done", get: -> if @done then "completed" else ""

class App extends Serenade.Model
  @localStorage = true

  @hasMany "todos", serialize: true, as: -> Todo

  @property "todosCount", dependsOn: "todos", get: -> @todos.length
  @property "incompleteTodos", dependsOn: "todos:done", get: ->
    @todos.filter((todo) -> not todo.done)
  @property "completeTodos", dependsOn: "todos:done", get: ->
    @todos.filter((todo) -> todo.done)
  @property "completedCount", dependsOn: "completeTodos", get: -> @completeTodos.length
  @property "incompleteCount", dependsOn: "incompleteTodos", get: -> @incompleteTodos.length
  @property "left", dependsOn: "incompleteCount", get: ->
    if @incompleteCount is 1 then "item left" else "items left"
  @property "allCompleted",
    dependsOn: "todos.done",
    get: -> @incompleteCount is 0
    set: (value) -> @todos.forEach((todo) -> todo.set("done", value))

class Controller
  constructor: (@app) ->
  newTodo: ->
    title = @app.newTitle.trim()
    @app.todos.push(title: title) if title
    @app.set "newTitle", ""
  clearCompleted: -> @app.set "todos", @app.incompleteTodos
  removeTodo: (todo) -> @app.todos.delete(todo)
  edit: (todo, target) ->
    li = target.parentNode
    todo.set("edit", true)
    li.getElementsByClassName("edit")[0].select()
  edited: (todo) ->
    if todo.title.trim()
      todo.set("edit", false) if todo.edit
    else
      @removeTodo(todo)
    @app.save()

template = document.getElementById("app").innerHTML
element = Serenade.view(template).render(App.find(1), Controller)

document.body.insertBefore(element, document.body.children[0])
