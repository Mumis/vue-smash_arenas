<template>
    <ul>
        <div v-if="!lobbies" class="none-available">
            <p> No lobbies available right now 😢 </p>
            <p> Try creating one! </p>
        </div>
        <li v-else v-for="lobby in lobbies" v-bind:key="lobby.Key">
            <LobbyItem :lobby="lobby" :region="region"/>
        </li>
    </ul>
</template>

<script>
    import LobbyItem from './LobbyItem'

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
        flex: 1;
        max-width: 800px;
        width: 100%;
        list-style-type: none;
    }

    li {
        padding: 7px 0;
        display: flex;
        justify-content: center;
        background: inherit;
        border-bottom: 1px solid;
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