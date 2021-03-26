<template>
    <v-container class="px-12">
        <v-row>
            <v-col>
                <v-text-field
                    name="phone_number"
                    v-model="form.phone_number"
                    maxlength="15"
                    class="rounded-form"
                    required
                    type="number"
                    outlined
                    :error-messages="error.phone_number"
                >
                    <template v-slot:label>
                        Phone Number <span style="color:red">*</span>
                    </template>
                </v-text-field>
            </v-col>
            <v-col>
            </v-col>
        </v-row>
        <v-row style="border-top: 1px solid #C8DDC8;">
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
    </v-container>
</template>

<script>
    export default {
        name: 'UpdateSalesperson',
        data () {
            return {
                form : {
                    phone_number : ""
                },
                salesperson : null,
                error : {},
                ConfirmData : {}
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Phone Number",
                    text : "Are you sure want to Update phone number?",
                    urlApi : "/customer/agent/phonenumber/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.$route.params.id,
                    data : this.form
                }
            },
            renderData(){
                this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    this.form.phone_number = response.data.data[0].merchant.phone_number
                });
            },
        },
        created(){
            this.renderData()
        },
    }
</script>
