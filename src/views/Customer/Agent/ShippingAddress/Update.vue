<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <v-breadcrumbs-item
                slot="item"
                slot-scope="{ item }"
                exact
                v-if="item.to"
                :to="item.to">
                {{ item.text }}
            </v-breadcrumbs-item>
            <v-breadcrumbs-item
                style="color:#9C9C9C"
                v-else>
                {{ item.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
    <v-container class="px-12">
        <v-row>
            <v-col>
                <v-text-field
                    name="code"
                    v-model="forms.merchant.code"
                    required
                    outlined
                    class="rounded-form"
                    disabled
                >
                    <template v-slot:label>
                        Code 
                    </template>
                </v-text-field>
            </v-col>
            <v-col>

            </v-col>
        </v-row>
        <v-row style="margin-top:-24px">
            <v-col>
                <v-text-field
                    name="code"
                    v-model="forms.name"
                    required
                    outlined
                    class="rounded-form"
                    disabled
                >
                    <template v-slot:label>
                        Name 
                    </template>
                </v-text-field>
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
                    :city="city"
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
                    :sub_district="sub_district"
                    :disabled="disabled_sub_district"
                    :error="error.sub_district_id"
                ></SelectSubDistrict>
            </v-col>
            <v-col>
                <SelectArea
                    name="area"
                    @selected="areaSelected"
                    required
                    :label="'Finance Area'"
                    :area="area"
                    disabled
                    :error="error.finance_area_id"
                ></SelectArea>
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
                    :province="province"
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
                    :district="district"
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
    </div>
</template>

<script>
    export default {
        name: 'ShippingAddressUpdate',
        data () {
            return {
                ConfirmData : {},
                area:{},
                areaValue:'',
                postal_code:'',

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
                forms:{
                    merchant : {
                        business_type:{
                            id:""
                        }
                    }
                },
                form:{
                    address_name:"",
                    recipient_name:"",
                    recipient_phone_number:"",
                    recipient_alt_phone_number:"",
                    shipping_address:"",
                    shipping_note:"",
                    merchant_id:"",
                    archetype_id:"",
                    price_set_id:"",
                    salesperson_id:"",
                    area_id:"",
                    sub_district_id:"",
                    warehouse_id:""
                },
                error:{},
                breadcrumbs : [
                    {
                        text: 'Agent List',
                        to : '/customer/agent'
                    },
                    {
                        text: 'Agent Detail',
                        to : ''
                    },
                    {
                        text: 'Update Shipping Address',
                    },
                ],
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Shipping Address",
                    text : "Are you sure want to update this Shipping Address?",
                    urlApi : "/customer/agent/shipping/address/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.forms.merchant.id,
                    data : this.form
                }
            },
            renderData(){
                this.$http.get("/customer/agent/shipping/address/"+this.$route.params.id).then(response => {
                    this.forms = response.data.data
                    this.breadcrumbs[1].to = '/customer/agent/detail/'+this.forms.merchant.id
                    this.form={
                        address_name:this.forms.address_name,
                        recipient_name:this.forms.pic_name,
                        recipient_phone_number:this.forms.phone_number,
                        recipient_alt_phone_number:this.forms.alt_phone_number,
                        shipping_address:this.forms.shipping_address,
                        shipping_note:this.forms.note,
                        area_id:"",
                        sub_district_id:""
                    }
                    this.areaSelected(response.data.data.merchant.finance_area);
                    let prov = response.data.data.sub_district.district.city.province
                    let prov1 = {
                        province_id : prov.id,
                        province_name : prov.name
                    }
                    this.provinceSelected(prov1);
                    let city = response.data.data.sub_district.district.city
                    let city1 = {
                        city_id : city.id,
                        city_name : city.name
                    }
                    this.citySelected(city1);
                    let dist = response.data.data.sub_district.district
                    let dist1 = {
                        district_id : dist.id,
                        district_name : dist.name
                    }
                    this.districtSelected(dist1);
                    let subd = response.data.data.sub_district
                    let subd1 = {
                        sub_district_id : subd.id,
                        sub_district_name : subd.name,
                        postal_code : subd.postal_code,
                        area_id : subd.area.id,
                        area_name : subd.area.name,
                    }
                    this.subdistrictSelected(subd1);
                });
            },
            areaSelected(d) {
                this.area = null;
                if (d) {
                    this.area = d;
                }
            },
            provinceSelected(d) {
                this.areaValue = '';
                this.form.area_id = ''
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
                this.form.area_id = ''
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
                this.form.area_id = ''
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
                this.areaValue = '';
                this.form.area_id = ''
                this.sub_district = null;
                this.form.sub_district_id = '';
                this.postal_code = null

                this.sub_district = null;
                this.form.sub_district_id = '';

                if (d) {
                    this.form.area_id = d.area_id
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
        created(){
            this.renderData()
        },
    }
</script>
