<template>
    <aside id="aside-wrapper">
        <div id="aside-content">
            <div class="menu-toggle" @click="toggleMenu"><span></span><span></span><span></span></div>
            <div class="top">
                <h3> {{lobbyName}} </h3>

                <div class="info">
                    <p> ARENA ID: </p>
                    <h3> {{arenaId}} </h3>
                    <p> ARENA PASSWORD: </p>
                    <h3> {{arenaPw}} </h3>
                </div>

                <div class="users">
                    <p> USERS: </p>
                    <ul>
                        <li v-for="user in users" v-bind:key="user.key">
                            <h3 class="user">{{user.Username}}<span v-if="user.Username === username">(You)</span>
                            <button v-else-if="userId === admin" @click="kickPlayer(user.Key)"> <i class="fas fa-skull"></i> </button>
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="leave" @click="leaveLobby"> Leave lobby </button>
        </div>
        <div class="menu-background" @click="toggleMenu"> </div>
    </aside>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'LobbyTools',
        data() {
            return {
                username: "",
                userId: firebase.auth().currentUser.uid,
            }
        },
        props: ["lobbyName", "arenaId", "arenaPw", "users", "admin", "lobbyKey", "lobbyRegion"],
        methods: {
            kickPlayer: function(userId) {
                firebase.database().ref("Users/" + userId + "/Lobby").remove();
            },
            leaveLobby: function() {
                this.$router.replace("home");
            },
            toggleMenu: function() {
                var aside = document.getElementById("aside-content");
                aside.classList.toggle("show");
            }
        },
        created() {
            firebase.database().ref('Users/' + this.userId + '/Username').once('value', snapshot => {
                this.username = snapshot.val();
            });
        }
    };
</script>

<style scoped>
    .menu-toggle {
        display: none;
        position: absolute;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        height: 50px;
        width: 15px;
        padding: 10px 0;
        background-color: #303E4D;
        opacity: .8;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: .2s;
        cursor: pointer;
    }

    .menu-toggle span {
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background-color: white;
    }

    aside {
        text-align: left;
        color: #9da3ab;
        pointer-events: none;
    }

    #aside-content {
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #303E4D;
        width: 250px;
        height: 100%;
        font-size: 15px;
        padding: 15px;
        transition: .2s;
        pointer-events: all;
    }

    .menu-background {
        position: absolute;
        visibility: hidden;
        top: 0;
        z-index: 9998;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.0);
        transition: .2s;
        pointer-events: all;
    }

    .top > * {
        margin-bottom: 50px;
    }

    h3 {
        color: white;
        font-weight: normal;
        overflow-wrap: break-word
    }

    ul {
        list-style-type: none;
    }

    .user {
        display: flex;
        justify-content: space-between;
    }

    button {
        background-color: inherit;
        border: none;
        cursor: pointer;
        outline: none;
    }
    
    .leave {
        margin: 0 auto;
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        background-color: #f46060;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }

    .leave:hover {
        background-color: #db5656;
    }

    i {
        color: #9da3ab;
        font-size: 15px;
    }

    button:hover i {
        color: white;
    }

    @media screen and (max-width: 680px) {
        #aside-content {
            display: flex !important;
            position: absolute;
            left: -70%;
            width: 70%;
        }

        .menu-toggle {
            display: flex;
        }

        .show .menu-toggle {
            opacity: 0;
        }

        .show + .menu-background {
            visibility: visible;
            background-color: rgba(0,0,0,0.3);
        }

        .show {
            left: 0 !important;
        }
    }
</style>