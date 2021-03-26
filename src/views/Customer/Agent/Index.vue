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
                        Create Agent
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
                    <SelectBusinessType
                        :norequired="true"
                        :aux_data="2"
                        @selected="SelectBusinessTypeFilter">
                    </SelectBusinessType>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :norequired="true"
                        @selected="areaSelected"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype
                        :norequired="true"
                        @selected="archetypeSelected"
                        :aux_data="2"
                        :customer_group="2"
                        :statusArch="1"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectPriceSet
                        @selected="pricesetSelected"
                        :norequired="true"
                    ></SelectPriceSet>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectSalesPerson
                        :norequired="true"
                        @selected="salespersonSelected"
                    ></SelectSalesPerson>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWarehouse
                        :norequired="true"
                        :aux_data="2"
                        @selected="warehouseSelected"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectPaymentGroup
                        :norequired="true"
                        @selected="paymentgroupSelected"
                    ></SelectPaymentGroup>
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
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.merchant.code }}<br>
                        <span class="second-color">{{ props.item.merchant.name }}</span></td>
                    <td>{{ props.item.merchant.business_type.name }}<br>
                        <span class="second-color">{{ props.item.archetype.name }}</span></td>
                    <td>{{ props.item.salesperson.name }}</td>
                    <td>{{ props.item.price_set.name }}</td>
                    <td>{{ props.item.area.name }}</td>
                    <td>{{ props.item.warehouse.name }}</td>
                    <td>{{ props.item.merchant.payment_group.name }}</td>
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
                                <v-list-item  :to="`/customer/agent/detail/${props.item.merchant.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2" v-if="props.item.status == 1">
                                    <hr>
                                </div>
                                <v-list-item v-if="props.item.status == 1" :to="`/customer/agent/update/${props.item.merchant.id}`" >
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
                loading: false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Business Type',
                            sortable: false
                        },
                        {
                            text:'Salesperson',
                            sortable: false
                        },
                        {
                            text:'Price Set',
                            sortable: false
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Warehouse',
                            sortable: false
                        },
                        {
                            text:'Payment Group',
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
                items:[{
                    merchant:{
                        payment_group:{},
                        business_type:{},
                    },
                    archetype:{},
                    salesperson:{},
                    price_set:{},
                    area:{},
                    warehouse:{},
                }],
                SelectBusinessType : '',
                SelectArea : '',
                SelectArchetype : '',
                SelectPriceSet : '',
                SelectSalesPerson : '',
                SelectPaymentGroup : '',
                SelectWarehouse : ''
            }
        },
        mounted() {
            this.renderData('',this.statuses)
        },
        methods: {
            async renderData(search,statuses){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                let sbt = ''
                if (this.SelectBusinessType) {
                    sbt = '|merchant.businesstype__id.e:'+this.SelectBusinessType
                }
                let area = ''
                if (this.SelectArea) {
                    area = '|area__id.e:'+this.SelectArea
                }
                let archetype = ''
                if (this.SelectArchetype) {
                    archetype = '|archetype__id.e:'+this.SelectArchetype
                }
                let priceset = ''
                if (this.SelectPriceSet) {
                    priceset = '|priceset__id.e:'+this.SelectPriceSet
                }
                let salesperson = ''
                if (this.SelectSalesPerson) {
                    salesperson = '|salesperson__id.e:'+this.SelectSalesPerson
                }
                let warehouse = ''
                if (this.SelectWarehouse) {
                    warehouse = '|warehouse__id.e:'+this.SelectWarehouse
                }
                let paymentgroup = ''
                if (this.SelectPaymentGroup) {
                    paymentgroup = '|merchant.paymentgroup__id.e:'+this.SelectPaymentGroup
                }
                await this.$http.get("/customer/agent",{params:{
                        perpage:100,
                        embeds:'merchant_id,area_id,archetype_id,price_set_id,warehouse_id,salesperson_id,sub_district_id,merchant.business_type_id,merchant.payment_group_sls_id',
                        conditions:'main_branch:1|merchant.customer_group:2|merchant.name.icontains:'+search+'%2COr.merchant.code.icontains:'
                        +search+statuses+sbt+area+archetype+priceset+salesperson+paymentgroup+warehouse,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            SelectBusinessTypeFilter(d) {
                this.SelectBusinessType = ""
                if (d) {
                    this.SelectBusinessType = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            areaSelected(d) {
                this.SelectArea = ""
                if (d) {
                    this.SelectArea = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            archetypeSelected(d) {
                this.SelectArchetype = ""
                if (d) {
                    this.SelectArchetype = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            pricesetSelected(d) {
                this.SelectPriceSet = ""
                if (d) {
                    this.SelectPriceSet = d.id
                }
                this.renderData(this.search,this.statuses)
            },
            salespersonSelected(d) {
                this.SelectSalesPerson = ""
                if (d) {
                    this.SelectSalesPerson = d.id
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