<template>
    <div>
        <img src="../assets/logo.svg" style="height:200px" alt="logo">
        <h1>PageOne</h1>
        <h3>Page d'identification</h3>
        <div>
            <button v-on:click="ShowSignIn()">Se connecter</button>
            <button v-on:click="ShowSignUp()">Cree un compte</button>
            <SignUp id="SignUp" class="hidden"/>
            <SignIn id="SignIn"/>
        </div>
        
    </div>
</template>

<script>
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
export default {
    name: 'UserIdentification',
    components: {
        SignIn,
        SignUp
    },
    methods: {
        enable(){
            console.log('click')
        },

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