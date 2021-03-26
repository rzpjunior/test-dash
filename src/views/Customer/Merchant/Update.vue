<template>
    <v-container class="px-10">
        <v-row class="px-4 mt-2">
            <div class="title-page">Basic Info</div>
        </v-row>
        <hr class="hr-solid">
        <form>
            <v-row class="mt-5">
                <v-col  cols="6" sm="6" md="6">
                    <v-text-field
                            v-model="business_type_name"
                            label="Business Type*"
                            outlined
                            class="rounded-form"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            name="name"
                            v-model="form.name"
                            label="Name*"
                            outlined
                            class="rounded-form"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            name="phone_number"
                            v-model="form.phone_number"
                            label="Phone Number*"
                            outlined
                            class="rounded-form"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            name="email"
                            v-model="form.email"
                            label="Email"
                            outlined
                            class="rounded-form"
                            :error-messages="error.email"
                    ></v-text-field>
                </v-col>
                <v-col  cols="6" sm="6" md="6">
                     <v-text-field
                            name="code"
                            v-model="form.code"
                            label="Code*"
                            outlined
                            class="rounded-form"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            name="pic_name"
                            v-model="form.pic_name"
                            maxlength="20"
                            label="PIC Name*"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.pic_name"
                    ></v-text-field>
                     <v-text-field
                            name="alt_phone_number"
                            v-model="form.alt_phone_number"
                            maxlength="100"
                            label="Alternative Phone Number*"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.name"
                    ></v-text-field>
                    <v-text-field
                            name="customer_tag"
                            v-model="form.tag_customer_name"
                            label="Customer Tag"
                            outlined
                            class="rounded-form"
                            disabled
                    ></v-text-field>
                </v-col>
                <v-col  cols="12" style="margin-top:-20px">
                    <v-textarea
                            name="note"
                            v-model="form.note"
                            maxlength="250"
                            outlined
                            class="rounded-form"
                    >
                    <template v-slot:label>
                        <div>
                            Note
                        </div>
                    </template>
                    </v-textarea>
                </v-col>
            </v-row>
            <v-row class="px-4 mt-5">
                <div class="title-page">Finance Info</div>
            </v-row>
            <hr class="hr-solid">
            <v-row>
            <v-col>
                <SelectArea
                    name="area"
                    @selected="areaSelected"
                    required
                    :label="'Finance Area'"
                    :area="area"
                    :aux_data="2"
                    :error="error.finance_area_id"
                ></SelectArea>
                <SelectPaymentGroupComb
                    name="sales_invoice_term"
                    @selected="invoicetermSelected"
                    required
                    :disabled="invoice_term_dis"
                    :payment_group="invoice_term"
                    :label="'Default Invoice Term'"
                    :error="error.term_invoice_sls_id"
                    :pt="form.term_payment_sls_id"
                ></SelectPaymentGroupComb>
            </v-col>
            <v-col>
                <SelectSalesTerm
                    name="purchase_payment_term"
                    @selected="salestermSelected"
                    required
                    :label="'Default Payment Term'"
                    :error="error.term_payment_sls_id"
                    :sales_term="sales_term"
                ></SelectSalesTerm>
                <SelectPaymentGroup
                    name="payment_group"
                    @selected="paymentgroupSelected"
                    required
                    :disabled="true"
                    :payment_group="payment_group"
                    :error="error.payment_group_id"
                ></SelectPaymentGroup>
            </v-col>
        </v-row>
        <v-row style="margin-top:-20px">
            <v-col>
                <v-textarea
                    name="billing_address"
                    v-model="form.billing_address"
                    :counter="350"
                    outlined
                    :error-messages="error.billing_address"
                    required
                    class="rounded-form"
                >
                    <template v-slot:label>
                        Billing Address <span style="color:red">*</span>
                    </template>
                </v-textarea>
            </v-col>
        </v-row>
            <hr class="hr-solid">
            <v-row class="mt-1">
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
        </form>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData : {},
                permission:[],
                business_type:null,
                business_type_name:null,
                finance_area:null,
                sales_term:null,
                invoice_term:null,
                payment_method:null,
                invoice_term_dis:true,
                sales_term_dis:true,
                invoice_term:'',
                payment_group:'',
                sales_term:'',
                form:{
                    pic_name:'',
                    alt_phone_number:'',
                    note:'',
                    finance_area_id:'',
                    sales_term_id:'',
                    invoice_term_id:'',
                    payment_method_id:'',
                    billing_address:'',
                    term_invoice_sls_id:'',
                    term_payment_sls_id:'',
                    payment_group_id:'',
                },
                error:{},
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Main Outlet",
                    text : "Are you sure want to update this Main Outlet?",
                    urlApi : "/customer/merchant/"+this.$route.params.id,
                    nextPage : "/customer/merchant",
                    data : this.form
                }
            },
            cancel(){
                this.$router.push('/customer/merchant');
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
            areaSelected(d) {
                this.finance_area = null;
                this.form.finance_area_id = '';
                if (d !== '' && d !== undefined) {
                    this.finance_area = d;
                    this.form.finance_area_id = d.id
                }
            },
            businesstypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = '';
                if (d !== '' && d !== undefined) {
                    this.business_type = d;
                    this.form.business_type_id = d.id
                    this.business_type_name = d.name;
                }
            },
            salestermSelected(d) {
                this.sales_term = null;
                this.form.term_payment_sls_id = '';
                this.payment_group = null;
                this.form.payment_group_id = '';
                this.invoice_term = null;
                this.form.term_invoice_sls_id = ''
                this.invoice_term_dis = true
                if (d) {
                    this.invoice_term_dis = false
                    this.sales_term = d;
                    this.form.term_payment_sls_id = d.id
                }
            },
            invoicetermSelected(d) {
                this.invoice_term = null;
                this.form.invoice_term_id = '';
                if (d !== '' && d !== undefined) {
                    this.invoice_term = d;
                    this.form.invoice_term_id = d.id
                }
            },
            paymentmethodSelected(d) {
                this.payment_method = null;
                this.form.payment_method_id = '';
                if (d !== '' && d !== undefined) {
                    this.payment_method = d;
                    this.form.payment_method_id = d.id
                }
            },
            paymentgroupSelected(d){
                this.payment_group = null;
                this.form.payment_group_id = '';
                if (d) {
                    this.payment_group = d;
                    this.form.payment_group_id = d.id
                }
            },
            invoicetermSelected(d){
                this.payment_group = null;
                this.form.payment_group_id = '';
                this.invoice_term = null;
                this.form.term_invoice_sls_id = ''
                if (d) {
                    this.payment_group = d.payment_group;
                    this.form.payment_group_id = d.payment_group.id
                    this.invoice_term = d
                    this.form.term_invoice_sls_id = d.invoice_term.id
                }
            },
            renderData(){
                this.$http.get("/customer/merchant/"+ this.$route.params.id,{
                    params:{
                        embeds:'user_merchant_id,business_type_id,payment_method_id,finance_area_id'
                    }
                })
                    .then(response => {
                        this.form = response.data.data
                        this.businesstypeSelected(response.data.data.business_type)
                        this.areaSelected(response.data.data.finance_area)
                        this.salestermSelected(response.data.data[0].merchant.payment_term)
                        this.$http.get("/payment/payment_group_comb",{params:{
                            embeds:'payment_group_sls_id,term_payment_sls_id,term_invoice_sls_id',
                            conditions:'paymentterm__id.e:'+response.data.data[0].merchant.payment_term.id+'|invoiceterm__id.e:'+response.data.data[0].merchant.invoice_term.id,
                        }}).then(response => {
                            this.invoicetermSelected(response.data.data[0])
                        });
                        this.paymentgroupSelected(response.data.data[0].merchant.payment_group)
                    });
            },
        },
        created() {
            this.renderData()
        },
    }
</script>
