<template>
    <v-container>
        <v-col  cols="6" sm="6" md="6">
            <v-text-field
                name="phone_number"
                v-model="form.phone_number"
                required
                outlined
                class="rounded-form"
                :error-messages="error.phone_number"
                onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                maxlength="15"
            >
            <template v-slot:label>
                Phone Number <span style="color:red">*</span>
            </template>
            </v-text-field>
        </v-col>
        <v-col class="px-12" style="position:absolute;bottom:40px;">
            <hr class="hr-solid mb-6">
            <v-row>
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
                            @click="submit" 
                            elevation="0"
                            rounded
                            style="background: #768f9c; height:45px"
                        >Save</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                form:{
                    phone_number:''
                },
                error:{},
            }
        },
        methods:{
            submit () {
                this.$http.put('/customer/merchant/phone_number/' + this.$route.params.id,
                {
                    phone_number : this.form.phone_number

                }).then(response => {
                    console.log(response,'Success')
                    this.$router.push('/customer/merchant/detail/' + this.$route.params.id);
                })
                .catch(e => {
                    console.log(e)
                    this.error = e.errors
                });
            },
            renderData(){
                this.$http.get("/customer/merchant/"+ this.$route.params.id)
                    .then(response => {
                        this.form = response.data.data
                    });
            },
        },
        created() {
            this.renderData()
        }
    }
</script>
