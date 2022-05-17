<template>
    <div>
        <h1>{{ pageState }} {{ userSession.first_name }}</h1>
        <div class="flex-container">
            <div v-for="book in panierItems" :key="book.supply">
                <div class="OneItem" :style="{'background-image': `url(${book.image})`}">
                <div class="text" >
                    <div class="nav-bar-space-between">
                    <div class="name">
                        <span>{{ book.name }}</span></div>
                    <div class="price">{{ book.price }} {{ book.currency }} </div>
                    </div>
                    <div class=" options">
                    <div class="hidden description">stock : {{ book.supply }} unité</div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    </div>

    
</template>

<script>
export default {
    data () {
        return {
            userSession: {},
            pageState: 'identifier vous sur http://localhost:8080/SignIn ',
            panierItems: []
        }
    },
    mounted:function(){
      this.getSession()
    },
    methods: {
      getSession(){
        fetch('http://localhost:5000/mockSession')
        .then((response) => response.json())
        .then((response) => {
            if (response.first_name == undefined){
                alert('veiller vous identifier pour utiliser cette page')
            } else{
                this.userSession = response
                this.pageState = 'Bienvenue'
                this.getPanier(this.userSession.user_id)}
        })
      },
        getPanier (user_id){
            console.log(user_id)
            console.log('panier')
            fetch('http://localhost:5000/panier/'+ user_id)
            .then((response) => response.json())
            .then((response) => {
                console.log(response.data)
                this.panierItems = response.data
                console.log(this.panierItems[0])
            })
        }
    }
}
</script>