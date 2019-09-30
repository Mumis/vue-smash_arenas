<template>
    <div class="chat-wrapper">
        <ul>
            <li v-for="id in messages" v-bind:key="id.key">
                <div v-if="id">
                    <span class="username"> {{id.Username}}: </span> {{id.Message}} 
                </div> 
            </li>
        </ul>
        <div class="input">
            <input type="text" v-model="newMessage"/>
            <button @click="sendMessage"> Send </button>
        </div>

    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'Chat',
        data() {
            return {
                username: "",
                userId: firebase.auth().currentUser.uid,
                newMessage: "",
            }
        },
        props: {
            messages: {
                required: true
            },
            lobbyRegion: {
                required: true
            },
            lobbyKey: {
                required: true
            }
        },
        methods: {
            sendMessage: function() {
                if (this.newMessage !== "") {
                    firebase.database().ref('Users/' + this.userId + '/Username').once('value', snapshot => {
                        this.username = snapshot.val();
                    }).then(() => {
                        var key = firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey + '/Messages/').push().key;
                        firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey + '/Messages/' + key).set({
                            Message: this.newMessage,
                            Timestamp: Date.now(),
                            Username: this.username
                        });
                        this.newMessage = "";
                    });
                }
            },
        },
    };
</script>

<style scoped>
    .chat-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-height: 400px;
        background-color: white;
        border: solid 1px;
        width: 100%;
    }

    .chat-inner-wrapper {
    }

    ul {
        padding: 5px;
        flex: 1;
        overflow-wrap: break-word;
        overflow-y: auto;
        list-style-type: none;
        text-align: left;
    }

    .username {
        color: red;
    }

    .input {
        display: flex;

    }

    input {
        flex: 1;
        font-size: 15px;
        padding: 5px;
        width: 100%;
        height: 35px;
        border: none;
        border-top: 1px solid;
        outline: none;
    }

    button {
        height: 35px;
        width: 60px;
        background-color: #2c3e50;
        color: white;
        border: none;
        outline: none;
    }

</style>