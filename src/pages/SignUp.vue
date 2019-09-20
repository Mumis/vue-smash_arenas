<template>
    <div class="wrapper">
        <img src="../assets/Logo.svg" class="logo"/>
        <SignUpForm />
    </div>
</template>

<script>

    import SignUpForm from '../components/SignUpForm';

    export default {
        name: "Signup",
        components: {
            SignUpForm
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