<template>
    <form class="form">
        <div class="email-section input-section">
            <input v-model="email" type="email" id="email" autocomplete="off" required @change="onChange"/> 
            <label class="label-email input-label">
                <span class="content-email input-content"> Email </span>
            </label>
        </div>
        <div class="username-section input-section">
            <input v-model="username" type="text" id="username" required  @change="onChange"/>
            <label class="label-username input-label">
                <span class="content-username input-content"> Username </span>
            </label>    
        </div>
        <div class="password-section input-section">
            <input v-model="password" type="password" id="password" required  @change="onChange" minlength="6"/>
            <label class="label-password input-label">
                <span class="content-password input-content"> Password <small> (At least 6 characters) </small> </span>
            </label>    
        </div>
        <button @click="signUp" type="button">Create account</button>
    </form>
</template>

<script>

    import firebase from 'firebase';

    export default {
        name: "SignUpForm",
        data() {
            return {
                email: '',
                password: '',
                username: '',
            }
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        firebase.database().ref('Users/' + user.user.uid).set({
                            Username: this.username
                        });
                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Oh noes! ' + err.message)
                    }
                )
            },
            onChange: function(event) {
                var input = event.target;
                var inputParent = input.parentNode;
                var valid = input.checkValidity();
                var inputValue = input.value;
                if (!valid) {
                    inputParent.classList.add("invalid");
                } else {
                    inputParent.classList.remove("invalid");
                }
                if (inputValue) {
                    inputParent.classList.add("empty");
                } else {
                    inputParent.classList.remove("empty");
                }
            }
        }
        
    }

</script>

<style scoped>
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
        width: 180px;
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

    .invalid input + .input-label .input-content {
        color: #ff3333;
    }

    .empty input + .input-label .input-content {
        transform: translateY(-150%);
        font-size: 14px;
    }

    .input-section input:focus + .input-label:after,
    .input-section input:valid + .input-label:after,
    .invalid input:focus + .input-label:after {
        border-color: rgb(79,192,141);
        transform: translateX(0%);
    }

    .invalid input + .input-label:after {
        transform: translateX(0%);
        border-color: #ff3333;
    }

</style>