<template>
    <div>
        <h1>Mon panier</h1>
        <PanierViewer />
    </div>
</template>

<script>
import PanierViewer from '../components/PanierViewer'
    export default {
        name: 'BookCatalog',
        components: {
            PanierViewer,
        }
    }
</script>