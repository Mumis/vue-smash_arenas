<template>
    <ul>
        <li v-for="lobby in lobbies" v-bind:key="lobby.key" @click="reset(lobby.Key)">
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
            reset: function(key) {
                var userId = firebase.auth().currentUser.uid;
                var currentGame
                firebase.database().ref("Users/" + uid + "/Game").once('value', snapshot => {
                    currentGame = snapshot.val();
                }).then(() => {
                    if (currentGame) {
                    }
                });
            },
            // join: function(key) {
            //     firebase.database().ref("Users/" + userId).update({
            //         Game: key,
            //     });
            //     firebase.database().ref("Lobbies/" + this.region + "/" + key + "/Players").update({
            //         [userId]: true,
            //     });
            // },
        },
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