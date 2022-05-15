<template>
    <div>
        <h1>Le catalogue des livres</h1>
        <ArticleViwer_copy />
    </div>
</template>

<script>
    import ArticleViwer_copy from '../components/ArticleViwer_copy.vue'
    export default {
        name: 'BookCatalog',
        components: {
            ArticleViwer_copy,
    },
    }
</script>