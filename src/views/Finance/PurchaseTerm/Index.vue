<template>
    <v-container class="Heiti px-4 px-md-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="12" md="2">
                    <router-link  :to="{ name: 'PurchaseTermCreate' }" class="routerLink d-flex justify-end" v-privilege="'ppt_crt'">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Purchase Term
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="0" md="6"></v-col>
                <v-col cols="12" md="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search code or name..."
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
        <v-row class="px-3 mt-6 mt-md-12">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid">
        <v-col cols="12" class="pt-2 pt-md-5 mt-6 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="6" md="3">
                    <SelectStatus
                        v-model="statuses"
                        @selected="statusSelected"
                    ></SelectStatus>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Purchase Term
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
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span></td>
                    <td>{{ props.item.days_value }}</td>
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
        name: "puchaseTerm",
        data() {
            return {
                search: '',
                loading: false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "10%",
                            sortable: false,
                        },
                        {
                            text:'Day Value',
                            width: "20%",
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
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData(self.search,self.statuses)
                }
            });
        },
        created() {
            this.renderData('',this.statuses)
        },

        methods: {
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        text : "Are you sure you want to Archive this Purchase Term?",
                        urlApi : '/finance/purchase/term/archive/'+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        text : "Are you sure you want to Unarchive this Purchase Term?",
                        urlApi : '/finance/purchase/term/unarchive/'+id,
                        data : {}
                    }
                }
            },
            renderData(search,statuses){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                this.$http.get("/finance/purchase/term",{params:{
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
            statusSelected(val) {
                this.statuses = null;
                if (val !== ''  && val !== undefined) {
                    this.statuses = val.value;
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