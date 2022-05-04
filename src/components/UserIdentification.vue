<template>
    <div>
        <img src="../assets/loading.svg" style="height:200px" alt="logo">
        <h1>PageOne</h1>
        <h3>Page d'identification</h3>
        <button v-on:click="ShowSignIn()">Se connecter</button>
        <button v-on:click="ShowSignUp()">Cree un compte</button>
        <div>
            <SignUp id="SignUp" class="hidden"/>
            <SignIn id="SignIn"/>
        </div>
        
    </div>
</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'
export default {
    name: 'UserIdentification',
    components: {
        SignIn,
        SignUp
    },
    methods: {
        ShowSignIn() {
            var Up = document.getElementById("SignUp");
            var In = document.getElementById("SignIn");
            Up.style.display = "none";
            In.style.display = "block";
        },

        ShowSignUp() {
            var Up = document.getElementById("SignUp");
            var In = document.getElementById("SignIn");
            Up.style.display = "block";
            In.style.display = "none";
        }
    }
}
</script>