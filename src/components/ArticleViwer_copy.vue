<template>
  <div onload="getBooks">
    <div>
      <form @submit.prevent="search()">
        <input id="search_bar" type="text" placeholder="rechercher">
        <button type='submit'>Rechercher</button>
      </form>
      <br>
      <br>
      <button @click="edit('addForm')">Ajouter un livre</button>

      <div class="editor-container " v-bind:id="'addForm'">
        <div class="editor">
          <h1>ADD BOOK</h1>
          <div class="nav-bar-space-evenly">
            <form @submit.prevent="addBook()" class="flex-container-column-space-evenly">
              <label for="nameEdit">Donner le titre</label>
              <input v-bind:id="'nameEdit'" type="text">
              <br>
              <label for="priceEdit">Donner prix</label>
              <input v-bind:id="'priceEdit'" type="number" step="0.01" min="0">
              <br>
              <label for="starsEdit">Donner la note</label>
              <input v-bind:id="'starsEdit'" type="number" step="0.1" min="0" max="5">
              <br>
              <label for="supplyEdit">Donner la quantité</label>
              <input v-bind:id="'supplyEdit'" type="number" min="0">
              <br>
              <label for="priceEdit">Donner l'auteur</label>
              <input v-bind:id="'authorEdit'" type="text">
              <br>
              <label for="priceEdit">Donner le lien de la couverture</label>
              <input v-bind:id="'thumbnailEdit'" type="text">
              <br>
              <label for="priceEdit">Donner les categories</label>
              <input v-bind:id="'categoryEdit'" type="text">
              <br>
              <br>
              <button type="submit">Enregistrer</button>
              <br>
              <button type="button" @click="cancel('addForm')">Annuler</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-container">

      <div v-for="book in books" :key="book.book_id">
        <div class="OneItem" :style="{'background-image': `url(${book.image})`}">
          <div class="text" >
            <div class="nav-bar-space-between">
              <div class="name">
                <span>{{ book.name }}</span></div>
              <div class="price">{{ book.price }} {{ book.currency }} </div>
            </div>
            <div class=" options">
              <div class="hidden author">Auteur : {{ book.author }}</div>
              <div class="hidden description">Categorie : {{ book.category }}</div>
              <div class="hidden description">Note : {{ book.book_depository_stars }} / 5</div>
              <div class="hidden description">isbn : {{ book.isbn }}</div>
              <div class="hidden description">stock : {{ book.supply }} unité</div>
              <div class="nav-bar-space-evenly">
                <button class="hidden">Emprunter</button>
                <button class="hidden" @click="edit('edit_' + book.book_id)">Modifier</button>
                <button class="hidden" @click="deleteBook(book.book_id)">Supprimer</button>
              </div>
            </div>
          </div>
        </div>

        <div class="editor-container " v-bind:id="'edit_' + book.book_id">
          <div class="editor">
            <h1>EDIT BOOK</h1>
            <div class="nav-bar-space-evenly">
              <img :src="book.image" alt="">
              <form @submit.prevent="editBook(book.book_id)" class="flex-container-column-space-evenly">
                <label for="nameEdit">Changer le titre</label>
                <input v-bind:id="'nameEdit' + book.book_id" type="text" :value="book.name">
                <br>
                <label for="priceEdit">Changer prix</label>
                <input v-bind:id="'priceEdit' + book.book_id" type="number" step="0.01" min="0" :value="book.price">
                <br>
                <label for="starsEdit">Changer la note</label>
                <input v-bind:id="'starsEdit' + book.book_id" type="number" step="0.1" min="0" max="5" :value="book.book_depository_stars">
                <br>
                <label for="supplyEdit">Changer la quantité</label>
                <input v-bind:id="'supplyEdit' + book.book_id" type="number" min="0" :value="book.supply">
                <br>
                <br>
                <button type="submit">Enregistrer</button>
                <br>
                <button type="button" @click="cancel('edit_' + book.book_id)">Annuler</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  class editData {
    constructor(book_id, nameEdit, priceEdit, starsEdit, supplyEdit) {
      this.book_id = book_id
      this.nameEdit = nameEdit
      this.priceEdit = priceEdit
      this.starsEdit = starsEdit
      this.supplyEdit = supplyEdit
    }
  }
  class bookData {
    constructor(nameEdit, priceEdit, starsEdit, supplyEdit, authorEdit, thumbnailEdit, categoryEdit) {
      this.nameEdit = nameEdit
      this.priceEdit = priceEdit
      this.starsEdit = starsEdit
      this.supplyEdit = supplyEdit
      this.authorEdit = authorEdit
      if (thumbnailEdit == ''){
        this.thumbnailEdit = 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg'
      } else {
        this.thumbnailEdit = thumbnailEdit
      }
      this.categoryEdit = categoryEdit
    }
  }
  export default {
    data () {
      return {
        books: [],
      }
    },
    mounted:function(){
      this.getBooks() //method1 will execute at pageload
    },
    methods: {
      getBooks(){
        fetch('http://localhost:5000/books')
        .then((response) => response.json())
        .then((response) => this.books = response.data.slice(701))
      },
      edit(bookId){
        const bookEdit = document.getElementById(bookId)
        bookEdit.classList.add('show')
      },
      cancel(bookId){
        const bookEdit = document.getElementById(bookId)
        bookEdit.classList.remove('show')
      },
      editBook(bookId){
        var editInfo = new editData(
          bookId, 
          document.getElementById('nameEdit' + bookId).value, 
          parseFloat(document.getElementById("priceEdit" + bookId).value), 
          parseFloat(document.getElementById("starsEdit" + bookId).value), 
          parseInt(document.getElementById("supplyEdit" + bookId).value)
        )
        console.log('edit ' + bookId)
        fetch('http://localhost:5000/books/' + bookId, {
          headers: {
              'Content-Type': 'application/json'
          },
          method:'PATCH',
          body: JSON.stringify({newData : editInfo})
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.edited_rows == 1) {
            this.getBooks()
            document.getElementById('edit_' + bookId).classList.remove('show')
          }
        })
      },
      deleteBook(bookId){
        console.log('delete ' + bookId)
        fetch('http://localhost:5000/books/' + bookId, {
          method:'DELETE'
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.deleted_rows == 1) {
            this.getBooks()
          }
        })
      },
      addBook(){
        var bookInfo = new bookData(
          document.getElementById('nameEdit').value, 
          parseFloat(document.getElementById("priceEdit").value), 
          parseFloat(document.getElementById("starsEdit").value), 
          parseInt(document.getElementById("supplyEdit").value),
          document.getElementById('authorEdit').value, 
          document.getElementById('thumbnailEdit').value, 
          document.getElementById('categoryEdit').value, 
        )
        console.log('adding book')
        fetch('http://localhost:5000/books', {
          headers: {
              'Content-Type': 'application/json'
          },
          method:'POST',
          body: JSON.stringify({newBook : bookInfo})
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.added_rows == 1) {
            this.getBooks()
            this.cancel('addForm')
            document.getElementById('nameEdit').value = ''
            document.getElementById("priceEdit").value = ''
            document.getElementById("starsEdit").value = ''
            document.getElementById("supplyEdit").value = ''
            document.getElementById('authorEdit').value = ''
            document.getElementById('thumbnailEdit').value = ''
            document.getElementById('categoryEdit').value = ''
          }
        })
      },
      search() {
        var name = document.getElementById('search_bar').value
        fetch('http://localhost:5000/books/' + name)
        .then((response) => response.json())
        .then((response) => this.books = response.data)
        console.log('search')
      }
    }
  }
</script>

