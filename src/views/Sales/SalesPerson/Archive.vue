<template>
</template>

<script>
    export default {
        name: "SalesPersonArchive",
        mounted() {
            this.renderData()
        },
        methods: {
            renderData(){
                this.$http.put("/sales/person/"+this.$route.params.id+"/archive",
                    {

                    })
                    .then(response => {
                        console.log(response,'Success')
                        this.$router.push('/sales/person');
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e.errors
                    });
            },
        },
    }
</script>