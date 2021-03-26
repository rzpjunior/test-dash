<template>
    <v-container>
        <div class="px-6 pt-5">
            <v-row>
                <v-col  cols="12" sm="12" md="6" style="margin-top:-20px">
                    <v-text-field
                            name="name"
                            v-model="form.name"
                            maxlength="20"
                            type="text"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.name"
                    >
                        <template v-slot:label>
                            Name <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                    <v-text-field
                            name="days_value"
                            v-model.number="form.days_value"
                            type="number"
                            required
                            outlined
                            class="rounded-form mt-2"
                            :error-messages="error.days_value"
                    >
                        <template v-slot:label>
                            Day Value <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col  cols="12" sm="12" md="6" style="margin-top:-20px">
                     <v-textarea
                            name="note"
                            v-model="form.note"
                            maxlength="100"
                            :counter="100"
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
                permission:[],
                form:{
                    name: '',
                    days_value: null,
                    note: '',
                },
                error:{},
                ConfirmData:[],
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create Purchase Term",
                    text : "Are you sure want to create this Purchase Term?",
                    urlApi : "/finance/purchase/term",
                    nextPage : "/finance/term",
                    post : true,
                    data : this.form
                }
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>
