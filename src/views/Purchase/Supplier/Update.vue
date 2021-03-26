<template>
    <v-container class="px-6">
        <v-row>
            <v-col>
                <v-text-field
                    name="name"
                    v-model="form.name"
                    required
                    outlined
                    maxlength="20"
                    class="rounded-form"
                    :error-messages="error.name"
                >
                    <template v-slot:label>
                        Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="pic_name"
                    v-model="form.pic_name"
                    required
                    outlined
                    maxlength="30"
                    class="rounded-form"
                    :error-messages="error.pic_name"
                >
                    <template v-slot:label>
                        PIC Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="alt_phone_number"
                    v-model="form.alt_phone_number"
                    maxlength="15"
                    type="number"
                    outlined
                    class="rounded-form"
                    :error-messages="error.alt_phone_number"
                >
                    <template v-slot:label>
                        Alternative Phone Number
                    </template>
                </v-text-field>
                <v-text-field
                    name="address"
                    v-model="form.address"
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.address"
                >
                    <template v-slot:label>
                        Address <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <SelectPaymentMethod 
                    @selected="paymentmethodSelected" 
                    required 
                    :payment_method="payment_method"
                    :error="error.payment_method_id" 
                ></SelectPaymentMethod>
                            
            </v-col>
            <v-col>
                <SelectSupplierType 
                    @selected="suppliertypeSelected" 
                    required 
                    disabled
                    :supplier_type="supplier_type"
                    :error="error.supplier_type_id" 
                ></SelectSupplierType>
                <v-text-field
                    name="phone_number"
                    v-model="form.phone_number"
                    maxlength="15"
                    type="number"
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.phone_number"
                >
                    <template v-slot:label>
                        Phone Number <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="email"
                    v-model="form.email"
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.email"
                >
                    <template v-slot:label>
                        Email
                    </template>
                </v-text-field>
                <SelectPurchaseTerm 
                    @selected="purchasetermSelected" 
                    required 
                    :purchase_term="purchase_term"
                    :error="error.term_payment_pur_id"
                ></SelectPurchaseTerm>
            </v-col>
        </v-row>
        <v-row style="margin-top:-20px">
            <v-col>
                <v-textarea
                    name="note"
                    v-model="form.note"
                    :counter="100"
                    maxlength="100"
                    outlined
                    label="Note"
                    class="rounded-form"
                />
            </v-col>
        </v-row>
        <v-row class="mx-1" style="border-top: 1px solid #C8DDC8;">
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
                    >Create</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "SupplierUpdate",
        data () {
            return {
                loading:false,

                ConfirmData:"",
                supplier_type:null,
                purchase_term:null,
                payment_method:null,
                items :{},
                form:{},
                error:{},
            }
        },
        methods:{
            suppliertypeSelected(d) {
                this.supplier_type = null;
                this.form.supplier_type_id = '';
                if (d !== '') {
                    this.supplier_type = d;
                    this.form.supplier_type_id = d.id
                }
            },
            purchasetermSelected(d) {
                this.purchase_term = null;
                this.form.term_payment_pur_id = '';
                if (d !== '') {
                    this.purchase_term = d;
                    this.form.term_payment_pur_id = d.id
                }
            },
            paymentmethodSelected(d) {
                this.payment_method = null;
                this.form.payment_method_id = '';
                if (d !== '') {
                    this.payment_method = d;
                    this.form.payment_method_id = d.id
                }
            },
            renderData(){
                this.$http.get("/purchase/supplier/"+ this.$route.params.id,{params:{
                        embeds: 'sub_district.district.city.province_id'
                    }})
                    .then(response => {
                        if (response.data !== false) {
                            this.items = response.data.data
                            this.form = {
                                name: this.items.name,
                                supplier_type_id:"",
                                pic_name:this.items.pic_name,
                                phone_number:this.items.phone_number,
                                alt_phone_number:this.items.alt_phone_number,
                                email:this.items.email,
                                address:this.items.address,
                                term_payment_pur_id:"",
                                payment_method_id:"",
                                note: this.items.note,
                            },
                            this.purchasetermSelected(response.data.data.purchase_term)
                            this.paymentmethodSelected(response.data.data.payment_method)
                            this.suppliertypeSelected(response.data.data.supplier_type)
                        }
                    });
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Supplier",
                    text : "Are you sure want to update this Supplier?",
                    urlApi : "/purchase/supplier/"+this.$route.params.id,
                    nextPage : "/purchase/supplier/",
                    data : this.form
                }
            }
        },
        mounted() {
            this.renderData()
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>
