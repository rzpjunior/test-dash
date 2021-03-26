<template>
    <v-container >

        <v-app >
            <v-card :loading="loading">
                <v-subheader class="title"> <v-icon large color="blue darken-2">mdi-label</v-icon>DETAIL ITEM
                </v-subheader>
                <v-col cols="12" v-if="loading === false">
                    <v-row >
                        <v-col cols="6" md="7">
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>Group Code:</td><td class="text-right">{{ itemDetail.group.group_code }}</td></tr>
                                    <tr><td>Group Name:</td><td class="text-right">{{ itemDetail.group.group_name }}</td></tr>
                                    <tr><td>Group UOM:</td><td class="text-right">{{ itemDetail.group.item_uom.item_uom_name  }}</td></tr>
                                    <tr><td>Item Code:</td><td class="text-right">{{ itemDetail.item_code }}</td></tr>
                                    <tr><td>Item Name:</td><td class="text-right">{{ itemDetail.item_name }}</td></tr>
                                    <tr><td>Item Type:</td><td class="text-right">{{ itemDetail.category_type.item_type.type_name }}</td></tr>
                                    <tr><td>Item Category:</td><td class="text-right">{{ itemDetail.category_type.category_name }}</td></tr>
                                    <tr><td>Item Weight:</td><td class="text-right">{{ itemDetail.item_weight }}</td></tr>
                                    <tr><td>Item UOM:</td><td class="text-right">{{ itemDetail.item_uom.item_uom_name }}</td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>

                        <v-col cols="6" md="5" >
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                        <tr><td>Status:</td><td class="text-right">{{ itemDetail.is_archived === 0? 'Active' : 'Archived' }}</td></tr>
                                        <tr><td>Note:</td><td class="text-right">{{ itemDetail.note }}</td></tr>
                                     <tr>
                                        <td></td> <td>
                                         <v-img
                                                 height="250"
                                                 width="250"
                                                 :src="avatar(itemDetail.image)"
                                         ></v-img>
                                     </td>
                                     </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>

                    </v-row>
                </v-col>

                <v-col>
                    <v-row >
                        <v-col cols="12" md="8" >
                            <p><span><b> <v-icon medium color="blue darken-2">mdi-label</v-icon> History</b></span></p>
                            <p><span>Created at {{itemDetail.created_at === '0001-01-01T00:00:00Z' ? '-' : itemDetail.created_at | moment("DD/MM/YYYY HH:mm:ss") }} </span> <span v-if="itemDetail.created_at !== '0001-01-01T00:00:00Z'"> by {{itemDetail.created_by.name === null ? '-' : itemDetail.created_by.name}} ({{itemDetail.created_by.email === null ? '-' : itemDetail.created_by.email}})</span></p>
                            <p><span>Last Updated at {{itemDetail.last_updated_at === '0001-01-01T00:00:00Z' ? '-' : itemDetail.last_updated_at | moment("DD/MM/YYYY HH:mm:ss")}} </span> <span v-if="itemDetail.last_updated_at !== '0001-01-01T00:00:00Z'"> by {{itemDetail.last_updated_by.name === null ? '-' : itemDetail.last_updated_by.name}} ({{itemDetail.last_updated_by.email === null ? '-' : itemDetail.last_updated_by.email}})</span></p>
                            <p><span>Last Archived at {{itemDetail.last_archived_at === '0001-01-01T00:00:00Z' ? '-' : itemDetail.last_archived_at | moment("DD/MM/YYYY HH:mm:ss") }} </span> <span v-if="itemDetail.last_archived_at !== '0001-01-01T00:00:00Z'"> by {{itemDetail.last_archived_by.name === null ? '-' : itemDetail.last_archived_by.name}} ({{itemDetail.last_archived_by.email === null ? '-' : itemDetail.last_archived_by.email}})</span></p>
                            <p><span>Last Unarchived at {{itemDetail.last_unarchived_at === '0001-01-01T00:00:00Z' ? '-' : itemDetail.last_unarchived_at | moment("DD/MM/YYYY HH:mm:ss")}} </span> <span v-if="itemDetail.last_unarchived_at !== '0001-01-01T00:00:00Z'"> by {{itemDetail.last_unarchived_by.name === null ? '-' : itemDetail.last_unarchived_by.name}} ({{itemDetail.last_unarchived_by.email === null ? '-' : itemDetail.last_unarchived_by.email}})</span></p>

                        </v-col>

                    </v-row>
                </v-col>
            </v-card>
        </v-app>
    </v-container>
</template>

<script>
    export default {
        name: "InventoryItemDetail",

        data() {
            return {
                post: null,
                itemDetail:{},
                loading:true
            }
        },
        methods:{
            renderData(){
                this.$http.get("/inventory/item/"+ this.$route.params.id).then(response => {
                    this.itemDetail = response.data.data
                    this.loading= false
                });
            },
            avatar(url){
                if(url === ""){
                    url= '/assets/images/default-item-image.png'
                }
                return 'https://dashboard.edenfarm.tech'+url
            },
        },
        mounted() {
            this.renderData()
        },
    }
</script>

<style scoped>

</style>