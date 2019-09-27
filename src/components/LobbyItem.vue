<template>
    <div class="wrapper" @click="onClick(lobby)">
        <p class="lobby-name">{{lobby.LobbyName}}</p>
        <p><small>Connection type: {{lobby.Connection}}</small></p>
        <p><small>Skill level: {{lobby.Skill}}</small></p>
        <div class="players" :class= "{full: full}">
            {{players}} / {{maxPlayers}} <i class="fas fa-user"></i>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';

    export default {
        name: "LobbyItem",
        data() {
            return {
                players: "",
                maxPlayers: "",
                full: false
            }
        },
        props: {
            lobby: {
                required: true,
            },
            region: {
                required: true,
            },
        },
        methods: {
            getPlayers: function () {
                if (this.lobby.Players) {
                    this.players = Object.keys(this.lobby.Players).length;
                    this.maxPlayers = parseInt(this.lobby.MaxPlayers);
                }
                this.checkIfFull();
            },
            joinGame: function(lobby){       
                firebase.database().ref("Lobbies/" + this.region + "/" + lobby.Key + "/Players").once("value", snapshot => {
                    if(snapshot.exists()){
                        var data = snapshot.val(); 
                        this.players = Object.keys(data).length;
                        this.checkIfFull();
                        if (this.players < this.maxPlayers) {
                            var userId = firebase.auth().currentUser.uid;
                            firebase.database().ref("Users/" + userId).update({
                                Lobby: {
                                    [this.region]: lobby.Key
                                }
                            });
                            firebase.database().ref("Lobbies/" + this.region + "/" + lobby.Key + "/Players").update({
                                [userId]: true,
                            }).then(() => {
                                this.$router.replace('lobby')
                            });
                        }
                    }
                });
            },
            checkIfFull: function() {
                if (this.players >= this.maxPlayers) {
                    this.full = true;
                }
            },
            onClick: function(lobby) {
                this.joinGame(lobby)
            },
        },
        mounted() {
            this.getPlayers();
        },
    };

</script>

<style scoped>
    i {
        margin-left: 5px;
    }

    .lobby-name {
        border-bottom: 1px solid #2c3e50;
    }

    .wrapper {
        position: relative;
        max-width: 500px;
        width: 100%;
    }

    .players {
        background-color: rgb(219,236,236);
        position: absolute;
        top: 50%;
        right: 0;
    }

    .full {
        color: #ff3333;
    }

</style>