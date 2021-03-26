<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> UPDATE PERMISSION
            </v-subheader>
            <v-card>
                <form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card-title>Role</v-card-title>
                            <v-divider class="mb-5"></v-divider>
                            <v-text-field
                                    name="code"
                                    v-model="form.code"
                                    :counter="15"
                                    label="Code"
                                    required
                                    outlined
                                    disabled
                                    :error-messages="error.code"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    :counter="15"
                                    label="Name*"
                                    required
                                    outlined
                                    :error-messages="error.name"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <SelectDivision
                                    v-model="division"
                                    @selected="divisionSelected"
                                    :error="error.division_id"
                                    :division="division"
                                    disabled
                                    required
                            > </SelectDivision>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="250"
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Note
                                    </div>
                                </template>
                            </v-textarea>
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
                        <v-btn class="ml-2" @click="back">Cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">Submit</v-btn>
                    </div>
                </form>
            </v-card>


        </v-container>
    </v-form>
</template>

<script>
    import SelectUpdatePermission from "../../Configuration/Permission/selectUpdate";
    export default {
        name: "UserUpdatePermission",
        components: {SelectUpdatePermission},
        data () {
            return {
                permission:[],
                division:null,
                form:{
                    permission_id:[],
                    code:'',
                    name:'',
                    division_id: '',
                    note: '',
                },
                error:{}
            }
        },
        methods:{
            async  submit () {
                await this.$http.put("/role/" + this.form.id,{
                    name : this.form.name,
                    division_id: this.form.division_id,
                    note: this.form.note,
                    permission_id:this.form.permission_id
                }).then(response => {
                    this.$router.push('/user/role');
                }).catch(e => {
                    this.error = e.errors
                });
            },
            divisionSelected(d) {
                this.division = null;
                this.form.division_id = '';
                if (d !== '' && d !== undefined) {
                    this.division = d;
                    this.form.division_id = d.id;
                }
            },
            async renderData(){
                await this.$http.get("/role/" + this.$route.params.id).then(response => {
                    this.form = response.data.data
                    this.divisionSelected(this.form.division);
                    this.permissionData(this.form.id)
                });
            },
            async permissionData(id){
                await this.$http.get("/role/permission",{params:{
                        embeds:'permission_id.parent_id',
                        conditions:'role_id.e:'+this.$route.params.id,
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
            back(){
                this.$router.go(-1);
            }
        },
        created(){
            this.renderData()
        },
        watch: {
            'division': {
                handler: function (val) {
                    let that = this
                    that.form.division = val;
                },
                deep: true
            },
        },
    }
</script>