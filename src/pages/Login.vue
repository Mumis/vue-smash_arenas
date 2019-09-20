<template>
    <div class="wrapper">
        <img src="../assets/Logo.svg" class="logo"/>
        <LoginForm/>
    </div>
</template>

<script>

    import LoginForm from '../components/LoginForm';

    export default {
        name: 'Login',
        components: {
            LoginForm
        }
    }

</script>

<style scoped>
    .wrapper {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .logo {
        max-width: 400px;
        margin-bottom: 40px;
    }

</style>