<template>
    <div class="wrapper">
        <Header/>

        <div class="header">
            <select v-model="region" @change="onChange">
                <option value="Europe">Europe</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
            </select>
            <router-link to="/createlobby">
                <button>New lobby</button>
            </router-link>
        </div>
        <LobbyList :lobbies="lobbies" :region="region"/>

        <Footer />
    </div>
</template>

<script>
    import firebase from 'firebase'
    import Header from '../components/Header'
    import LobbyList from '../components/LobbyList'
    import Footer from '../components/Footer'

    export default {
        name: "Home",
        data() {
            return {
                region: 'Europe',
                games: [],
                lobbies: false
            }
        },
        components: {
            Header,
            LobbyList,
            Footer
        },
        created() {
            firebase.database().ref("Lobbies/" + this.region).once('value', (snapshot) => {
                this.lobbies = snapshot.val();
            });
        },
        mounted() {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref("Users/" + userId + "/Lobby").once("value", snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const lobbyId = Object.values(data)[0];
                    const lobbyRegion = Object.keys(data)[0];
                    firebase.database().ref("Users/" + userId + "/Lobby").remove();
                    firebase.database().ref("Lobbies/" + lobbyRegion + "/" + lobbyId + "/Players/" + userId).remove();
                }
            });
        },
            // var inAGame;
            // var lobbyId;
            // var lobbyRegion;
            // var playersLeft;

            // firebase.database().ref("Users/" + userId + "/Lobby").once("value", snapshot => {
            //     inAGame = snapshot.exists();
            //     if (inAGame) {
            //         var data = snapshot.val();
            //         lobbyId = Object.values(data)[0];
            //         lobbyRegion = Object.keys(data)[0];
            //     }
            // }).then(() => {
            //     if (inAGame) {
            //         firebase.database().ref("Lobbies/" + lobbyRegion + "/" + lobbyId + "/Players").once("value", snapshot => {
            //             var data = snapshot.val();
            //             playersLeft = Object.keys(data);
            //         }).then(() => {
            //             if (playersLeft.length < 2) {
            //                 firebase.database().ref("Lobbies/" + lobbyRegion + "/" + lobbyId).remove();
            //             }
            //             firebase.database().ref("Lobbies/" + lobbyRegion + "/" + lobbyId + "/Players/" + userId).remove();
            //             firebase.database().ref("Users/" + userId + "/Lobby").remove();
            //         });
            //     }
            // });
        methods: {
            onChange: function() {
                firebase.database().ref("Lobbies/" + this.region).once('value', (snapshot) => {
                    this.lobbies = snapshot.val();
                });
            },
        },  
    };
</script>

<style scoped>
    .wrapper {
        position: relative;
        display: flex;
        padding: 0 10px;
        min-height: 100vh;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .logo {
        max-height: 150px;
        margin: 15px 0;
        padding: 15px 0;
        border-bottom: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
    }

    .header {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        width: 100%;
        margin-bottom: 15px;
    }

    button, select {
        font-size: 16px;
        height: 40px;
        padding: 0 15px;
        background-color: white;
        border: 1px solid #2c3e50;
        color: #2c3e50;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }

    button {
        background-color: #2c3e50;
        color: white;
        border: none;
    }


</style>