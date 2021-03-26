<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2">
                    <!-- <router-link  :to="{ name: 'SalespersonCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                                style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                                block
                                color="primary"
                                elevation="2"
                                large
                                rounded
                                class="no-caps"
                        >
                        Create Salesperson
                        </v-btn>
                    </router-link> -->
                </v-col>
                <v-col cols="8" offset-md="6" md="4" lg="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search..."
                                    single-line
                                    hide-details
                                    rounded
                                    outlined
                                    style="margin-top:-10px;"
                                    v-on="{ ...tooltip }"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code, name, display name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-subheader>
        <v-row class="px-6 mt-12">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid mx-4">
        <v-col cols="12" class="mt-6">
            <v-row>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :norequired="true"
                        name= "area"
                        @selected="areaSelected">
                    </SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectSupervisor
                        :norequired="true"
                        :reload="reload"
                        name="supervisor"
                        @selected="supervisorSelected">
                    </SelectSupervisor>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Salesperson
            </label>
        </div>

        <v-data-table
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
                :mobile-breakpoint="0"
        >
            <template v-slot:item="props">
                <tr>
                    <td>
                        {{props.item.code}}<br>
                        <label style="color: #768F9C;">
                            {{ props.item.name }}
                        </label>
                    </td>
                    <td>{{props.item.display_name}}</td>
                    <td>{{props.item.parent == undefined ? "-" : props.item.parent.display_name}}</td>
                    <td>{{props.item.phone_number}}</td>
                    <td>{{props.item.area.name}}</td>
                    <td>
                        <div v-if="props.item.status == 1">
                            <v-chip
                                :color="statusMaster('active')"
                            > <span class="pa-md-2"> Active </span></v-chip>
                        </div>
                        <div v-else-if="props.item.status == 2">
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

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "SalesPerson",
        data() {
            return {
                search: '',
                loading: false,
                statuses:999,
                area: "",
                area_id : "",
                supervisor_id: "",
                salesperson_id: "",
                ConfirmData : {},
                items:[],
                reload:false,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "16%",
                            sortable: false,
                        },
                        {
                            text:'Display Name',
                            width: "16%",
                            sortable: false
                        },
                        {
                            text:'Supervisor',
                            width: "16%",
                            sortable: false
                        },
                        {
                            text:'Phone Number',
                            width: "16%",
                            sortable: false
                        },
                        {
                            text:'Area',
                            width: "16%",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Action',
                            sortable: false
                        },
                    ]
                }
            }
        },
        created() {
            this.renderData('',this.statuses,this.area_id,this.supervisor_id)
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.reload = true
                    self.renderData(self.search,self.statuses,self.area_id,self.supervisor_id)
                }
            });
        },
        methods: {
            areaSelected(d) {
                this.area_id = ''
                if (d) {
                    this.area_id = d.value
                }
                this.renderData(this.search,this.statuses,this.area_id,this.supervisor_id)
            },
            supervisorSelected(d) {
                this.supervisor_id = ''
                if (d) {
                    this.supervisor_id = d.id
                }
                this.renderData(this.search,this.statuses,this.area_id,this.supervisor_id)
            },
            renderData(search,statuses,area,supervisor){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                
                if(area != ""){
                    area = "|area.value:"+area
                }
                
                if(supervisor != "" && supervisor != undefined){
                    supervisor = "|parent_id.e:"+supervisor
                } else {
                    supervisor = ""
                }
                
                this.$http.get("/sales/person",{params:{
                        perpage:100,
                        embeds:'parent_id,area_id',
                        conditions:'role_group:1|name.icontains:'+search+'%2COr.code.icontains:'
                        +search+'%2COr.display_name.icontains:'+search+statuses+area+supervisor,
                        orderby:'-id',
                    }}).then(response => {
                        this.loading = false;
                        this.items = response.data.data
                        if(this.items === null){
                            this.items = []
                    }
                });
            },
            changeStatus(val,id) {
                this.reload = false
                if (val==1) {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Archive this Salesperson",
                        title : "Archive Salesperson",
                        text : "Are you sure you want to Archive this Salesperson?",
                        urlApi : "/sales/person/archive/"+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Unarchive this Salesperson",
                        title : "Unarchive Salesperson",
                        text : "Are you sure you want to Unarchive this Salesperson?",
                        urlApi : "/sales/person/unarchive/"+id,
                        data : {}
                    }
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.area_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,val,this.area_id)
                },
                deep: true
            },
        },
    }
</script>