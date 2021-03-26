<template>
    <v-container class="pa-12">
        <div class="title-table">
            <label class="label-title">
                Area Policy
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.area.code }} - {{ props.item.area.name }}</td>
                    <td>{{ props.item.min_order }}</td>
                    <td>{{ props.item.delivery_fee }}</td>
                    <td>{{ props.item.order_time_limit }}</td>
                    <td>{{ props.item.default_price_set.name }}</td>
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
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'AreaPolicyUpdate', params: { id: props.item.id } }">Update</router-link>
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
        name: "ConfigurationAreaPolicy",
        data() {
            return {
                search: '',
                loading: false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Area',
                            sortable: false,
                        },
                        {
                            text:'Minimum Order',
                            sortable: false
                        },
                        {
                            text:'Delivery Fee',
                            sortable: false
                        },
                        {
                            text:'Order Time Limit',
                            sortable: false
                        },
                        {
                            text:'Default Price Set',
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
                this.$http.get("/config/area/policy",{params:{
                        perpage:100,
                        // conditions:'code.icontains:'
                        // +search+statuses,
                        embeds:'area_id,default_price_set',
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
    }
</script>