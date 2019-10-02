<template>
    <header @click="onClick">
        <div class="logo">
            <span :class="{'lowlight': addition}"> ARENA FINDER </span>
            <span v-if="addition" class="lowlight"> / </span>
            <span v-if="addition">{{addition.slice(0,25)}}<span v-if="addition.length > 25">...</span> </span>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                }
        },
        props: ['addition'],
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
    .lowlight {
        color: #486583;
    }

    header {
        font-weight:400;
        width: 100%;
        font-size: 20px;
        padding: 15px 0;
        background-color: #303E4D;
        cursor: pointer;
        text-align: center;
    }

    .logo {
        margin: 0 auto;
        padding: 0 60px;
        position: relative;
        max-width: 800px;
        width: 100%;
        color: white;
    }

    img {
        position: absolute;
        height: 40px;
        color: white;
        transform: translateY(-50%);
        top: 50%;
        left: 15px;
    }
</style>