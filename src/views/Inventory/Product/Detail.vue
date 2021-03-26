<template>
    <v-container >
        <div>
            <div class="px-6">
                <div class="row">
                    <div class="img-product ma-3" v-for="(item, idx) in items.product_image" :key="idx">
                        <v-img
                            class="rounded-form"
                            height="180"
                            width="250"
                            :src="item.image_url"
                        ></v-img>
                    </div>
                </div>
                <v-row class="px-3 mt-10">
                    <v-col class="fs25">
                        {{items.name}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            v-if="items.status==1"
                            elevation="0"
                            rounded
                            class="no-caps"
                            :color="statusMaster('active')"
                            style="width:104px"
                            >
                            Active
                        </v-btn>
                        <v-btn
                            v-else
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
                            <v-list-item :to="`/inventory/product/update/${items.id}`">
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item  :to="`/inventory/product/purchasability/update/${items.id}`">
                                <v-list-item-content>
                                    <v-list-item-title>Update purchasability</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/inventory/product/salability/update/${items.id}`">
                                <v-list-item-content>
                                    <v-list-item-title>Update salability</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item :to="`/inventory/product/storability/update/${items.id}`">
                                <v-list-item-content>
                                    <v-list-item-title>Update storability</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-col>
                </v-row>
            </div>
            <div class="row mt-6 mx-6 second-color" >
                <div class="col">
                    <DetailRow :name="'Code'" :value="items.code"/>
                    <DetailRow :name="'UOM'" :value="`${items.uom.code} - ${items.uom.name}`"/>
                    <DetailRow v-if="items.up_code" :name="'Universal Product Code'" :value="items.up_code"/>
                    <DetailRow v-else :name="'Universal Product Code'" :value="`-`"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Category'" :value="`${items.category.code} - ${items.category.name}`"/>
                    <DetailRow :name="'Weight'" :value="toFixed(items.unit_weight)"/>
                </div>
            </div>
            <div class="row mx-6 second-color" style="margin-top:-24px">
                <div class="col">
                    <DetailRow :name="'Note'" :value="items.note" :align="true"/>
                </div>
            </div>
            <div class="row mt-6 mx-6 second-color" >
                <div class="col">
                    <DetailRow :name="'Product Tag'" :value="items.tag_product_str"/>
                </div>
            </div>
            <div class="row mx-6 second-color" style="margin-top:-24px">
                <div class="col">
                    <DetailRow :name="'Description'" :value="items.description" :align="true"/>
                </div>
            </div>
            <v-row class="mx-6">
                <v-col>
                    <v-switch
                        v-model="items.storability"
                        label="Storability"
                        color="#50AE55"
                        inset
                        :false-value="2"
                        :true-value="1"
                        disabled
                    ></v-switch>
                    <div style="margin-top:-20px;margin-left:54px" v-if="items.storability == 1">
                        <v-checkbox
                            v-for="(item, idx) in items.warehouse_sto" :key="idx"
                            v-model="checkbox"
                            color="#50AE55"
                            disabled
                            :label="`${item.code} - ${item.name} (${item.area.code} - ${item.area.name})`"
                            style="margin-bottom:-28px"
                        ></v-checkbox>
                    </div>
                    <v-switch
                        v-model="items.salability"
                        label="Salability"
                        color="#50AE55"
                        inset
                        :false-value="2"
                        :true-value="1"
                        style="margin-top:30px"
                        disabled
                    ></v-switch>
                    <div style="margin-top:-20px;margin-left:54px" v-if="items.salability == 1">
                        <v-checkbox
                            v-for="(item, idx) in items.warehouse_sal" :key="idx"
                            v-model="checkbox"
                            color="#50AE55"
                            :label="`${item.code} - ${item.name} (${item.area.code} - ${item.area.name})`"
                            disabled
                            style="margin-bottom:-28px"
                        ></v-checkbox>
                    </div>
                </v-col>
                <v-col>
                    <v-switch
                        v-model="items.purchasability"
                        label="Purchasability"
                        color="#50AE55"
                        inset
                        :false-value="2"
                        :true-value="1"
                        disabled
                    ></v-switch>
                    <div style="margin-top:-20px;margin-left:54px" v-if="items.purchasability == 1">
                        <v-checkbox
                            v-for="(item, idx) in items.warehouse_pur" :key="idx"
                            v-model="checkbox"
                            color="#50AE55"
                            :label="`${item.code} - ${item.name} (${item.area.code} - ${item.area.name})`"
                            disabled
                            style="margin-bottom:-28px"
                        ></v-checkbox>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "productDetail",
        data() {
            return {
                checkbox : true,
                items : {
                    uom : {
                        code : ""
                    },
                    category : {
                        code : ""
                    },
                    warehouse_sto : [
                        {
                            code : "",
                            name : "",
                            area : {
                                code : "",
                                name : "",
                            } 

                        }
                    ],
                    warehouse_pur : [
                        {
                            code : "",
                            name : "",
                            area : {
                                code : "",
                                name : "",
                            } 

                        }
                    ],
                    warehouse_sal : [
                        {
                            code : "",
                            name : "",
                            area : {
                                code : "",
                                name : "",
                            } 

                        }
                    ]
                }
            }
        },
        methods:{
            renderData(){
                this.$http.get("/inventory/product/"+ this.$route.params.id).then(response => {
                    this.items = response.data.data
                });
            },
            toFixed(val) {
                return Number(val).toFixed(2)
            }
        },
        created() {
            this.renderData()
        },
    }
</script>