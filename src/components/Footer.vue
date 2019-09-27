<template>
    <footer class="footer">
        <button @click="onClick">Sign out</button>
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
        border-top: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
    }

    button {
        font-size: 16px;
        height: 35px;
        padding: 0 15px;
        background-color: #2c3e50;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }

    .creator {
        display: flex;
        align-items: center;
    }

</style>