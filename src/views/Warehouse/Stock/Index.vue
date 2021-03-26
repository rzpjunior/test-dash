<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2"></v-col>
                <v-col cols="8" offset-md="6" md="4" lg="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search by code or name"
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
                   <SelectArea
                           v-model="area"
                           @selected="areaSelected"
                           :aux_data="'1.2'"
                   ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWarehouse
                            v-model="warehouse"
                            @selected="warehouseSelected"
                            :area_id="filter.area_id"
                            :disabled="disabled_warehouse"
                            :clear="clearWarehouse"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="salables"
                        :items="salable"
                        label="Salable"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="purchasables"
                        :items="purchasable"
                        label="Purchasable"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Stock List
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
                    <td>{{ props.item.product.code }} - {{ props.item.product.name }}<br>
                        <span class="second-color">{{ props.item.product.uom.name }}</span>
                    </td>
                    <td>{{ parseFloat(props.item.safety_stock).toFixed(2) }}</td>
                    <td>{{ parseFloat(props.item.available_stock).toFixed(2) }}</td>
                    <td>{{ parseFloat(props.item.committed_in_stock).toFixed(2) }}</td>
                    <td>{{ parseFloat(props.item.committed_out_stock).toFixed(2) }}</td>
                    <td>{{ parseFloat(props.item.waste_stock).toFixed(2) }}</td>
                    <td>{{ props.item.warehouse.area.name }}<br>
                        <span class="second-color">{{ props.item.warehouse.name }}</span>
                    </td>
                    <td>
                        <div v-if="props.item.purchasable == 1">{{ 'Yes' }}</div>
                        <div v-else>{{ 'No' }}</div>
                    </td>
                    <td>
                        <div v-if="props.item.salable == 1">{{ 'Yes' }}</div>
                        <div v-else>{{ 'No' }}</div>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "Warehouse Stock",
        data() {
            return {
                disabled_warehouse:true,
                clearWarehouse:false,
                search: '',
                area:null,
                warehouse:null,
                salables:1,
                purchasables:1,
                filter:{
                    area_id:'',
                    warehouse_id:'',
                },
                table: {
                    fields: [
                        {
                            text:'Product',
                            sortable: false,
                        },
                        {
                            text:'Safety Stock',
                            sortable: false
                        },
                        {
                            text:'Available Stock',
                            sortable: false
                        },
                        {
                            text:'Commited In Stock',
                            sortable: false
                        },
                        {
                            text:'Commited Out Stock',
                            sortable: false
                        },
                        {
                            text:'Waste Stock',
                            sortable: false
                        },

                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Purchaseable',
                            sortable: false
                        },
                        {
                            text:'Salable',
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.filter.area_id,this.filter.warehouse_id,this.salables,this.purchasables)
        },
        methods: {
            renderData(search,areaID,warehouseID,salables,purchasables){
                if(areaID === '') {
                    areaID = ''
                }else if(areaID == '65536'){
                    areaID = ''
                }else{
                    areaID = "|warehouse.area.id.e:"+ areaID
                }

                if(warehouseID === ''){
                    warehouseID = ''
                }else{
                    warehouseID = "|warehouse_id.e:"+ warehouseID
                }

                if(salables === ''){
                    salables = ''
                }else{
                    salables = "|salable:"+ salables
                }

                if(purchasables === ''){
                    purchasables = ''
                }else{
                    purchasables = "|purchasable:" + purchasables
                }

                this.$http.get("/warehouse/stock/filtered",{params:{
                        perpage:100,
                        conditions:'product.name.icontains:'+search+'%2COr.product.code.icontains:'
                        +search+areaID+warehouseID+salables+purchasables,
                        orderby:'-id',
                    }}).then(response => {
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            areaSelected(d){
                this.area = null;
                this.filter.area_id = '';
                this.warehouse = null;
                this.filter.warehouse_id = '';
                this.clearWarehouse = true
                this.disabled_warehouse = true
                if(d !== '' && d !== undefined){
                    this.area = d;
                    this.filter.area_id = d.id;
                    this.warehouse = null;
                    this.filter.warehouse_id = '';
                    this.disabled_warehouse = false;
                    this.clearWarehouse = false;
                }
            },
            warehouseSelected(d) {
                this.warehouse = null;
                this.filter.warehouse_id = '';
                if (d !== ''  && d !== undefined) {
                    this.warehouse = d;
                    this.filter.warehouse_id = d.id
                }
            },
        },
        watch: {
            'search': {
                handler: function (search) {
                    let that = this
                    that.renderData(search,this.filter.area_id,this.filter.warehouse_id,this.salables,this.purchasables)
                },
                deep: true
            },
            'filter.area_id': {
                handler: function (area_id) {
                    let that = this;
                    that.renderData(this.search,area_id,this.filter.warehouse_id,this.salables,this.purchasables)
                },
                deep: true
            },
            'filter.warehouse_id': {
                handler: function (warehouse_id) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,warehouse_id,this.salables,this.purchasables)
                },
                deep: true
            },
            'salables': {
                handler: function (salables) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,this.filter.warehouse_id,salables,this.purchasables)
                },
                deep: true
            },
            'purchasables': {
                handler: function (purchasable) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,this.filter.warehouse_id,this.salables,purchasable)
                },
                deep: true
            },
        },
    }
</script>
