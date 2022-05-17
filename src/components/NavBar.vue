<template>
    <header class="nav-bar-space-evenly">
        <div class="nav-bar-space-evenly">
            <img src="../assets/logo.svg" alt="" style="height:100px" class="logo nav">
            <h1>PageOne by Efrei</h1>
        </div>
        <div>
        </div>
        <div class="nav-bar-space-evenly" style="display: flex; align-items: center;">
            <a href="/SignUp" style="margin-right:25px" class=" flex-container-column-space-evenly">
                <img src="../assets/user.svg" alt="" class="logo ico">
                <button> {{ user }} </button>
            </a>
            <a href="/" style="margin-right:10px" class=" flex-container-column-space-evenly">
                <img src="../assets/catalog.svg" alt="" class="logo ico">
                <button>Catalogue</button>
            </a>
            <a href="/MyCart" style="margin-right:10px" class=" flex-container-column-space-evenly">
                <img src="../assets/cart.svg" alt="" class="logo ico">
                <button>Panier</button>
            </a>
        </div>
    </header>
</template>

<script>
    export default {
        name : 'BrowsingApp',
            data () {
                return {
                    user : 'Utilisateur',
                }
            },
        }

</script>