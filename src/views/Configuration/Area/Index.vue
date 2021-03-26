<template>
    <v-container class="pa-12">
        <div class="title-table">
            <label class="label-title">
                Area
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
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'ConfigurationAreaDetail', params: { id: props.item.id } }">Detail</router-link>
                                    </v-list-item-title>
                                </v-list-item>
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
        name: "ConfigurationArea",
        data() {
            return {
                loading: false,
                table: {
                    fields: [
                        {
                            text:'Area',
                            sortable: false,
                        },
                        {
                            text:'Status',
                            sortable: false
                        },
                        {
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData()
        },
        methods: {
            renderData(){
                this.loading = true;
                let aux = "|aux_data:2"
                this.$http.get("/config/area",{params:{
                        perpage:100,
                        conditions:"aux_data:2",
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
        }
    }
</script>