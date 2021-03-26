<template>
    <v-container>
        <div>
            <div class="px-6">
                <v-row>
                    <v-col style="text">
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
                    <v-col>
                        <v-text-field
                            name="days_value"
                            v-model.number="form.days_value"
                            type="number"
                            label="Day Value*"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.days_value"
                        >
                            <template v-slot:label>
                                Days Value <span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row style="margin-top:-20px">
                    <v-col>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-textarea
                                        name="note"
                                        v-model="form.note"
                                        :counter="100"
                                        maxlength="100"
                                        outlined
                                        label="Note"
                                        class="rounded-form"
                                    />
                                </div>
                            </template>
                            <span>Internal purpose</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <pre></pre>
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
                    days_value: '',
                    note: '',
                },
                error:{},
                ConfirmData:{},
            }
        },
        methods:{
            submit () {
                this.$http.post('/finance/sales/term',
                {   
                    name : this.form.name,
                    days_value: this.form.days_value === undefined || this.form.days_value == "" ? 0 : this.form.days_value,
                    note: this.form.note,
                }).then(response => {
                    this.$router.push('/finance/spt/term');
                })
                .catch(e => {
                    this.error = e.errors
                });
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create Sales Term",
                    text : "Are you sure want to create this Sales Term?",
                    urlApi : "/finance/sales/term",
                    nextPage : "/finance/spt/term",
                    post : true,
                    data : this.form
                }
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
        },
    }
</script>
