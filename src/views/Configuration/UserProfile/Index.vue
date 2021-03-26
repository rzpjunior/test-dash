<template>
    <v-container class="Heiti" style="padding: 50px;">
        <v-subheader>

            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2">
                    <router-link  :to="{ name: 'UserCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                            rounded
                            style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                            block
                            color="primary"
                            elevation="2"
                            large
                            class="no-caps"
                        >
                        Create User
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="8" offset-md="6" md="4" lg="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search code or User..."
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
        <h2 style="color: #768F9C;" class="pt-sm-13 ml-5 pb-3"> Filter </h2>
        <hr>
        <v-col cols="12" class="pt-sm-13 mt-10 mt-sm-16 mt-md-1">
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
                           v-model="area"
                           @selected="areaSelected"
                           :aux_data="'1.2'"
                   ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWarehouse
                            v-model="warehouse"
                            @selected="warehouseSelected"
                            :area_id="filter.area_id"
                            :disabled="disabled_warehouse"
                            :clear="clearWarehouse"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectDivision
                            v-model="division"
                            @selected="divisionSelected"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectRole
                            v-model="role"
                            @selected="roleSelected"
                            :division_id="filter.division_id"
                            :disabled="disabled_role"
                            :clear="clearRole"
                    > </SelectRole>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        
        <div class="title-table">
            <label class="label-title">
                Users
            </label>
        </div>
        <v-data-table
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
                :mobile-breakpoint="0"
        >
            <template v-slot:item="props">
                <tr>
                    <td>
                        {{ props.item.code }} <br>
                        <label style="color: #768F9C;">
                            {{ props.item.display_name }}
                        </label>
                    </td>
                    <td>{{ props.item.display_name }}</td>
                    <td>
                        {{ props.item.role.code }}-{{ props.item.role.name }} <br>
                         <label style="color: #768F9C;">
                             {{ props.item.role.division.code }}-{{ props.item.role.division.name }}
                        </label>
                    </td>
                    <td>
                        {{ props.item.area.code }}-{{ props.item.area.name }} <br>
                        <label style="color: #768F9C;">
                            {{ props.item.warehouse.code }}-{{ props.item.warehouse.name }}
                        </label>
                    </td>
                    <td> <v-chip
                            class="ma-2"
                            :color="statusMaster(props.item.user.status_convert)"
                            :text-color="statusMasterText(props.item.user.status_convert)"

                    >
                        {{props.item.user.status_convert.toUpperCase()}}
                    </v-chip></td>
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
                                            <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'UserDetail', params: { id: props.item.id } }">Detail</router-link>
                                        </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'UserUpdate', params: { id: props.item.id } }">Update</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;"  :to="{ name: ' ', params: { id: props.item.id } }">Archive</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: ' ', params: { id: props.item.id } }">UnArchive</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                                <router-view></router-view>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>

    </v-container>
</template>
<style scoped>
/* span{
    background-color: blue;
    border-color: blue;
    color: rgb(0, 0, 0);
    caret-color: rgb(0, 0, 0);
} */
</style>
<script>
    export default {
        name: "User",
        components: {SelectWarehouse, SelectRole, SelectDivision, SelectArea},
        data() {
            return {
                search: '',
                loading: false,
                area:null,
                division:null,
                role:null,
                warehouse:null,
                filter:{
                    area_id:'',
                    division_id:'',
                    role_id:'',
                    warehouse_id:'',
                },
                disabled_warehouse:true,
                clearWarehouse:false,
                disabled_role:true,
                clearRole:false,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'CODE',
                            sortable: false,
                        },
                        // {
                        //     text:'NAME',
                        //     width: "10%",
                        //     sortable: false,
                        // },
                        {
                            text:'DISPLAY NAME',
                            sortable: false,
                        },
                        {
                            text:'ROLE',
                            sortable: false,
                        },
                        // {
                        //     text:'DIVISION',
                        //     width: "15%",
                        //     sortable: false,
                        // },
                        {
                            text:'AREA',
                            sortable: false,
                        },
                        // {
                        //     text:'WAREHOUSE',
                        //     width: "15%",
                        //     sortable: false,
                        // },
                        {
                            text:'STATUS',
                            sortable: false,
                        },
                        {
                            text:'ACTION',
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        created() {
            this.renderData('',this.filter.area_id,this.statuses,this.filter.division_id,this.filter.role_id,this.filter.warehouse_id)
        },
        methods: {
            renderData(search, areaID, statuses, divisionID, roleID, warehouseID){

                this.loading = true;
                if(statuses === 999){
                  statuses = ''
                }else{
                  statuses= "|user_id.status:"+statuses
                }

                if(areaID === ''){
                  areaID = ''
                }else{
                  areaID = "|area_id.e:"+ areaID
                }
                if(divisionID === ''){
                    divisionID = ''
                }else{
                    divisionID = "|role_id.division_id.id.e:"+ divisionID
                }
                if(roleID === ''){
                    roleID = ''
                }else{
                    roleID = "|role_id.e:"+ roleID
                }
                if(warehouseID === ''){
                    warehouseID = ''
                }else{
                    warehouseID = "|warehouse_id.e:"+ warehouseID
                }
                this.$http.get("/user/staff",{params:{
                      perpage:10000,
                      embeds:'role_id__division_id,warehouse_id,area_id,user_id',
                      conditions:'code.icontains:'+search +'%2COr.name.icontains:'+ search + statuses + areaID + divisionID + roleID + warehouseID,
                      orderby:'-id',
                  }}).then(response => {
                  this.loading = false;
                  this.items = response.data.data
                  if(this.items === null){
                      this.items = []
                  }
                })
                .catch(e => {
                    this.items = []
                });
            },
            areaSelected(d){
                this.area = null;
                this.filter.area_id = '';
                this.disabled_warehouse = true;
                if(d !== '' && d !== undefined){
                    this.area = d;
                    this.filter.area_id = d.id;
                    this.warehouse = null;
                    this.filter.warehouse_id = '';
                    this.disabled_warehouse = false;
                }
            },
            divisionSelected(d) {
                this.division = '';
                this.filter.division_id = '';
                this.disabled_role = true;
                if (d !== '' && d !== undefined) {
                    this.division = d;
                    this.filter.division_id = d.id;
                    this.role = null;
                    this.filter.role_id = '';
                    this.disabled_role = false;
                }
            },
            roleSelected(d) {
                this.role = null;
                this.filter.role_id = '';
                if (d !== ''  && d !== undefined) {
                    this.role = d;
                    this.filter.role_id = d.id
                }
            },
            warehouseSelected(d) {
                this.warehouse = null;
                this.filter.warehouse_id = '';
                if (d !== ''  && d !== undefined) {
                    this.warehouse = d;
                    this.filter.warehouse_id = d.id
                }
            },

        },
        watch: {
            'search': {
                handler: function (search) {
                    let that = this;
                    that.renderData(search,this.filter.area_id,this.statuses,this.filter.division_id,this.filter.role_id, this.filter.warehouse_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (statuses) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,statuses,this.filter.division_id,this.filter.role_id, this.filter.warehouse_id)
                },
                deep: true
            },
            'filter.area_id': {
                handler: function (area_id) {
                    let that = this;
                    that.renderData(this.search,area_id,this.statuses,this.filter.division_id,this.filter.role_id, this.filter.warehouse_id)
                },
                deep: true
            },
            'filter.division_id': {
                handler: function (division_id) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,this.statuses,division_id, this.filter.role_id, this.filter.warehouse_id)
                },
                deep: true
            },
            'filter.role_id': {
                handler: function (role_id) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,this.statuses,this.filter.division_id,role_id, this.filter.warehouse_id)
                },
                deep: true
            },
            'filter.warehouse_id': {
                handler: function (warehouse_id) {
                    let that = this;
                    that.renderData(this.search,this.filter.area_id,this.statuses,this.filter.division_id,this.filter.role_id, warehouse_id)
                },
                deep: true
            },
        },
    }
</script>