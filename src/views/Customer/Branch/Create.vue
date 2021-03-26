<template>
    <v-form>
        <v-container>
            <v-subheader class="title"><v-icon large color="accent">mdi-label</v-icon> CREATE OUTLET
            </v-subheader>
            <v-card elevation="5" class="pt-2">
                <form>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Main Outlet</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Basic Info</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="business_type"
                                    v-model="business_type"
                                    label="Business Type*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                                    disabled
                            ></v-text-field>
                            <selectMerchant @selected="merchantSelected" required :error="error.merchant_id" class="mb-0" v-if="!showMainOutlet"></selectMerchant>

                            <!--untuk checkbox juga bisa-->
                            <!--<input type="checkbox" /> test-->

                            <!--<v-checkbox-->
                                    <!--class="mb-0"-->
                                    <!--:label="`Create New Main Outlet`"-->
                            <!--&gt;</v-checkbox>-->

                            <v-container fluid>
                                {{selected}}
                                <v-checkbox
                                        v-model="selected"
                                        label="Create New Main Outlet"
                                        value="true"
                                        @click.native="refreshInput"
                                ></v-checkbox>
                            </v-container>

                        </v-col>
                    </v-row>
                    <v-row v-if="showMainOutlet">
                        <v-col  cols="6" sm="6" md="6" >
                            <v-text-field
                                    name="main_outlet_name"
                                    v-model="form.main_outlet_name"
                                    label="Name*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="main_outlet_pic_name"
                                    v-model="form.main_outlet_pic_name"
                                    label="PIC Name*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="main_outlet_phone_number"
                                    v-model="form.main_outlet_phone_number"
                                    label="Phone Number*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="main_outlet_alt_phone_number"
                                    v-model="form.main_outlet_alt_phone_number"
                                    label="Alternative Phone Number*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                            ></v-text-field>
                        </v-col>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="main_outlet_email"
                                    v-model="form.main_outlet_email"
                                    label="Email"
                                    outlined
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <SelectCustomerTag
                                    class="pl-4 pr-4"
                                    name="customer_tag"
                                    v-model="customerTag"
                                    :watchCustomerTag="customerTag"
                                    @selected="customerTagSelected"
                            ></SelectCustomerTag>
                            <v-textarea
                                    name="main_outlet_note"
                                    v-model="form.main_outlet_note"
                                    :counter="250"
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Note
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <hr>
                    <v-row v-if="showMainOutlet">
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Finance Info</h3>
                        </v-col>
                    </v-row>
                    <v-row v-if="showMainOutlet">
                        <v-col  cols="6" sm="6" md="6">
                            <SelectArea @selected="areaSelected" required :error="error.finance_area_id" class="mb-0"></SelectArea>
                            <SelectInvoiceTerm @selected="invoicetermSelected" required :error="error.invoice_term_id" class="mb-0"></SelectInvoiceTerm>
                            <SelectSalesTerm @selected="salestermSelected" required :error="error.sales_term_id" class="mb-0"></SelectSalesTerm>
                        </v-col>
                        <v-col  cols="6" sm="6" md="6">
                            <SelectPaymentMethod @selected="paymentmethodSelected" required :error="error.payment_method_id" class="mb-0"></SelectPaymentMethod>
                            <v-textarea
                                    name="billing_address"
                                    v-model="form.billing_address"
                                    :counter="250"
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Billing Address*
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <hr>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Outlet</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Basic Info</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="outlet_name"
                                    v-model="form.outlet_name"
                                    label="Outlet Name*"
                                    required
                                    outlined
                                    prefix="form.merchant_id"
                                    suffix=form.merchant_id
                                    class="pl-4 pr-4"
                                    :error="error.outlet_name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <hr>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Sales Info</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <SelectArchetype @selected="archetypeSelected" required :error="error.archetype_id" class="mb-0" :clear="clearArchetype"></SelectArchetype>
                            <selectSalesPerson @selected="salespersonSelected" required :error="error.salesperson_id" class="mb-0" :clear="clearSalesperson"></selectSalesPerson>
                        </v-col>
                        <v-col  cols="6" sm="6" md="6">
                            <SelectPriceSet @selected="pricesetSelected" required :error="error.price_set_id" class="mb-0" :clear="clearPrice_set"></SelectPriceSet>
                        </v-col>
                    </v-row>
                    <hr>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Shipping Info</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="outlet_pic_name"
                                    v-model="form.outlet_pic_name"
                                    label="PIC Name*"
                                    required
                                    outlined
                                    :error="error.outlet_pic_name"

                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="outlet_phone_number"
                                    v-model="form.outlet_phone_number"
                                    label="Phone Number*"
                                    required
                                    outlined
                                    :error="error.outlet_phone_number"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="outlet_alt_phone_number"
                                    v-model="form.outlet_alt_phone_number"
                                    label="Alt Phone Number"
                                    outlined
                                    :error="error.outlet_alt_phone_number"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-textarea
                                    name="shipping_address"
                                    v-model="form.shipping_address"
                                    :counter="250"
                                    outlinedArchetype
                                    :error="error.shipping_address"
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Shipping Address*
                                    </div>
                                </template>
                            </v-textarea>
                            <v-textarea
                                    name="outlet_note"
                                    v-model="form.outlet_note"
                                    :counter="250"
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Note
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="area"
                                    v-model="areaValue"
                                    label="Area*"
                                    required
                                    outlined
                                    disabled
                                    class="pl-4 pr-4"
                                    :error-messages="error.area_id"
                            ></v-text-field>
                            <SelectProvince
                                    name="province"
                                    v-model="province"
                                    @selected="provinceSelected"
                                    :area_id="form.finance_area_id"
                                    :clear="clearProvince"
                                    required
                                    class="pl-4 pr-4"
                                    :disabled="disabled_province"
                                    :error-messages="error.province_id"
                            ></SelectProvince>
                            <SelectCity
                                    name="city"
                                    v-model="city"
                                    @selected="citySelected"
                                    :clear="clearCity"
                                    :area_id="form.area_id"
                                    :province_id="form.province_id"
                                    class="pl-4 pr-4"
                                    required
                                    :disabled="disabled_city"
                                    :error-messages="error.city_id"
                            ></SelectCity>
                            <SelectDistrict
                                    name="district"
                                    v-model="district"
                                    @selected="districtSelected"
                                    class="pl-4 pr-4"
                                    :area_id="form.area_id"
                                    :province_id="form.province_id"
                                    :city_id="form.city_id"
                                    :clear="clearDistrict"
                                    required
                                    :disabled="disabled_district"
                                    :error-messages="error.district_id"
                            ></SelectDistrict>
                            <SelectSubDistrict
                                    name="sub_district"
                                    v-model="sub_district"
                                    @selected="subdistrictSelected"
                                    class="pl-4 pr-4"
                                    :area_id="form.area_id"
                                    :province_id="form.province_id"
                                    :city_id="form.city_id"
                                    :district_id="form.district_id"
                                    :clear="clearDistrict"
                                    required
                                    :disabled="disabled_sub_district"
                                    :error="error.sub_district_id"
                            ></SelectSubDistrict>
                            <v-text-field
                                    name="postal_code"
                                    v-model="postal_code"
                                    label="Postal Code*"
                                    required
                                    outlined
                                    disabled
                                    class="pl-4 pr-4"
                                    :error-messages="error.postal_code"
                            ></v-text-field>
                            <SelectWarehouse
                                    name="default_warehouse"
                                    v-model="default_warehouse"
                                    @selected="defaultwarehouseSelected"
                                    class="pl-4 pr-4"
                                    required
                                    :area_id="form.finance_area_id"
                                    :disabled="disabled_warehouse"
                                    :clear="clearWarehouse"
                                    :error="error.default_warehouse_id"
                            ></SelectWarehouse>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-end pa-5">
                        <v-btn class="neutral" @click="cancel">cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data () {
            return {
                permission:[],

                selected:[],

                business_type:'B2B',
                finance_area:null,
                invoice_term:'',
                sales_term:'',
                payment_method:'',

                customerTag:null,
                areaValue:null,

                merchant:'',
                archetype:null,
                salesperson:null,
                price_set:null,

                outlet_area:null,

                clearArchetype:false,
                clearSalesperson:false,
                clearPrice_set:false,

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
                default_warehouse:null,
                clearWarehouse:false,
                disabled_warehouse:true,

                form:{
                        // MAIN OUTLET BASIC INFO
                    merchant_id:'',
                    main_outlet_name:'',
                    main_outlet_pic_name:'',
                    main_outlet_phone_number:'',
                    main_outlet_alt_phone_number:'',
                    main_outlet_email:'',
                    customer_tag:'',
                    // customer_tag:[],
                    main_outlet_note: '',
                        // MAIN OUTLET FINANCE INFO
                    finance_area_id:'',
                    sales_term_id:'',
                    invoice_term_id:'',
                    payment_method_id:'',
                    billing_address:'',
                        // OUTLET BASIC INFO
                    outlet_name:'',
                        // OUTLET SALES INFO
                    archetype_id:'',
                    salesperson_id:'',
                    price_set_id:'',
                        // OUTLET SHIPPING INFO
                    outlet_pic_name:'',
                    outlet_phone_number:'',
                    outlet_alt_phone_number:'',
                    shipping_address:'',
                    outlet_note:'',
                    area_id:'',
                    province_id:'',
                    city_id:'',
                    district_id:'',
                    sub_district_id:'',
                    default_warehouse_id:'',
                },
                error:{},
            }
        },
        methods:{
            async submit () {
                let id = [];
                if(this.customerTag){
                    await  this.customerTag.forEach((value) =>{
                        id.push(value.id)
                    });
                }
                console.log(
                    this.form,'Isi DD',this.selected,"========",this.form.customer_tag = id.join(",")
                )
                this.$http.post('/customer/branch',
                {
                    main_outlet_id : this.form.merchant_id,
                    main_outlet_business_type_id : '131072',
                    main_outlet_name : this.form.main_outlet_name,
                    main_outlet_pic_name : this.form.main_outlet_pic_name,
                    main_outlet_phone_number : this.form.main_outlet_phone_number,
                    main_outlet_alt_phone_number : this.form.main_outlet_alt_phone_number,
                    main_outlet_email : this.form.main_outlet_email,
                    customer_tag : this.form.customer_tag = id.join(","),
                    main_outlet_note : this.form.main_outlet_note,

                    finance_area_id : this.form.finance_area_id,
                    sales_term_id : this.form.sales_term_id,
                    invoice_term_id : this.form.invoice_term_id,
                    payment_method_id : this.form.payment_method_id,
                    billing_address : this.form.billing_address,

                    outlet_name : this.form.outlet_name,
                    archetype_id : this.form.archetype_id,
                    salesperson_id : this.form.salesperson_id,
                    price_set_id : this.form.price_set_id,

                    outlet_pic_name : this.form.outlet_pic_name,
                    outlet_phone_number : this.form.outlet_alt_phone_number,
                    outlet_alt_phone_number : this.form.outlet_alt_phone_number,
                    shipping_address : this.form.shipping_address,
                    outlet_note : this.form.outlet_note,
                    sub_district_id : this.form.sub_district_id,
                    default_warehouse_id : this.form.default_warehouse_id,

                    new_merchant : this.selected[0],


                }).then(response => {
                    console.log(response,'Success')
                    this.$router.push('/customer/branch');
                })
                .catch(e => {
                    console.log(e)
                    this.error = e.errors
                });
            },
            cancel(){
                this.$router.push('/customer/branch');
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
            customerTagSelected(d) {
                this.customerTag = null;
                // this.form.customer_tag = '';
                if (d !== ''  && d !== undefined) {
                    this.customerTag = d;
                    // this.form.customer_tag = d.id
                }
            },
            merchantSelected(d) {
                this.merchant = null;
                this.form.merchant_id = '';

                this.form.outlet_name = ''

                this.clearArchetype = true
                this.clearSalesperson = true
                this.clearPrice_set = true

                this.archetype = null
                this.form.archetype_id = ''
                this.salesperson = null
                this.form.salesperson_id = ''
                this.price_set = null
                this.price_set_id = ''

                this.form.outlet_pic_name = ''
                this.form.outlet_phone_number = ''
                this.form.outlet_alt_phone_number = ''
                this.form.shipping_address = ''
                this.form.outlet_note = ''

                this.areaValue = null
                this.disabled_province = true;
                this.clearProvince = true
                this.disabled_city = true;
                this.clearCity = true
                this.disabled_district = true;
                this.clearDistrict = true
                this.disabled_sub_district = true;
                this.clearSub_district = true
                this.postal_code = ''
                this.disabled_warehouse = true;
                this.clearWarehouse = true

                if (d !== '' && d !== undefined) {
                    console.log(d, "tetes")
                    this.merchant = d;
                    this.form.merchant_id = d.id

                    // if merchant selected
                    this.areaValue = d.finance_area.name
                    this.form.main_outlet_name = d.name
                    this.form.main_outlet_pic_name = d.pic_name
                    this.form.main_outlet_phone_number = d.phone_number
                    this.form.main_outlet_alt_phone_number = d.alt_phone_number
                    this.form.main_outlet_email = d.email
                    this.form.customer_tag = d.tag_customer
                    this.form.main_outlet_note = d.note
                    this.form.finance_area_id = d.finance_area.id
                    this.form.sales_term_id = d.payment_term.id
                    this.form.invoice_term_id = d.invoice_term.id
                    this.form.payment_method_id = d.payment_method.id
                    this.form.billing_address = d.billing_address

                    this.disabled_province = false;
                    this.clearProvince = false
                }
            },
            archetypeSelected(d) {
                this.archetype = null;
                this.form.archetype_id = '';
                if (d !== '' && d !== undefined) {
                    this.archetype = d;
                    this.form.archetype_id = d.id
                }
            },
            salespersonSelected(d) {
                this.salesperson = null;
                this.form.salesperson_id = '';
                if (d !== '' && d !== undefined) {
                    this.salesperson = d;
                    this.form.salesperson_id = d.id
                }
            },
            areaSelected(d) {
                this.areaValue = null
                this.finance_area = null;
                this.form.finance_area_id = '';
                this.default_warehouse = null;
                this.form.default_warehouse_id = '';
                this.sub_district = null;
                this.form.sub_district_id = '';

                this.province = null;
                this.form.province_id = '';

                this.clearProvince = true;
                this.clearCity = true;
                this.clearDistrict = true;
                this.clearSub_district =true;
                this.clearWarehouse =true;

                this.disabled_province = true;
                this.disabled_city = true;
                this.disabled_district = true;
                this.disabled_sub_district = true;
                this.postal_code = ''
                this.disabled_warehouse = true;

                if (d !== '' && d !== undefined) {
                    this.finance_area = d;
                    this.areaValue = d.name
                    this.form.finance_area_id = d.id

                    this.disabled_province = false;
                    this.clearProvince = false

                    this.disabled_warehouse = false
                    this.clearWarehouse = false
                }
            },
            salestermSelected(d) {
                this.sales_term = null;
                this.form.sales_term_id = '';
                if (d !== '' && d !== undefined) {
                    this.sales_term = d;
                    this.form.sales_term_id = d.id
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
            pricesetSelected(d) {
                this.price_set = null;
                this.form.price_set_id = '';
                if (d !== '' && d !== undefined) {
                    this.price_set = d;
                    this.form.price_set_id = d.id
                }
            },
            provinceSelected(d) {
                this.province = null;
                this.form.province_id = '';

                this.city = null;
                this.form.city_id = '';

                this.clearCity = true
                this.disabled_city = true
                if (d !== '' && d !== undefined) {
                    this.province = d;
                    this.form.province_id = d.province_id

                    this.disabled_city = false
                    this.clearCity = false
                }
            },
            citySelected(d) {
                this.city = null;
                this.form.city_id = '';

                this.district = null;
                this.form.district_id = '';

                this.clearDistrict = true
                if (d !== '' && d !== undefined) {
                    this.city = d;
                    this.form.city_id = d.city_id

                    this.disabled_district = false
                    this.clearDistrict = false
                }
            },
            districtSelected(d) {
                this.district = null;
                this.form.district_id = '';

                this.sub_district = null;
                this.form.sub_district_id = '';

                this.clearWarehouse = true
                if (d !== '' && d !== undefined) {
                    this.district = d;
                    this.form.district_id = d.district_id

                    this.disabled_sub_district = false
                    this.clearSub_district = false
                }
            },
            subdistrictSelected(d) {
                this.sub_district = null;
                this.form.sub_district_id = '';
                this.postal_code = null

                this.sub_district = null;
                this.form.sub_district_id = '';

                if (d !== '' && d !== undefined) {
                    this.sub_district = d;
                    this.form.sub_district_id = d.sub_district_id
                    this.postal_code = d.postal_code

                    this.disabled_warehouse = false
                    this.clearWarehouse = false
                }
            },
            defaultwarehouseSelected(d) {
                this.default_warehouse = null;
                this.form.default_warehouse_id = '';
                if (d !== '' && d !== undefined) {
                    this.default_warehouse = d;
                    this.form.default_warehouse_id = d.id
                }
            },
            refreshInput(){
                this.merchant = null
                this.form.merchant_id = ''

                this.areaValue = null
                this.disabled_province = true;
                this.clearProvince = true
                this.disabled_city = true;
                this.clearCity = true
                this.disabled_district = true;
                this.clearDistrict = true
                this.disabled_sub_district = true;
                this.clearSub_district = true
                this.postal_code = ''
                this.disabled_warehouse = true;
                this.clearWarehouse = true

                this.form.main_outlet_name = ''
                this.form.main_outlet_pic_name = ''
                this.form.main_outlet_phone_number = ''
                this.form.main_outlet_alt_phone_number = ''
                this.form.main_outlet_email = ''
                this.form.customer_tag = ''
                this.form.main_outlet_note = ''

                this.area = null
                this.form.area_id = ''
                this.sales_term = null
                this.form.sales_term_id = ''
                this.invoice_term = null
                this.form.invoice_term_id = ''
                this.payment_method = null
                this.form.payment_method_id = ''
                this.form.billing_address = ''
            }
        },
        computed:{
            showMainOutlet(){
                return this.selected.length > 0
            }
        }
    }
</script>
