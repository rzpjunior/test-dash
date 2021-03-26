<template>
    <v-container class="px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2"></v-col>
                <v-col cols="4" offset="6">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search..."
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
                <v-col cols="6" md="3">
                    <SelectInvoiceTerm
                        v-model="invoice_terms"
                        @selected="invoicetermSelected"
                    ></SelectInvoiceTerm>
                </v-col>
                <v-col cols="6" md="3">
                    <SelectSalesTerm
                        v-model="payment_terms"
                        :label="'Payment Term'"
                        @selected="salestermSelected"
                    ></SelectSalesTerm>
                </v-col>
                <v-col cols="6" md="3">
                    <SelectArea
                        v-model="areas"
                        :aux_data="2"
                        :label="'Finance Area'"
                        @selected="areaSelected" 
                    ></SelectArea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="3">
                    <SelectBusinessType
                        v-model="business_type"
                        @selected="businessTypeSelected"
                    ></SelectBusinessType>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Main Outlet
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
                    <td>
                        {{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span>
                    </td>
                    <td>{{ props.item.business_type.name }}</td>
                    <td>{{ props.item.invoice_term.name }}</td>
                    <td>{{ props.item.payment_term.name }}</td>
                    <td>{{ props.item.finance_area.name }}</td>
                    <td>{{ props.item.payment_group.name }}</td>
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
                                <v-list-item>
                                    <v-list-item-title ><router-link :to="{ name: 'MerchantDetail', params: { id: props.item.id } }" >Detail</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title ><router-link :to="{ name: 'MerchantUpdate', params: { id: props.item.id } }" >Update</router-link></v-list-item-title>
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
                search: '',
                statuses:999,
                invoice_terms:'',
                payment_terms:'',
                business_type: '',
                payment_group: '',
                areas:'',
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Business Type',
                            sortable: false,
                        },
                        {
                            text:'Invoice Term',
                            sortable: false
                        },
                        {
                            text:'Payment Term',
                            sortable: false
                        },
                        {
                            text:'Finance Area',
                            sortable: false
                        },
                        {
                            text:'Payment Group',
                            sortable: false
                        },
                        {
                            text:'Status',
                            sortable: false
                        },
                        {
                            text:'Action',
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.statuses,'','','','','')
        },
        methods: {
            renderData(search,statuses,invoice_terms,payment_terms,areas,business_type,payment_group){
                if(statuses === 999){statuses = ''}
                else{statuses= "|status:"+statuses}

                if(invoice_terms === '' || invoice_terms === null){invoice_terms = ''}
                else{invoice_terms= "|invoiceterm__id.e:"+invoice_terms}

                if(payment_terms === '' || payment_terms === null){payment_terms = ''}
                else{payment_terms= "|paymentterm__id.e:"+payment_terms}

                if(areas === '' || areas === null){areas = ''}
                else{areas= "|financearea__id.e:"+areas}

                if(business_type === '' || business_type === null){business_type = ''}
                else{business_type = "|businesstype__id.e:"+business_type}

                if(payment_group === '' || payment_group === null){payment_group = ''}
                else{payment_group = "paymentgroup__id.e"+payment_group}

                this.$http.get("/customer/merchant",{params:{
                        perpage:100,
                        embeds:'user_merchant_id,term_payment_sls_id,business_type_id,payment_method_id,term_invoice_sls_id,finance_area_id,business_type_id,paymentgroup',
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'+search+statuses+invoice_terms+payment_terms+areas+business_type,
                        orderby:'-id',
                    }}).then(response => {
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
            invoicetermSelected(val) {
                this.invoice_terms = null;
                if (val !== ''  && val !== undefined) {
                    this.invoice_terms = val.id;
                }
            },
            salestermSelected(val) {
                this.payment_terms = null;
                if (val !== ''  && val !== undefined) {
                    this.payment_terms = val.id;
                }
            },
            areaSelected(val) {
                this.areas = null;
                if (val !== ''  && val !== undefined) {
                    this.areas = val.id;
                }
            },
            businessTypeSelected(val) {
                this.business_type = null;
                if(val !== '' && val !== undefined){
                    this.business_type = val.id
                }
            },
            paymentGroupSelected(val){
                this.payment_group = null;
                if(val !== '' && val !== undefined){
                    this.payment_group = val.id
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.invoice_terms,this.payment_terms,this.areas,this.business_type,this.payment_group)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,val,this.invoice_terms,this.payment_terms,this.areas,this.business_type,this.payment_group)
                },
                deep: true
            },
            'invoice_terms': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,val,this.payment_terms,this.areas,this.business_type,this.payment_group)
                },
                deep: true
            },
            'payment_terms': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,this.invoice_terms,val,this.areas,this.business_type,this.payment_group)
                },
                deep: true
            },
            'areas': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,this.statuses,this.invoice_terms,this.payment_terms,val,this.business_type,this.payment_group)
                },
                deep: true
            },
            'business_type': {
                handler: function(val){
                    let that = this
                    that.renderData(this.search, this.statuses, this.invoice_terms, this.payment_terms, this.areas, val, this.payment_group)
                },
                deep: true
            },
            'payment_group': {
                handler: function(val){
                    let that = this
                    that.renderData(this.search, this.statuses, this.invoice_terms, this.payment_terms, this.areas, this.business_type, val)
                },
                deep: true
            }
        },
    }
</script>


