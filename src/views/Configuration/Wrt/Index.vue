<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'WrtCreate' }" class="routerLink d-flex justify-end" v-privilege="'wrt_crt'">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create WRT
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
                        <span>Search by code, name</span>
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
                <v-col cols="6" md="3">
                    <SelectStatus
                        v-model="statuses"
                        @selected="statusSelected"
                    ></SelectStatus>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :norequired="true"
                        name= "area"
                        @selected="areaelected">
                    </SelectArea>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                WRT
            </label>
        </div>
        <v-data-table
            :mobile-breakpoint="0"
            :headers="table.fields"
            :loading="loading"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span></td>
                    <td>{{ props.item.area_id.name }}</td>
                    <td>{{ props.item.note }}</td>
                    <td>
                        <div v-if="props.item.status == 1">
                            <v-chip
                                :color="statusMaster('active')"
                            > <span class="pa-md-2"> Active </span></v-chip>
                        </div>
                        <div v-else>
                            <v-chip
                                :color="statusMaster('archived')"
                            > Archived </v-chip>
                        </div>
                    </td>
                    <td>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                    icon
                                    v-on="{ ...menu }"
                                ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                            </template>
                            <v-list style="background: #E8EFF2">
                                <v-list-item @click="changeStatus(props.item.status,props.item.id)" v-if="props.item.status=='1'">
                                    <v-list-item-content>
                                        <v-list-item-title>Archive</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="changeStatus(props.item.status,props.item.id)" v-else>
                                    <v-list-item-content>
                                        <v-list-item-title>Unarchive</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "wrt",
        data() {
            return {
                search: '',
                area:'',
                statuses:999,
                loading: false,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "15%",
                            sortable: false,
                        },
                        {
                            text:'Area',
                            width: "15%",
                            sortable: false
                        },
                        {
                            text:'Note',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Action',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
                ConfirmData : {}
            }
        },
        mounted() {
            this.renderData('',this.statuses,this.area)
        },
        methods: {
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        text : "Are you sure you want to Archive this WRT?",
                        urlApi : '/config/wrt/archive/'+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        text : "Are you sure you want to Unarchive this WRT?",
                        urlApi : '/config/wrt/unarchive/'+id,
                        data : {}
                    }
                }
            },
            renderData(search,statuses,area){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                if(area === '' || area === undefined){
                    area = ''
                }else{
                    area = "|area_id.value:"+area
                }
                this.$http.get("/config/wrt",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses+area,
                        embeds: 'area_id',
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            statusSelected(val) {
                this.statuses = null;
                if (val !== ''  && val !== undefined) {
                    this.statuses = val.value;
                }
            },
            areaelected(val) {
                this.area = ''
                if (val) {
                    this.area = val.value
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.area)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,val,this.area)
                },
                deep: true
            },
            'area': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,val)
                },
                deep: true
            },
        },
    }
</script>