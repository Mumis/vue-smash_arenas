<template>
    <div class="logo" @click="onClick"> ARENA FINDER </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                }
        },
        methods: {
            redirectToHome: function() {
                if (this.$route.path !== "/home") {
                    this.$router.replace('home');
                }
            },
            onClick: function() {
                this.redirectToHome();
            },
        },
    };
</script>

<style scoped>
    .logo {
        width: 100%;
        font-size: 20px;
        margin-bottom: 15px;
        padding: 15px 0;
        background-color: #2c3e50;
        color: white;
        cursor: pointer;
        text-align: center;
        box-shadow: 0px -4px 15px 0px rgba(0,0,0,0.75);
    }
</style>