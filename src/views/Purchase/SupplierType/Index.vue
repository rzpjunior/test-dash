<template>
    <v-container class="px-12">
        <v-subheader>
            <v-row class="mt-10">
                <v-col cols="4" offset="8">
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
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Supplier Type
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name }}</span></td>
                    <td align="center">{{ props.item.abbreviation }}</td>
                    <td>{{ props.item.note }}</td>
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
        name: "SupplierType",
        data() {
            return {
                search: '',
                statuses:999,
                loading: false,
                table: {
                    fields: [
                        {
                            text:'Code',
                            width: "25%",
                            sortable: false,
                        },
                        {
                            text:'Abbreviation Code',
                            width: "25%",
                            align:"center",
                            sortable: false
                        },
                        {
                            text:'Note',
                            width: "25%",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "25%",
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
              this.$http.get("/purchase/supplier_type",{params:{
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

<style scoped>
</style>