<template>
    <div class="wrapper">
        <Header :addition="data.LobbyName"/>
        <div v-if="!data"> {{err}} </div>
        <div v-else  class="inner-wrapper">
            <div>
                <p> ID : {{data.ArenaId}} </p>
                <p> PASSWORD : {{data.ArenaPassword}} </p>
            </div>
            <Chat :messages="data.Messages" :lobbyRegion="lobbyRegion" :lobbyKey="lobbyKey"/>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Chat from '../components/Chat'
    import firebase from 'firebase'

    export default {
        name: "Lobby",
        components: {
            Header,
            Chat
        },
        data() {
            return {
                userId: firebase.auth().currentUser.uid,
                lobbyRegion: "",
                lobbyKey: "",
                data: {},
                err: "Ugh... Join a lobby before you go here."
            }
        },
        methods: {
            startListener() {
                firebase.database().ref('Users/' + this.userId + '/Lobby').once('value', snapshot => {
                    if (snapshot.exists()) {
                        var data = snapshot.val();
                        this.lobbyKey = Object.values(data)[0];
                        this.lobbyRegion = Object.keys(data)[0];
                        firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey).on('value', snapshot => {
                            this.data = snapshot.val();
                        });
                    } else {
                        this.data = null;
                    }
                })
            },
            destroyListener() {
                firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey).off();
            }
        },
        mounted() {
            this.startListener();
        },
        destroyed() {
            this.destroyListener();
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }

    .inner-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 800px;
        width: 100%;
        text-align: center;
    }

    .inner-wrapper p {
        margin: 30px 0;
    }
</style>