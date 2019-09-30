<template>
    <div class="wrapper">
        <Header/>
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
        min-height: 100vh;
    }

    .inner-wrapper {
        display: flex;
        padding: 0 10px;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
</style>