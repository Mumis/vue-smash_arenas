<template>
    <div class="wrapper">
        <Header/>
        <div class="inner-wrapper"> 
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
        </div>
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
        mounted() {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref("Users/" + userId + "/Lobby").once("value", snapshot => {
                if (snapshot.exists()) {
                    firebase.database().ref("Users/" + userId + "/Lobby").remove();
                }
            });
            this.startListener();
        },
        destroyed() {
            this.destroyListener();
        },
        methods: {
            onChange: function() {
                firebase.database().ref("Lobbies/" + this.region).once('value', (snapshot) => {
                    this.lobbies = snapshot.val();
                });
            },
            startListener: function() {
                firebase.database().ref('Lobbies/' + this.region + "/").on('value', snapshot => {
                    this.lobbies = snapshot.val();
                });
            },
            destroyListener: function() {
                firebase.database().ref('Lobbies' + this.region).off();
            }
        },  
    };
</script>

<style scoped>
    .wrapper {
        min-height: 100vh;
        width: 100%;
    }

    .inner-wrapper {
        position: relative;
        padding: 0 10px;
        display: flex;
        align-items: center;
        flex-direction: column;

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