<template>
    <Header/>
</template>

<script>

    import Header from '../components/Header'

    export default {
        name: "Lobby",
        components: {
            Header,
        },
        data() {
            return {
            }
        },
        methods: {
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

</style>