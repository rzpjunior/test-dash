<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="4" md="2" lg="2">
                    <router-link  :to="{ name: 'PriceSetCreate' }" class="routerLink d-flex justify-end" v-privilege="'ctg_crt'">
                        <v-btn
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            rounded
                            class="no-caps"
                        >Create PriceSet
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="4" offset="6">
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
                                    rounded
                                    outlined
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
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
        <v-col cols="12" class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="6" md="3">
                   <SelectStatus
                        v-model="statuses"
                        @selected="statusSelected"
                    ></SelectStatus>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Price Set List
            </label>
        </div>
        <v-data-table
                :mobile-breakpoint="0"
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.note }}</td>
                    <td>
                        <!-- <div v-if="props.item.status == 1">{{ 'Active' }}</div>
                        <div v-else>{{ 'Archived' }}</div> -->
                        <div v-if="props.item.status == 1">
                            <v-chip
                                class="ma-2"
                                color="#7CE363"
                                text-color="#000000"
                            >
                                {{ 'Active' }}
                            </v-chip>
                        </div>
                        <div v-else>
                            <v-chip
                                class="ma-2"
                                color="#7CE363"
                                text-color="#000000"
                            >
                                {{ 'Archived' }}
                            </v-chip>
                        </div>
                    </td>

                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                        icon
                                        v-on="{ ...tooltip, ...menu }"
                                ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                            </template>
                            <v-list style="background-color: #E8EFF2;">
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link  style="color: #333333; text-decoration: none;" class="routerLink" :to="{ name: 'PriceSetUpdate', params: { id: props.item.id } }" >Update</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="props.item.status == 1">
                                    <v-list-item-title>
                                        <router-link style="color: #333333; text-decoration: none;"  class="routerLink" :to="{ name: 'PriceSetArchive', params: { id: props.item.id } }" >Archive</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="props.item.status == 2">
                                    <v-list-item-title>
                                        <router-link style="color: #333333; text-decoration: none;" class="routerLink" :to="{ name: 'PriceSetUnarchive', params: { id: props.item.id } }" >Unarchive</router-link>
                                    </v-list-item-title>
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
        name: "PriceSet",
        data() {
            return {
                search: '',
                loading: false,
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
                            width: "25%",
                            sortable: false
                        },
                        {
                            text:'Note',
                            width: "20%",
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
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                this.$http.get("/price/set",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false
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