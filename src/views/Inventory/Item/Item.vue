<template>
    <v-container >
        <v-subheader><h3>ITEM LIST</h3>
            <v-spacer></v-spacer>
        <v-btn>
            <router-link class="routerLink"  :to="{ name: 'InventoryItemCreate' }" >Create</router-link>
        </v-btn>
        </v-subheader>
        <v-col cols="12">
            <v-row>
                <v-col cols="6" md="3">
                    <v-select
                            v-model="value"
                            :items="autocomplete"
                            item-text="text"
                            item-value="value"
                            filled
                            label="Filter"
                    ></v-select>
                </v-col>

                <v-spacer></v-spacer>
                <v-col cols="6" md="3" >
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            filled
                    >
                    </v-text-field>
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
                    <td>
                        <v-avatar color="white" size="36">
                            <img
                                    :src="avatar(props.item.image)"
                                    alt="John"
                            >
                        </v-avatar>
                    </td>
                    <td>{{ props.item.item_code }}</td>
                    <td>{{ props.item.item_name }}</td>
                    <td>{{ props.item.group.group_name }}</td>
                    <td>{{ props.item.category_type.category_name }}</td>
                    <td>{{ props.item.item_uom.item_uom_name }}</td>
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
                                <v-list-item

                                        @click=""
                                >
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'InventoryItemDetail', params: { id: props.item.id } }" >Detail</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                        @click=""
                                >
                                    <v-list-item-title ><router-link  class="routerLink" :to="{ name: 'InventoryItemUpdate', params: { id: props.item.id } }" >Update</router-link></v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                        @click=""
                                >
                                    <v-list-item-title >UnArchive</v-list-item-title>
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

<script>

    export default {
        name: "Item",
        data() {
            return {
                search: '',
                autocomplete: [{
                    text:'Active',
                    value:0
                },{
                    text:'Archived',
                    value:1
                }],
                value:0,
                table: {
                    fields: [
                        {
                            text: '',
                            width: "1%",
                            sortable: false
                        },
                        {
                            text:'ITEM CODE',
                            width: "10%",
                            sortable: false,
                            // value: 'item_name'
                        },
                        {
                            text:'ITEM NAME',
                            width: "25%",
                            sortable: false
                        },
                        {
                            text:'GROUP',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'CATEGORY',
                            width: "20%",
                            sortable: false
                        },
                        {
                            text:'UOM',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text:'Action',
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData('',this.value)
        },
        methods: {
          renderData(search,value){
              let last_archive_by = '';
              if(value === 1 || value === '1'){
                  last_archive_by = '|AndNot.last_archived_by.usergroup.id:5'
              }else{
                  last_archive_by= ''
              }
              this.$http.get("/inventory/item",{params:{
                      perpage:10000,
                      embeds:'group_id,category_type_id,item_uom_id',
                      conditions:'item_name.icontains:'+search +'|is_archived:'+value+last_archive_by,
                      orderby:'-id',
                  }}).then(response => {
                  this.items = response.data.data
                  if(this.items === null){
                      this.items = []
                  }
              });
          },
            avatar(url){
              if(url === ""){
                  url= '/assets/images/default-item-image.png'
              }
              return 'https://dashboard.edenfarm.tech'+url
            },
            toDetail(id){

            }
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.value)
                },
                deep: true
            },
            'value': {
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