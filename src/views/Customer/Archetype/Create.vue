<template>
    <v-container>
        <div class="px-6 pt-5">
            <v-row>
                <v-col  cols="12" sm="12" md="6">
                    <SelectBusinessType
                        name="business_type"
                        required
                        :aux_data="2"
                        @selected="BusinessTypeSelected"
                        :error="error.business_type_id"
                    ></SelectBusinessType>
                </v-col>
                <v-col  cols="12" sm="12" md="6">
                    <v-text-field
                            name="name"
                            v-model="form.name"
                            maxlength="20"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.name"
                    >
                    <template slot="label">
                        Name <span style="color:red;">*</span>
                    </template>
                    </v-text-field>
                </v-col>
                <v-col  cols="12" style="margin-top:-20px;">
                    <v-textarea
                            name="note"
                            v-model="form.note"
                            maxlength="100"
                            outlined
                            class="rounded-form"
                    >
                        <template v-slot:label>
                            <div>
                                Note
                            </div>
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
            <hr class="hr-solid mt-16">
            <v-row class="mt-1">
                <v-col>
                    <v-card-actions class="pb-4">
                        <v-spacer></v-spacer>
                        <v-btn 
                            rounded 
                            elevation="0" 
                            class="no-caps px-7" 
                            @click="$router.go(-1)"
                            style="background: #E6E9ED; color:#768F9C;height:45px"
                        >Cancel</v-btn>
                        <v-btn 
                            class="px-7 ml-2 no-caps white--text" 
                            @click="confirmButton()" 
                            elevation="0"
                            rounded
                            style="background: #768f9c; height:45px"
                        >Create</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
            <!-- <dir class="d-flex justify-end pa-5">
                <v-btn class="neutral" @click="cancel">cancel</v-btn>
                <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
            </dir> -->
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                permission:[],
                business_type:null,
                form:{
                    business_type_id:'',
                    name: '',
                    note: '',
                },
                error:{},
                ConfirmData:[],
            }
        },
        methods:{
            // submit () {
            //     // console.log(
            //     //     this.form,'Isi DD'
            //     // )
            //     this.$http.post('/customer/archetype',
            //     {
            //         name : this.form.name,
            //         business_type_id : parseInt(this.form.business_type_id),
            //         note: this.form.note,
            //     }).then(response => {
            //         console.log(response,'Success')
            //         this.$router.push('/customer/archetype');
            //     })
            //     .catch(e => {
            //         console.log(e)
            //         this.error = e.errors
            //     });
            // },
            // cancel(){
            //     this.$router.push('/customer/archetype');
            // },
            // permissionChecked(d) {
            //     if (d !== '') {
            //         this.form.permission = d
            //     }
            // },
            confirmButton() {
                this.form.business_type_id = parseInt(this.form.business_type_id),
                this.ConfirmData = {
                    model : true,
                    title : "Create Archetype",
                    text : "Are you sure want to create this Archetype?",
                    urlApi : "/customer/archetype",
                    nextPage : "/customer/archetype",
                    post : true,
                    data : this.form
                }
            },
            BusinessTypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = ''
                if (d !== '') {
                    this.business_type = d
                    this.form.business_type_id = d.id
                }
            },
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>
