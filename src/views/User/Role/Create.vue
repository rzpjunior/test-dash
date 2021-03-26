<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> CREATE ROLE
            </v-subheader>
            <v-card>
                <form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card-title>Role</v-card-title>
                            <v-divider class="mb-5"></v-divider>
                            <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    :counter="15"
                                    label="Name*"
                                    required
                                    outlined
                                    rounded
                                    :error-messages="error.name"
                                    class="pl-4 pr-4"
                            ></v-text-field>
                            <SelectDivision
                                    v-model="division"
                                    @selected="divisionSelected"
                                    :error="error.division_id"
                                    :division="division"
                                    class="pl-4 pr-4"
                                    required
                            > </SelectDivision>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="250"
                                    outlined
                                    rounded
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
                            <SelectCreatePermission
                                    name="permission"
                                    v-model="form.permission"
                                    @checked="permissionChecked"
                                    :idPermission="permission" >
                            </SelectCreatePermission>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-end pa-5">
                        <v-btn class="neutral" @click="cancel()">cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>
        </v-container>
    </v-form>
</template>

<script>
    import SelectCreatePermission from "../../Configuration/Permission/selectCreate";
    export default {
        components: {SelectCreatePermission},
        data () {
            return {
                permission:[],
                division:{},
                form:{
                    name: '',
                    division_id: '',
                    note: '',
                    permission_id:[],
                },
                error:{},
            }
        },
        methods:{
            submit() {
                console.log(
                    this.form,'Isi DD'
                )
                this.$http.post('/role',
                    {
                        name : this.form.name,
                        division_id: this.form.division_id,
                        note: this.form.note,
                        permission_id: this.form.permission_id,
                    }).then(response => {
                    console.log(response,'Success')
                    this.$router.push('/user/role');
                    })
                    .catch(e => {
                        console.log(e)
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
            cancel(){
                this.$router.push('/user/role');
            },
            permissionChecked(d) {
                this.form.permission_id = []
                if (d !== '') {
                    var i;
                    for (i = 0; i < d.length; i++) {
                        this.form.permission_id.push(d[i].id)
                    }
                }
            },
        },
    }
</script>
