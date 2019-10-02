<template>
    <form class="form">
        <div class="lobbyName-section input-section">
            <input v-model="lobbyName" type="text" id="lobbyName" required />
            <label class="label-lobbyName input-label">
                <span class="content-lobbyName input-content"> Lobby name </span>
            </label>    
        </div>
        <div class="arenaId-section input-section">
            <input v-model="arenaId" type="text" id="arenaId" autocomplete="off" required/> 
            <label class="label-arenaId input-label">
                <span class="content-arenaId input-content"> Arena ID </span>
            </label>
        </div>
        <div class="arenaPassword-section input-section">
            <input v-model="arenaPassword" type="text" id="arenaPassword" required/>
            <label class="label-arenaPassword input-label">
                <span class="content-arenaPassword input-content"> Arena password </span>
            </label>    
        </div>
        <div class="select-section">
            <label> Skill level: </label>
            <select v-model="skill">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Pro">Pro</option>
            </select>
            <label> Max players: </label>
            <select v-model="players">
                <option value="2">2 players</option>
                <option value="3">3 players</option>
                <option value="4">4 players</option>
                <option value="5">5 players</option>
                <option value="6">6 players</option>             
            </select>

            <label> Region: </label>
            <select v-model="region">
                <option value="Europe">Europe</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
            </select>

            <label> Connection type: </label>
            <select v-model="connection">
                <option value="Cable">Ethernet cable</option>
                <option value="Wifi">Wifi</option>
            </select>

        </div>
        <button @click="createLobby" type="button">Create</button>
    </form>
</template>

<script>

    import firebase from 'firebase';

    export default {
        name: "CreateLobbyForm",
        data() {
            return {
                username: '',
                skill: 'Intermediate',
                region: 'Europe',
                players: "2",
                connection: 'Cable',
                arenaId: '',
                arenaPassword: '',
                lobbyName: '',
            }
        },
        methods: {
            createLobby: function() {
                var userId = firebase.auth().currentUser.uid;
                var key = firebase.database().ref("Lobbies/" + this.region).push().key;
                firebase.database().ref("Users/" + userId).update({
                    Lobby: {
                        [this.region]: key
                    },
                
                });
                firebase.database().ref('Users/' + userId + '/Username').once('value', snapshot => {
                    this.username = snapshot.val();
                }).then(() => {
                    firebase.database().ref("Lobbies/" + this.region + "/" + key).set({
                        Key: key,
                        Skill: this.skill,
                        LobbyName: this.lobbyName,
                        ArenaId: this.arenaId,
                        ArenaPassword: this.arenaPassword,
                        Connection: this.connection,
                        MaxPlayers: this.players,
                        Created: Date.now(),
                        Admin: userId,
                        Players: {
                            [userId]: {
                                Username: this.username,
                                Key: userId
                            }
                        },
                    }).then(() => {
                        this.$router.replace('lobby');
                    });
                });
            }, 
        },   
    };

</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        width: 100%;
        padding: 15px 0;
        align-items: center;
    }

    .form button {
        font-size: 16px;
        margin-top: 20px;
        height: 40px;
        width: 180px;
        background-color: #2c3e50;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }

    .input-section {
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;
        width: 100%;
    }


    .input-section input {
        display: block;
        width: 100%;
        background-color: inherit;
        height: 50px;
        padding-top: 20px;
        border: none; 
        outline: none;
        font-size: 15px;
    }

    .input-section label {
        position: absolute;
        bottom: 0;
        left: 0%;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-bottom: 1px solid #2c3e50;
    }

    .input-section label:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        height: 100%;
        width: 100%;
        border-bottom: 3px solid rgb(79,192,141);
        transform: translateX(-100%);
        transition: all 0.3s ease;
    }

    .input-content {
        position: absolute;
        bottom: 5px;
        left: 0px;
        transition: all 0.3s ease;
    }

    .input-section input:focus + .input-label .input-content,
    .input-section input:valid + .input-label .input-content {
        transform: translateY(-150%);
        font-size: 14px;
        color: rgb(79,192,141);
    }

    .input-section input:focus + .input-label:after,
    .input-section input:valid + .input-label:after {
        transform: translateX(0%)
    }

    .select-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        padding: 20px 0;

    }

    select {
        font-size: 16px;
        height: 40px;
        padding: 0 15px;
        background-color: white;
        border: 1px solid #2c3e50;
        color: #2c3e50;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
        margin-bottom: 10px;
    }
</style>