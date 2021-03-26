<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> UPDATE PERMISSION
            </v-subheader>
            <v-card>
                <form>
                    <v-row>
                        <v-col cols="12" md="6" >
                            <v-card-title>Staff</v-card-title>
                            <v-divider class="mb-5"></v-divider>
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            name="name"
                                            v-model="form.name"
                                            required
                                            label="Name*"
                                            outlined
                                            class="pl-4 pr-4"
                                            maxlength="30"
                                            :error-messages="error.name"
                                            disabled
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <span>Name according to Resident Identity Card (KTP)</span>
                            </v-tooltip>

                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            name="display_name"
                                            v-model="form.display_name"
                                            label="Display Name*"
                                            required
                                            outlined
                                            class="pl-4 pr-4"
                                            :error-messages="error.display_name"
                                            disabled
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <span>Name displayed on system</span>
                            </v-tooltip>

                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            name="employee_code"
                                            v-model="form.employee_code"
                                            label="Employee Code*"
                                            required
                                            outlined
                                            class="pl-4 pr-4"
                                            :error-messages="error.employee_code"
                                            v-on="on"
                                            disabled
                                    ></v-text-field>
                                </template>
                                <span>Employee ID in HR System (Talenta)</span>
                            </v-tooltip>

                            <SelectDivision
                                    v-model="division"
                                    @selected="divisionSelected"
                                    :error="error.division_id"
                                    :division="division"
                                    disabled
                                    required
                            > </SelectDivision>

                            <SelectRole
                                    v-model="role"
                                    @selected="roleSelected"
                                    :division_id="form.division_id"
                                    disabled
                                    :error="error.role_id"
                                    :clear="clearRole"
                                    :role="role"
                                    required
                            > </SelectRole>

                            <SelectUser
                                    v-model="supervisor"
                                    :user="supervisor"
                                    disabled
                                    @selected="supervisorSelected"
                            > </SelectUser>

                            <SelectArea
                                    required
                                    :error="error.area_id"
                                    v-model="area"
                                    :area="area"
                                    disabled
                                    @selected="areaSelected"
                            ></SelectArea>
                            <SelectWarehouse
                                    required
                                    :error="error.warehouse_id"
                                    v-model="warehouse"
                                    :warehouse="warehouse"
                                    :area_id="form.area_id"
                                    disabled
                                    @selected="warehouseSelected"
                                    :clear="clearWarehouse"
                            ></SelectWarehouse>



                            <v-text-field
                                    name="phone_number"
                                    v-model="form.phone_number"
                                    label="Phone Number*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                                    disabled
                                    :error-messages="error.phone_number"
                                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                    maxlength="15"
                            ></v-text-field>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="100"
                                    maxlength="100"
                                    disabled
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
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
                                            label="Email*"
                                            required
                                            outlined
                                            class="pl-4 pr-4"
                                            :rules="emailRules"
                                            :error-messages="error.email"
                                            v-on="on"
                                            disabled
                                    ></v-text-field>
                                </template>
                                <span>Email Company</span>
                            </v-tooltip>

                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card-title>Permissions</v-card-title>
                            <v-divider class="mb-5"></v-divider>
                            <SelectUpdatePermission
                                    name="permission"
                                    v-model="form.permission_id"
                                    @selected="permissionChecked"
                                    :idPermission="permission"
                            ></SelectUpdatePermission>
                        </v-col>

                    </v-row>
                    <div class="d-flex justify-end pa-5">
                        <router-link  class="routerLink":to="{ name: 'UserDetail', params: { id: form.idStaff} }"><v-btn class="neutral">Cancel</v-btn></router-link>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>


        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "UserUpdatePermission",
        components: {SelectWarehouse, SelectArea, SelectUser, SelectRole, SelectUpdatePermission, SelectDivision},
        data () {
            return {
                permission:[],
                division:null,
                disabled_role:true,
                disabled_warehouse:true,
                supervisor:null,
                role:null,
                area:null,
                warehouse:null,
                clearWarehouse:false,
                clearRole:false,
                form:{
                    permission_id:[],
                    idUser:'',
                    idStaff:'',
                    name: '',
                    display_name: '',
                    employee_code: '',
                    division_id: '',
                    supervisor_id: '',
                    role_id: '',
                    area_id: '',
                    warehouse_id: '',
                    phone_number: '',
                    note: '',
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
        methods:{
            async  submit () {
                await  this.$http.put("/user/update/permission/" + this.form.idUser,{
                    permission_id:this.form.permission_id
                }).then(response => {
                    this.$router.push('/user/user/detail/'+this.form.idStaff);
                }).catch(e => {
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
            async renderData(){
                await this.$http.get("/user/staff/"+ this.$route.params.id).then(response => {
                    this.form = response.data.data;
                    this.form.email = response.data.data.user.email;
                    this.form.idUser = response.data.data.user.id;
                    this.form.idStaff = response.data.data.id;
                    this.form.note = response.data.data.user.note;
                    this.divisionSelected(response.data.data.role.division);
                    this.roleSelected(response.data.data.role);
                    this.supervisorSelected(response.data.data.parent);
                    this.areaSelected(response.data.data.area);
                    this.warehouseSelected(response.data.data.warehouse);
                    this.permissionData(response.data.data.user.id);
                });
            },
            async permissionData(id){
                await this.$http.get("/permission/user",{params:{
                        embeds:'permission_id.parent_id',
                        conditions:'user_id.e:'+id,
                    }}).then(response => {
                    response.data.data.forEach((value, index) => {
                        this.permission.push(value.permission.id)
                    });
                    this.loading= false
                });
            },
            permissionChecked(d) {
                if (d.length >0 ) {
                    this.form.permission_id = d
                }
            },
        },
        created(){
            this.renderData()
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
