<template>
</template>

<script>
    export default {
        name: "PriceSetArchive",
        mounted() {
            this.renderData()
        },
        methods: {
            renderData(){
                this.$http.put("/price/set/"+this.$route.params.id+"/archive",
                    {

                    })
                    .then(response => {
                        console.log(response,'Success')
                        this.$router.push('/price/set');
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e.errors
                    });
            },
        },
    }
</script>
