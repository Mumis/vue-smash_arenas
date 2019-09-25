<template>
    <div class="wrapper">
        <Header/>
        <CreateLobbyForm/>
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
        padding: 0 10px;
        min-height: 100vh;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .logo {
        max-height: 150px;
        margin: 15px 0;
        padding: 15px 0;
        border-bottom: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
    }

</style>