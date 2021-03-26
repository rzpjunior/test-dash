<template>
    <v-container>
        <v-col  cols="6" sm="6" md="6">
            <SelectCustomerTag
                name="customer_tag"
                v-model="customerTag"
                :watchCustomerTag="customerTag"
                @selected="customerTagSelected"
                outlined
                class="rounded-form"
                :error="error.customer_tag"
            ></SelectCustomerTag>
        </v-col>
        <v-col class="px-12" style="position:absolute;bottom:40px;">
            <hr class="hr-solid mb-6">
            <v-row>
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
        </v-col>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData:[],
                customerTag:[],
                form:{
                    customer_tag:''
                },
                error:{},
            }
        },
        methods:{
            confirmButton() {
                let id = [];
                if(this.customerTag){
                    this.customerTag.forEach((value) =>{
                        id.push(value.id)
                    });
                }
                let data = {
                    customer_tag : id

                }
                this.ConfirmData = {
                    model : true,
                    title : "Update Customer Tag",
                    text : "Are you sure want to Update this Customer Tag?",
                    urlApi : "/customer/merchant/tag/" + this.$route.params.id,
                    nextPage : "/customer/merchant/detail/" + this.$route.params.id,
                    data : data
                }
            },
            customerTagSelected(d) {
                this.customerTag = null;
                if (d !== ''  && d !== undefined) {
                    this.customerTag = d;
                }
            },
            renderData(){
                let arr = []
                let customertagArr = []
                this.$http.get("/customer/merchant/"+ this.$route.params.id)
                    .then(response => {
                        this.items = response.data.data

                        if(this.items.tag_customer.includes(",")) {
                            arr = this.items.tag_customer.split(',')
                        } else {
                            arr.push(this.items.tag_customer)
                        }
                        this.form.customer_tag = arr

                        for (let i = 0; i < arr.length; i++) {
                            this.$http.get("/customer/tag/filtered?conditions=id.e:"+arr[i]).then(res => {
                                customertagArr.push(res.data.data[0])   
                            })
                        }
                        this.customerTagSelected(customertagArr)
                    });
            },
        },
        created() {
            this.renderData()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>
