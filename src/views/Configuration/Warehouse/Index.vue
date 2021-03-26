<template>
    <v-container class="Heiti px-12">
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
                <v-spacer></v-spacer>
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
                                rounded
                                outlined
                                v-on="{ ...tooltip }"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        <v-col cols="12" class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1">
            <v-row>
                <v-col cols="6" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        class="rounded-form"
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="6" md="3">
                    <SelectArea @selected="areaSelected"></SelectArea>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>

        <div class="title-table">
            <label class="label-title">
                Warehouse List
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
                    <td>
                        {{ props.item.code }} <br>
                        <span class="second-color">{{ props.item.name }}</span>
                    </td>
                    <td>{{ props.item.area.name }}</td>
                    <td>{{ props.item.pic_name }}</td>
                    <td>
                        <div v-if="props.item.status == 1">
                            <v-chip
                                class="ma-2"
                                color="#C6EB93"
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
                                <template >
                                    <v-btn
                                            icon
                                            v-on="{ ...menu }"
                                    >  <v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                            </template>
                            <v-list style="background-color: #E8EFF2;">
                                <v-list-item>
                                        <v-list-item-title>
                                            <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'WarehouseDetail', params: { id: props.item.id } }">Detail</router-link>
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
        name: "Warehouse",
        data() {
            return {
                search: '',
                loading: false,
                area:null,
                filter:{
                    area_id:''
                },
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Area',
                            sortable: false
                        },
                        {
                            text:'PIC Name',
                            sortable: false
                        },
                        {
                            text:'Status',
                            sortable: false
                        },
                        {
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        created() {
            this.renderData('',this.filter.area_id,this.statuses)
        },
        methods: {
            renderData(search,areaID,statuses){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }

                if(areaID === '') {
                    areaID = ''
                }else if(areaID == '65536'){
                    areaID = ''
                }else{
                    areaID = "|area_id.e:"+ areaID
                }
                this.$http.get("/config/warehouse",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses+areaID,
                        embeds: 'area_id',
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            areaSelected(d){
                this.filter.area_id = '';
                if(d !== '' && d !== undefined){
                    this.filter.area_id = d.id;
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.filter.area_id,this.statuses)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,this.filter.area_id,val)
                },
                deep: true
            },
            'filter.area_id': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val,this.statuses)
                },
                deep: true
            },
        },
    }
</script>