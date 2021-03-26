<template>
    <v-container>
        <div>
            <div class="px-6">
                <v-row class="px-3">
                    <v-col class="fs25">
                        {{items.name}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="items.status == 1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-if="items.status == 2"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('archived')"
                            style="width:104px"
                            >
                            Archived
                        </v-btn>
                    <v-menu offset-y >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </template>
                        <v-list style="background: #E8EFF2">
                            <v-list-item :to="`/customer/agent/update/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/customer/agent/customer-tag/update/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Update Tag</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/customer/agent/salesperson/update/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Update Salesperson</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/customer/agent/phone-number/update/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Update Phone Number</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/customer/agent/archetype/convert/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Convert Archetype</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/customer/agent/shipping-address/create/${items.id}`" v-if="items.status == 1">
                                <v-list-item-content>
                                    <v-list-item-title>Create Shipping Address</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4" v-if="items.status == 1">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item v-if="items.status == 1" @click="archived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="items.status == 2" @click="unarchived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item @click="seeHistory()">
                                <v-list-item-content>
                                    <v-list-item-title>See History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-col>
                </v-row>
            </div>
            <div class="row mt-6 mx-6" >
                <div class="col">
                    <DetailRow :name="'Archetype'" :value="data[0].archetype.name"/>
                    <DetailRow :name="'Code'" :value="items.code"/>
                    <DetailRow :name="'Phone Number'" :value="items.phone_number"/>
                    <DetailRow :name="'Email'" :value="items.email"/>
                    <DetailRow :name="'Birthdate'" :value="'-'"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Business Type'" :value="items.business_type.name"/>
                    <DetailRow :name="'PIC Name'" :value="items.pic_name"/>
                    <DetailRow :name="'Alternative Phone Number'" :value="items.alt_phone_number"/>
                    <DetailRow :name="'Gender'" :value="'-'"/>
                    <DetailRow :name="'Reference Info'" :value="'-'"/>
                </div>
            </div>
            <div class="row mx-6" style="margin-top:-20px">
                <div class="col">
                    <DetailRow :name="'Customer Tag'" :value="items.tag_customer_name" :align="true"/>
                    <DetailRow :name="'Note'" :value="items.note" :align="true"/>
                </div>
            </div>
            <v-row class="mt-6 mx-6">
                <div class="title-page">
                    <v-col>
                        Finance Info
                    </v-col>
                </div>
            </v-row>
            <div class="row mt-6 mx-6" >
                <div class="col">
                    <DetailRow :name="'Finance Area'" :value="items.finance_area.name"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                </div>
            </div>
            <div class="row mx-6" style="margin-top:-20px">
                <div class="col">
                    <DetailRow :name="'Default Payment Term'" :value="items.payment_term.name"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Default Invoice Term'" :value="items.invoice_term.name"/>
                </div>
            </div>
            <div class="row mx-6" style="margin-top:-20px">
                <div class="col">
                    <DetailRow :name="'Billing Address'" :value="items.billing_address" :align="true"/>
                </div>
            </div>
            <v-row class="mt-6 mx-6">
                <div class="title-page">
                    <v-col>
                        Sales Info
                    </v-col>
                </div>
            </v-row>
            <div class="row mt-6 mx-6" >
                <div class="col">
                    <DetailRow :name="'Salesperson'" :value="data[0].salesperson.name"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                </div>
            </div>
            <v-row class="px-3 mt-6 mx-6">
                <div style="color:#4ABFB2;font-size:20px">
                    Price Set per Area
                </div>
            </v-row>
            <div class="row mt-6 mx-6" >
                <div class="col">
                    <div v-for="(item, idx) in items.price_set_area" :key="idx">
                        <DetailRow v-if="idx % 2==0" :name="item.area.name" :value="item.price_set.name"/>
                    </div>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <div v-for="(item, idx) in items.price_set_area" :key="idx">
                        <DetailRow v-if="idx % 2!==0" :name="item.area.name" :value="item.price_set.name"/>
                    </div>
                </div>
            </div>
            <div class="title-table mt-6 mx-6">
                <label class="label-title">
                    Shipping Info
                </label>
            </div>
            <v-data-table
                :headers="table.fields"
                :items="data"
                :items-per-page="10"
                class="elevation-1 mx-6"
            >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.index + 1 }}</td>
                        <td>{{ props.item.address_name }}</td>
                        <td>{{ props.item.pic_name }}</td>
                        <td>{{ props.item.phone_number }}</td>
                        <td>{{ props.item.shipping_address }}</td>
                        <td>{{ props.item.sub_district.concat_address }} {{ props.item.sub_district.postal_code }}</td>
                        <td>{{ props.item.area.name }}</td>
                        <td>
                            <v-checkbox
                                v-if="props.item.main_branch==1"
                                v-model="checkbox"
                                :readonly="true"
                                color="#50AE55"
                            ></v-checkbox>
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
                                    <v-list-item  :to="`/customer/agent/shipping-address/detail/${props.item.id}`" >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <!-- <div class="px-md-2" v-if="props.item.main_branch == 2">
                                        <hr>
                                    </div>
                                    <v-list-item v-if="props.item.main_branch == 2" :to="`/customer/agent/update/${props.item.id}`" >
                                        <v-list-item-content>
                                            <v-list-item-title>Set as Default</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item> -->
                                    <div class="px-md-2" v-if="props.item.status == 1">
                                        <hr>
                                    </div>
                                    <v-list-item v-if="props.item.status == 1" :to="`/customer/agent/shipping-address/update/${props.item.id}`" >
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

            <div class="title-table mt-10 mx-6">
                <label class="label-title">
                    Payment Info
                </label>
            </div>
            <v-data-table
                :headers="table.fields2"
                :items="items.merchant_acc_num"
                :items-per-page="10"
                class="elevation-1 mx-6"
            >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.payment_channel.name }}</td>
                        <td>{{ props.item.account_name }}</td>
                        <td>{{ props.item.account_number }}</td>
                    </tr>
                </template>
            </v-data-table>
            <div class="row mx-6 mt-10">
                <v-btn 
                    rounded 
                    elevation="0" 
                    class="no-caps px-7" 
                    @click="$router.go(-1)"
                    style="background: #E6E9ED; color:#768F9C;height:45px"
                >Back</v-btn>
            </div>
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
        <AuditLog :data="dataAuditLog"/>
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
                checkbox: true,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'No',
                            width: "5%",
                            sortable: false,
                        },
                        {
                            text:'Address Name',
                            sortable: false
                        },
                        {
                            text:'Recipient Name',
                            sortable: false
                        },
                        {
                            text:'Phone Number',
                            sortable: false
                        },
                        {
                            text:'Address',
                            sortable: false
                        },
                        {
                            text:'Sub District - Province',
                            sortable: false
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Default',
                            sortable: false
                        },
                        {
                            text:'Action',
                            width: "5%",
                            sortable: false
                        },
                    ],
                    fields2: [
                        {
                            text:'Payment Channnel',
                            sortable: false,
                        },
                        {
                            text:'Account Name',
                            sortable: false
                        },
                        {
                            text:'Account Number',
                            sortable: false
                        }
                    ],
                },
                items : {
                    business_type : {
                        name :''
                    },
                    finance_area : {
                        name :''
                    },
                    payment_term : {
                        name :''
                    },
                    invoice_term : {
                        name :''
                    },
                    payment_method : {
                        name :''
                    },
                },
                data : [{
                    archetype : {
                        name :''
                    },
                    price_set : {
                        name :''
                    },
                    salesperson : {
                        name :''
                    },
                    area : {
                        name :''
                    },
                    sub_district : {
                        concat_address : "",
                        postal_code : ""
                    }
                    
                }],
                ConfirmData : {},
                dataAuditLog : {}
            }
        },
        created() {
            this.renderData()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
        methods: {
            seeHistory() {
                this.dataAuditLog = {
                    model : true,
                    id: this.$route.params.id,
                    type: "agent"
                }
            },
            archived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Archive this Agent",
                    title : "Archive",
                    text : "Are you sure you want to Archive this Agent ?",
                    urlApi : "/customer/agent/archive/"+id,
                    data : {}
                }
            },
            unarchived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Unarchive this Agent",
                    title : "Unarchive",
                    text : "Are you sure you want to Unarchive this Agent ?",
                    urlApi : "/customer/agent/unarchive/"+id,
                    data : {}
                }
            },
            async renderData(){
                this.loading = true;
                await this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    this.loading = false;
                    this.data = response.data.data;
                    this.items = response.data.data[0].merchant;
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
        },
    }
</script>