<template>
    <v-container class="Heiti px-12">
        <v-subheader>
           <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'VoucherCreate' }" class="routerLink d-flex justify-end" v-privilege="'rol_crt'">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Voucher
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
                            :items="status"
                            item-text="text"
                            item-value="value"
                            label="Status"
                            outlined
                            class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                            v-model="type"
                            :items="types"
                            item-text="text"
                            item-value="value"
                            label="Type"
                            outlined
                            class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea @selected="areaSelected"></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype @selected="archetypeSelected"></SelectArchetype>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Voucer List
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
                    <td>{{ props.item.redeem_code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.type === 1 ? 'Total Discount' : props.item.type === 2 ? 'Grand Total Discount' : 'Delivery Discount'}}</td>
                    <td>{{ props.item.start_timestamp | moment("DD/MM/YYYY HH:mm:ss") }} - {{ props.item.end_timestamp | moment("DD/MM/YYYY HH:mm:ss") }}</td>
                    <td>{{ props.item.overall_quota }}</td>
                    <td>{{ props.item.rem_overall_quota }}</td>
                    <td>{{ props.item.area.name }}</td>
                    <td>{{ props.item.archetype.name }}</td>
                    <td>     <v-chip
                            class="ma-2"
                            :color="statusMaster(props.item.status_convert)"
                            :text-color="statusMasterText(props.item.status_convert)"
                    >
                        {{props.item.status_convert.toUpperCase()}}
                    </v-chip></td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                                color="primary"
                                                dark
                                                v-on="{ ...menu }"
                                        >  <v-icon dark>mdi-format-list-bulleted-square</v-icon></v-btn>
                                    </template>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'VoucherDetail', params: { id: props.item.id } }">Detail</router-link></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "Voucher",
        data() {
            return {
                modalOpen: false,
                search: '',
                loading: false,
                types:[{
                    text:'All Type',
                    value:999
                },{
                    text:'Total Discount',
                    value:1
                },{
                    text:'Grand Total Discount',
                    value:2
                },{
                    text:'Delivery Discount',
                    value:3
                }],
                statuses:999,
                type:999,
                area:null,
                archetype:null,
                filter:{
                    area_id:'',
                    archetype_id:''
                },
                table: {
                    fields: [
                        {
                            text:'REDEEM CODE',
                            width: "10%",
                            sortable: false,
                        },
                        {
                            text:'NAME',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'TYPE',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'START - END',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'OVERALL QUOTA',
                            width: "5%",
                            sortable: false
                        },
                        {
                            text:'REMAINING QUOTA',
                            width: "5%",
                            sortable: false
                        },
                        {
                            text:'AREA',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'ARCHETYPE',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'STATUS',
                            width: "15%",
                            sortable: false
                        },
                        {
                            text:'ACTION',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        created() {
            this.renderData('',this.statuses,this.type,this.filter.area_id, this.filter.archetype_id)
        },
        methods: {
            renderData(search, status, type, area_id, archetype_id){
                this.loading = true;
                if(status === 999){
                    status = ''
                }else{
                    status= "|status:"+status
                }

                if(type === 999){
                    type = ''
                }else{
                    type= "|type:"+type
                }
                if(area_id === ''){
                    area_id = ''
                }else{
                    area_id = "|area_id.e:"+ area_id
                }
                if(archetype_id === ''){
                    archetype_id = ''
                }else{
                    archetype_id = "|archetype_id.e:"+ archetype_id
                }
                this.$http.get("/promotion/voucher",{params:{
                      perpage:10000,
                      embeds:'area_id,archetype_id',
                      conditions:'redeem_code.icontains:'+search +'%2COr.name.icontains:'+ search + status + type + area_id + archetype_id,
                      orderby:'-id',
                  }}).then(response => {
                      this.loading = false;
                      this.items = response.data.data
                      if(this.items === null){
                          this.items = []
                      }
                    });
                },
            areaSelected(d){
                this.area = null;
                this.filter.area_id = '';
                if(d !== '' && d !== undefined){
                    this.area = d;
                    this.filter.area_id = d.id;
                }
            },
            archetypeSelected(d){
                this.archetype = null;
                this.filter.archetype_id = '';
                if(d !== '' && d !== undefined){
                    this.archetype = d;
                    this.filter.archetype_id = d.id;
                }
            },
        },
        watch: {
            'search': {
                handler: function (search) {
                    let that = this
                    that.renderData(search,this.statuses,this.type,this.filter.area_id, this.filter.archetype_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (status) {
                    let that = this
                    that.renderData(this.search,status,this.type,this.filter.area_id, this.filter.archetype_id)
                },
                deep: true
            },
            'type': {
                handler: function (type) {
                    let that = this
                    that.renderData(this.search,this.statuses,type,this.filter.area_id, this.filter.archetype_id)
                },
                deep: true
            },
            'filter.area_id': {
                handler: function (area_id) {
                    let that = this
                    that.renderData(this.search,this.statuses,this.type,area_id, this.filter.archetype_id)
                },
                deep: true
            },
            'filter.archetype_id': {
                handler: function (archetype_id) {
                    let that = this
                    that.renderData(this.search,this.statuses,this.type,this.filter.area_id,archetype_id)
                },
                deep: true
            },
        },
    }
</script>