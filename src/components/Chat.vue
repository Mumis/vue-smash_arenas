<template>
    <section>
        <div class="chat-wrapper">
            <ul id="message-list">
                <li>
                    <div>
                        <p class="username notice">
                            <span>NOTICE</span>
                            <small>{{formatAMPM(new Date(Date.now()))}}</small>
                        </p>
                        <p>Do not share passwords or other sensitive information with anyone.</p>
                    </div>
                </li>
                <li v-if="arenaId && arenaPw">
                    <div>
                        <p class="username notice">
                            <span> ARENA INFORMATION </span>
                            <small>{{formatAMPM(new Date(Date.now()))}}</small>
                        </p>
                        <p> ID: {{arenaId}} PW: {{arenaPw}} </p>
                    </div>
                </li>
                <li v-for="id in messages" v-bind:key="id.key">
                    <div v-if="id.Timestamp >= joinTimestamp">
                        <p class="username">
                            <span>{{id.Username}}</span>
                            <small>{{formatAMPM(new Date(id.Timestamp))}}</small>
                        </p> 
                        <p>{{id.Message}}</p>
                    </div> 
                </li>
            </ul>
            <div class="input">
                <input type="text" v-model="newMessage" placeholder="Message" id="message-input"/>
                <button @click="sendMessage" id="message-btn"> <i class="fas fa-angle-right"></i> </button>
            </div>
        </div>
    </section>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'Chat',
        data() {
            return {
                joinTimestamp: Date.now(),
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
            },
            arenaId: {
                required: true
            },
            arenaPw: {
                required: true
            }
        },
        updated(){
            this.scrollToBottomOfChat();
        },
        mounted(){
            var input = document.getElementById("message-input");
            input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("message-btn").click();
            }
            });
        },
        methods: {
            sendMessage: function(event) {
                if (this.newMessage !== "") {
                    var messageSend = this.newMessage;
                    this.newMessage = "";
                    firebase.database().ref('Users/' + this.userId + '/Username').once('value', snapshot => {
                        this.username = snapshot.val();
                    }).then(() => {
                        var key = firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey + '/Messages/').push().key;
                        firebase.database().ref('Lobbies/' + this.lobbyRegion + '/' + this.lobbyKey + '/Messages/' + key).set({
                            Message: messageSend,
                            Timestamp: Date.now(),
                            Username: this.username
                        }).then(() => {
                        });
                    });
                }
                event.preventDefault();
            },
            formatAMPM: function(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0'+ minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            },
            scrollToBottomOfChat: function() {
                var chatElement = document.getElementById("message-list");
                chatElement.scrollTop = chatElement.scrollHeight;
            }
        },
    };
</script>

<style scoped>
    .notice {
        color: #f46060;
    }

    section {
        flex: 1;
        position: relative;
    }

    .chat-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        background-color: white;
        max-height: 100%;
        width: 100%;
    }

    ul {
        flex: 1;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        padding: 10px;
        overflow-wrap: break-word;
        list-style-type: none;
        text-align: left;
    }

    ul > :first-child {
        margin-top: auto !important;
    }

    p {
        margin: 10px 0;
    }

    .username {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
    }

    small {
        min-width: 60px;
        font-weight: normal;
    }

    .input {
        display: flex;
    }

    input {
        font-size: 15px;
        padding: 5px;
        width: 100%;
        height: 40px;
        border: none;
        border: 1px solid #2c3e50;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        outline: none;
        margin-left: 10px;
        margin-bottom: 15px;
    }

    button {
        height: 40px;
        width: 60px;
        font-size: 30px;
        background-color: white;
        color: #2c3e50;
        border: 1px solid;
        border-left: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        outline: none;
        cursor: pointer;
        margin-right: 10px;
    }
</style>