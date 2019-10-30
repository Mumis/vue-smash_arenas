<template>
    <div class="wrapper">
        <div class="err" v-if="!data">
            <Header />
            <p>{{err}}</p>
        </div>
        <div v-else  class="inner-wrapper">
            <LobbyTools :lobbyName="data.LobbyName" :arenaId="data.ArenaId" :arenaPw="data.ArenaPassword" :users="data.Players" :admin="data.Admin" :lobbyRegion="lobbyRegion" :lobbyKey="lobbyKey"/>
            <Chat :messages="data.Messages" :lobbyRegion="lobbyRegion" :lobbyKey="lobbyKey" :arenaId="data.ArenaId" :arenaPw="data.ArenaPassword"/>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Chat from '../components/Chat'
    import LobbyTools from '../components/LobbyTools'
    import firebase from 'firebase'

    export default {
        name: "Lobby",
        components: {
            Header,
            Chat,
            LobbyTools
        },
        data() {
            return {
                userId: firebase.auth().currentUser.uid,
                lobbyRegion: "",
                lobbyKey: "",
                data: null,
                err: "Oops.. looks like you've been kicked 🤔"
            }
        },
        methods: {
            startListeners() {
                firebase.database().ref('Users/' + this.userId + '/Lobby').on('value', snapshot => {
                    if (snapshot.exists()) {
                        var data = snapshot.val();
                        this.lobbyKey = Object.values(data)[0];
                        this.lobbyRegion = Object.keys(data)[0];
                        firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey).on('value', snapshot => {
                            this.data = snapshot.val();
                        });
                    } else {
                        this.destroyListeners();
                        this.data = null;
                    }
                })
            },
            destroyListeners() {
                firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey).off();
                firebase.database().ref('Users/' + this.userId + '/Lobby').off();
            }
        },
        mounted() {
            this.startListeners();
        },
        destroyed() {
            this.destroyListeners();
        }
    }
</script>

<style scoped>
    .err {
        width: 100%;
        height: 100%;
    }

    .err p {
        margin: 30px 5px;
        text-align: center;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        max-height: 100vh;
    }

    .inner-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        width: 100%;
        text-align: center;
    }

    .inner-wrapper p {
        margin: 30px 0;
    }
</style>