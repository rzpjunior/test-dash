<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> ROLE DETAIL
            </v-subheader>
            <v-card :loading="loading">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-title>Role</v-card-title>
                        <v-list class="px-10">
                            <v-list-item>
                                <v-list-item-content><p>Code</p></v-list-item-content>
                                <v-list-item-action><p>{{ item.code }}</p></v-list-item-action>
                            </v-list-item>
                            <v-divider class="deviderTop"></v-divider>
                            <v-list-item>
                                <v-list-item-content><p>Name</p></v-list-item-content>
                                <v-list-item-action><p>{{ item.name }}</p></v-list-item-action>
                            </v-list-item>
                            <v-divider class="deviderTop"></v-divider>
                            <v-list-item>
                                <v-list-item-content><p>Division</p></v-list-item-content>
                                <v-list-item-action><p>{{ item.division.name }}</p></v-list-item-action>
                            </v-list-item>
                            <v-divider class="deviderTop"></v-divider>
                            <v-list-item>
                                <v-list-item-content><p>Note</p></v-list-item-content>
                                <v-list-item-action><p>{{ item.code }}</p></v-list-item-action>
                            </v-list-item>
                            <v-divider class="deviderTop"></v-divider>
                            <v-list-item>
                                <v-list-item-content><p>Status</p></v-list-item-content>
                                <v-list-item-action><p>
                                    <v-chip
                                            class="ma-2"
                                            :color="statusMaster(item.status_convert)"
                                            text-color="white"
                                    >
                                        {{ this.item.convert_status }}
                                    </v-chip>
                                </p></v-list-item-action>
                            </v-list-item>
                            <v-divider class="deviderTop"></v-divider>
                        </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card-title>Permissions</v-card-title>
                        <v-simple-table class="ml-5">
                            <template>
                                <ul v-for="item in permission" :key="item.id">
                                    <li>{{item.name}}</li>
                                    <ul v-for="c in item.child" :key="c.id">
                                        <li> {{ c.name }} </li>
                                        <ul v-for="gc in c.grandChild" :key="gc.id">
                                            <li>{{ gc.name }}</li>
                                        </ul>
                                    </ul>
                                </ul>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row class="pb-5 px-5">
                    <router-link  class="routerLink mx-3" :to="{ name: 'Role'}"><v-btn class="neutral">Back</v-btn></router-link>
                    <v-spacer></v-spacer>
                    <router-link  class="routerLink mx-3" :to="{ name: 'RoleUpdate', params: { id: item.id } }"><v-btn class="neutral">Update</v-btn></router-link>
                    <v-btn class="mx-3" @click="archive(item.id)" v-if="item.status === 1">
                        Archive
                    </v-btn>
                    <v-btn class="mx-3" @click="unarchive(item.id)" v-if="item.status === 2">
                        UnArchive
                    </v-btn>
                </v-row>
            </v-card>
        </v-container>
        <Modal v-model="modalOpen" :sendData=confirmation></Modal>
    </v-form>
</template>

<script>
    import Modal from "../../../components/PopupDialog";
    export default {
        name: "RoleDetail",
        components: {Modal},
        data () {
            return {
                item:{
                    division: {},
                },
                permission:[],
                confirmation:{
                    valueName: 'Role',
                    action:'',
                    urlPath:'',
                    parentPath:'/user/role',
                },
                modalOpen: false,
            }
        },
        methods: {
            async permissionData(){
                await this.$http.get("/role/permission",{params:{
                        embeds:'permission_id.parent_id',
                        conditions:'role_id.e:'+this.$route.params.id,
                    }}).then(response => {
                        if(response.data.data){
                            let c = [];
                            let gc = [];
                            response.data.data.forEach((value, index) =>{
                                if(!value.permission.parent){ // check apakah dia memiliki parent, jika undifined maka itu adalah parent
                                    // get parent
                                    let a= {
                                        id:value.id,
                                        name:value.permission.name,
                                        value:value.permission.value,
                                        child:[]
                                    };
                                    this.permission.push(a)
                                }else if(value.permission.parent && value.permission.parent.parent){ // check apakah memiliki parent dan grand parent, jika punya makan dia akan menjadi grand child
                                    // get grand child
                                    let d ={
                                        id:value.id,
                                        name:value.permission.name,
                                        parent:value.permission.parent.value,
                                    };
                                    gc.push(d)
                                }else {
                                    // get child
                                    if(value.permission.parent){ // check apakah memiliki grand parent, jika tidak maka dia akan menjadi child
                                        let b = {
                                            id:value.id,
                                            name:value.permission.name,
                                            parent:value.permission.parent.value,
                                            child:value.permission.value, // untuk perbandingan value == parent dari grand child
                                            grandChild:[]
                                        };
                                        c.push(b)
                                    }
                                }
                            });
                            gc.forEach((g, inds) =>{  // looping grand child
                                c.forEach((v, ind) =>{ // looping child
                                    if(v.child === g.parent)v.grandChild.push(g)
                                })

                            });
                            this.permission.forEach((values, i) =>{ //looping parent
                                c.forEach((v, ind) =>{ // looping child
                                    if(values.value === v.parent)this.permission[i].child.push(v);// check value parent dengan  value child
                                })
                            });
                        }
                    });
            },
            async renderData(){
                await this.$http.get("/role/" + this.$route.params.id).then(response => {
                    this.item = response.data.data
                    this.item.convert_status = this.item.status_convert.toUpperCase()
                    this.permissionData()
                });
            },
            archive(id){
                this.confirmation.action = 'Archive';
                this.confirmation.status = '1';
                this.confirmation.urlPath ='/role/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            unarchive(id){
                this.confirmation.action = 'Unarchive';
                this.confirmation.status = '1';
                this.confirmation.urlPath ='/role/unarchive/'+id;
                this.modalOpen = !this.modalOpen;
            },
        },
        created() {
            this.renderData()
        },
    }
</script>
