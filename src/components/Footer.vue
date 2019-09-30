<template>
    <footer class="footer">
        <button @click="onClick"><i class="fas fa-sign-out-alt"></i></button>
        <div class="creator"> © Emil Wertwein 2019 </div>
    </footer>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'Footer',
        data() {
            return {
                }
        },
        methods: {
            onClick: function() {
                this.logOut()
                },
            logOut: function() {
                var user = firebase.auth().currentUser.uid;
                firebase.auth().signOut().then(() => {
                    firebase.database().ref('Presence/' + user).remove();
                    this.$router.replace('login');
                });
            }
        },
    };

</script>

<style scoped>
    .footer {
        display: flex;
        justify-content: space-between;
        align-content: center;
        position: absolute;
        bottom: 0;
        padding: 10px 20px;    
        width: 100%;
        text-align: center;
        border-top: 1px solid #2c3e50;;

    }

    button {
        font-size: 16px;
        height: 35px;
        padding: 0 15px;
        background-color: #ff3333;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }
    
    button i {
        transform: rotate(180deg);
    }

    .creator {
        display: flex;
        align-items: center;
    }

</style>