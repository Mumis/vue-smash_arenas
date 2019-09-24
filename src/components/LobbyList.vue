<template>
    <ul>
        <li v-for="lobby in lobbies" v-bind:key="lobby.key" @click="Onclick(lobby.Key)">
            <LobbyItem v-if="lobby" :lobby="lobby"/>
        </li>
    </ul>
</template>

<script>

    import firebase from 'firebase';
    import LobbyItem from './LobbyItem';

    export default {
        name: "LobbyList",
        props: {
            lobbies: {
                type: Object,
                required: true,
            },
            region: {
                type: String,
                required: true
            }
        },
        components: {
            LobbyItem,
        },
        methods: {
            resetUserGame: function(callback, key) {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref("Users/" + userId + "/Lobby").once("value", snapshot => {
                    if (snapshot.exists()) {
                        var data = snapshot.val();
                        var lobbyId = Object.values(data)[0];
                        var lobbyRegion = Object.keys(data)[0];
                        firebase.database().ref("Lobbies/" + lobbyRegion + "/" + lobbyId + "/Players/" + userId).remove().then(() => {
                            firebase.database().ref("Users/" + userId + "/Lobby").remove().then(() => {
                                if (callback) {
                                    callback(key);
                                }   
                            });
                        });
                    } else {
                        if (callback) {
                            callback(key);
                        }
                    }
                });
            },
            joinGame: function(key){
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref("Users/" + userId).update({
                    Lobby: {
                        [this.region]: key
                    }
                }).then(() => {
                    firebase.database().ref("Lobbies/" + this.region + "/" + key + "/Players").update({
                        [userId]: true,
                    }).then(() => {
                        this.$router.replace('lobby')
                    });
                });
            },
            Onclick: function(key) {
                this.resetUserGame(this.joinGame, key);
            },
        },
        mounted: function() {
            this.resetUserGame()
        }
    };

</script>

<style scoped>

    ul {
        max-width: 800px;
        width: 100%;
        list-style-type: none;
    }

    li {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        background: inherit;
        }

    li:hover {
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,.1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        cursor: pointer;
    }

</style>