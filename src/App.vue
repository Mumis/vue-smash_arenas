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
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					firebase.database().ref('.info/connected').on('value', snapshot => {
						if (snapshot.val()) {
							firebase.database().ref('Presence/' + firebase.auth().currentUser.uid).onDisconnect().remove();
							firebase.database().ref('Presence/' + firebase.auth().currentUser.uid).set(true);
						}
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
