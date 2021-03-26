<template>
    <v-container>
        <div class="px-6 pt-5">
            <v-row>
                <v-col  cols="12" sm="12" md="6" style="margin-top:-20px">
                    <v-text-field
                        name="name"
                        v-model="form.name"
                        maxlength="20"
                        required
                        outlined
                        class="rounded-form"
                    >
                        <template v-slot:label>
                            Name <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col  cols="12" sm="12" md="6" style="margin-top:-20px">
                    <SelectArea @selected="areaSelected"></SelectArea>
                </v-col>
                <v-col  cols="12" sm="12" md="12" style="margin-top:-20px">
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
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData:[],
                permission:[],
                form:{
                    name: '',
                    area_id:'',
                    note: '',
                },
                error:{},
            }
        },
        methods:{
            // submit () {
            //     console.log(
            //         this.form,'Isi DD'
            //     )
            //     this.$http.post('/config/wrt',
            //     {   
            //         name    : this.form.name,
            //         area_id : this.form.area_id,
            //         note    : this.form.note,
            //     }).then(response => {
            //         console.log(response,'Success')
            //         this.$router.push('/configuration/wrt');
            //     })
            //     .catch(e => {
            //         console.log(e)
            //         this.error = e.errors
            //     });
            // },
            cancel(){
                this.$router.push('/configuration/wrt');
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
            areaSelected(d){
                console.log(d);
                this.area = null;
                this.form.area_id = '';
                if(d !== '' && d !== undefined){
                    this.area = d;
                    // this.form.area_id = Number(d.id);
                    this.form.area_id = (d.id);
                }
            },
            confirmButton() {
                console.log(
                    this.form,'Isi DD'
                )
                this.ConfirmData = {
                    model : true,
                    title : "Create WRT",
                    text : "Are you sure want to create this WRT?",
                    urlApi : "/config/wrt",
                    nextPage : "/configuration/wrt",
                    post : true,
                    data : this.form
                }
            }
        },
    }
</script>
