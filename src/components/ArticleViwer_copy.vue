<template>
  <div class="flex-container">
    <div v-for="Books in Books" :key="Books._id">
      <div class="OneItem" :style="{'background-image': `url(${Books.thumbnailUrl})`}">
        <div class="text" >
          <div class="nav-bar-space-between">
            <div class="name">
              <span>{{ Books.title }}</span></div>
            <div class="price">{{ Books.pageCount }}</div>
          </div>
          <div class=" options">
            <div class="nav-bar-space-evenly">
              <button class="hidden">Borrow</button>
              <button class="hidden" @click="edit('edit_' + Books._id)">Edit</button>
              <button class="hidden">Delete</button>
            </div>
            <div class="hidden description">{{ Books.shortDescription }}</div>
          </div>
        </div>
      </div>
      <div class="editor-container " v-bind:id="'edit_' + Books._id">
        <div class="editor">
          <h1>EDIT BOOK</h1>
          <div class="nav-bar-space-evenly">
            <img :src="Books.thumbnailUrl" alt="">
            <form @submit.prevent="sendEditBook" class="flex-container-column-space-evenly">
              <input type="text">
              <br>
              <input type="textarea">
              <br>
              <input type="select">
              <br>
              <br>
              <button type="submit">Edit</button>
              <br>
              <button @click="cancel('edit_' + Books._id)">cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Books from '../assets/books'
  export default {
    data () {
      return {
        Books: Books
      }
    },
    methods: {
      edit(bookId){
        console.log('click')
        console.log(bookId)
        const bookEdit = document.getElementById(bookId)
        bookEdit.classList.add('show')
      },
      cancel(bookId){
        console.log('click')
        console.log(bookId)
        const bookEdit = document.getElementById(bookId)
        bookEdit.classList.remove('show')
      }
    }
  }
</script>

