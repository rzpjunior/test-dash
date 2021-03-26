<template>
    <v-container class="px-12">
        <v-row class="px-3">
            <div class="title-page">
                Basic Info
            </div>
        </v-row>
        <hr class="hr-solid mb-6">
        <v-row>
            <v-col>
                <SelectArchetype
                    name="archetype_name"
                    v-model="archetype"
                    @selected="archetypeSelected"
                    required
                    disabled
                    :customer_group="2"
                    :aux_data="2"
                    :statusArch="1"
                    :archetype ="archetype"
                    :error="error.archetype_id"
                ></SelectArchetype>
                <v-text-field
                    name="customer_group"
                    v-model="customer_group_str"
                    required 
                    disabled
                    class="rounded-form"
                    outlined
                    label="Customer Group *"
                    :error-messages="error.customer_group"
                ></v-text-field>
                <v-text-field
                    name="merchant_name"
                    v-model="form.name"
                    maxlength="20"
                    disabled
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.name"
                >
                    <template v-slot:label>
                        Name 
                    </template>
                </v-text-field>
                <v-text-field
                    name="merchant_phone_number"
                    v-model="form.phone_number"
                    maxlength="15"
                    class="rounded-form"
                    required
                    disabled
                    type="number"
                    outlined
                    :error-messages="error.phone_number"
                >
                    <template v-slot:label>
                        Phone Number 
                    </template>
                </v-text-field>
                <v-text-field
                    name="email"
                    v-model="items.email"
                    label="Email"
                    outlined
                    class="rounded-form"
                    :error-messages="error.email"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    name="business_type"
                    v-model="business_type_str"
                    required 
                    disabled
                    outlined
                    class="rounded-form"
                    label="Business Type *"
                    :error="error.business_type_id"
                ></v-text-field>
                <v-text-field
                    name="merchant_code"
                    v-model="form.code"
                    label="Code"
                    outlined
                    disabled
                    class="rounded-form"
                ></v-text-field>
                <v-text-field
                    name="merchant_pic_name"
                    v-model="items.pic_name"
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.pic_name"
                >
                    <template v-slot:label>
                        PIC Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="merchant_alt_phone_number"
                    v-model="items.alt_phone_number"
                    maxlength="15"
                    label="Alternative Phone Number"
                    outlined
                    class="rounded-form"
                    :error-messages="error.alt_phone_number"
                ></v-text-field>
                <SelectCustomerTag
                    name="customer_tag"
                    v-model="customerTag"
                    :norequired="true"
                    :watchCustomerTag="customerTag"
                    disabled
                ></SelectCustomerTag>
            </v-col>
        </v-row>
        <v-row style="margin-top:-20px">
            <v-col>
                <v-textarea
                    name="merchant_note"
                    v-model="items.note"
                    :counter="250"
                    maxlength="250"
                    outlined
                    label="Note"
                    class="rounded-form"
                />
            </v-col>
        </v-row>
        <v-row class="px-3">
            <div class="title-page">
                Finance Info
            </div>
        </v-row>
        <hr class="hr-solid mb-6">
        <v-row>
            <v-col>
                <SelectArea
                    name="area"
                    @selected="areaSelected"
                    required
                    :label="'Finance Area'"
                    :area="area"
                    :aux_data="2"
                    disabled
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
                    :pt="items.term_payment_sls_id"
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
                    v-model="items.billing_address"
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
        <v-row class="px-3">
            <div class="title-page">
                Sales Info
            </div>
        </v-row>
        <hr class="hr-solid mb-6">
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
        <v-row class="px-3">
            <div style="color:#4ABFB2;font-size:20px">
                Price Set per Area
            </div>
        </v-row>
        <v-row class="mt-10 second-color">
            <v-col>
                <div v-for="(item, idx) in allArea" :key="idx">
                    <v-row style="margin-top:-25px" v-if="idx%2==0">
                        <v-col cols="12" md="4">
                            <div class="mt-4">
                                {{item.area.name}}
                            </div>
                        </v-col>
                        <v-col cols="12" md="8">
                            <SelectPriceSet
                                v-model="price_set_area[idx].price_set"
                                name="price_set"
                                @selected="pricesetSelected"
                                :price_set="price_set_area[idx].price_set"
                                v-on:click.native="setIdx(idx)"
                                required
                                :error="err(idx)"
                            ></SelectPriceSet>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col>
                <div v-for="(item, idx) in allArea" :key="idx">
                    <v-row style="margin-top:-25px" v-if="idx%2!==0">
                        <v-col cols="12" md="4">
                            <div class="mt-4">
                                {{item.area.name}}
                            </div>
                        </v-col>
                        <v-col cols="12" md="8">
                            <SelectPriceSet
                                v-model="price_set_area[idx].price_set"
                                name="price_set"
                                @selected="pricesetSelected"
                                :price_set="price_set_area[idx].price_set"
                                v-on:click.native="setIdx(idx)"
                                required
                                :error="err(idx)"
                            ></SelectPriceSet>
                        </v-col>
                    </v-row>
                </div>
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
                    >Create</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: 'AgentUpdate',
        data () {
            return {
                business_type : '',
                business_type_str : '',
                customer_group_str : '',
                allArea : [],
                price_set_area : [{price_set : ''}],
                payment_group:'',
                idxPriceSet : 0,

                invoice_term_dis:true,

                price_set:'',
                area:{},
                areaValue:'',
                archetype:'',
                salesperson:'',
                invoice_term:'',
                sales_term:'',
                customerTag:null,

                form : {},
                items:{
                    pic_name: "",
                    alt_phone_number: "",
                    email: "",
                    billing_address: "",
                    note: "",
                    term_payment_sls_id: "",
                    payment_group_id: "",
                    term_invoice_sls_id: "",
                    salesperson_id: ""
                },
                error:{},
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
                    title : "Update Agent",
                    text : "Are you sure want to update this Agent?",
                    urlApi : "/customer/agent/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.$route.params.id,
                    data : this.items
                }
            },
            renderData(){
                let arr = []
                this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    this.form = response.data.data[0].merchant;
                    this.items={
                        pic_name: this.form.pic_name,
                        alt_phone_number: this.form.alt_phone_number,
                        email: this.form.email,
                        billing_address: this.form.billing_address,
                        note: this.form.note,
                        term_payment_sls_id: "",
                        payment_group_id: "",
                        term_invoice_sls_id: "",
                        salesperson_id: "",
                        price_set_area : [
                            {
                                "price_set_id": "",
                                "area_id":""
                            }
                        ]
                    },
                    this.archetypeSelected(response.data.data[0].archetype)
                    this.areaSelected(response.data.data[0].merchant.finance_area)
                    this.salespersonSelected(response.data.data[0].salesperson)
                    this.salestermSelected(response.data.data[0].merchant.payment_term)
                    this.$http.get("/payment/payment_group_comb",{params:{
                        embeds:'payment_group_sls_id,term_payment_sls_id,term_invoice_sls_id',
                        conditions:'paymentterm__id.e:'+response.data.data[0].merchant.payment_term.id+'|invoiceterm__id.e:'+response.data.data[0].merchant.invoice_term.id,
                    }}).then(response => {
                        this.invoicetermSelected(response.data.data[0])
                    });
                    this.paymentgroupSelected(response.data.data[0].merchant.payment_group)
                    
                    this.customerTag = []
                    if(this.form.tag_customer.includes(",")) {
                        arr = this.form.tag_customer.split(',')
                    } else {
                        arr.push(this.form.tag_customer)
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.$http.get("/customer/tag/"+arr[i]).then(response => {
                            this.customerTag.push(response.data.data)
                        }); 
                    }

                    this.allArea = this.form.price_set_area
                    this.items.price_set_area = []
                    this.price_set_area = []
                    for (let i = 0; i < this.allArea.length; i++) {
                        this.items.price_set_area.push({
                            "price_set_id": this.allArea[i].price_set.id,
                            "area_id":this.allArea[i].area.id
                        });
                        this.price_set_area.push({
                            "price_set": this.allArea[i].price_set
                        });
                    }
                });
            },
            err(idx) {
                for (var key in this.error) {
                    if (key.includes(idx) && key.includes('price_set_area')) {
                        return this.error[key]
                    }
                }
            },
            setPriceSet() {
                let arr = JSON.parse(JSON.stringify(this.price_set_area))
                this.price_set_area = arr
            },
            setIdx(id) {
                this.idxPriceSet = id
            },
            pricesetSelected(d) {
                this.price_set_area[this.idxPriceSet].price_set = null;
                this.items.price_set_area[this.idxPriceSet].price_set_id = '';
                if (d) {
                    this.price_set_area[this.idxPriceSet].price_set = d;
                    this.items.price_set_area[this.idxPriceSet].price_set_id = d.id;
                }
            },
            BusinessTypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = ''
                if (d) {
                    this.business_type = d
                    this.form.business_type_id = d.id
                }
            },
            archetypeSelected(d) {
                this.customer_group_str = ''
                this.business_type_str = ''
                this.archetype = null;
                this.form.archetype_id = '';
                if (d) {
                    this.archetype = d;
                    this.form.archetype_id = d.id
                    this.customer_group_str = 'Agent'
                    this.form.customer_group = 2
                    this.form.business_type = d.business_type.id
                    this.business_type_str = d.business_type.name
                }
            },
            salespersonSelected(d) {
                this.salesperson = null;
                this.items.salesperson_id = '';
                if (d !== '' && d !== undefined) {
                    this.salesperson = d;
                    this.items.salesperson_id = d.id
                }
            },
            customerTagSelected(d) {
                this.customerTag = null;
                // this.entry = null;
                if (d) {
                    this.customerTag = d;
                    // this.entry = d;
                    // this.customerTag = this.entry.split(",");
                }
            },
            salestermSelected(d) {
                this.sales_term = null;
                this.items.term_payment_sls_id = '';
                this.payment_group = null;
                this.items.payment_group_id = '';
                this.invoice_term = null;
                this.items.term_invoice_sls_id = ''
                this.invoice_term_dis = true
                if (d) {
                    this.invoice_term_dis = false
                    this.sales_term = d;
                    this.items.term_payment_sls_id = d.id
                }
            },
            invoicetermSelected(d){
                this.payment_group = null;
                this.items.payment_group_id = '';
                this.invoice_term = null;
                this.items.term_invoice_sls_id = ''
                if (d) {
                    this.payment_group = d.payment_group;
                    this.items.payment_group_id = d.payment_group.id
                    this.invoice_term = d
                    this.items.term_invoice_sls_id = d.invoice_term.id
                }
            },
            paymentgroupSelected(d){
                this.payment_group = null;
                this.items.payment_group_id = '';
                if (d) {
                    this.payment_group = d;
                    this.items.payment_group_id = d.id
                }
            },
            areaSelected(d) {
                this.area = null;
                this.form.area_id = '';
                if (d !== ''  && d !== undefined) {
                    this.area = d;
                    this.form.area_id = d.id;
                }
            },
        },
        created(){
            this.renderData()
            let self = this
            setTimeout(function(){ 
                self.setPriceSet()
            }, 500);
        },
    }
</script>
