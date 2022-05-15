<template>
    <div>
        <h1>Le catalogue des livres</h1>
        <ArticleViwer />
    </div>
</template>

<script>
    import ArticleViwer from '../components/ArticleViwer.vue'
    export default {
        name: 'BookCatalog',
        components: {
            ArticleViwer,
    },
    }
</script>