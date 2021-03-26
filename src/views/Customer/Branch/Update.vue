<template>
    <v-form>
        <v-container>
            <v-card >
                <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon>UPDATE OUTLET
                </v-subheader>
                <v-col cols="12" sm="0"></v-col>
                <form>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Basic Info</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <v-text-field
                                    name="code"
                                    v-model="form.code"
                                    label="Code*"
                                    outlined
                                    disabled
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    label="Name*"
                                    outlined
                                    disabled
                                    class="pl-4 pr-4"
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
                            <SelectArchetype @selected="archetypeSelected" :archetype="archetype" required :error="error.archetype_id" disabled class="mb-0"></SelectArchetype>
                            <selectSalesPerson @selected="salespersonSelected" :sales_person="salesperson" required :error="error.salesperson_id" disabled class="mb-0"></selectSalesPerson>
                            <selectPriceSet @selected="pricesetSelected" :price_set="price_set" required :error="error.price_set_id" class="mb-0"></selectPriceSet>
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
                                    name="pic_name"
                                    v-model="form.pic_name"
                                    label="PIC Name*"
                                    required
                                    outlined
                                    :error="error.pic_name"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="phone_number"
                                    v-model="form.phone_number"
                                    label="Phone Number*"
                                    required
                                    outlined
                                    :error="error.phone_number"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="alt_phone_number"
                                    v-model="form.alt_phone_number"
                                    label="Alt Phone Number"
                                    outlined
                                    :error="error.alt_phone_number"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-textarea
                                    name="shipping_address"
                                    v-model="form.shipping_address"
                                    :counter="250"
                                    outlined
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
                                    name="note"
                                    v-model="form.note"
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
                            <SelectArea
                                    name="area"
                                    v-model="area"
                                    @selected="areaSelected"
                                    required
                                    class="pl-4 pr-4"
                                    :error="error.area_id"
                                    :area="area"
                                    disabled
                            ></SelectArea>
                            <p>Current Province : {{this.province_name}}</p>
                            <SelectProvince
                                    name="province"
                                    v-model="province"
                                    @selected="provinceSelected"
                                    :area_id="form.area_id"
                                    :clear="clearProvince"
                                    required
                                    class="pl-4 pr-4"
                                    :disabled="disabled_province"
                                    :error-messages="error.province_id"
                            ></SelectProvince>
                            <p>Current City : {{this.city_name}}</p>
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
                            <p>Current District : {{this.district_name}}</p>
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
                            <p>Current Sub District : {{this.sub_district_name}}</p>
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
                                    :area_id="form.area_id"
                                    :disabled="disabled_warehouse"
                                    :update="update"
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
                archetype:null,
                salesperson:null,
                price_set:null,

                area:null,

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

                default_warehouse:null,
                clearWarehouse:false,
                disabled_warehouse:true,

                update:true,

                postal_code:'',
                form:{
                    code:'',
                    archetype_id:'',
                    salesperson_id:'',
                    price_set_id:'',
                    pic_name:'',
                    phone_number:'',
                    alt_phone_number:'',
                    shipping_address:'',
                    note:'',
                    province_id:'',
                    area_id:'',
                    sub_district_id:'',
                    default_warehouse_id:'',
                },

                province_name:'',
                city_name:'',
                district_name:'',
                sub_district_name:'',
                error:{},
            }
        },
        methods:{
            submit () {
                console.log(
                    this.form,'Isi DD'
                )
                this.$http.put('/customer/branch/'+ this.$route.params.id,
                {
                    price_set_id: this.form.price_set_id,
                    pic_name: this.form.pic_name,
                    phone_number: this.form.phone_number,
                    alt_phone_number: this.form.alt_phone_number,
                    shipping_address: this.form.shipping_address,
                    note: this.form.note,
                    sub_district_id: this.form.sub_district_id,
                    default_warehouse_id: this.form.default_warehouse_id,
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
            pricesetSelected(d) {
                this.price_set = null;
                this.form.price_set_id = '';
                if (d !== '' && d !== undefined) {
                    this.price_set = d;
                    this.form.price_set_id = d.id
                }
            },
            areaSelected(d) {
                this.area = null;
                this.form.area_id = '';

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
                // this.disabled_warehouse = true;
                this.form.postal_code = ''
                if (d !== ''  && d !== undefined) {
                    this.area = d;
                    this.form.area_id = d.id;

                    this.disabled_province = false;
                    this.clearProvince = false
                }
            },
            provinceSelected(d) {
                this.province = null;
                this.form.province_id = '';

                this.city = null;
                this.form.city_id = '';

                this.clearCity = true
                this.disabled_city = true

                this.clearDistrict = true
                this.disabled_district = true

                this.clearSub_district =true;
                this.disabled_sub_district = true;

                this.form.postal_code = ''

                if (d !== '' && d !== undefined) {
                    this.province = d;
                    this.form.province_id = d.id

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
                this.disabled_district = true

                this.clearSub_district =true;
                this.disabled_sub_district = true;

                this.clearDistrict = true
                if (d !== '' && d !== undefined) {
                    this.city = d;
                    this.form.city_id = d.id

                    this.disabled_district = false
                    this.clearDistrict = false
                }
            },
            districtSelected(d) {
                this.district = null;
                this.form.district_id = '';

                this.sub_district = null;
                this.form.sub_district_id = '';

                this.clearSub_district =true;
                this.disabled_sub_district = true;

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
            renderData(){
                this.$http.get("/customer/branch/"+ this.$route.params.id,{
                    params:{
                        embeds:'sub_district_id,sub_district_id.area,sub_district_id.district_id.city_id.province_id'
                    }
                })
                    .then(response => {
                        console.log(response.data.data, "popopopopopop")
                        this.form = response.data.data
                        this.archetypeSelected(response.data.data.archetype)
                        this.salespersonSelected(response.data.data.salesperson)
                        this.pricesetSelected(response.data.data.price_set)
                        this.areaSelected(response.data.data.area)
                        this.provinceSelected(response.data.data.sub_district.district.city.province)
                        this.citySelected(response.data.data.sub_district.district.city)
                        this.districtSelected(response.data.data.sub_district.district)
                        this.subdistrictSelected(response.data.data.sub_district)
                        this.defaultwarehouseSelected(response.data.data.warehouse)

                        this.province_name = response.data.data.sub_district.district.city.province.name
                        this.city_name = response.data.data.sub_district.district.city.name
                        this.district_name = response.data.data.sub_district.district.name
                        this.sub_district_name = response.data.data.sub_district.name
                    });
            },
        },
        mounted() {
            this.renderData()
        },
    }
</script>
