<template>

    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'UomCreate' }" class="routerLink d-flex justify-end" v-privilege="'uom_crt'">
                        <v-btn
                            style= "display: none; background-color: #768F9C !important; border-color: #768F9C !important;"
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
                        :items="regStatus"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        class="rounded-form"
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype @selected="archetypeSelected"></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3">
                  <SelectArchetypeByAlias @selected="typeSelected"></SelectArchetypeByAlias>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea @selected="areaSelected"></SelectArea>
                </v-col>
            </v-row>
        </v-col>
    <div class="title-table">
        <label class="label-title">
            Prospective Customer
        </label>
    </div>
        <v-data-table
            :mobile-breakpoint="0"
            :headers="table.fields"
            :items="items"
            :loading="loading"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.archetype.name }}</td>
                    <td>{{ props.item.business_type_name }}</td>
                    <td>{{ props.item.sub_district.area.name }}</td>
                    <td>{{ props.item.sub_district.district.city.province.name }}</td>
                    <td>{{ props.item.sub_district.district.city.name }}</td>
                    <td>{{ props.item.sub_district.district.name }}</td>
                    <td>{{ props.item.sub_district.name }}</td>
                    <td>     <v-chip
                            class="ma-2"
                            :color="statusMaster(props.item.reg_status === 1 ? 'new' : props.item.reg_status === 2 ? 'registered' : 'decline')"
                            :text-color="statusMasterText(props.item.reg_status === 1 ? 'new' : props.item.reg_status === 2 ? 'registered' : 'decline')"
                    >
                        {{props.item.reg_status === 1 ? 'New' : props.item.reg_status === 2 ? 'Registered' : 'Decline'}}
                    </v-chip></td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                    <template>
                                        <v-btn
                                                icon
                                                v-on="{ ...menu }"
                                        >  <v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                    </template>
                            </template>
                            <v-list style="background-color: #E8EFF2;">
                                <v-list-item>
                                    <v-list-item-title ><router-link style="color: #333333; text-decoration: none;" :to="{ name: 'ProspectCustomerDetail', params: { id: props.item.id } }">Detail</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item  @click="register=true">
                                    <v-list-item-content>
                                        <v-list-item-title>Register</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="props.item.reg_status === 1"
                                             @click="dialog(props.item.id)"
                                >
                                    <v-list-item-title ><router-link style="color: #333333; text-decoration: none;"  :to="{ name: '' }" >Decline</router-link></v-list-item-title>
                                </v-list-item>
                                <router-view></router-view>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-dialog
            v-model="register"
            persistent
            max-width="402px"
        >
            <v-card class="Heiti" style="border-radius: 15px;">
                <v-card-title>
                    <span class="fs25 second-color pt-4" style="margin: auto;">Register Prospective Customer</span>
                </v-card-title>
                <v-card-text>
                    <v-img width="235" style="margin: auto;" src="/img/register-customer.png" alt="" />
                    <SelectArchetype
                        name="archetype_name"
                        v-model="archetype"
                        @selected="archetypeSelected"
                        required
                        class="pt-6"
                    ></SelectArchetype>
                </v-card-text>
                <v-card-actions class="d-flex justify-end pb-4">
                    <v-btn 
                        rounded 
                        elevation="0" 
                        class="no-caps px-7" 
                        @click="register = false"
                        style="background: #E6E9ED;color:#768F9C;height:45px"
                    >Cancel</v-btn>
                    <v-btn 
                        v-if="!archetype"
                        disabled
                        class="px-7 ml-2 no-caps white--text" 
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                    >Next</v-btn>
                    <v-btn 
                        v-if="archetype"
                        class="px-7 ml-2 no-caps white--text" 
                        :to="{ name: 'BranchCreate' }"
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                    >Next</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="openDialog" max-width="400" >
            <v-card class="py-5">
                <v-row no-gutters style="text-align: center">
                    <v-col cols="12">
                        <h3>Decline</h3>
                    </v-col>
                    <v-col cols="12">
                        Are you sure to decline this prospective customer?
                    </v-col>
                </v-row>

                <v-card-actions class="justify-center mt-5">
                    <v-btn
                            class="rounded-xl mx-2 white--text"
                            color="#cc0000"
                            style="color: black"
                            @click="dialog()"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            class="rounded-xl mx-2"
                            color="#ffffff"
                            style="color: black"
                            @click="decline()"
                    >
                        Decline
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    export default {
        name: "ProspectCustomer",
        data() {
            return {
                id:'',
                search: '',
                loading: false,
                openDialog: false,
                type:null,
                area:null,
                archetype: null,
                register: false,
                statuses:999,
                regStatus:[{
                    text:'All Status',
                    value:999
                },{
                    text:'New',
                    value:1
                },{
                    text:'Registered',
                    value:2
                },{
                    text:'Decline',
                    value:3
                }],
                table: {
                    fields: [
                        {
                            text:'Name',
                            sortable: false,
                        },
                        {
                            text:'Archetype',
                            sortable: false
                        },
                        {
                            text:'Type',
                            sortable: false
                        },
                        {
                            text:'Area',
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
                filter:{
                    type:'',
                    area_id:'',
                    archetype_id:''
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.statuses,'','','')
        },
        methods: {
            renderData(search,statuses,type,areaID,archetypeID){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|reg_status:"+statuses
                }
                if(type!== '' && type !== undefined){
                    type ='|business_type_name:'+type
                }else{
                    type = ''
                }
                if(areaID === ''){
                    areaID = ''
                }else{
                    areaID = "|sub_district_id.area_id.id.e:"+ areaID
                }
                if(archetypeID === ''){
                    archetypeID = ''
                }else{
                    archetypeID = "|archetype_id.e:"+archetypeID
                }
                this.$http.get("/customer/prospect_customer",{params:{
                        perpage:100,
                        embeds:'archetype,archetype_id.businesstype,sub_district_id,sub_district_id.area,sub_district_id.district,sub_district_id.district.city,sub_district_id.district.city.province',
                        conditions:'name.icontains:'+search+statuses+type+areaID+archetypeID,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    console.log(response.data.data)
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            archetypeSelected(d){
                this.archetype = null;
                this.filter.archetype_id = '';
                if(d !== '' && d !== undefined){
                    this.archetype = d;
                    this.filter.archetype_id = d.id
                }
            },
            typeSelected(d){
                this.type = null;
                this.filter.type = '';
                if(d !== '' && d !== undefined){
                    this.type = d;
                    this.filter.type = d.alias_name_idn;
                }
            },
            areaSelected(d){
                this.area = null;
                this.filter.area_id = '';
                if(d !== '' && d !== undefined){
                    this.area = d;
                    this.filter.area_id = d.id;
                }
            },
            decline(){
                this.$http.put("/customer/prospect_customer/decline/" +this.id,{})
                    .then(response => {
                        window.location.reload()
                    })
                    .catch(e => {
                        this.error = e.errors
                    });
            },
            dialog(id){
                if(id){
                    this.openDialog = true;
                    this.id = id;
                }else {
                    this.id = '';
                    this.openDialog = false;
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this;
                    that.renderData(val,this.statuses,this.filter.type,this.filter.area_id,this.filter.archetype_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this;
                    that.renderData(this.search,val,this.filter.type,this.filter.area_id,this.filter.archetype_id)
                },
                deep: true
            },
            'filter.type': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,val,this.filter.area_id,this.filter.archetype_id)
                },
                deep: true
            },
            'filter.area_id': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,this.filter.type,val,this.filter.archetype_id)
                },
                deep: true
            },
            'filter.archetype_id':{
                handler: function (val) {
                    let that = this
                    that.renderData(this.search, this.statuses, this.filter.type, this.filter.area_id, val)
                }
            }
        },
    }
</script>