<template>
    <v-container >

        <v-app >
            <v-card :loading="loading">
                <v-subheader class="title"> <v-icon large color="blue darken-2">mdi-label</v-icon>OUTLET DETAIL
                </v-subheader>
                <v-col cols="12" v-if="loading === false">
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Main Outlet</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Basic Info</h3>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="12" md="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                        <tr><td>Business Type</td><td class="text-right">{{ branchDetail.merchant.business_type.name }}</td></tr>
                                        <tr><td>Main Outlet</td><td class="text-right">{{ branchDetail.merchant.name }}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Outlet</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Basic Info</h3>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="12" md="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>Outlet Code</td><td class="text-right">{{ branchDetail.code }}</td></tr>
                                    <tr><td>Outlet Name</td><td class="text-right">{{ branchDetail.name }}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Sales Info</h3>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="12" md="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>Archetype</td><td class="text-right">{{ branchDetail.archetype.name }}</td></tr>
                                    <tr><td>Salesperson</td><td class="text-right">{{ branchDetail.salesperson.name }}</td></tr>
                                    <tr><td>Price Set</td><td class="text-right">{{ branchDetail.price_set.name }}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <h3 class="pl-4 pt-0 pr-4 mt-0">Shipping Info</h3>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="12" md="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>PIC Name</td><td class="text-right">{{ branchDetail.pic_name }}</td></tr>
                                    <tr><td>Phone Number</td><td class="text-right">{{ branchDetail.phone_number }}</td></tr>
                                    <tr><td>Alternative Phone Number</td><td class="text-right">{{ branchDetail.alt_phone_number }}</td></tr>
                                    <tr><td>Shipping Address</td><td class="text-right">{{ branchDetail.shipping_address }}</td></tr>
                                    <tr><td>Note</td><td class="text-right">{{ branchDetail.note }}</td></tr>
                                    <tr><td>Sub District</td><td class="text-right">{{ branchDetail.sub_district.name }}</td></tr>
                                    <tr><td>Postal Code</td><td class="text-right">{{ branchDetail.sub_district.postal_code }}</td></tr>
                                    <tr><td>District</td><td class="text-right">{{ branchDetail.sub_district.district.name }}</td></tr>
                                    <tr><td>City</td><td class="text-right">{{ branchDetail.sub_district.district.city.name }}</td></tr>
                                    <tr><td>Province</td><td class="text-right">{{ branchDetail.sub_district.district.city.province.name }}</td></tr>
                                    <tr><td>Area</td><td class="text-right">{{ branchDetail.sub_district.area.name }}</td></tr>
                                    <tr><td>Default Warehouse</td><td class="text-right">{{ branchDetail.warehouse.name }}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col>
                    <div class="d-flex justify-end pa-5">
                        <v-btn class="neutral ml-2"><router-link  class="routerLink" :to="{ name: 'BranchUpdateSalesPerson', params: { id: branchDetail.id } }" >update sales person</router-link></v-btn>
                        <v-btn class="neutral ml-2"><router-link  class="routerLink" :to="{ name: 'BranchConvertArchetype', params: { id: branchDetail.id } }" >convert archetype</router-link></v-btn>
                        <v-btn v-if="branchDetail.status === 1" class="secondary ml-2" @click="archive(branchDetail.id)">archive</v-btn>
                        <v-btn v-if="branchDetail.status === 2" class="secondary ml-2" @click="unarchive(branchDetail.id)">unarchive</v-btn>
                    </div>
                </v-col>
            </v-card>
            <ModalDirection v-model="modalOpen" :sendData=confirmation></ModalDirection>
        </v-app>
    </v-container>
</template>

<script>
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "BranchDetail",
        components: {
            ModalDirection
        },
        data() {
            return {
                modalOpen: false,
                branchDetail:{},
                loading:true,

                items:[],
                confirmation:{
                    valueName: 'Outlet',
                    status:'',
                    urlPath:'',
                    parentPath:'/customer/branch',
                }
            }
        },
        methods:{
            async renderData(){
                try{
                    await this.$http.get("/customer/branch/"+ this.$route.params.id,{params:{
                        embeds: 'sub_district_id.district_id.city_id.province_id.country_id'
                        }}).then(response => {
                        this.branchDetail = response.data.data
                    });
                    this.loading= false
                } catch(e) {
                    console.log(e);
                }
            },
            archive(id){
                this.confirmation.action = 'Archive'
                this.confirmation.status = '2';
                this.confirmation.urlPath='/customer/branch/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            unarchive(id){
                this.confirmation.action= 'Unarchive'
                this.confirmation.status = '1';
                this.confirmation.urlPath='/customer/branch/unarchive/'+id;
                this.modalOpen = !this.modalOpen;
            }
        },
        mounted() {
            this.renderData()
        },
    }
</script>

<style scoped>

</style>