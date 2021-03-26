<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> UPDATE USER
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
                                    required
                                    class="pl-4 pr-4"
                            > </SelectDivision>

                            <SelectRole
                                    class="pl-4 pr-4"
                                    v-model="role"
                                    @selected="roleSelected"
                                    :division_id="form.division_id"
                                    :disabled="disabled_role"
                                    :error="error.role_id"
                                    :clear="clearRole"
                                    :role="role"
                                    required
                            > </SelectRole>

                            <SelectUser
                                    v-model="supervisor"
                                    :user="supervisor"
                                    class="pl-4 pr-4"
                                    @selected="supervisorSelected"
                            > </SelectUser>

                            <SelectArea
                                    required
                                    :error="error.area_id"
                                    v-model="area"
                                    :area="area"
                                    @selected="areaSelected"
                                    class="pl-4 pr-4"
                            ></SelectArea>
                            <SelectWarehouse
                                    required
                                    :error="error.warehouse_id"
                                    v-model="warehouse"
                                    :warehouse="warehouse"
                                    :area_id="form.area_id"
                                    :disabled="disabled_warehouse"
                                    @selected="warehouseSelected"
                                    :clear="clearWarehouse"
                                    class="pl-4 pr-4"
                            ></SelectWarehouse>



                            <v-text-field
                                    name="phone_number"
                                    v-model="form.phone_number"
                                    label="Phone Number*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                                    :error-messages="error.phone_number"
                                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                    maxlength="15"
                            ></v-text-field>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="100"
                                    maxlength="100"
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

                    </v-row>
                    <div class="d-flex justify-end pa-5">
                        <router-link  class="routerLink" :to="{ name: 'User'}"><v-btn class="neutral">Cancel</v-btn></router-link>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>


        </v-container>
    </v-form>
</template>

<script>
    import SelectUpdatePermission from "../../Configuration/Permission/selectUpdate";
    export default {
        name: "UserUpdate",
        components: {SelectUpdatePermission},
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
                    idUser:'',
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
            submit () {
                this.$http.put('/user/'+this.form.idUser,
                {
                    name :this.form.name,
                    display_name :this.form.display_name,
                    division_id: this.form.division_id,
                    supervisor_id: this.form.supervisor_id,
                    role_id: this.form.role_id,
                    area_id: this.form.area_id,
                    note: this.form.note,
                    warehouse_id:this.form.warehouse_id,
                    phone_number: this.form.phone_number,
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
            renderData(){
                this.$http.get("/user/staff/"+ this.$route.params.id).then(response => {
                    this.form = response.data.data
                    this.form.email = response.data.data.user.email
                    this.form.idUser = response.data.data.user.id
                    this.form.note = response.data.data.user.note
                    this.divisionSelected(response.data.data.role.division)
                    this.roleSelected(response.data.data.role)
                    this.supervisorSelected(response.data.data.parent)
                    this.areaSelected(response.data.data.area)
                    this.warehouseSelected(response.data.data.warehouse)
                });
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
