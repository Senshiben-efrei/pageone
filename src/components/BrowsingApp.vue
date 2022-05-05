<template>
    <header class="nav-bar-space-between">
        <img src="../assets/logo.svg" alt="" style="height:100px">
        <div class="nav-bar-space-evenly">
        <a href="/UserIdentification">
            <button>Athentification</button>
        </a>
        <a href="/BookCatalog">
            <button>Catalogue</button>
        </a>
        <a href="/MyCart">
            <button>Panier</button>
        </a>
        </div>
    </header>
</template>

<script>
    export default {
        name : 'BrowsingApp'
        }
</script>