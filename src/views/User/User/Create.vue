<template>
  <div class="Heiti">
      <v-form>
          <v-container>
                  <form >
                      <v-row>
                          <v-col cols="12" md="6" >
                              <v-card-title class="second-color fs25">Staff</v-card-title>
                              <v-divider class="mb-8"></v-divider>
                              <v-tooltip right>
                                  <template v-slot:activator="{ on }">
                                      <v-text-field
                                              name="name"
                                              v-model="form.name"
                                              required
                                              outlined
                                              style=""
                                              class="pl-4 pr-4 rounded-form"
                                              maxlength="30"
                                              :error-messages="error.name"
                                              v-on="on"
                                      >
                                        <template v-slot:label>
                                            Full Name (KTP) <span style="color:red">*</span>
                                        </template>
                                      </v-text-field>
                                  </template>
                                  <span>Name according to Resident Identity Card (KTP)</span>
                              </v-tooltip>

                              <v-tooltip right>
                                  <template v-slot:activator="{ on }">
                                      <v-text-field
                                              name="display_name"
                                              v-model="form.display_name"
                                              required
                                              outlined
                                              class="pl-4 pr-4 rounded-form"
                                              :error-messages="error.display_name"
                                              v-on="on"
                                      >
                                        <template v-slot:label>
                                            Display Name <span style="color:red">*</span>
                                        </template>
                                      </v-text-field>
                                  </template>
                                  <span>Name displayed on system</span>
                              </v-tooltip>

                              <v-tooltip right>
                                  <template v-slot:activator="{ on }">
                                      <v-text-field
                                              name="employee_code"
                                              v-model="form.employee_code"
                                              required
                                              outlined
                                              class="pl-4 pr-4 rounded-form"
                                              :error-messages="error.employee_code"
                                              v-on="on"
                                      >
                                        <template v-slot:label>
                                            Employee Code <span style="color:red">*</span>
                                        </template>
                                      </v-text-field>
                                  </template>
                                  <span>Employee ID in HR System (Talenta)</span>
                              </v-tooltip>

                              <SelectDivision
                                      v-model="division"
                                      @selected="divisionSelected"
                                      :error="error.division_id"
                                      required
                                      class="pl-4 pr-4"
                              > </SelectDivision>

                              <SelectRole
                                      v-model="role"
                                      @selected="roleSelected"
                                      :division_id="form.division_id"
                                      :disabled="disabled_role"
                                      :error="error.role_id"
                                      :clear="clearRole"
                                      class="pl-4 pr-4"
                                      required
                              > </SelectRole>

                              <SelectUser
                                      v-model="supervisor"
                                      class="pl-4 pr-4"
                                      @selected="supervisorSelected"
                              > </SelectUser>
                              <SelectArea
                                      required
                                      :error="error.area_id"
                                      v-model="area"
                                      class="pl-4 pr-4"
                                      @selected="areaSelected"
                              ></SelectArea>
                              <SelectWarehouse
                                      required
                                      :error="error.warehouse_id"
                                      v-model="warehouse"
                                      :area_id="form.area_id"
                                      :disabled="disabled_warehouse"
                                      @selected="warehouseSelected"
                                      :clear="clearWarehouse"
                                      class="pl-4 pr-4"
                              ></SelectWarehouse>
                              <v-text-field
                                      name="phone_number"
                                      v-model="form.phone_number"
                                      required
                                      outlined
                                      class="pl-4 pr-4 rounded-form"
                                      :error-messages="error.phone_number"
                                      onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                      maxlength="15"
                              >
                                <template v-slot:label>
                                    Phone Number <span style="color:red">*</span>
                                </template>
                              </v-text-field>
                              <v-textarea
                                      name="note"
                                      v-model="form.note"
                                      :counter="100"
                                      maxlength="100"
                                      outlined
                                      class="pl-4 pt-0 pr-4 mt-0 rounded-form"
                              >
                                  <template v-slot:label>
                                      <div>
                                          Note
                                      </div>
                                  </template>
                              </v-textarea>

                              <v-tooltip right>
                                  <template v-slot:activator="{ on }">
                                      <v-text-field
                                              name="email"
                                              v-model="form.email"
                                              required
                                              outlined
                                              class="pl-4 pr-4 rounded-form"
                                              :rules="emailRules"
                                              :error-messages="error.email"
                                              v-on="on"
                                      >
                                  <template v-slot:label>
                                      Email <span style="color:red">*</span>
                                  </template>
                                </v-text-field>
                                  </template>
                                  <span>Email Company</span>
                              </v-tooltip>


                              <v-text-field
                                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show_password ? 'text' : 'password'"
                                      @click:append="show_password = !show_password"
                                      name="password"
                                      v-model="form.password"
                                      outlined
                                      class="pl-4 pt-0 pr-4 mt-0 rounded-form"
                                      :error-messages="error.password"
                                      :rules="passwordRules"
                                      maxlength="32"
                              >
                                <template v-slot:label>
                                    Password <span style="color:red">*</span>
                                </template>
                              </v-text-field>

                              <v-text-field
                                      :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show_confirm ? 'text' : 'password'"
                                      @click:append="show_confirm = !show_confirm"
                                      name="confirm_password"
                                      v-model="form.confirm_password"
                                      outlined
                                      class="pl-4 pt-0 pr-4 mt-0 rounded-form"
                                      :error-messages="error.confirm_password"
                                      :rules="confirmPasswordRules"
                                      maxlength="32"
                              >
                                <template v-slot:label>
                                    Confirm Password <span style="color:red">*</span>
                                </template>
                              </v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                              <v-card-title class="second-color fs25">Permissions</v-card-title>
                              <v-divider></v-divider>
                              <SelectUpdatePermission
                                      name="permission"
                                      v-model="form.permission_id"
                                      @selected="permissionChecked"
                                      :idPermission="permission"
                              ></SelectUpdatePermission>
                          </v-col>
                      </v-row>
                      <v-divider></v-divider>
                      <div class="d-flex justify-end pa-5">
                          <router-link  class="routerLink" :to="{ name: 'User'}"><v-btn rounded elevation="0" class="no-caps px-7" style="color:#768F9C;height:45px">Cancel</v-btn></router-link>
                          <v-btn 
                            class="px-7 ml-2 no-caps white--text" 
                            @click="submit" 
                            elevation="0"
                            rounded
                            :disabled="!valid"
                            style="background: #768f9c; height:45px"
                            >Create User</v-btn>
                      </div>
                  </form>
          </v-container>
      </v-form>
  </div>
</template>

<script>
    import SelectUpdatePermission from "../../Configuration/Permission/selectUpdate";
    export default {
        name: "UserCrate",
        components: {SelectUpdatePermission},
        data () {
            return {
                show_password:false,
                show_confirm:false,
                permission:[],
                division:{},
                disabled_role:true,
                disabled_warehouse:true,
                supervisor:{},
                role:{},
                area:{},
                warehouse:{},
                clearWarehouse:false,
                clearRole:false,
                form:{
                    name: '',
                    display_name: '',
                    employee_code: '',
                    password:'',
                    confirm_password:'',
                    division_id: '',
                    supervisor_id: '',
                    role_id: '',
                    area_id: '',
                    warehouse_id: '',
                    phone_number: '',
                    email: '',
                    note: '',
                    permission_id:[],
                },
                emailRules: [
                    v => !!v || 'Please Enter email',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
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
                error:{}
            }
        },
        computed : {
          valid() {
            // if (this.form.name.length>0 
            // // &&
            // // this.form.display_name.length>0 &&
            // // this.form.employee_code.length>0 &&
            // // this.division.length>0 &&
            // // this.role.length>0 &&
            // // this.supervisor.length>0 &&
            // // this.area.length>0 &&
            // // this.form.phone_number.length>0 &&
            // // this.form.email.length>0 &&
            // // this.form.password.length>0 &&
            // // this.form.permission_id.length>0 &&
            // // this.form.confirm_password.length>0 
            
            // ) {
            //   return true
            // } else {
              return false
            // }
          }
        },
        methods:{
            submit () {
                this.$http.post('/user',
                {
                    name :this.form.name,
                    display_name :this.form.display_name,
                    employee_code :this.form.employee_code,
                    password: this.form.password,
                    confirm_password: this.form.confirm_password,
                    division_id: this.form.division_id,
                    supervisor_id: this.form.supervisor_id,
                    role_id: this.form.role_id,
                    area_id: this.form.area_id,
                    note: this.form.note,
                    email: this.form.email,
                    warehouse_id:this.form.warehouse_id,
                    phone_number: this.form.phone_number,
                    permission_id: this.form.permission_id,
                }).then(response => {
                    this.$router.push('/user/user');
                })
                .catch(e => {
                    this.error = e.errors
                });
            },
            divisionSelected(d) {
                this.division = null;
                this.disabled_role = true
                this.form.division_id = '';
                this.form.permission_id = [];
                this.permission = [];
                this.role = null;
                this.form.role_id = '';
                this.clearRole = true;
                if (d !== '' && d !== undefined) {
                    this.division = d;
                    this.form.division_id = d.id;
                    this.disabled_role = false
                    this.clearRole = false;
                }
            },
            roleSelected(d) {
                this.role = null;
                this.form.role_id = '';
                this.form.permission_id = [];
                this.permission = [];
                if (d !== ''  && d !== undefined) {
                    this.role = d;
                    this.form.role_id = d.id
                    this.$http.get("/role/permission",{params:{
                            perpage:10,
                            conditions:'role_id.e:'+d.id,
                            orderby:'-id',
                        }}).then(response => {
                        response.data.data.forEach((value, index) =>{
                            this.permission.push(value.permission.id)
                        })
                    });
                }
            },
            supervisorSelected(d) {
                this.supervisor = null;
                this.form.supervisor_id = '';
                if (d !== ''  && d !== undefined) {
                    this.supervisor = d;
                    this.form.supervisor_id = d.id
                }
            },
            areaSelected(d) {
                this.area = null;
                this.form.area_id = '';
                this.warehouse = null;
                this.form.warehouse_id = '';
                this.clearWarehouse = true
                this.disabled_warehouse = true
                if (d !== ''  && d !== undefined) {
                    this.area = d;
                    this.form.area_id = d.id
                    this.disabled_warehouse = false
                    this.clearWarehouse = false
                }
            },
            warehouseSelected(d) {
                this.warehouse = null;
                this.form.warehouse_id = '';
                if (d !== ''  && d !== undefined) {
                    this.warehouse = d;
                    this.form.warehouse_id = d.id
                }
            },
            permissionChecked(d) {
                if (d.length >0 ) {
                    this.form.permission_id = d
                }
            },
        },
        watch: {
            'form.phone_number': {
                handler: function (val) {
                    let that = this
                    that.form.phone_number = val.replace(/^0+/, '')
                },
                deep: true
            },
        },
    }
</script>
