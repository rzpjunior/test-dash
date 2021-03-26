<template>
    <v-container>
        <v-subheader>
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
                <v-col cols="12" md="7" lg="7">
                    <h2>OUTLET LIST</h2>
                </v-col>
                <v-col cols="8" md="3" lg="3">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    style="margin-top:-10px;"
                                    v-on="{ ...tooltip }"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="4" md="2" lg="2">
                    <router-link  :to="{ name: 'BranchCreate' }" class="routerLink d-flex justify-end" v-privilege="'cst_tag'">
                        <v-btn
                                block
                                color="primary"
                                elevation="2"
                                large
                        >Create</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-subheader>
        <v-col cols="12" class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="6" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
        </v-col>

        <v-data-table
            :mobile-breakpoint="0"
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.merchant.code }} - {{ props.item.merchant.name }}</td>
                    <td>{{ props.item.archetype.name }}</td>
                    <td>{{ props.item.salesperson.name }}</td>
                    <td>{{ props.item.price_set.name }}</td>
                    <td>{{ props.item.sub_district.area.name }}</td>
                    <td>{{ props.item.status === 1 ? 'Active' : 'Archived' }}</td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                        color="primary"
                                        dark
                                        v-on="{ ...tooltip, ...menu }"
                                ><v-icon dark>mdi-format-list-bulleted-square</v-icon></v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                        @click=""
                                >
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'BranchDetail', params: { id: props.item.id } }" >Detail</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                        @click=""
                                >
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'BranchUpdate', params: { id: props.item.id } }" >Update</router-link></v-list-item-title>
                                </v-list-item>
                                <router-view></router-view>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "Branch",
        data() {
            return {
                search: '',
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "15%",
                            sortable: false,
                        },
                        {
                            text:'Name',
                            width: "30%",
                            sortable: false
                        },
                        {
                            text:'Main Outlet',
                            width: "5%",
                            sortable: false
                        },
                        {
                            text:'Archetype',
                            width: "15%",
                            sortable: false
                        },
                        {
                            text:'Sales Person',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Price Set',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Area',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Action',
                            width: "10%",
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.statuses)
        },
        methods: {
            renderData(search,statuses){
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                this.$http.get("/customer/branch",{params:{
                        perpage:100,
                        embeds:'merchant_id,area_id,archetype_id,price_set_id,warehouse_id,salesperson_id,sub_district_id,sub_district_id.area',
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses,
                        orderby:'-id',
                    }}).then(response => {
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
                    that.renderData(val,this.statuses)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val)
                },
                deep: true
            },
        },
    }
</script>