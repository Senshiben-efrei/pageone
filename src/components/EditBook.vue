<template>
  <div>
    <h2>Edit product</h2>
    <form v-on:submit="updateProduct">
        <label for="edit-name">Name</label>
        <br>
        <input id="edit-name" required/>
        <br>

        <label for="edit-description">Description</label>
        <br>
        <textarea id="edit-description" rows="2"></textarea>
        <br>

        <label for="edit-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <br>
        <input type="number" id="edit-price"/>
        <br>

      <button type="submit" class="btn btn-primary">Save</button>
      <router-link class="btn btn-default" v-bind:to="'/'">Cancel</router-link>
    </form>
  </div>
</template>


<script>
    export default {
        name : 'EditBook',
        data() {
            return {
                }
        }
    }
</script>