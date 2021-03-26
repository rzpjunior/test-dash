<template>
        <v-container>
            <div>
                <div class="px-6 pt-5">
                   <v-row>
                        <v-col  cols="12" md="6" style="margin-top:-20px;">
                            <v-text-field
                                    name="name"
                                    v-model="form.price_set_name"
                                    :counter="20"
                                    maxlength="20"
                                    label="Name*"
                                    required
                                    outlined
                                    class="rounded-form"
                                    :error-messages="error.name"
                            ></v-text-field>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="250"
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
                        >Save</v-btn>
                        </v-card-actions>
                        </v-col>
                    </v-row>
                    <ConfirmationDialog :sendData="ConfirmData"/>
                </div>
            </div>
        </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData: [],
                permission:[],
                form:{
                    price_set_name: '',
                    note: '',
                },
                error:{},
            }
        },
        methods:{
            confirmButton(){
                this.ConfirmData = {
                    model : true,
                    title : "Create Price Set",
                    text : "Are you sure want to create this Price Set?",
                    urlPath : "/price/set",
                    nextPath : "/price/set",
                    post : true,
                    data : this.form
                }
            },
            submit () {
                console.log(
                    this.form,'Isi DD'
                )
                this.$http.post('/price/set',
                    {
                        name : this.form.price_set_name,
                        note: this.form.note,
                    }).then(response => {
                    console.log(response,'Success')
                    this.$router.push('/price/set');
                })
                    .catch(e => {
                        console.log(e)
                        this.error = e.errors
                    });
            },
            cancel(){
                this.$router.push('/price/set');
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
        },
    }
</script>
