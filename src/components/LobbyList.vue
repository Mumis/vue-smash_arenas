<template>
    <ul>
        <div v-if="!lobbies" class="none-available">
            <p> No lobbies available right now 😢 </p>
            <p> Try creating one! </p>
        </div>
        <li v-for="lobby in lobbies" v-bind:key="lobby.Key">
            <LobbyItem v-if="lobby" :lobby="lobby" :region="region"/>
        </li>
    </ul>
</template>

<script>

    import LobbyItem from './LobbyItem';

    export default {
        name: "LobbyList",
        props: {
            lobbies: {
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
    };

</script>

<style scoped>

    ul {
        max-width: 800px;
        width: 100%;
        list-style-type: none;
        margin-bottom: 100px;
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

    .none-available {
        width: 100%;
        text-align: center;
        padding-top: 60px;
    }

</style>