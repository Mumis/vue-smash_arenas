<template>
    <footer class="footer">
        <div class="wrapper">
            <button @click="onClick"><i class="fas fa-sign-out-alt"></i></button>
            <div class="creator"> <a href="https://twitter.com/wertwein" target="_blank" rel="noopener noreferrer">Twitter</a> <a href="https://github.com/Mumis" target="_blank" rel="noopener noreferrer">Github</a>  </div>
        </div>
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
        justify-content: center;
        padding: 10px;    
        width: 100%;

    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        align-content: center;
        max-width: 800px;
        width: 100%;
        text-align: center;
    }

    button {
        font-size: 16px;
        height: 35px;
        padding: 0 15px;
        background-color: #f46060;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }

    button:hover {
        background-color: #db5656;
    }
    
    button i {
        transform: rotate(180deg);
    }

    .creator {
        display: flex;
        align-items: flex-end;
    }

    a {
        margin-left: 20px;
    }
</style>