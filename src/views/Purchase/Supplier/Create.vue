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
                <v-text-field
                    name="district"
                    v-model="district"
                    required
                    outlined
                    disabled
                    class="rounded-form"
                >
                    <template v-slot:label>
                        District *
                    </template>
                </v-text-field>
                <v-text-field
                    name="province"
                    v-model="province"
                    required
                    outlined
                    class="rounded-form"
                    disabled
                >
                    <template v-slot:label>
                        Province *
                    </template>
                </v-text-field>
                <SelectPaymentMethod 
                    @selected="paymentmethodSelected" 
                    required 
                    :error="error.payment_method_id" 
                ></SelectPaymentMethod>
                            
            </v-col>
            <v-col>
                <SelectSupplierType 
                    @selected="suppliertypeSelected" 
                    required 
                    :label="'Type'"
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
                <SelectSubDistrictAll 
                    @selected="subdistrictallSelected" 
                    required 
                    v-model="sub_district"
                    :search="sub_district"
                    :error="error.sub_district_id" 
                 ></SelectSubDistrictAll>
                <v-text-field
                    name="city"
                    v-model="city"
                    required
                    outlined
                    class="rounded-form"
                    disabled
                >
                    <template v-slot:label>
                        City *
                    </template>
                </v-text-field>
                <SelectPurchaseTerm 
                    @selected="purchasetermSelected" 
                    required 
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
        data () {
            return {
                ConfirmData:"",
                supplier_type:null,
                term_payment_pur:null,
                payment_method:null,
                sub_district:null,

                postal_code:'',
                district:'',
                city:'',
                province:'',

                form:{
                    name: '',
                    supplier_type_id:'',
                    pic_name:'',
                    phone_number:'',
                    alt_phone_number:'',
                    email:'',
                    address:'',
                    term_payment_pur_id:'',
                    payment_method_id:'',
                    note: '',
                    sub_district_id: ''
                },
                error:{},
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
                    title : "Create Supplier",
                    text : "Are you sure want to create this Supplier?",
                    urlApi : "/purchase/supplier",
                    nextPage : "/purchase/supplier",
                    post : true,
                    data : this.form
                }
            },
            suppliertypeSelected(d) {
                this.supplier_type = null;
                this.form.supplier_type_id = '';
                if (d !== '') {
                    this.supplier_type = d;
                    this.form.supplier_type_id = d.id
                }
            },
            purchasetermSelected(d) {
                this.term_payment_pur = null;
                this.form.term_payment_pur_id = '';
                if (d !== '') {
                    this.term_payment_pur = d;
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
            subdistrictallSelected(d) {
                this.sub_district = null;
                this.form.sub_district_id = '';
                this.postal_code = null
                this.district = null
                this.city = null
                this.province = null
                if (d) {
                    this.sub_district = d;
                    this.form.sub_district_id = d.id
                    this.postal_code = d.postal_code
                    this.district = d.district.name
                    this.city = d.district.city.name
                    this.province = d.district.city.province.name
                }
            },
        },
    }
</script>
