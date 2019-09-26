<template>
    <div class="footer"> © Emil Wertwein 2019 </div>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                }
        },
    };

</script>

<style scoped>
    .footer {
        position: absolute;
        bottom: 0;
        padding: 10px 0;    
        margin: 10px 0;
        width: 100%;
        text-align: center;
        border-top: 1px solid;
        border-image-source: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(150,159,168,0) 10%,rgba(44,62,80,1) 50%,rgba(150,159,168,0) 90%,rgba(255,255,255,0) 100%);
        border-image-slice: 1;
    }

</style>