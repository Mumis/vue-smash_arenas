<template>
    <div class="wrapper">
        <p class="lobby-name">{{lobby.LobbyName}}</p>
        <p><small>Connection type: {{lobby.Connection}}</small></p>
        <p><small>Skill level: {{lobby.Skill}}</small></p>
        <div class="players">
            {{players}} / {{lobby.MaxPlayers}} <i class="fas fa-user"></i>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';

    export default {
        name: "LobbyItem",
        data() {
            return {
                players: ""
            }
        },
        props: {
            lobby: {
                required: true,
            },
        },
        methods: {
            getPlayers: function () {
                if (this.lobby.Players) {
                    this.players = Object.keys(this.lobby.Players).length;
                }
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

</style>