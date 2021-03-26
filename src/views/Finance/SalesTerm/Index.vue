<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2">
                    <router-link  :to="{ name: 'SalesPaymentTermCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                                style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                                block
                                color="primary"
                                elevation="2"
                                large
                                rounded
                                class="no-caps"
                        >
                        Create Sales Term
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="8" offset-md="6" md="4" lg="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search by code, name"
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
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Sales Term
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
                    <td>{{props.item.days_value}}</td>
                    <td>{{props.item.note}}</td>
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
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "salesTerm",
        components: {
            ModalDirection
        },
        data() {
            return {
                ConfirmData : {},
                modalOpen: false,
                search: '',
                loading: false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "20%",
                            sortable: false,
                        },
                        {
                            text:'Days Value',
                            width: "30%",
                            sortable: false
                        },
                        {
                            text:'Note',
                            width: "25%",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "15%",
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
                confirmation:{
                    valueName: 'Sales Term',
                    action:'',
                    status: '',
                    urlPath:'',
                    parentPath:'/finance/spt/term',
                }
            }
        },
        created() {
            this.renderData('',this.statuses)
        },
        mounted() {
            this.renderData('',this.statuses)
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData(self.search,self.statuses)
                }
            });
        },
        methods: {
            renderData(search,statuses){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                this.$http.get("/finance/sales/term",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses,
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
                if (val==1) {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Archive this Sales Term",
                        title : "Archive Sales Term",
                        text : "Are you sure you want to Archive this sales term?",
                        urlApi : "/finance/sales/term/archive/"+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Unarchive this Sales Term",
                        title : "Unarchive Sales Term",
                        text : "Are you sure you want to Unarchive this sales term?",
                        urlApi : "/finance/sales/term/unarchive/"+id,
                        data : {}
                    }
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,val)
                },
                deep: true
            },
        },
    }
</script>