<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <v-breadcrumbs-item
                slot="item"
                slot-scope="{ item }"
                exact
                v-if="item.to"
                :to="item.to">
                {{ item.text }}
            </v-breadcrumbs-item>
            <v-breadcrumbs-item
                style="color:#9C9C9C"
                v-else>
                {{ item.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
    <v-container>
        <div>
            <div class="px-6">
                <v-row class="px-3">
                    <v-col class="fs25">
                        {{datas.address_name}}
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <v-btn
                            elevation="0"
                            rounded
                            @click="seeHistory()"
                            class="no-caps"
                            color="#E6E9ED"
                            style="width:133px"
                            >
                            See History
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="row mt-6 mx-6" >
                <div class="col">
                    <DetailRow :name="'Recipient Name'" :value="datas.pic_name"/>
                    <DetailRow :name="'Alternative Phone Number'" :value="datas.alt_phone_number"/>
                    <DetailRow :name="'Note'" :value="datas.note"/>
                    <DetailRow :name="'Postal Code'" :value="datas.sub_district.postal_code"/>
                    <DetailRow :name="'City'" :value="datas.sub_district.district.city.name"/>
                    <DetailRow :name="'Area'" :value="datas.sub_district.area.name"/>
                    <DetailRow :name="'Default Shipping address'" v-if="datas.main_branch === 1" :value="'Yes'"/>
                    <DetailRow :name="'Default Shipping address'" v-else :value="'No'"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Phone Number'" :value="datas.phone_number"/>
                    <DetailRow :name="'Shipping Address'" :value="datas.shipping_address"/>
                    <DetailRow :name="'Sub District'" :value="datas.sub_district.name"/>
                    <DetailRow :name="'District'" :value="datas.sub_district.district.name"/>
                    <DetailRow :name="'Province'" :value="datas.sub_district.district.city.province.name"/>
                    <DetailRow :name="'Default Warehouse'" :value="datas.warehouse.name"/>
                </div>
            </div>
        </div>
        <AuditLog :data="dataAuditLog"/>
    </v-container>
    </div>
</template>

<script>
    export default {
        name: "Tag",
        data() {
            return {
                breadcrumbs : [
                    {
                        text: 'Agent List',
                        to : '/customer/agent'
                    },
                    {
                        text: 'Agent Detail',
                        to : ''
                    },
                    {
                        text: 'Shipping Address',
                    },
                ],
                dataAuditLog : '',
                datas:{
                    warehouse : {
                        name : ""
                    },
                    sub_district:{
                        name : "",
                        area:{
                            name : ""
                        },
                        postal_code : "",
                        district : {
                            name : "",
                            city: {
                                name : "",
                                province : {
                                    name : ""
                                }
                            }
                        }
                    },
                },
            }
        },
        created() {
            this.renderData()
        },
        methods: {
            seeHistory() {
                this.dataAuditLog = {
                    model : true,
                    id: this.$route.params.id,
                    type: "shipping_address"
                }
            },
            async renderData(){
                this.loading = true;
                await this.$http.get("/customer/agent/shipping/address/"+this.$route.params.id).then(response => {
                    this.datas = response.data.data;
                    this.breadcrumbs[1].to = '/customer/agent/detail/'+this.datas.merchant.id
                });
            }
        },
    }
</script>