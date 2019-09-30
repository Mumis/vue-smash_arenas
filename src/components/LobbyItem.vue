<template>
    <div class="wrapper" @click="onClick(lobby)">
        <p class="lobby-name">{{lobby.LobbyName}} </p>
        <div class="lobby-info">
            <p>
                <small class="connection" :class="[{'green' : lobby.Connection == 'Cable'},
                {'red' : lobby.Connection == 'Wifi'}]">
                    {{lobby.Connection}}
                    <span> Connection type </span>
                </small>
            </p>
            <p>
                <small class="skill" 
                :class="[{'green' : lobby.Skill == 'Beginner'},
                {'yellow' : lobby.Skill == 'Intermediate'},
                {'red' : lobby.Skill == 'Pro'}]">
                    {{lobby.Skill}} 
                    <span> Skill level </span>
                </small>
            </p>
        </div>
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

    .green {
        background-color: #83b582;
    }

    .yellow {
        background-color: #f3d179;
    }

    .red {
        background-color: #f46060;
    }


    i {
        margin-left: 5px;
    }

    .lobby-name {
        margin-bottom: 10px;
    }

    .lobby-info p {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 5px;
    }

    small {
        min-width: 100px;
        position: relative;
        font-size: 12px;
        color: white;
        padding: 5px;
        border-radius: 3px;
    }

    small span {
        display: none;
        color: #2c3e50;
        width: 100px;
        position: absolute;
        left: 0;
        bottom: -18px;
    }

    small span:hover {
        display: none;
    }

    small span:before {
        content: "content";
    }

    .wrapper {
        position: relative;
        width: 100%;
    }

    .players {
        background-color: rgb(219,236,236);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
    }

    .full {
        color: #f46060;
    }

</style>