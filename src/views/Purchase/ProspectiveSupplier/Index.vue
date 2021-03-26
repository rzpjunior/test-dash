<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'UomCreate' }" class="routerLink d-flex justify-end" v-privilege="'uom_crt'">
                        <v-btn
                            style= "display: none;background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create UOM
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="4" offset="6">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    style="margin-top:-10px;"
                                    v-on="{ ...tooltip }"
                                    rounded
                                    outlined
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-subheader>
        <v-row class="px-3 mt-12">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid">
        <v-col cols="12" class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="12" md="3">
                    <v-select
                            v-model="statuses"
                            :items="status_prospect"
                            item-text="text"
                            item-value="value"
                            label="Status"
                            outlined
                            class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectProvince @selected="provinceSelected"></SelectProvince>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectCity @selected="citySelected"></SelectCity>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectDistrict @selected="districtSelected"></SelectDistrict>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Prospective Supplier
            </label>
        </div>
        <v-data-table
            :mobile-breakpoint="0"
            :headers="table.fields"
            :items="items"
            :items-per-page="10"

        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span>
                    </td>
                    <td>{{ props.item.pic_name }}<br>
                        <span class="second-color">{{ props.item.phone_number }}</span>
                    </td>
                    <td>{{ props.item.sub_district.district.city.province.name }}</td>
                    <td>{{ props.item.sub_district.district.city.name }}</td>
                    <td>{{ props.item.sub_district.district.name }}</td>
                    <td>{{ props.item.sub_district.name  }}</td>
                    <td>
                        <v-chip
                            class="ma-2"
                            :color="statusMaster(props.item.reg_status === 1 ? 'new' : props.item.reg_status === 2 ? 'registered' : 'decline')"
                            :text-color="statusMasterText(props.item.reg_status === 1 ? 'new' : props.item.reg_status === 2 ? 'registered' : 'decline')"
                    >
                        {{ props.item.reg_status == 1 ? 'New' :  props.item.reg_status == 2 ? 'Registered' : 'Decline'}}
                        </v-chip>
                        </td>

                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                        icon
                                        v-on="{ ...tooltip, ...menu }"
                                ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                            </template>
                            <v-list style="background-color: #E8EFF2;">
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" class="routerLink" :to="{ name: 'ProspectSupplierDetail', params: { id: props.item.id } }" >Detail</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="props.item.reg_status == 1"
                                             @click="register(props.item.id, props.item.street_address, props.item.name, props.item.phone_number, props.item.pic_name, props.item.pic_phone_number, props.item.sub_district.id)"
                                >
                                    <router-link style="color: #333333; text-decoration: none;" class="routerLink" :to="{ name: 'SupplierCreate' }" >Register</router-link>
                                </v-list-item>
                                <v-list-item v-if="props.item.reg_status == 1"
                                             @click="decline(props.item.id)"
                                >
                                    <router-link style="color: #333333; text-decoration: none;" class="routerLink" :to="{ name: '' }" >Decline</router-link>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <ModalDirection v-model="modalOpen" :sendData=confirmation></ModalDirection>

    </v-container>
</template>

<script>
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "ProspectSupplier",
        components: {
            ModalDirection
        },
        data() {
            return {
                modalOpen: false,

                search: '',
                city: '',
                province: '',
                district: '',
                statuses:999,
                dialog:false,
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                            // value: 'item_name'
                        },
                        {
                            text:'PIC Name',
                            sortable: false
                        },
                        {
                            text:'Province',
                            sortable: false
                        },
                        {
                            text:'City',
                            sortable: false
                        },
                        {
                            text:'District',
                            sortable: false
                        },
                        {
                            text:'Subdistrict',
                            sortable: false
                        },
                        {
                            text:'Status',
                            sortable: false
                        },
                        {
                            sortable: false
                        },
                    ],
                },
                items:[],
                bucket:{},
                filter:{
                    city_id: '',
                    province_id: '',
                    district_id: ''
                },
                confirmation:{
                    valueName: 'Prospect Supplier',
                    action:'',
                    status: '',
                    urlPath:'',
                    parentPath:'/purchase/prospective/supplier',
                }
            }
        },
        mounted() {
            this.renderData('',this.statuses,'','','')
        },
        methods: {
            renderData(search,statuses,cityID,provinceID,districtID){
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|reg_status:"+statuses
                }
                if(cityID === ''){
                    cityID = ''
                }else{
                    cityID = "|sub_district_id.district.city.id.e:"+cityID
                }
                if(provinceID === ''){
                    provinceID = ''
                }else{
                    provinceID = "|sub_district_id.district.city.province.id.e:"+provinceID
                }
                if(districtID === ''){
                    districtID = ''
                }else{
                    districtID = "|sub_district_id.district.id.e:"+districtID
                }
                this.$http.get("/purchase/prospect/supplier",{params:{
                        perpage:10000,
                        embeds: 'sub_district_id,sub_district_id.area,sub_district_id.district,sub_district_id.district.city,sub_district_id.district.city.province',
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'+cityID+provinceID+districtID,
                        orderby:'-id',
                    }}).then(response => {
                    this.items = response.data.data
                    if(this.items === null){
                        this.bucket = response.data.data

                        this.items = []
                    }
                });
            },

            provinceSelected(d){
                this.province = null;
                this.filter.province_id = '';
                if(d !== '' && d !== undefined){
                    this.province = d;
                    this.filter.province_id = d.id
                }
            },

            citySelected(d){
                this.city = null;
                this.filter.city_id = '';
                if(d !== '' && d !== undefined){
                    this.city = d;
                    this.filter.city_id = d.id
                }
            },

            districtSelected(d){
                this.district = null;
                this.filter.district_id = '';
                if(d !== '' && d !== undefined){
                    this.district = d;
                    this.filter.district_id = d.id
                }
            },

            register(id, address, name, phone_number, pic_name, pic_phone_number, sub_district_id){
                this.confirmation.action = 'Register'
                this.confirmation.status = '4'
                this.confirmation.urlPath ='/purchase/prospect/supplier/register/'+id;

                this.confirmation.address = address
                this.confirmation.name = name
                this.confirmation.phone_number = phone_number;
                this.confirmation.pic_name = pic_name;
                this.confirmation.pic_phone_number = pic_phone_number;
                this.confirmation.sub_district_id = sub_district_id;

                this.modalOpen = !this.modalOpen;
            },
            decline(id){
                this.confirmation.action = 'Decline'
                this.confirmation.status = '5'
                this.confirmation.urlPath ='/purchase/prospect/supplier/decline/'+id;
                this.modalOpen = !this.modalOpen;
            }
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses, this.filter.city_id, this.filter.province_id, this.filter.district_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val, this.filter.city_id, this.filter.province_id, this.filter.district_id)
                },
                deep: true
            },
            'filter.city_id': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,this.statuses, val, this.filter.province_id, this.filter.district_id)
                },
                deep: true
            },
            'filter.province_id': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,this.statuses, this.filter.city_id, val, this.filter.district_id)
                },
                deep: true
            },
            'filter.district_id': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,this.statuses, this.filter.city_id, this.filter.province_id, val)
                },
                deep: true
            },
        },
    }
</script>

<style scoped>
</style>
