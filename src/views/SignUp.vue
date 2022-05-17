<template>
    <div>
        <img src="../assets/logo.svg" class="logo" alt="404">
        <br>
        <h1>{{userSession.first_name}}</h1>
        <h3>{{userSession.last_name}}</h3>
        <h3 v-bind:class="{ hidden: !logged }" >admin : {{userSession.admin}}</h3>
        <button @click="logout" v-bind:class="{ hidden: !logged }">logout</button>
        <div v-bind:class="{ hidden: logged }" >
            <h1>S'inscrire</h1>
            <form @submit.prevent="addAccount">
                <label for="firstname"><b>Prenom</b></label>
                <br>
                <input type="text" placeholder="Prenom" name="firstname" id="firstname" required>
                <br>

                <label for="lastname"><b>Nom</b></label>
                <br>
                <input type="text" placeholder="Nom" name="lastname" id="lastname" required>
                <br>

                <label for="email"><b>Email</b></label>
                <br>
                <input type="email" placeholder="Email" name="email" id="email" required>
                <br>

                <label for="password"><b>Mot de passe</b></label>
                <br>
                <input type="password" placeholder="Mot de passe" name="password" id="password" required>
                <br>
                <br>
                <button type="submit">cree un compte</button>
            </form>
            <br>
            <h3> {{ registerResult }} </h3>
            <br>
            <span>Déjà inscrit ? </span>
            <a href="/SignIn">Identifiez-vous</a>
        </div>
        
    </div>
</template>

<script>
    class formData {
        constructor(firstName, lastName, email, password) {
            this.firstName=firstName
            this.lastName=lastName
            this.email=email
            this.password=password
        }
    }
    export default {
        data() {
            return {
                registerResult : '',
                logged : false,
                userSession : {}
            }
        },
        mounted:function(){
            this.getSession() //method1 will execute at pageload
        },
        methods: {
            getSession(){  //login ! hide info
                fetch('http://localhost:5000/mockSession')
                .then((response) => response.json())
                .then((response) => {this.userSession = response
                console.log('logged ' + response.user_id == undefined)
                if (response.user_id == undefined){this.logged = false}
                else {this.logged = true}})
            },
            addAccount (){
                var newData = new formData(
                    document.querySelector("input[name=firstname]").value, 
                    document.querySelector("input[name=lastname]").value, 
                    document.querySelector("input[name=email]").value, 
                    document.querySelector("input[name=password]").value
                )
                console.log(newData)

                fetch('http://localhost:5000/SignUp',{ //send to api : post
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method:'POST',
                    body: JSON.stringify({newAccount : newData})
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.data)
                    if(data.data.err == 'ER_DUP'){// 
                        console.log(data.data.err)
                        this.registerResult = 'Email deja existant'
                    }
                    else{
                        this.registerResult = 'Compte cree'
                        window.location.href = '/SignIn'
                    }
                    //free value
                    document.querySelector("input[name=firstname]").value = ''
                    document.querySelector("input[name=lastname]").value = ''
                    document.querySelector("input[name=email]").value = ''
                    document.querySelector("input[name=password]").value = ''
                })
            },
            logout () {
                fetch('http://localhost:5000/logout')
                .then(window.location.href = "SignUp")
                
            }
        }
    }
</script>