<template>
    <v-container class="Heiti" style="padding: 50px;">
        <v-subheader>
           <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2">
                   <router-link  :to="{ name: 'RoleCreate' }" class="routerLink d-flex justify-end" v-privilege="'rol_crt'">
                        <v-btn
                                rounded
                                style= "display: none; background-color: #768F9C !important; border-color: #768F9C !important;"
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
                <v-col cols="6" md="3">
                    <SelectDivision
                            v-model="division"
                            @selected="divisionSelected"
                            :division="division"
                    ></SelectDivision>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        
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
                    <td>{{ props.item.division.name }}</td>
                    <td>{{ props.item.note }}</td>
                    <td>     <v-chip
                            class="ma-2"
                            :color="statusMaster(props.item.status_convert)"
                            :text-color="statusMasterText(props.item.status_convert)"
                    >
                        {{props.item.status_convert.toUpperCase()}}
                    </v-chip></td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on: menu }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <v-btn
                                                color="primary"
                                                dark
                                                v-on="{ ...tooltip, ...menu }"
                                        >  <v-icon dark>mdi-format-list-bulleted-square</v-icon></v-btn>
                                    </template>
                                    <span>Im A ToolTip</span>
                                </v-tooltip>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'RoleDetail', params: { id: props.item.id } }">Detail</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'RoleUpdate', params: { id: props.item.id } }">Update</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="props.item.status == 1"
                                             @click="archive(props.item.id)"
                                >
                                    <router-link  class="routerLink" :to="{ name: '' }" >Archive</router-link>
                                </v-list-item>
                                <v-list-item v-if="props.item.status == 2"
                                             @click="unarchive(props.item.id)"
                                >
                                    <router-link  class="routerLink" :to="{ name: '' }" >Unrchive</router-link>
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
        <ModalDirection v-model="modalOpen" :sendData=confirmation></ModalDirection>
    </v-container>
</template>

<script>
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "Role",
        components: {ModalDirection},
        data() {
            return {
                modalOpen: false,
                search: '',
                loading: false,
                statuses:999,
                division:null,
                division_id:null,
                table: {
                    fields: [
                        {
                            text:'CODE',
                            width: "20%",
                            sortable: false,
                        },
                        {
                            text:'NAME',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'DIVISION',
                            width: "15%",
                            sortable: false
                        },
                        {
                            text:'NOTE',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'STATUS',
                            width: "15%",
                            sortable: false
                        },
                        {
                            text:'ACTION',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
                confirmation:{
                    valueName: 'Role',
                    action:'',
                    status: '',
                    urlPath:'',
                    parentPath:'/user/role',
                }
            }
        },
        created() {
            this.renderData('',this.statuses,this.division_id)
        },
        methods: {
            renderData(search,statuses,division_id){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }

                if(division_id == null){
                    division_id = ''
                }else{
                    division_id= "|division_id.e:"+division_id
                }

                this.$http.get("/role",{params:{
                      perpage:10000,
                      embeds:'division_id',
                      conditions:'name.icontains:'+search+'%2COr.code.icontains:'+search+statuses+division_id,
                      orderby:'-id',
                  }}).then(response => {
                      this.loading = false;
                      this.items = response.data.data
                      if(this.items === null){
                          this.items = []
                      }
                    });
                },
            divisionSelected(d) {
                this.division = '';
                this.division_id = '';
                if (d !== '' && d !== undefined) {
                    this.division = d;
                    this.division_id = d.id;
                }
            },
            archive(id){
                this.confirmation.action = 'Archive'
                this.confirmation.status = '1'
                this.confirmation.urlPath ='/role/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            unarchive(id){
                this.confirmation.action = 'Unarchive'
                this.confirmation.status = '2'
                this.confirmation.urlPath ='/role/unarchive/'+id;
                this.modalOpen = !this.modalOpen;
            }
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses,this.division_id)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val,this.division_id)
                },
                deep: true
            },
            'division': {
                handler: function (val) {
                    let that = this
                    this.division_id = val.id
                    that.renderData(this.search,this.statuses,this.division_id)
                },
                deep: true
            },
        },
    }
</script>