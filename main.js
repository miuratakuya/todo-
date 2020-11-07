var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length+1
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}





const app = new Vue({
  el: '#app',


  data: {
    todos: [],
    current: -1,
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],
    modalShow: false,
  },


  computed: {

    computedTodos: function() {
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      },this)
    },

    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  },


  methods: {
    // todo追加処理
    doAdd: function(event,value) {
      var comment = this.$refs.comment
      if(!comment.value.length) {
        return
      }

      this.todos.push({
        id:todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    },
    
    // 状態変更
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },

    // 削除
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      if(confirm('削除しますか？')) {
        this.todos.splice(index,1)
      }
    },

    openModal: function() {
      this.modalShow = true
    },
    closeModal: function() {
      this.modalShow  = false
    
  },
  },



  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },



  created() {
    this.todos = todoStorage.fetch()
  }
})