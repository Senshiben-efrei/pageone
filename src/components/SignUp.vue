<template>
    <div>
        <h3>SIGNUP</h3>
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
    module.exports = {
        data() {
            return {
            }
        },
        methods: {
            addAccount (){
                var newData = new formData(
                    document.querySelector("input[name=firstname]").value, 
                    document.querySelector("input[name=lastname]").value, 
                    document.querySelector("input[name=email]").value, 
                    document.querySelector("input[name=password]").value
                )
                console.log(newData)

                fetch('http://192.168.1.15:5000/api/post',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method:'POST',
                    body: JSON.stringify({newAccount : newData})
                })
                .then(response => response.json())
                .then(function(data) {
                    console.log(data)
                    document.querySelector("input[name=firstname]").value = ''
                    document.querySelector("input[name=lastname]").value = ''
                    document.querySelector("input[name=email]").value = ''
                    document.querySelector("input[name=password]").value = ''
                })
            }
        }
    }
</script>