<template>
    <v-container class="px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2">
                    <router-link  :to="{ name: 'ProductTagCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >
                        Create Product Tag
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="4" offset="6">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search code or name..."
                                single-line
                                hide-details
                                style="margin-top:-10px;"
                                v-on="{ ...tooltip }"
                                rounded
                                outlined
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code, name</span>
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
        <v-col cols="12" class="mt-6">
            <v-row>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :norequired="true"
                        name= "area"
                        @selected="areaSelected">
                    </SelectArea>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Product Tag
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.area }}</td>
                    <td>
                        <div v-if="props.item.status == 1">
                            <v-chip
                                :color="statusMaster('active')"
                            > <span class="pa-md-2"> Active </span></v-chip>
                        </div>
                        <div v-else>
                            <v-chip
                                :color="statusMaster('archived')"
                            > Archived </v-chip>
                        </div>
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
                                <v-list-item  :to="`/inventory/product-tag/detail/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2">
                                    <hr>
                                </div>
                                <v-list-item  :to="`/inventory/product-tag/update/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Update</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2">
                                    <hr>
                                </div>
                                <v-list-item @click="changeStatus(props.item.status,props.item.id)" v-if="props.item.status=='1'">
                                    <v-list-item-content>
                                        <v-list-item-title>Archive</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="changeStatus(props.item.status,props.item.id)" v-else>
                                    <v-list-item-content>
                                        <v-list-item-title>Unarchive</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "ProductTag",
        data() {
            return {
                statusDialog: false,
                statusTitle: '',
                search: '',
                loading: false,
                area : "",
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Name',
                            sortable: false
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'Status',
                            sortable: false
                        },
                        {
                            text:'Action',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
                area_id : "",
                ConfirmData : {}
            }
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData(self.search,self.statuses, self.area_id)
                }
            });
        },
        created() {
            this.renderData('',this.statuses,'')
        },
        methods: {
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Archive this Product Tag",
                        title : "Archive",
                        text : "Are you sure you want to Archive this product tag ? This tag will be hiden in Mobile Apps.",
                        urlApi : "/inventory/tag_product/archive/"+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        statusMsg : "Success to Unarchive this Product Tag",
                        title : "Unarchive",
                        text : "Are you sure you want to Unarchive this product tag ? This tag will be hiden in Mobile Apps.",
                        urlApi : "/inventory/tag_product/unarchive/"+id,
                        data : {}
                    }
                }
            },
            areaSelected(d) {
                this.area_id = ''
                if (d) {
                    this.area_id = d.value
                }
                this.renderData(this.search,this.statuses, this.area_id)
            },
            renderData(search,statuses,area){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                this.$http.get("/inventory/tag_product/filtered",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses,
                        orderby:'-id',
                        area : area
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.area_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this
                    that.renderData(this.search,val,this.area_id)
                },
                deep: true
            },
        },
    }
</script>
