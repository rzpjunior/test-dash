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
                    :customer_group="2"
                    :aux_data="2"
                    :statusArch="1"
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
                    name="merchant_pic_name"
                    v-model="form.pic_name"
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
                    v-model="form.alt_phone_number"
                    maxlength="15"
                    type="number"
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
                    @selected="customerTagSelected"
                    :error="error.customer_tag"
                ></SelectCustomerTag>
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
                    :error-messages="error.business_type_id"
                ></v-text-field>
                <v-text-field
                    name="merchant_name"
                    v-model="form.name"
                    maxlength="20"
                    required
                    outlined
                    class="rounded-form"
                    :error-messages="error.name"
                >
                    <template v-slot:label>
                        Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="merchant_phone_number"
                    v-model="form.phone_number"
                    maxlength="15"
                    class="rounded-form"
                    required
                    type="number"
                    outlined
                    :error-messages="error.phone_number"
                >
                    <template v-slot:label>
                        Phone Number <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="email"
                    v-model="form.email"
                    label="Email"
                    outlined
                    class="rounded-form"
                    :error-messages="error.email"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="margin-top:-20px">
            <v-col>
                <v-textarea
                    name="merchant_note"
                    v-model="form.note"
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
                                {{item.name}}
                            </div>
                        </v-col>
                        <v-col cols="12" md="8">
                            <SelectPriceSet
                                v-model="price_set_area[idx].price_set"
                                name="price_set"
                                @selected="pricesetSelected"
                                v-on:click.native="setIdx(idx)"
                                :price_set="price_set"
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
                                {{item.name}}
                            </div>
                        </v-col>
                        <v-col cols="12" md="8">
                            <SelectPriceSet
                                v-model="price_set_area[idx].price_set"
                                name="price_set"
                                @selected="pricesetSelected"
                                :price_set="price_set"
                                v-on:click.native="setIdx(idx)"
                                required
                                :error="err(idx)"
                            ></SelectPriceSet>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
        <v-row class="px-3">
            <div class="title-page">
                Shipping Info
            </div>
        </v-row>
        <hr class="hr-solid mb-6">
        <v-row>
            <v-col>
                <v-text-field
                    name="address_name"
                    v-model="form.address_name"
                    class="rounded-form"
                    maxlength="20"
                    required
                    outlined
                    :error-messages="error.address_name"
                >
                    <template v-slot:label>
                        Address Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="recipient_phone"
                    v-model="form.recipient_phone_number"
                    required
                    class="rounded-form"
                    outlined
                    type="number"
                    maxlength="15"
                    max
                    :error-messages="error.recipient_phone_number"
                >
                    <template v-slot:label>
                        Recipient Phone Number <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-textarea
                    name="shipping_address"
                    v-model="form.shipping_address"
                    :counter="350"
                    maxlength="350"
                    outlined
                    class="rounded-form"
                    required
                    :error-messages="error.shipping_address"
                >
                    <template v-slot:label>
                        Shipping Address <span style="color:red">*</span>
                    </template>
                </v-textarea>
                <v-text-field
                    name="area"
                    v-model="areaValue"
                    required
                    outlined
                    disabled
                    class="rounded-form"
                    :error-messages="error.area_id"
                >
                    <template v-slot:label>
                        Area <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <SelectCity
                    name="city"
                    v-model="city"
                    @selected="citySelected"
                    :clear="clearCity"
                    :province_id="form.province_id"
                    required
                    :disabled="disabled_city"
                    :error-messages="error.city_id"
                ></SelectCity>
                <SelectSubDistrict
                    name="sub_district"
                    v-model="sub_district"
                    @selected="subdistrictSelected"
                    :province_id="form.province_id"
                    :city_id="form.city_id"
                    :district_id="form.district_id"
                    :clear="clearSub_district"
                    required
                    :disabled="disabled_sub_district"
                    :error="error.sub_district_id"
                ></SelectSubDistrict>
            </v-col>
            <v-col>
                <v-text-field
                    name="recipient_name"
                    v-model="form.recipient_name"
                    maxlength="20"
                    class="rounded-form"
                    required
                    outlined
                    :error-messages="error.recipient_name"
                >
                    <template v-slot:label>
                        Recipient Name <span style="color:red">*</span>
                    </template>
                </v-text-field>
                <v-text-field
                    name="recipient_alt_phone_number"
                    v-model="form.recipient_alt_phone_number"
                    label="Recipient Alternative Phone Number"
                    outlined
                    type="number"
                    maxlength="15"
                    class="rounded-form"
                ></v-text-field>
                <v-textarea
                    name="branch_note"
                    v-model="form.shipping_note"
                    class="rounded-form"
                    :counter="250"
                    label="Note"
                    maxlength="250"
                    outlined
                    :error-messages="error.shipping_note"
                ></v-textarea>
                <SelectProvince
                    name="province"
                    v-model="province"
                    @selected="provinceSelected"
                    :clear="clearProvince"
                    required
                    :error-messages="error.province_id"
                ></SelectProvince>
                <SelectDistrict
                    name="district"
                    v-model="district"
                    @selected="districtSelected"
                    :province_id="form.province_id"
                    :city_id="form.city_id"
                    :clear="clearDistrict"
                    required
                    :disabled="disabled_district"
                    :error-messages="error.district_id"
                ></SelectDistrict>
                <v-text-field
                    name="postal_code"
                    v-model="postal_code"
                    required
                    class="rounded-form"
                    outlined
                    disabled
                    :error-messages="error.postal_code"
                >
                    <template v-slot:label>
                        Postal Code <span style="color:red">*</span>
                    </template>
                </v-text-field>
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
        name: 'CreateAgent',
        data () {
            return {
                permission:[],
                price_set:'',
                area:{},
                areaValue:'',
                archetype:'',
                salesperson:'',
                invoice_term:'',
                payment_group:'',
                sales_term:'',
                customerTag:null,

                invoice_term_dis:true,
                sales_term_dis:true,

                province:null,
                clearProvince:false,
                disabled_province:true,

                city:null,
                clearCity:false,
                disabled_city:true,

                district:null,
                clearDistrict:false,
                disabled_district:true,

                sub_district:null,
                clearSub_district:false,
                disabled_sub_district:true,

                postal_code:'',

                warehouse:null,
                clearWarehouse:false,
                disabled_warehouse:true,

                business_type:{
                    name:'',
                },
                form:{
                    archetype_id:'',
                    business_type_id:'',
                    customer_group : "",
                    name: '',
                    pic_name : '',
                    phone_number : '',
                    alt_phone_number:'',
                    email:'',
                    tag_customer:[],
                    note:'',

                    finance_area_id:'',
                    term_invoice_sls_id:'',
                    term_payment_sls_id:'',
                    payment_group_id:'',
                    billing_address:'',

                    salesperson_id:'',

                    address_name:'',
                    recipient_name:'',
                    recipient_phone_number :'',
                    recipient_alt_phone_number :'',
                    shipping_address :'',
                    shipping_note :'',

                    price_set_area : [],

                    shipping_area_id:'',
                    province_id:'',
                    city_id:'',
                    district_id:'',
                    sub_district_id:'',
                },
                error:{},
                ConfirmData : {},
                allArea : [],
                idxPriceSet : '',
                customer_group_str : '',
                business_type_str : '',
                price_set_area : [{price_set : ''}],
                clear : true
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        created() {
            this.getArea()
        },
        methods:{
            err(idx) {
                for (var key in this.error) {
                    if (key.includes(idx) && key.includes('price_set_area')) {
                        return this.error[key]
                    }
                }
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create Agent",
                    text : "Are you sure want to create this Agent?",
                    urlApi : "/customer/agent",
                    nextPage : "/customer/agent/detail/:id",
                    post : true,
                    data : this.form
                }
            },
            getArea() {
                this.$http.get("/config/area/filter",{params:{
                        conditions:'status:1|aux_data:2'
                    }}).then(response => {
                    this.allArea = response.data.data
                    this.form.price_set_area = []
                    for (let i = 0; i < this.allArea.length; i++) {
                        this.form.price_set_area.push({
                                "price_set_id": "",
                                "area_id":this.allArea[i].id
                            });
                            this.price_set_area.push({
                                "price_set": ""
                            });
                        
                    }
                });
            },
            BusinessTypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = ''
                if (d !== '' && d !== undefined) {
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
                    this.form.customer_group = "2"
                    this.form.business_type_id = d.business_type.id
                    this.business_type_str = d.business_type.name
                }
            },
            salespersonSelected(d) {
                this.salesperson = null;
                this.form.salesperson_id = '';
                if (d) {
                    this.salesperson = d;
                    this.form.salesperson_id = d.id
                }
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
            paymentgroupSelected(d){
                this.payment_group = null;
                this.form.payment_group_id = '';
                if (d) {
                    this.payment_group = d;
                    this.form.payment_group_id = d.id
                }
            },
            setIdx(id) {
                this.idxPriceSet = id
            },
            pricesetSelected(d) {
                this.price_set_area[this.idxPriceSet].price_set = null;
                this.form.price_set_area[this.idxPriceSet].price_set_id = '';
                if (d) {
                    this.price_set_area[this.idxPriceSet].price_set = d;
                    this.form.price_set_area[this.idxPriceSet].price_set_id = d.id;
                }
            },
            areaSelected(d) {
                this.form.finance_area_id = '';
                if (d) {
                    this.form.finance_area_id = d.id;
                }
            },
            provinceSelected(d) {
                this.areaValue = '';
                this.form.shipping_area_id = ''
                this.postal_code = null
                this.province = null;
                this.form.province_id = '';

                this.city = null;
                this.form.city_id = '';

                this.clearCity = true;
                this.clearDistrict = true;
                this.clearSub_district =true;

                this.disabled_city = true;
                this.disabled_district = true;
                this.disabled_sub_district = true;
                if (d) {
                    this.province = d;
                    this.form.province_id = d.province_id

                    this.disabled_city = false
                    this.clearCity = false
                }
            },
            citySelected(d) {
                this.areaValue = '';
                this.form.shipping_area_id = ''
                this.postal_code = null
                this.city = null;
                this.form.city_id = '';

                this.district = null;
                this.form.district_id = '';

                this.clearDistrict = true
                this.clearSub_district =true;

                this.disabled_district = true;
                this.disabled_sub_district = true;
                if (d) {
                    this.city = d;
                    this.form.city_id = d.city_id

                    this.disabled_district = false
                    this.clearDistrict = false
                }
            },
            districtSelected(d) {
                this.areaValue = '';
                this.form.shipping_area_id = ''
                this.postal_code = null
                this.district = null;
                this.form.district_id = '';

                this.sub_district = null;
                this.form.sub_district_id = '';

                this.clearSub_district =true;
                this.disabled_sub_district = true;
                if (d) {
                    this.district = d;
                    this.form.district_id = d.district_id

                    this.disabled_sub_district = false
                    this.clearSub_district = false;
                }
            },
            subdistrictSelected(d) {
                this.sub_district = null;
                this.form.sub_district_id = '';
                this.postal_code = null

                this.sub_district = null;
                this.form.sub_district_id = '';

                this.areaValue = '';
                this.form.shipping_area_id = ''
                if (d) {
                    this.form.shipping_area_id = d.area_id
                    this.areaValue = d.area_name;
                    this.sub_district = d;
                    this.form.sub_district_id = d.sub_district_id
                    this.postal_code = d.postal_code
                }
            },
            warehouseSelected(d) {
                this.warehouse = null;
                this.form.warehouse_id = '';
                if (d !== ''  && d !== undefined) {
                    this.warehouse = d;
                    this.form.warehouse_id = d.id
                }
            },
        },
    }
</script>