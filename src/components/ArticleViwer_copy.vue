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
              <button class="hidden" @click="editBook()">Edit</button>
              <button class="hidden">Delete</button>
            </div>
            <div class="hidden description">{{ Books.shortDescription }}</div>
          </div>
        </div>
      </div>
      <div class="editor-container hidden " >
        <div class="editor">
          <h1>EDIT BOX</h1>
          <div class="nav-bar-space-evenly">
            <form @submit.prevent="sendEditBook">
              <input type="text">
              <input type="textarea">
              <input type="select">
            </form>
            <img :src="Books.thumbnailUrl" alt="">
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
    }
  }
</script>

