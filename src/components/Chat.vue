<template>
    <div class="chat-wrapper">
        <ul>
            <li v-for="id in messages" v-bind:key="id.key">
                <div v-if="id">
                    <p class="username">
                        <span>{{id.Username}}</span>
                        <small>{{getTime(id.Timestamp)}}</small>
                    </p> 
                    {{id.Message}} 
                </div> 
            </li>
        </ul>
        <div class="input">
            <input type="text" v-model="newMessage"/>
            <button @click="sendMessage"> <i class="fas fa-angle-right"></i> </button>
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
            getTime: function(timestamp) {
                var date = new Date(timestamp);
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var time = hours + ":" + minutes + ":" + seconds

                return time
            }
        },
    };
</script>

<style scoped>
    .chat-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: white;
        border: solid 1px;
        max-height: 100%;
        width: 100%;
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 5px;
        flex: 1;
        overflow-wrap: break-word;
        overflow-y: auto;
        list-style-type: none;
        text-align: left;
    }

    li {
        margin: 4px 0;
    }

    .username {
        font-weight: bold;
        color: #2c3e50;
    }

    small {
        margin-left: 5px;
        font-weight: normal;
    }

    .input {
        display: flex;

    }

    input {
        flex: 1;
        font-size: 15px;
        padding: 5px;
        width: 100%;
        height: 60px;
        border: none;
        border-top: 1px solid;
        outline: none;
    }

    button {
        width: 60px;
        font-size: 30px;
        background-color: white;
        color: #2c3e50;
        border: none;
        border-top: 1px solid;
        outline: none;
        cursor: pointer;
    }

</style>