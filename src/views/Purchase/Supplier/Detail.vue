<template>
    <v-container >
        <div>
            <div class="px-6">
                <v-row class="px-3">
                    <v-col class="fs25">
                        {{items.name}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="items.status == 1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-if="items.status == 2"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('archived')"
                            style="width:104px"
                            >
                            Archived
                        </v-btn>
                    <v-menu offset-y >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </template>
                        <v-list style="background: #E8EFF2">
                            <v-list-item :to="`/purchase/supplier/update/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item v-if="items.status == 1" @click="archived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="items.status == 2" @click="unarchived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-col>
                </v-row>
            </div>
            <div class="row mt-6 mx-6 second-color" >
                <div class="col">
                    <DetailRow :name="'Code'" :value="items.code"/>
                    <DetailRow :name="'PIC Name'" :value="items.pic_name"/>
                    <DetailRow :name="'Email'" :value="items.email"/>
                    <DetailRow :name="'Payment Term'" :value="items.payment_method.name"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Type'" :value="`${items.supplier_type.abbreviation} - ${items.supplier_type.name}`"/>
                    <DetailRow :name="'Phone Number'" :value="items.phone_number"/>
                    <DetailRow :name="'Address'" :value="items.address"/>
                    <DetailRow :name="'Preferred Payment Term'" :value="items.purchase_term.name"/>
                </div>
            </div>
            <div class="row mx-6" style="margin-top:-24px">
                <div class="col">
                    <DetailRow :name="'Note'" :value="items.note" :align="true"/>

                </div>

            </div>
            <div class="row mx-6" style="position: absolute;bottom: 40px;">
                <v-btn 
                    rounded 
                    elevation="0" 
                    class="no-caps px-7" 
                    @click="$router.go(-1)"
                    style="background: #E6E9ED; color:#768F9C;height:45px"
                >Back</v-btn>
            </div>
        </div>
        <pre>
            <!-- {{items}} -->
        </pre>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "SupplierDetail",

        data() {
            return {
                ConfirmData : "",
                items:{
                    payment_method : {
                        name : ""
                    },
                    supplier_type: {
                        name: "",
                        abbreviation: "",
                    },
                    purchase_term: {
                        name: "",
                    },
                },
            }
        },
        methods:{
            archived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Archive this Supplier",
                    title : "Archive Supplier",
                    text : "Are you sure you want to Archive this Supplier ?",
                    urlApi : "/purchase/supplier/"+id+"/archive",
                    data : {}
                }
            },
            unarchived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Unarchive this Supplier",
                    title : "Unarchive Supplier",
                    text : "Are you sure you want to Unarchive this Supplier ?",
                    urlApi : "/purchase/supplier/"+id+"/unarchive",
                    data : {}
                }
            },
            renderData(){
                this.$http.get("/purchase/supplier/"+ this.$route.params.id).then(response => {
                    this.items = response.data.data
                    this.loading= false
                });
            },
        },
        mounted() {
            this.renderData()
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
    }
</script>
