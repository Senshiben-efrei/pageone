<template>
    <div>
        <img src="../assets/logo.svg" class="logo" alt="404">
        <h1>S'identifier</h1>
        <form @submit.prevent="login">
            <label for="email"><b>Email</b></label>
            <br>
            <input type="email" placeholder="Email" name="email" id="email" required>
            <br>

            <label for="password"><b>Mot de passe</b></label>
            <br>
            <input type="password" placeholder="Mot de passe" name="password" id="password" required>
            <br>
            <br>
            <button type="submit">se connecter</button>
        </form>
        <br>
        <h1> {{ loginResult }} </h1>
        <br>
        <span>Pas encore inscrit ? </span>
        <a href="/SignUp">S'inscrire</a>
    </div>
</template>

<script>
    class formData {
        constructor(email, password) {
            this.email=email
            this.password=password
        }
    }
    export default {
        data() {
            return {
                user : '',
                loginResult : ''
            }
        },
        methods:{
            login(){
                var logData = new formData(
                    document.querySelector("input[name=email]").value, 
                    document.querySelector("input[name=password]").value
                )
                console.log(logData)

                fetch('http://localhost:5000/SignIn',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method:'POST',
                    body: JSON.stringify({logAttempt : logData})
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.result)
                    this.loginResult = data.result
                })

            }
        }
    }
</script>