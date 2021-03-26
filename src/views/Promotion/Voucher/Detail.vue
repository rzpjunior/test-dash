<template>
    <v-container >
        <v-app >
            <v-card :loading="loading">
                <v-subheader class="title"> <v-icon large color="primary">mdi-label</v-icon>VOUCHER DETAIL
                </v-subheader>
                <v-col  v-if="loading === false">
                    <v-row >
                        <v-col >
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>Redeem Code:</td><td class="text-right">{{ item.redeem_code }}</td></tr>
                                    <tr><td>Name:</td><td class="text-right">{{ item.name }}</td></tr>
                                    <tr><td>Type:</td><td class="text-right">{{ item.type === 1 ? 'Total Discount' : item.type === 2 ? 'Grand Total Discount' : 'Delivery Discount'}}</td></tr>
                                    <tr><td>Start Timestamp:</td><td class="text-right">{{ item.start_timestamp | moment("DD/MM/YYYY HH:mm:ss") }}</td></tr>
                                    <tr><td>End Timestamp:</td><td class="text-right">{{ item.end_timestamp | moment("DD/MM/YYYY HH:mm:ss") }}</td></tr>
                                    <tr><td>Overall Quota:</td><td class="text-right">{{ item.overall_quota }}</td></tr>
                                    <tr><td>Remaining Overall Quota:</td><td class="text-right">{{ item.rem_overall_quota }}</td></tr>
                                    <tr><td>Quota per User:</td><td class="text-right">{{ item.user_quota }}</td></tr>
                                    <tr><td>Minimum Order Amount:</td><td class="text-right">Rp {{ formatPrice(item.min_order) }}</td></tr>
                                    <tr><td>Discount Amount:</td><td class="text-right">Rp {{ formatPrice(item.disc_amount) }}</td></tr>
                                    <tr><td>Area:</td><td class="text-right">{{ item.area.name }}</td></tr>
                                    <tr><td>Business Type:</td><td class="text-right">{{ item.archetype.business_type.name }}</td></tr>
                                    <tr><td>Archetype:</td><td class="text-right">{{ item.archetype.name }}</td></tr>
                                    <tr><td>Customer Tag:</td><td class="text-right">{{ item.tag_customer_name }}</td></tr>
                                    <tr><td>Note:</td><td class="text-right">{{ item.note }}</td></tr>
                                    <tr><td>Status:</td>    <td class="text-right">     <v-chip
                                            :color="statusMaster(item.status_convert)"
                                            :text-color="statusMasterText(item.status_convert)"
                                    >
                                        {{item.status_convert.toUpperCase()}}
                                    </v-chip></td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>


                    </v-row>
                </v-col>
                <v-row class="pb-5 px-5">
                    <router-link  class="routerLink mx-3" :to="{ name: 'Voucher'}"><v-btn class="neutral">Back</v-btn></router-link>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-3" @click="archive(item.id)" v-if="item.status === 1">
                        Archive
                    </v-btn>
                    <v-btn class="mx-3" @click="auditLog(item.id,'voucher',true)">
                        History
                    </v-btn>
                </v-row>
            </v-card>
          <AuditLog></AuditLog>
            <PopupDialog v-model="modalOpen" :sendData=confirmation></PopupDialog>
        </v-app>
    </v-container>
</template>
<script>
    import AuditLog from "../../../components/AuditLog";
    import PopupDialog from "../../../components/PopupDialog";
    export default {
        name: "VoucherDetail",
        components: {PopupDialog, AuditLog},
        data () {
            return {
                loading:true,
                item:{
                    area:{},
                },
                confirmation:{
                    valueName: 'Voucher',
                    action:'',
                    urlPath:'',
                    parentPath:'/promotion/voucher',
                },
                modalOpen: false,
            }
        },
        methods: {
            async renderData(){
                await this.$http.get("/promotion/voucher/" + this.$route.params.id).then(response => {
                    this.item = response.data.data;
                    this.loading  = false
                });
            },
            archive(id){
                this.confirmation.action = 'Archive';
                this.confirmation.status = '1';
                this.confirmation.urlPath ='/promotion/voucher/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },

        },
        created() {
            this.renderData()
        },

    }
</script>
