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

    .logo {
        max-height: 150px;
        margin: 15px 0;
        padding: 15px 0;
        border-bottom: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
    }

    .header {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        width: 100%;
    }

    button, select {
        font-size: 16px;
        height: 40px;
        padding: 0 15px;
        background-color: white;
        border: 1px solid #2c3e50;
        color: #2c3e50;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
    }

    button {
        background-color: #2c3e50;
        color: white;
        border: none;
    }


</style>