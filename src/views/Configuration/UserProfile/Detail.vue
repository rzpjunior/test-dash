<template>
    <v-container >
        <v-app >
            <div class="d-flex justify-center mt-md-6">
                <v-badge
                    bottom
                    overlap
                    color="white"
                    offset-x="45"
                    offset-y="30"
                    icon="mdi-pencil"
                >
                    <v-avatar size="126">
                    <img alt="user" src="/img/avatar.png" />
                    </v-avatar>
                </v-badge>
            </div>
            <div class="row mt-md-2 mx-md-14">
                <div class="col"></div>
                <div class="col d-flex justify-center">
                <span style="text-align:center"> 
                    <label style="font-size:25px">{{item.display_name}}</label> <br>
                    <span style="color:green">{{item.user.email}}</span>
                </span>
                </div>
                <div class="col d-flex justify-end align-end">
                    <v-btn
                        v-if="item.user.status_convert=='active'"
                        outlined
                        rounded
                        class="no-caps"
                        :color="statusMaster(item.user.status_convert)"
                        :text-color="statusMasterText(item.user.status_convert)"
                        style="width:104px"
                        >
                        Active
                    </v-btn>
                    <v-btn
                        v-else
                        outlined
                        rounded
                        class="no-caps"
                        :color="statusMaster(item.user.status_convert)"
                        :text-color="statusMasterText(item.user.status_convert)"
                        style="width:104px"
                        >
                        Archive
                    </v-btn>
                    <v-menu offset-y v-if="item.user.status_convert=='active'">
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </template>
                    <v-list style="background: #E8EFF2">
                            <v-list-item  :to="{ name: 'UserUpdate', params: { id: item.user.id } }">
                                <v-list-item-content>
                                    <v-list-item-title>Edit Profile</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  @click="archive(item.user.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  :to="{ name: 'UserUpdatePermission'}">
                                <v-list-item-content>
                                    <v-list-item-title>Update Permission</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  @click.stop="reset = true">
                                <v-list-item-content>
                                    <v-list-item-title>Reset Password</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu offset-y v-else>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </template>
                    <v-list style="background: #E8EFF2">
                            <v-list-item  @click="unArchive(item.user.id)">
                                <v-list-item-content>
                                    <v-list-item-title>UnArchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  :to="{ name: 'UserUpdatePermission'}">
                                <v-list-item-content>
                                    <v-list-item-title>Update Permission</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  @click.stop="reset = true">
                                <v-list-item-content>
                                    <v-list-item-title>Reset Password</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="px-md-4">
                            <v-divider></v-divider>
                            </div>
                            <v-list-item  >
                                <v-list-item-content>
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <div class="row mt-md-6 mx-md-14" style="color: #768F9C">
                <div class="col">
                <div class="row">
                    <div class="col">
                    Code :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.code}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Division :
                    </div>
                    <div class="col d-flex justify-end">
                    {{ item.role.division.name }}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Supervisor :
                    </div>
                    <div class="col d-flex justify-end">
                    {{ item.parent ? item.parent.name :'-' }}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Warehouse :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.warehouse.name}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                </div>
                <div style="width:5%"/>
                <div class="col">
                <div class="row">
                    <div class="col">
                    Employee Code :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.employee_code}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Role :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.role.name}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Area :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.area.name}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                <div class="row">
                    <div class="col">
                    Phone Number :
                    </div>
                    <div class="col d-flex justify-end">
                    {{item.phone_number}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                </div>
            </div>
            <div class="row mx-md-14" style="color: #768F9C">
                <div class="col">
                Note :
                </div>
                <div class="col d-flex justify-end">
                    {{ item.note }}
                </div>
            </div>
            <v-divider class="my-md-2 mx-md-16"/>

            <div class="row">
                <div class="col pt-12 mx-md-16">
                    <AuditLog :id="item.user.id" type="user"/>
                </div>
            </div>
            <v-row>
                
            </v-row>
            <v-dialog
                    v-model="reset"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">
                       Reset Password
                    </v-card-title>

                    <v-text-field
                            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_password ? 'text' : 'password'"
                            @click:append="show_password = !show_password"
                            name="password"
                            label="Password"
                            v-model="form.password"
                            outlined
                            class="pl-4 pt-0 pr-4 mt-0"
                            :error-messages="error.password"
                            :rules="passwordRules"
                            maxlength="32"
                    >
                    </v-text-field>

                    <v-text-field
                            :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_confirm ? 'text' : 'password'"
                            @click:append="show_confirm = !show_confirm"
                            name="confirm_password"
                            label="Confirm Password"
                            v-model="form.confirm_password"
                            outlined
                            class="pl-4 pt-0 pr-4 mt-0"
                            :error-messages="error.confirm_password"
                            :rules="confirmPasswordRules"
                            maxlength="32"
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                                color="warning darken-1"
                                @click="reset = false"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                                color="primary darken-1"
                                @click="resetPassword"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- ---------------------- -->

            <!-- <v-card :loading="loading">
                <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon>USER DETAIL
                </v-subheader>
                <v-col  v-if="loading === false">
                    <v-row >
                        <v-col cols="12" md="6">
                            <v-card-title>Staff Data</v-card-title>
                            <v-divider class="mb-5"></v-divider>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody >
                                    <tr><td>Code:</td><td class="text-right">{{ item.code }}</td></tr>
                                    <tr><td>Name:</td><td class="text-right">{{ item.name }}</td></tr>
                                    <tr><td>Display Name:</td><td class="text-right">{{ item.display_name }}</td></tr>
                                    <tr><td>Employee Code:</td><td class="text-right">{{ item.employee_code }}</td></tr>
                                    <tr><td>Division:</td><td class="text-right">{{ item.role.division.name }}</td></tr>
                                    <tr><td>Role:</td><td class="text-right">{{ item.role.name }}</td></tr>
                                    <tr><td>Supervisor:</td><td class="text-right">{{ item.parent ? item.parent.name :'-' }}</td></tr>
                                    <tr><td>Area:</td><td class="text-right">{{ item.area.name }}</td></tr>
                                    <tr><td>Warehouse:</td><td class="text-right">{{ item.warehouse.name }}</td></tr>
                                    <tr><td>Phone Number:</td><td class="text-right">{{ item.phone_number }}</td></tr>
                                    <tr><td>Note:</td><td class="text-right">{{ item.note }}</td></tr>
                                    <tr><td>Email:</td><td class="text-right">{{ item.user.email }}</td></tr>
                                    <tr><td>Status:</td>    <td class="text-right">     <v-chip
                                            :color="statusMaster(item.user.status_convert)"
                                            :text-color="statusMasterText(item.user.status_convert)"
                                    >
                                        {{item.user.status_convert.toUpperCase()}}
                                    </v-chip></td></tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="6" v-if="permission.length > 0">
                            <v-card-title>Permissions</v-card-title>

                            <v-divider class="mb-5"></v-divider>
                            <v-simple-table>
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
                </v-col>
                <v-row class="pb-5 px-5">
                    <router-link  class="routerLink mx-3" :to="{ name: 'User'}"><v-btn class="neutral">Back</v-btn></router-link>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            dark
                            class="mx-3"
                            @click.stop="reset = true"
                    >
                        Reset Password
                    </v-btn>
                    <router-link class="routerLink class mx-3" :to="{ name: 'UserUpdatePermission'}"><v-btn class="neutral">Update Permission</v-btn></router-link>
                    <v-btn class="mx-3" @click="archive(item.user.id)" v-if="item.user.status === 1" >
                        Archive
                    </v-btn>
                    <v-btn class="mx-3" @click="unArchive(item.user.id)" v-if="item.user.status === 2">
                        UnArchive
                    </v-btn>
                    <v-btn class="mx-3" @click="auditLog(item.user.id,'user',true)">
                        History
                    </v-btn>
                </v-row>
            </v-card>
            <v-dialog
                    v-model="reset"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">
                       Reset Password
                    </v-card-title>

                    <v-text-field
                            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_password ? 'text' : 'password'"
                            @click:append="show_password = !show_password"
                            name="password"
                            label="Password"
                            v-model="form.password"
                            outlined
                            class="pl-4 pt-0 pr-4 mt-0"
                            :error-messages="error.password"
                            :rules="passwordRules"
                            maxlength="32"
                    >
                    </v-text-field>

                    <v-text-field
                            :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_confirm ? 'text' : 'password'"
                            @click:append="show_confirm = !show_confirm"
                            name="confirm_password"
                            label="Confirm Password"
                            v-model="form.confirm_password"
                            outlined
                            class="pl-4 pt-0 pr-4 mt-0"
                            :error-messages="error.confirm_password"
                            :rules="confirmPasswordRules"
                            maxlength="32"
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                                color="warning darken-1"
                                @click="reset = false"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                                color="primary darken-1"
                                @click="resetPassword"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <Modal v-model="modalOpen" :sendData=confirmation></Modal>
            <AuditLog></AuditLog> -->

            
        </v-app>
    </v-container>
</template>


<script>
    import Modal from "../../../components/PopupDialog";
    // import AuditLog from "../../../components/AuditLog";
    import AuditLog from "../../../components/AuditLog1";
    export default {
        name: "UserDetail",
        components: {AuditLog, Modal},
        data() {
            return {
                show_password:false,
                show_confirm:false,
                reset:false,
                post: null,
                item:{
                    user:{}
                    },
                loading:true,
                permission:[],
                form:{
                    password:'',
                    confirm_password:''
                },
                error:{},
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Password at least 8 characters',
                    // v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
                    // v => /(?=.*\d)/.test(v) || 'Must have one number',
                    // v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
                ],
                confirmPasswordRules: [
                    (value) => !!value || 'Confirm password is required',
                    (value) =>
                        value === this.form.password || 'The password confirmation does not match.',
                ],
                confirmation:{
                    valueName: 'User',
                    action:'',
                    urlPath:'',
                    parentPath:'/finance/spt/term',
                },
                modalOpen: false,
            }
        },
        methods:{
            async permissionData(){
                  await this.$http.get("/permission/user",{params:{
                      embeds:'permission_id.parent_id',
                      conditions:'user_id.e:'+this.$route.params.id,
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


                  this.loading= false
              });
            },
            async renderData(){
                 await  this.$http.get("/user/staff/" + this.$route.params.id,{params:{conditions:'-id'}}).then(response => {
                        this.item = response.data.data
                     this.item.user.status = response.data.data.user.status
                     this.permissionData()
                    });
            },
            async resetPassword(){
                await  this.$http.put("/user/reset/" + this.item.user.id,{
                    password:this.form.password,
                    confirm_password:this.form.confirm_password
                }).then(response => {
                    window.location.reload()
                }).catch(e => {
                        this.error = e.errors
                    });
            },
            archive(id){
                this.confirmation.action = 'Archive';
                this.confirmation.status = '1';
                this.confirmation.urlPath ='/user/archive/'+id;
                this.modalOpen = !this.modalOpen;
            },
            unArchive(id){
                this.confirmation.action = 'UnArchive';
                this.confirmation.status = '2';
                this.confirmation.urlPath ='/user/unarchive/'+id;
                this.modalOpen = !this.modalOpen;
            },
        },
        created() {
            this.renderData()
        },
        watch: {
            'reset': {
                handler: function (val) {
                   if(val===false)this.form.password = ''; this.form.confirm_password = '';
                },
                deep: true
            },
        },
    }
</script>
