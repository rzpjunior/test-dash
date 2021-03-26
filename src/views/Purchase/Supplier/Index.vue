<template>
    <v-container class="px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'SupplierCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Supplier
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="4" offset="6">
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
                    <SelectSupplierType
                        name= "SupplierType"
                        @selected="supplierTypeSelected">
                    </SelectSupplierType>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Supplier
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span></td>
                    <td>{{ props.item.supplier_type.name }}</td>
                    <td>{{ props.item.pic_name }}<br>
                        <span class="second-color">{{ props.item.phone_number }}</span></td>
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
                                <v-list-item  :to="`/purchase/supplier/detail/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2">
                                    <hr>
                                </div>
                                <v-list-item v-if="props.item.status == 1" :to="`/purchase/supplier/update/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Update</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2" v-if="props.item.status == 1">
                                    <hr>
                                </div>
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
        name: "Supplier",
        data() {
            return {
                search: '',
                loading: false,
                supplierType_id : "",
                statuses:999,
                ConfirmData : "",
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Type',
                            sortable: false
                        },
                        {
                            text:'PIC Name',
                            sortable: false
                        },
                        {
                            width: "10%",
                            text:'Status',
                            sortable: false
                        },
                        {
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.statuses, this.supplierType_id)
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData(self.search,self.statuses, self.supplierType_id)
                }
            });
        },
        methods: {
            supplierTypeSelected(d) {
                this.supplierType_id = ''
                if (d) {
                    this.supplierType_id = d.id
                }
                this.renderData(this.search,this.statuses, this.supplierType_id)
            },
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Archive this Supplier",
                        title : "Archive Supplier",
                        text : "Are you sure you want to Archive this Supplier ?",
                        urlApi : "/purchase/supplier/"+id+"/archive",
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Unarchive this Supplier",
                        title : "Unarchive Supplier",
                        text : "Are you sure you want to Unarchive this Supplier ?",
                        urlApi : "/purchase/supplier/"+id+"/unarchive",
                        data : {}
                    }
                }
            },
            renderData(search,statuses, supplierType){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                if (supplierType != "") {
                    supplierType = "|supplier_type_id.e:"+supplierType
                }
                this.$http.get("/purchase/supplier",{params:{
                        perpage:10000,
                        embeds:'supplier_type_id',
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses+supplierType,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.supplierType_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val, this.supplierType_id)
                },
                deep: true
            },
        },
    }
</script>