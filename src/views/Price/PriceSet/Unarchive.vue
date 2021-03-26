<template>
</template>

<script>
    export default {
        name: "PriceSetUnarchive",
        mounted() {
            this.renderData()
        },
        methods: {
            renderData(){
                this.$http.put("/price/set/"+this.$route.params.id+"/unarchive",
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
