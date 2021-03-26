<template>
<v-container class="px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'AgentCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Sales Order
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
                        <span>Search by Order Code</span>
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
                    <SelectArea
                        :norequired="true"
                        @selected="areaSelected"
                        :aux_data="2"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectMerchant
                        :norequired="true"
                        @selected="merchantSelected"
                        :label="'Customer'"
                    ></SelectMerchant>
                </v-col>
                <v-col cols="12" md="3" v-if="outlet">
                    <SelectBranch
                        :norequired="true"
                        :merchant="SelectMerchant"
                        @selected="branchSelected"
                        :label="'Outlet'"
                    ></SelectBranch>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectPaymentGroup
                        :norequired="true"
                        @selected="paymentgroupSelected"
                    ></SelectPaymentGroup>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="order_date_model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    clearable
                                    @click:clear="order_date = '',renderData(search,statuses)"
                                    :value="format_order_date" 
                                    class="rounded-form"
                                    
                                >
                                    <template v-slot:label>
                                        Order Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker 
                            no-title
                            v-model="order_date" 
                            @input="order_date_model = false,renderData(search,statuses)"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="delivery_date_model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    clearable
                                    @click:clear="delivery_date = '',renderData(search,statuses)"
                                    :value="format_delivery_date" 
                                    class="rounded-form"
                                    
                                >
                                    <template v-slot:label>
                                        Delivery Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker 
                            no-title
                            v-model="delivery_date" 
                            @input="delivery_date_model = false,renderData(search,statuses)"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWrt
                        :norequired="true"
                        @selected="wrtSelected"
                    ></SelectWrt>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWarehouse
                        :norequired="true"
                        :aux_data="2"
                        @selected="warehouseSelected"
                        :label="'Order Warehouse'"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status2"
                        item-text="text"
                        item-value="value"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Agent
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
            class="elevation-1"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ formatDate(props.item.recognition_date) }}</span></td>
                    <td>{{ props.item.branch.name }}</td>
                    <td>{{ formatDate(props.item.delivery_date) }}<br>
                        <span class="second-color">{{ props.item.wrt.name }}</span></td>
                    <td>{{ props.item.area.name }}<br>
                        <span class="second-color">{{ props.item.warehouse.name }}</span></td>
                    <td>{{ props.item.total_charge }}<br>
                        <span class="second-color">{{ props.item.payment_group.name }}</span></td>
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
                                <v-list-item  :to="`/customer/agent/detail/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2" v-if="props.item.status == 1">
                                    <hr>
                                </div>
                                <v-list-item v-if="props.item.status == 1" :to="`/customer/agent/update/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Update</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "Tag",
        data() {
            return {
                modalOpen: false,
                search: '',
                order_date_model : '',
                order_date : '',
                delivery_date_model : '',
                delivery_date : '',
                loading: false,
                statuses:999,
                status2:[
                    {
                        text:'All Status',
                        value:999
                    },
                    {
                        text:'Active',
                        value:1
                    },
                    {
                        text:'Finished',
                        value:2
                    },
                    {
                        text:'Cancelled',
                        value:3
                    },
                    {
                        text:'On Delivery',
                        value:7
                    },
                    {
                        text:'Delivered',
                        value:8
                    },
                    {
                        text:'Invoiced not Delivered',
                        value:9
                    },
                    {
                        text:'Invoiced on Delivery',
                        value:10
                    },
                    {
                        text:'Invoiced Delivered',
                        value:11
                    },
                    {
                        text:'Paid not Delivered',
                        value:12
                    },
                    {
                        text:'Paid on Delivery',
                        value:13
                    },
                ],
                table: {
                    fields: [
                        {
                            text:'Order Code',
                            sortable: false,
                        },
                        {
                            text:'Customer',
                            sortable: false
                        },
                        {
                            text:'Delivery Date',
                            sortable: true
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Total',
                            sortable: true
                        },
                        {
                            text:'Status',
                            width: "10%",
                            sortable: status
                        },
                        {
                            text:'Action',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[{
                    branch : {
                        name : ''
                    },
                    wrt : {
                        name : ''
                    },
                    warehouse : {
                        name : ''
                    },
                    area : {
                        name : ''
                    },
                    payment_group : {
                        name : ''
                    }
                }],
                SelectArea : '',
                SelectMerchant : '',
                SelectBranch : '',
                SelectPaymentGroup : '',
                SelectWrt : '',
                SelectWarehouse : '',
                outlet : false,
            }
        },
        mounted() {
            this.renderData('',this.statuses)
        },
        computed: {
            format_order_date() {
                if (this.order_date)
                return this.$moment(this.order_date).format('DD/MM/YYYY')
            },
            format_delivery_date() {
                if (this.delivery_date)
                return this.$moment(this.delivery_date).format('DD/MM/YYYY')
            },
        },
        methods: {
            formatDate(val) {
                return this.$moment(val).format('DD/MM/YYYY')
            },
            renderData(search,statuses){
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                let area = ''
                if (this.SelectArea) {
                    area = '|area__id.e:'+this.SelectArea
                }
                let merchant = ''
                if (this.SelectMerchant) {
                    merchant = '|branch.merchant.id.e:'+this.SelectMerchant
                }
                let branch = ''
                if (this.SelectBranch) {
                    branch = '|branch.id.e:'+this.SelectBranch
                }
                let paymentgroup = ''
                if (this.SelectPaymentGroup) {
                    paymentgroup = '|paymentgroup.id.e:'+this.SelectPaymentGroup
                }
                let order_date = ''
                if (this.order_date) {
                    order_date = '|recognition_date:'+this.order_date
                }
                let delivery_date = ''
                if (this.delivery_date) {
                    delivery_date = '|delivery_date:'+this.delivery_date
                }
                let wrt = ''
                if (this.SelectWrt) {
                    wrt = '|wrt.id.e:'+this.SelectWrt
                }
                let warehouse = ''
                if (this.SelectWarehouse) {
                    warehouse = '|warehouse.id.e:'+this.SelectWarehouse
                }
                this.$http.get("/sales/order",{params:{
                        perpage:100,
                        embeds:'branch_id,wrt_id,area_id,warehouse_id,payment_group_sls_id',
                        conditions:'code.icontains:'+search+area+merchant+branch+paymentgroup+order_date+delivery_date+wrt+warehouse+statuses,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            areaSelected(d) {
                this.SelectArea = ""
                if (d) {
                    this.SelectArea = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            merchantSelected(d) {
                this.outlet = false
                this.SelectMerchant = ""
                if (d) {
                    if (d.customer_group==1) {
                        this.outlet = true
                    }
                    this.SelectMerchant = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            paymentgroupSelected(d) {
                this.SelectPaymentGroup = ""
                if (d) {
                    this.SelectPaymentGroup = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            branchSelected(d) {
                this.SelectBranch = ""
                if (d) {
                    this.SelectBranch = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            wrtSelected(d) {
                this.SelectWrt = ""
                if (d) {
                    this.SelectWrt = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            warehouseSelected(d) {
                this.SelectWarehouse = ""
                if (d) {
                    this.SelectWarehouse = d.id
                }
                this.renderData(this.search,this.statuses)
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