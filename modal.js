// var component = {
//   template: "<p>vue</p>",
// }
Vue.component('show-modal', {
  template : `
  <div id="overlay" v-show="modalShow" @click="closeModal">
  <div id="content">
    <button @click="closeModal">close</button>
    <form @submit.prevent="doAdd" class="add-form">
      <input type="text" ref="comment" class="addTodo">
      <button type="submit" class="btn btnAdd" @click="closeModal">追加</button>
    </form>
  </div>
</div>`,  

methods : {
  clickEvent: function() {
    this.$emit('from-child')
    }
  },
})

