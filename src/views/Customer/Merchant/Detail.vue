<template>
    <v-container ref="content">
        <div class="mb-16">
            <div class="px-6">
                <v-row class="px-3">
                    <v-col class="fs25">
                        {{merchantDetail.business_type.name}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="merchantDetail.status == 1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-if="merchantDetail.status == 2"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('archived')"
                            style="width:104px"
                            >
                            Archived
                        </v-btn>
                        <div class="mx-3"></div>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>settings</v-icon>
                                </v-btn>
                            </template>
                            <v-list v-if="merchantDetail.status === 1" style="background: #E8EFF2">
                                <v-list-item :to="{ name: 'MerchantUpdate', params: { id: merchantDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Update</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-4">
                                    <v-divider></v-divider>
                                </div>
                                <v-list-item :to="{ name: 'MerchantUpdateTag', params: { id: merchantDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Update Tag</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-4">
                                    <v-divider></v-divider>
                                </div>
                                <v-list-item :to="{ name: 'MerchantUpdatePhone', params: { id: merchantDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Update Phone</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list v-if="merchantDetail.status === 2" style="background: #E8EFF2">
                                <v-list-item @click="unarchive(merchantDetail.id)">
                                    <v-list-item-content>
                                        <v-list-item-title>Unarchive</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row class="row mt-6 ml-6 mr-2 second-color" >
                    <v-col cols="6" class="pr-13">
                        <DetailRow :name="'Business Type'" :value="merchantDetail.business_type.name"/>
                        <DetailRow :name="'PIC Name'" :value="merchantDetail.pic_name"/>
                        <DetailRow :name="'Alternative Phone Number'" :value="merchantDetail.phone_number "/>
                    </v-col>
                    <v-col cols="6" class="pl-13">
                        <DetailRow :name="'Code'" :value="merchantDetail.code"/>
                        <DetailRow :name="'Phone Number'" :value="merchantDetail.phone_number"/>
                        <DetailRow :name="'Email'" :value="merchantDetail.email"/>
                    </v-col>
                    <v-col cols="12" style="margin-top:-25px;">
                        <DetailRow :name="'Customer Tag'" :value="merchantDetail.tag_customer_name"/>
                        <DetailRow :name="'Note'" :value="merchantDetail.note"/>
                    </v-col>
                    <v-col cols="6" style="margin-top: -25px;">
                        <DetailRow :name="'Reference Info'" :value="merchantDetail.reference_info" />
                    </v-col>
                </v-row>
                <v-col class="fs25 second-color mt-10">
                    Finance Info
                </v-col>
                <v-row class="row mt-6 ml-6 mr-2 second-color" >
                    <v-col cols="6" class="pr-13">
                        <DetailRow :name="'Finance Area'" :value="merchantDetail.finance_area.name"/>
                        <DetailRow :name="'Default Payment Term'" :value="merchantDetail.payment_term.name"/>
                    </v-col>
                    <v-col cols="6" class="pl-13">
                        <DetailRow :name="'Default Invoice Term'" :value="merchantDetail.invoice_term.name"/>
                    </v-col>
                    <v-col cols="12" style="margin-top:-25px;">
                        <DetailRow :name="'Billing Address'" :value="merchantDetail.billing_address"/>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="12">
                        <div class="title-table">
                            <label class="label-title">
                                Payment Info
                            </label>
                        </div>
                        <v-data-table
                            :mobile-breakpoint="0"
                            :headers="table.fields"
                            :items="items"
                            :items-per-page="10"
                        >
                            <td></td>
                            <td></td>
                            <td></td>
                        </v-data-table>
                    </v-col>
                </v-row>
            </div>
        </div>
         <div style="padding: 20px;" class="row d-flex align-end justify-end">
          <v-btn
            rounded
            elevation="0"
            class="no-caps px-7"
            :to="'/customer/prospect-customer'"
            style="background: #E6E9ED; color: #768F9C; height: 45px;"
          >
            Back
          </v-btn>
        </div>
            <!-- <v-col>
                <div class="d-flex justify-end pa-5">
                    <v-btn class="neutral ml-2"><router-link  class="routerLink" :to="{ name: 'MerchantUpdate', params: { id: merchantDetail.id } }" >update</router-link></v-btn>
                    <v-btn class="neutral ml-2"><router-link  class="routerLink" :to="{ name: 'MerchantUpdateTag', params: { id: merchantDetail.id } }" >update customer tag</router-link></v-btn>
                    <v-btn v-if="merchantDetail.status === 1" class="secondary ml-2" @click="archive(merchantDetail.id)">archive</v-btn>
                    <v-btn v-if="merchantDetail.status === 2" class="secondary ml-2" @click="unarchive(merchantDetail.id)">unarchive</v-btn>
                </div>
            </v-col> -->
        <ModalDirection v-model="modalOpen" :sendData=confirmation></ModalDirection>
        
    </v-container>
</template>

<script>
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "MerchantDetail",
        components: {
            ModalDirection,
            
        },
        data() {
            return {
                table: {
                    fields: [
                        {
                            text:'Payment Channel',
                            sortable: false,
                        },
                        {
                            text:'Account Name',
                            sortable: false,
                        },
                        {
                            text:'Account Number',
                            sortable: false
                        },
                    ],
                },
                
                modalOpen: false,
                merchantDetail:{},
                loading:true,

                items:[],
                confirmation:{
                    valueName: 'Main Outlet',
                    status:'',
                    urlPath:'',
                    parentPath:'/customer/merchant',
                }
            }
        },
        
        methods:{
            async renderData(){
                try{
                    await this.$http.get("/customer/merchant/"+ this.$route.params.id).then(response => {
                        this.merchantDetail = response.data.data
                        this.loading= false
                    });

                } catch(e) {
                    console.log(e);
                }
            },
            archive(id){
                this.confirmation.action = 'Archive'
                this.confirmation.status = '2';
                this.confirmation.urlPath='/customer/merchant/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            unarchive(id){
                this.confirmation.action= 'Unarchive'
                this.confirmation.status = '1';
                this.confirmation.urlPath='/customer/merchant/unarchive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            
        },
        mounted() {
            this.renderData()
        },
    }
</script>