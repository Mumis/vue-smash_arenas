<template>
    <div class="wrapper">
        <img src="../assets/Logo.svg" class="logo"/>
        <form class="form">
            <div class="email-section input-section">
                <input v-model="email" type="text" id="email" autocomplete="off" required/> 
                <label class="label-email input-label">
                    <span class="content-email input-content"> Email </span>
                </label>
            </div>
            <div class="password-section input-section">
                <input v-model="password" type="password" id="password" required/>
                <label class="label-password input-label">
                    <span class="content-password input-content"> Password </span>
                </label>    
            </div>
            <small> Don't have an account? <router-link to="/signup"> Sign up.</router-link> </small>
            <button @click="login"> Sign in</button>    
        </form>
    </div>
</template>

<script>

    import firebase from 'firebase';

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Oh noes! ' + err.message)
                    }
                )
            }
        }
    }

</script>

<style scoped>
    .wrapper {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .logo {
        max-width: 400px;
        margin-bottom: 40px;
    }

    .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        width: 100%;
        padding: 15px;
        align-items: center;
    }

    .form button {
        font-size: 16px;
        margin-top: 20px;
        height: 40px;
        width: 150px;
        background-color: #2c3e50;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }

    .input-section {
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;
        width: 100%;
    }


    .input-section input {
        display: block;
        width: 100%;
        background-color: inherit;
        height: 50px;
        padding-top: 20px;
        border: none; 
        outline: none;
        font-size: 15px;
    }

    .input-section label {
        position: absolute;
        bottom: 0;
        left: 0%;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-bottom: 1px solid #2c3e50;
    }

    .input-section label:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        height: 100%;
        width: 100%;
        border-bottom: 3px solid rgb(79,192,141);
        transform: translateX(-100%);
        transition: all 0.3s ease;
    }

    .input-content {
        position: absolute;
        bottom: 5px;
        left: 0px;
        transition: all 0.3s ease;
    }

    .input-section input:focus + .input-label .input-content,
    .input-section input:valid + .input-label .input-content {
        transform: translateY(-150%);
        font-size: 14px;
        color: rgb(79,192,141);
    }

    .input-section input:focus + .input-label:after,
    .input-section input:valid + .input-label:after {
        transform: translateX(0%)
    }

</style>