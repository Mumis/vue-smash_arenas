<template>
    <img src="../assets/Logo.svg" class="logo" @click="onClick"/>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'Header',
        data() {
            return {
            }
        },
        methods: {
            onClick: function() {
                if (this.$route.path !== "/home") {
                    this.$router.replace('home');
                }
            },
        },
    };

</script>

<style scoped>
    .logo {
        max-height: 150px;
        margin: 15px 0;
        padding: 15px 0;
        border-bottom: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
        cursor: pointer;
    }


</style>