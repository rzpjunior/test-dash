<template>
    <v-container>
        <div class="px-6">
            <v-row>
                <v-col>
                    <v-text-field
                        name="name"
                        v-model="form.name"
                        required
                        outlined
                        class="rounded-form"
                        :error-messages="error.name"
                    >
                        <template v-slot:label>
                            Name <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        label="Note"
                        class="rounded-form"
                    />
                </v-col>
            </v-row>
            <v-row class="mx-1" style="border-top: 1px solid #C8DDC8;">
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
                form:{
                    type : 1,
                    name: '',
                    note: '',
                },
                error:{},
                ConfirmData:{},
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
                    title : "Create Customer Tag",
                    text : "Are you sure want to create this Customer Tag?",
                    urlApi : "/customer/tag",
                    nextPage : "/customer/tag",
                    post : true,
                    data : this.form
                }
            }
        },
    }
</script>
