<template>
</template>

<script>
    export default {
        name: "SalesPersonUnarchive",
        mounted() {
            this.renderData()
        },
        methods: {
            renderData(){
                this.$http.put("/sales/person/"+this.$route.params.id+"/unarchive",
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