<template>
    <div class="wrapper">
        <Header :addition="'Lobby creation'"/>
        <div class="inner-wrapper">
            <CreateLobbyForm/>
        </div>
    </div>
</template>

<script>

    import Header from '../components/Header'
    import CreateLobbyForm from '../components/CreateLobbyForm'

    export default {
        name: 'CreateLobby',
        components: {
            Header,
            CreateLobbyForm
        }
    }

</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .inner-wrapper {
        display: flex;
        flex: 1;
        padding: 0 10px;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }
</style>