<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="2"></v-col>
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
        <v-col cols="12" class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="6" md="3">
                    <SelectStatus
                        v-model="statuses"
                        @selected="statusSelected"
                    ></SelectStatus>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Payment Method
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
                    <!-- <td>
                        <div v-if="props.item.status == 1">{{ 'Active' }}</div>
                        <div v-else>{{ 'Archived' }}</div>
                    </td> -->
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
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "PaymentMethod",
        data() {
            return {
                search: '',
                loading: false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "10%",
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
                this.$http.get("/finance/payment",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            statusSelected(d) {
                this.statuses = null;
                if (d !== ''  && d !== undefined) {
                    this.statuses = d.value;
                }
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