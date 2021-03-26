<template>
    <v-container class="px-12">
        <v-row>
            <v-col>
                <SelectCustomerTag
                    name="customer_tag"
                    v-model="customerTag"
                    :norequired="true"
                    :watchCustomerTag="customerTag"
                    @selected="customerTagSelected"
                    :error="error.tag_customer"
                ></SelectCustomerTag>
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
        name: 'UpdateCustomerTag',
        data () {
            return {
                form : {
                    tag_customer : [],
                },
                customerTag : null,
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
                    title : "Update Customer Tag",
                    text : "Are you sure want to Update this customer tag?",
                    urlApi : "/customer/agent/tag/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.$route.params.id,
                    data : this.form
                }
            },
            renderData(){
                let arr = []
                this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    let data = response.data.data[0].merchant;
                    this.customerTag = []
                    if(data.tag_customer.includes(",")) {
                        arr = data.tag_customer.split(',')
                    } else {
                        arr.push(data.tag_customer)
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.$http.get("/customer/tag/"+arr[i]).then(response => {
                            this.customerTag.push(response.data.data)
                            this.form.tag_customer.push(response.data.data.id)
                        }); 
                    }
                });
            },
            customerTagSelected(d) {
                this.customerTag = null;
                let arr = []
                if (d) {
                    this.customerTag = d;
                    for (let i = 0; i < d.length; i++) {
                        arr.push(d[i].id);
                    }
                }
                this.form.tag_customer = arr
            },
        },
        created(){
            this.renderData()
        },
    }
</script>
