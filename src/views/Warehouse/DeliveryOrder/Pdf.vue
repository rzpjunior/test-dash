<template>
  <section class="pdf-content">
  <div class="row">
            <div class="column">
                <img width="200px" src="../../../../public/img/EFReport.png" alt="" />
            </div>
            <div class="column" style="padding-left: 670px; margin-top: -60px;">
                <img width="60px;" src="../../../../public/img/qrcode.png" alt="">
            </div>
        </div>
        <div class="row">
            <div class="column">
                <h3 style="margin-top:-20px;">PT EDEN PANGAN INDONESIA</h3>
                <div class="fs14" style="margin-top:15px;">
                    Lippo St. Moritz<br>
                    Jl. Puri Raya Blok U1, Puri Indah 11610 Indah, RT.3/RW.2
                    Meruya Utara, Kembangan, Jakarta Barat
                </div><br>
                <div>
                    <table class="fs14">
                        <tr>
                            <td width="30%">Phone</td>
                            <td>: +6282125002553</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>: finance@edenfarm.id</td>
                        </tr>
                    </table>
                </div><br>
                <div class="fs14" style="padding-bottom: 5px;">82.420.314.5-011.000</div>
            </div>
            <div class="column" style="float: right;">
                <div style="text-align: right;font-size: 30px;">
                    DELIVERY ORDER
                </div>
                <div>
                    <table class="fs14" style="margin-top: 15px;">
                        <tr>
                            <td width="40%" style="text-align:right;">Delivery Order# :</td>
                            <td width="40%" style="text-align:right;">{{ items.code }}</td>
                        </tr>
                        <tr>
                            <td style="text-align:right;">Sales Order# :</td>
                            <td style="text-align:right;">SO-BXYZ2329-12200001</td>
                        </tr>
                        <tr>
                            <td style="text-align:right;">Order Date :</td>
                            <td style="text-align:right;">{{ formatDate(items.sales_order.recognition_date) }}</td>
                        </tr>
                        <tr>
                            <td style="text-align:right;">Delivery Date :</td>
                            <td style="text-align:right;">{{ formatDate(items.recognition_date )}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div>
            <table class="fs14" border="1" style="border-collapse: collapse;">
                <tr>
                    <td style="padding:10px;">Customer Name : asd</td>
                    <td style="padding:10px;">Payment Term : {{ items.sales_order.term_invoice_sls.name }}</td>
                </tr>
                <tr>
                    <td style="padding:10px;">Contact Person : {{ items.sales_order.branch.pic_name }}</td>
                    <td style="padding:10px;">Phone Number : {{ items.sales_order.branch.phone_number }}; {{ items.sales_order.branch.alt_phone_numbber }}</td>
                </tr>
                <tr>
                    <td style="padding:10px;" colspan="2">
                        Shipping Address: {{ items.shipping_address }}
                    </td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 20px;">
            <table class="fs14" border="1" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="padding:10px;" width="5%">No</th>
                        <th style="padding:10px; text-align: left;" width="30%">Product </th>
                        <th style="padding:10px;" width="20%">Qty </th>
                        <th style="padding:10px;" width="20%">Receive Note </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="productItem in productItems" :key="productItem.id">
                        <td style="padding:10px;">1</td>
                        <td style="padding:10px;">{{ productItem.product.name }}</td>
                        <td style="padding:10px;">{{ productItem.delivery_qty }}</td>
                        <td style="padding:10px;">{{ productItem.receipt_item_note }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top: 20px;">
            <table class="fs14" border="1" style="border-collapse: collapse;">
                <tr>
                    <td style="padding:10px;">
                        Customer memiliki hak untuk :
                        1. Memeriksa produk yang sudah dipesan bersama dengan kurir dalam waktu 15 menit.
                        Dengan menandatangani, customer setuju untuk menerima barang dan tidak bisa mengembalikan pesanan setelah kurir pergi
                    </td>
                </tr>
            </table>
        </div>
        <!-- <div style="margin-top: 20px; float:right; width: 600px;">
            <table class="sign" cellspacing=0>
                    <tr>
                    <td style="padding-bottom:80px;text-align: center">Warehouse</td>
                    <td style="padding-bottom:80px;text-align: center">Courier</td>
                    <td style="padding-bottom:80px;text-align: center">Received By</td>
                    </tr>
                    <tr>
                    <td width="30%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    <td width="30%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    <td width="30%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    </tr>
                </table>
        </div> -->
        <div class="footer">
            <div style="margin-top: 20px; float:right; width: 600px;">
            <table class="sign" cellspacing=0>
                    <tr>
                    <td style="padding-bottom:80px;text-align: center">Warehouse</td>
                    <td style="padding-bottom:80px;text-align: center">Courier</td>
                    <td style="padding-bottom:80px;text-align: center">Received By</td>
                    </tr>
                    <tr>
                    <td width="20%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    <td width="20%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    <td width="20%" style="padding-right: 20px;padding-bottom:80px;text-align: center"><hr></td>
                    </tr>
                </table>
            </div>
            <table class="sign" cellspacing=0>
                <tr>
                    <td  style="padding-left:30px; padding-right:30px;text-align: center">#DO-BXYZ2329-12200001</td>
                    <td  style="padding-left:30px; padding-right:30px;text-align: center">x2-02032021153434-59600</td>
                    <td  style="padding-left:30px; padding-right:30px;text-align: center">Page 1 of 1</td>
                </tr>
            </table>
        </div>
  </section>
</template>
<style>
section {
    font-family: 'Roboto';
    padding: 20px;
}
.sign{
    width:100%;
    text-align:center;
    margin-top:50px;
}
.column {
    float: left;
    width: 50%;
    padding: 10px;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}
.fs14{
    font-size:14px;
}
.footer {
   clear: both;
position: relative;
height: 200px;
margin-top: 100px;
}
</style>
<script>
export default {
  data() {
    return {
        
        items: [],
        productItems: []
    };
  },
    props: ['id_do'],

  mounted() {
      let that = this
    console.log(that.id_do, 'asdfasdasasdasdasdasd')
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("domRendered");
      }, 1000);
    });
    this.renderData()
  },
  methods:{
      formatDate(val) {
            return this.$moment(val).format('DD/MM/YYYY')
        },
      async renderData(){
        this.loading=true
            await this.$http.get("/warehouse/delivery_order/"+this.id_do).then(response => {
                this.loading = false
                this.items = response.data.data 
                this.productItems = response.data.data.delivery_order_items
                if(this.productItems === null){
                    this.productItems = []
                }
                console.log(this.items, "TESETESETET")
            });
    },
  }
};
</script>