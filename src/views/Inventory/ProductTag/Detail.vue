<template>
    <v-container >
        <div>
            <div class="px-6">
                <div class="row">
                    <div class="img-product ma-3">
                        <v-img
                            class="rounded-form"
                            height="180"
                            width="250"
                            :src="items.image_url"
                        ></v-img>
                    </div>
                </div>
                <v-row class="px-3 mt-10">
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
                            <v-list-item :to="`/inventory/product-tag/update/${items.id}`">
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item v-if="items.status == 1" @click="archived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                                <v-divider></v-divider>
                            </div>
                            <v-list-item v-if="items.status == 2" @click="unarchived(items.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
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
                </div>
                <div style="width:5%"/>
                <div class="col">
                    <DetailRow :name="'Area'" :value="items.area"/>
                </div>
            </div>
            <div class="row mx-6 second-color" style="margin-top:-24px">
                <div class="col">
                    <DetailRow :name="'Note'" :value="items.note" :align="true"/>
                </div>
            </div>
            <div class="row mx-6" style="margin-top: 220px">
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
    </v-container>
</template>

<script>
    export default {
        name: "ProductTagDetail",
        data() {
            return {
                items : {},
                ConfirmData : {}
            }
        },
        methods:{
            archived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Archive this Product Tag",
                    title : "Archive",
                    text : "Are you sure you want to Archive this product tag ? This tag will be hiden in Mobile Apps.",
                    urlApi : "/inventory/tag_product/archive/"+id,
                    data : {}
                }
            },
            unarchived(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Unarchive this Product Tag",
                    title : "Unarchive",
                    text : "Are you sure you want to Unarchive this product tag ? This tag will be hiden in Mobile Apps.",
                    urlApi : "/inventory/tag_product/unarchive/"+id,
                    data : {}
                }
            },
            renderData(){
                this.$http.get("/inventory/tag_product/"+ this.$route.params.id).then(response => {
                    this.items = response.data.data
                });
            },
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
        created() {
            this.renderData()
        },
    }
</script>

<style scoped>

</style>