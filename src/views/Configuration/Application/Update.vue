<template>
    <v-container>
        <div class="px-12">
            <v-row>
                <v-col>
                    <v-text-field
                        name="application"
                        v-model="application"
                        label="Application"
                        required
                        disabled
                        outlined
                        class="rounded-form"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        name="field"
                        v-model="form.field"
                        label="Field"
                        required
                        disabled
                        outlined
                        class="rounded-form"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        name="value"
                        v-model="form.value"
                        :rules="val_alphanumeric_spec_char_space"
                        required
                        outlined
                        class="rounded-form"
                    >
                        <template v-slot:label>
                            <div>
                                Value <span style="color:red">*</span>
                            </div>
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
            <hr class="hr-solid">
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
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData : {},
                permission:[],
                form:{
                    application: '',
                    field:'',
                    value: '',
                },
                error:{},
            }
        },
        computed : {
            application() {
                if (this.form.application == 1) {
                    return "Dino"
                } else if (this.form.application == 2) { 
                    return "Orca"
                } else if (this.form.application == 3) { 
                    return "Mantis"
                } else if (this.form.application == 4) { 
                    return "Beaver"
                } else { 
                    return ""
                }
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Application Config",
                    text : "Are you sure want to update this Application Config?",
                    urlApi : '/config/app/'+ this.$route.params.id,
                    nextPage : "/configuration/application",
                    data : {
                        value : this.form.value
                    }
                }
            },
            renderData(){
                this.$http.get("/config/app/"+ this.$route.params.id) //perlu di sesuaikan dengan endpoint
                    .then(response => {
                        if (response.data !== false) {
                            this.form = response.data.data
                        }
                    });
            },
        },
        mounted() {
            this.renderData()
        },

    }
</script>
