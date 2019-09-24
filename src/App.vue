<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'app',
		data() {
			return {
				userId: firebase.auth().currentUser.uid,
				inAGame: false,
				lobbyId: "",
				lobbyRegion: "",
				playersLeft: "",
			}
		},
		created() {
			firebase.database().ref("Users/" + this.userId + "/Lobby").once("value", snapshot => {
				this.inAGame = snapshot.exists();
				if (this.inAGame) {
					var data = snapshot.val();
					this.lobbyId = Object.values(data)[0];
					this.lobbyRegion = Object.keys(data)[0];
				}
			}).then(() => {
				if (this.inAGame) {
					firebase.database().ref("Lobbies/" + this.lobbyRegion + "/" + this.lobbyId + "/Players").once("value", snapshot => {
						var data = snapshot.val();
						this.playersLeft = Object.keys(data);
					}).then(() => {
						if (this.playersLeft.length < 2) {
							firebase.database().ref("Lobbies/" + this.lobbyRegion + "/" + this.lobbyId).onDisconnect().remove();
						}
						firebase.database().ref("Lobbies/" + this.lobbyRegion + "/" + this.lobbyId + "/Players/" + this.userId).onDisconnect().remove();
						firebase.database().ref("Users/" + this.userId + "/Lobby").onDisconnect().remove();
					});
				}
			});
		},
	}
		
			
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    background-color: rgb(219,236,236);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: rgb(79,192,141);
  }

  small {
    font-size: 14px;
  }

</style>
