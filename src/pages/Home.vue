<template>
    <div class="wrapper">
        <Header :addition="'Lobbies'"/>
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
                lobbies: null
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
                this.destroyListener();
                this.startListener();
            },
            startListener: function() {
                firebase.database().ref('Lobbies/' + this.region).on('value', snapshot => {
                    if (snapshot.exists()) {
                        var data = snapshot.val();
                        this.lobbies = this.reverseObject(data);
                    } else {
                        this.lobbies = null;
                    }
                });
            },
            destroyListener: function() {
                firebase.database().ref('Lobbies' + this.region).off();
            },
            reverseObject: function(object) {
                var newObject = {};
                var keys = [];

                for (var key in object) {
                    keys.push(key);
                }

                for (var i = keys.length - 1; i >= 0; i--) {
                    var value = object[keys[i]];
                    newObject[keys[i]]= value;
                }
                
                return newObject;
            }
        },  
    };
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
    }

    .inner-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 0 10px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        width: 100%;
        margin: 15px 0;
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