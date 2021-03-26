<template>

    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <!-- <v-col cols="2">
                    <router-link  :to="{ name: 'DeliveryOrderCreate' }" class="routerLink d-flex justify-end" v-privilege="'uom_crt'">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Delivery Order
                        </v-btn>
                    </router-link>
                </v-col> -->
                <v-col cols="4" offset="8">
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
                        <span>Search by Delivery Code, Order Code</span>
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
                        :label="'Warehouse'"
                    ></SelectWarehouse>
                </v-col>
                
            </v-row>
            <v-row style="margin-top:-25px;">
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
                    <v-select
                        v-model="statuses"
                        :items="regStatus"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        class="rounded-form"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
        </v-col>
    <div class="title-table">
        <label class="label-title">
            Delivery Order
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
                    <td>{{ props.item.code }}</td>
                    <td>{{ formatDate(props.item.recognition_date) }}</td>
                    <td>{{ props.item.sales_order.code }}</td>
                    <td>{{ props.item.sales_order.branch.name }}</td>
                    <td>{{ props.item.sales_order.area.name }}</td>
                    <td>{{ props.item.warehouse.name }}</td>
                    <td>
                         <div v-if="props.item.status == 1">
                            <v-chip
                                :color="statusMaster('active')"
                            > <span class="pa-md-2"> Active </span></v-chip>
                        </div>
                        <div v-if="props.item.status == 2">
                            <v-chip
                                :color="statusMaster('finished')"
                            > Finished </v-chip>
                        </div>
                        <div v-if="props.item.status == 3">
                            <v-chip
                                :color="statusMaster('cancelled')"
                            > Cancelled </v-chip>
                        </div>
                    </td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                    <template>
                                        <v-btn
                                                icon
                                                v-on="{ ...menu }"
                                        >  <v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                    </template>
                            </template>
                            <v-list v-if="props.item.status == 1" style="background-color: #E8EFF2;">
                                <v-list-item>
                                    <v-list-item-title>
                                        <router-link style="color: #333333; text-decoration: none;"  :to="{ name: '' }" >Update</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title>
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'DeliveryOrderDetail', params: { id: props.item.id } }">Detail</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item style="background: #E8EFF2" @click="downloadPdf">
                                    <v-list-item-title>
                                        Print
                                    </v-list-item-title>
                                </v-list-item>
                                <router-view></router-view>
                            </v-list>
                            <v-list v-else style="background-color: #E8EFF2;">
                                <v-list-item>
                                    <v-list-item-title>
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'DeliveryOrderDetail', params: { id: props.item.id } }">Detail</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item style="background: #E8EFF2" @click="downloadPdf">
                                    <v-list-item-title>
                                        Print
                                    </v-list-item-title>
                                </v-list-item>
                                <router-view></router-view>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <template>
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="true"
                filename="test"
                :paginate-elements-by-height="1400"
                :pdf-quality="2"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="800px"
                :manual-pagination="false"
                @progress="onProgress($event)"
                @startPagination="startPagination()"
                @hasPaginated="hasPaginated()"
                @beforeDownload="beforeDownload($event)"
                @hasDownloaded="hasDownloaded($event)"
                ref="html2Pdf"
                >
                <pdf-content :id_do="items.id" @domRendered="domRendered()" slot="pdf-content" />
            </vue-html2pdf>
        </template>
    </v-container>
</template>
<script>
    import VueHtml2pdf from 'vue-html2pdf'
    import PdfContent from './Pdf'
    export default {
        components: {
            VueHtml2pdf,
            PdfContent
        },
        name: "DeliveryOrder",
        data() {
            return {
                id:'',
                search: '',
                loading: false,
                openDialog: false,
                delivery_date_model : '',
                delivery_date : '',
                controlValue:{
                    pdfQuality: 2,
                    paginateElementsByHeight: 1400,
                    pdfOrientation: 'portrait',
                    pdfFormat: "a4",
                    pdfContentWidth: "800px"
                },
                statuses:999,
                regStatus:[
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
                            text:'Delivery Order Code',
                            sortable: false,
                        },
                        {
                            text:'Delivery Date',
                            sortable: true
                        },
                        {
                            text:'Order Code',
                            sortable: false
                        },
                        {
                            text:'Customer',
                            sortable: false
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Warehouse Origin',
                            sortable: false
                        },
                        {
                            text:'Status',
                            sortable: true
                        },
                        {
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                SelectArea : '',
                SelectMerchant : '',
                SelectWrt : '',
                SelectWarehouse : '',
                items:[],
            }
        },

        mounted() {
            this.renderData('',this.statuses)
        },
        computed: {
            format_delivery_date() {
                if (this.delivery_date)
                return this.$moment(this.delivery_date).format('DD/MM/YYYY')
            },
        },

        methods: {
            async downloadPdf() {
            if (!(await this.validateControlValue())) return;
            this.$refs.html2Pdf.generatePdf();
            },
            validateControlValue() {
            if (this.controlValue.pdfQuality > 2) {
                alert("pdf-quality value should only be 0 - 2");
                this.controlValue.pdfQuality = 2;
                return false;
            }
            if (!this.controlValue.paginateElementsByHeight) {
                alert("paginate-elements-by-height value cannot be empty");
                this.controlValue.paginateElementsByHeight = 1400;
                return false;
            }
            const paperSizes = [
                "a0",
                "a1",
                "a2",
                "a3",
                "a4",
                "letter",
                "legal",
                "a5",
                "a6",
                "a7",
                "a8",
                "a9",
                "a10",
            ];
            if (!paperSizes.includes(this.controlValue.pdfFormat)) {
                alert(`pdf-format value should only be ${paperSizes}`);
                this.controlValue.pdfFormat = "a4";
                return false;
            }
            if (!this.controlValue.pdfOrientation) {
                alert("pdf-orientation value cannot be empty");
                this.controlValue.pdfOrientation = "portrait";
                return false;
            }
            if (!this.controlValue.pdfContentWidth) {
                alert("pdf-content-width value cannot be empty");
                this.controlValue.pdfContentWidth = "800px";
                return false;
            }
            return true;
            },
            onProgress(progress) {
            this.progress = progress;
                console.log(`${progress}`)
            },
            startPagination() {
                console.log(`ini pagination yaaaa`)
            },
            hasPaginated () {
                console.log(`aaaaaa`)
            },
            async beforeDownload ({ html2pdf, options, pdfContent }) {
                console.log(`INI FUNGSI BEFORE DOWNLOAD NYAAAAAAA`)
            },
            hasDownloaded (blobPdf) {
                console.log(`DOWNLOADED`)
                this.pdfDownloaded = true
                console.log(blobPdf)
            },
            domRendered() {
                console.log("TEST DOM");
                this.contentRendered = true;
            },
            onBlobGenerate(blob) {
                console.log(blob);
            },
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
                    area = '|sales_order_id.area__id.e:'+this.SelectArea
                }
                let merchant = ''
                if (this.SelectMerchant) {
                    merchant = '|sales_order_id.branch.merchant.id.e:'+this.SelectMerchant
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
                    warehouse = '|sales_order_id.warehouse.id.e:'+this.SelectWarehouse
                }
                this.loading = true;
                this.$http.get("/warehouse/delivery_order", {params: {
                    perpage:100,
                    embeds:'sales_order_id,sales_order_id.area_id',
                    conditions:'code.icontains:'+search+area+merchant+delivery_date+wrt+warehouse+statuses,
                    orderby:'-id',
                }}).then(res => {
                    this.loading = false
                    this.items = res.data.data
                    if(this.items === null){
                        this.items = []
                    }
                }).catch(err => {
                    console.log(err)
                })
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