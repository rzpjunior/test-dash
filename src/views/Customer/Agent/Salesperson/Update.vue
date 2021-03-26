<template>
    <v-container class="px-12">
        <v-row>
            <v-col>
                <SelectSalesPerson
                    name="salesperson"
                    v-model="salesperson"
                    @selected="salespersonSelected"
                    required
                    :sales_person="salesperson"
                    :error="error.salesperson_id"
                ></SelectSalesPerson>
            </v-col>
            <v-col>
            </v-col>
        </v-row>
        <v-row style="border-top: 1px solid #C8DDC8;">
            <v-col>
                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                    <v-btn 
                        rounded 
                        elevation="0" 
                        class="no-caps px-7" 
                        @click="$router.go(-1)"
                        style="background: #E6E9ED; color:#768F9C;height:45px"
                    >Cancel</v-btn>
                    <v-btn 
                        class="px-7 ml-2 no-caps white--text" 
                        @click="confirmButton()" 
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                    >Save</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: 'UpdateSalesperson',
        data () {
            return {
                form : {
                    salesperson_id : [],
                    prev_salesperson : ""
                },
                salesperson : null,
                error : {},
                ConfirmData : {}
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Salesperson",
                    text : "Are you sure want to Update this salesperson?",
                    urlApi : "/customer/agent/salesperson/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.$route.params.id,
                    data : this.form
                }
            },
            renderData(){
                this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    this.salespersonSelected(response.data.data[0].salesperson)
                    this.form.prev_salesperson = response.data.data[0].salesperson.display_name
                });
            },
            salespersonSelected(d) {
                this.salesperson = null;
                this.form.salesperson_id = '';
                if (d !== '' && d !== undefined) {
                    this.salesperson = d;
                    this.form.salesperson_id = d.id
                }
            },
        },
        created(){
            this.renderData()
        },
    }
</script>
