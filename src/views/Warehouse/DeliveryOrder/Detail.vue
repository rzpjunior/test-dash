<template>
    <v-container >
        <div class="mb-16">
            <div class="px-6">
                <v-row class="px-3">
                    <v-col class="fs25">
                        {{deliveryOrderDetail.code}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="deliveryOrderDetail.status == 1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 2"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('finished')"
                            style="width:104px"
                            >
                            Finished
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 3"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('cancelled')"
                            style="width:104px"
                            >
                            Cancelled
                        </v-btn>
                        <div class="mx-3"></div>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>settings</v-icon>
                                </v-btn>
                            </template>
                            <v-list v-if="deliveryOrderDetail.status === 1" style="background: #E8EFF2">
                                <v-list-item :to="{ name: 'DeliveyOrderUpdate', params: { id: deliveryOrderDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Update</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-4">
                                    <v-divider></v-divider>
                                </div>
                                <v-list-item :to="{ name: 'DeliveryOrderCancel', params: { id: deliveryOrderDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Cancel</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-4">
                                    <v-divider></v-divider>
                                </div>
                                <v-list-item :to="{ name: 'DeliveryOrderConfirm', params: { id: deliveryOrderDetail.id } }">
                                    <v-list-item-content>
                                        <v-list-item-title>Confirm</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-4">
                                    <v-divider></v-divider>
                                </div>
                                <v-list-item @click="downloadPdf">
                                    <v-list-item-content>
                                        <v-list-item-title>Print</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list v-else style="background: #E8EFF2">
                                <v-list-item @click="downloadPdf">
                                    <v-list-item-content>
                                        <v-list-item-title>Print</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row class="row mt-6 ml-6 mr-2 second-color" >
                    <v-col cols="6" class="pr-13">
                        <DetailRow :name="'Delivery Date:'" :value="formatDate(deliveryOrderDetail.recognition_date)"/>
                        <DetailRow :name="'Warehouse Origin:'" :value="deliveryOrderDetail.warehouse.name"/>
                    </v-col>
                     <v-col cols="6" class="pl-13">
                        <DetailRow :name="'WRT:'" :value="deliveryOrderDetail.wrt.name"/>
                    </v-col>
                    <v-col cols="12" style="margin-top:-25px;">
                        <DetailRow :name="'Shipping Address:'" :value="deliveryOrderDetail.shipping_address"/>
                        <DetailRow :name="'Note:'" :value="deliveryOrderDetail.note"/>
                        <DetailRow :name="'Cancellation Note:'" :value="'-'"/>
                    </v-col>
                </v-row>
                <!-- <v-col class="fs25 second-color mt-10">
                    Sales order
                </v-col> -->
                <v-row class="px-3">
                    <v-col class="fs25 second-color mt-10">
                        Sales order
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="deliveryOrderDetail.status == 1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 2"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('finished')"
                            style="width:104px"
                            >
                            Finished
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 3"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('cancelled')"
                            style="width:104px"
                            >
                            Cancelled
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 7"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('on_delivery')"
                            style="width:104px"
                            >
                            On Delivery
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 8"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('delivered')"
                            style="width:104px"
                            >
                            Delivered
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 9"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('invoiced_not_delivered')"
                            style="width:104px"
                            >
                            Invoice not Delivered
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 10"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('invoiced_on_delivery')"
                            style="width:104px"
                            >
                            Invoice on Delivery
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 11"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('invoiced_delivered')"
                            style="width:104px"
                            >
                            Invoice Delivered
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 12"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('paid_not_delivered')"
                            style="width:104px"
                            >
                            Paid not Delivered
                        </v-btn>
                        <v-btn
                            v-if="deliveryOrderDetail.status == 13"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('paid_on_delivery')"
                            style="width:104px"
                            >
                            Paid on Delivery
                        </v-btn>
                        <div class="mx-3"></div>
                    </v-col>
                </v-row>
                <v-row class="row mt-6 ml-6 mr-2 second-color" >
                    <v-col cols="6" class="pr-13">
                        <DetailRow :name="'Order Code'" :value="deliveryOrderDetail.sales_order.code"/>
                        <DetailRow :name="'Customer'" :value="deliveryOrderDetail.sales_order.branch.merchant.name"/>
                        <DetailRow :name="'Payment Term'" :value="deliveryOrderDetail.sales_order.term_payment_sls.name"/>
                        <DetailRow :name="'Payment Group'" :value="'asd'"/>
                    </v-col>
                    <v-col cols="6" class="pl-13">
                        <DetailRow :name="'Order Date'" :value="formatDate(deliveryOrderDetail.sales_order.recognition_date)"/>
                        <DetailRow :name="'Outlet'" :value="deliveryOrderDetail.sales_order.branch.merchant.name"/>
                        <DetailRow :name="'Invoice Term'" :value="deliveryOrderDetail.sales_order.term_invoice_sls.name"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="title-table">
                            <label class="label-title">
                                Product
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
                                <td>{{ props.item.product.code }} - {{ props.item.product.name }} </td>
                                <td>{{ props.item.product.uom.name }}</td>
                                <td>{{ props.item.delivery_qty }}</td>
                                <td>{{ props.item.receive_qty }}</td>
                                <td>{{ props.item.receipt_item_note }}</td>
                                <td>{{ props.item.order_item_note }}</td>
                            </tr>
                            </template>
                        </v-data-table>
                        
                    </v-col>
                </v-row>
            </div>
        </div>
         <div style="padding: 20px;" class="row d-flex align-end justify-end">
          <v-btn
            rounded
            elevation="0"
            class="no-caps px-7"
            :to="'/warehouse/delivery-order'"
            style="background: #E6E9ED; color: #768F9C; height: 45px;"
          >
            Back
          </v-btn>
        </div>
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
                id="testPDF"
                >
                <pdf-content :id_do="deliveryOrderDetail.id" @domRendered="domRendered()" slot="pdf-content" />
            </vue-html2pdf>
        </template>
    </v-container>
</template>

<script>
    import VueHtml2pdf from 'vue-html2pdf'
    import PdfContent from './Pdf'
    import jsPDF from 'jspdf';
    export default {
        name: "MerchantDetail",
        components: {
            VueHtml2pdf,
            PdfContent
        },
        data() {
            return {
                loading: false,
                table: {
                    fields: [
                        {
                            text:'No.',
                            sortable: false,
                        },
                        {
                            text:'Product',
                            sortable: false,
                        },
                        {
                            text:'Delivery Qty',
                            sortable: false
                        },
                        {
                            text:'Received Qty',
                            sortable: false
                        },
                        {
                            text:'Received Note',
                            sortable: false
                        },
                        {
                            text:'Order Note',
                            sortable: false
                        },
                    ],
                },
                items: [],
                controlValue:{
                    pdfQuality: 2,
                    paginateElementsByHeight: 1400,
                    pdfOrientation: 'portrait',
                    pdfFormat: "a4",
                    pdfContentWidth: "800px"
                },
                deliveryOrderDetail:{},
                loading:true,
            }
        },
        computed: {
             htmlToPdfOptions() {
                return {
                    margin: 0,
                    filename: "hee hee.pdf",
                    image: {
                    type: "jpeg",
                    quality: 0.98,
                    },
                    enableLinks: true,
                    html2canvas: {
                    scale: 2,
                    useCORS: true,
                    },
                    jsPDF: {
                    unit: "in",
                    format: 'a4',
                    orientation: 'portrait',
                    },
                };
                },
        },
        methods:{
            formatDate(val) {
                return this.$moment(val).format('DD/MM/YYYY')
            },
            async renderData(){
                this.loading=true
                    await this.$http.get("/warehouse/delivery_order/"+this.$route.params.id, {params: {
                        embeds:"sales_order,branch.merchant.payment_term,branch.merchant.invoice_term,branch.merchant,sales_order_id.term_payment_sls_id,sales_order_id.term_invoice_sls_id"
                    }}).then(response => {
                        this.loading = false
                        this.items = response.data.data.delivery_order_items 
                        if(this.items === null){
                            this.items = []
                        }
                        this.deliveryOrderDetail = response.data.data
                        console.log(this.items, "DFSAAAAAAAAAAAAAAAAAAAA")
                    });
            },
            async downloadPdf() {
            if (!(await this.validateControlValue())) return;
            this.$refs.html2Pdf.generatePdf();

                // var doc = new jsPDF
                // const pages = doc.internal.getNumberOfPages();
                // const pageWidth = doc.internal.pageSize.width;  
                // const pageHeight = doc.internal.pageSize.height;  
                // doc.setFontSize(10);  
                // doc.html(document.getElementById("testPDF"));
                // doc.html(this.$refs.html2Pdf)
                        
                // for (let j = 1; j < pages + 1 ; j++) {
                //     let horizontalPos = pageWidth / 2; 
                //     let verticalPos = pageHeight - 10; 
                //     doc.setPage(j);
                //     doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {align: 'center'});
                // }

                // doc.save('asdasd.pdf')
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
                // var doc = new jsPDF('p', 'pt', 'A4')
                // const pages = doc.internal.getNumberOfPages();
                // const pageWidth = doc.internal.pageSize.width;  
                // const pageHeight = doc.internal.pageSize.height;  
                // doc.setFontSize(10);  
                        
                // for (let j = 1; j < pages + 1 ; j++) {
                //     let horizontalPos = pageWidth / 2; 
                //     let verticalPos = pageHeight - 10; 
                //     doc.setPage(j);
                //     doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {align: 'center'});
                // }

                // doc.save()
            // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((doc = new jsPDF) => {
            //         	const totalPages = doc.internal.getNumberOfPages()
            //         	for (let i = 1; i <= totalPages; i++) {
            //         		doc.setPage(i)
            //         		doc.setFontSize(10)
            //         		doc.setTextColor(150)
            //         		doc.text('Page ' + i + ' of ' + totalPages, (doc.internal.pageSize.getWidth() * 0.88), (doc.internal.pageSize.getHeight() - 0.3))
            //         	} 
            //         }).save()
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
        },
        created() {
            this.renderData()
        },
    }
</script>


