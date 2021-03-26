<template>
        <v-container>
            <div>
                <div class="px-6 pt-5">
                    <v-row>
                        <v-col cols="12" md="6" style="margin-top:-20px">
                            <v-text-field
                                    name="name"
                                    v-model="form.uom_name"
                                    :counter="20"
                                    maxlength="20"
                                    label="Name*"
                                    required
                                    outlined
                                    class="rounded-form"
                                    :error-messages="error.name"
                            >
                            <template v-slot:label>
                                Name <span style="color:red">*</span>
                            </template>
                            </v-text-field>
                            <label for="">Allow Decimal <span style="color:red">*</span></label>
                            <v-col  cols="12" sm="4" md="4">
                                <v-checkbox
                                        v-model="form.allowDecimal"
                                        :label="`Yes`"
                                        color="success"
                                        required
                                        @change="checkOne()"
                                ></v-checkbox>
                                <v-checkbox
                                        v-model="notAllowDecimal"
                                        :label="`No`"
                                        required
                                        color="red"
                                        @change="checkOne()"
                                ></v-checkbox>
                            </v-col>
                        </v-col>
                        <v-col cols="12" md="6" style="margin-top:-20px">
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
                </div>
            </div>
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
        </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData:[],
                permission:[],
                notAllowDecimal: '',
                form:{
                    uom_name: '',
                    allowDecimal: this.decimal,
                    note: '',
                },
                error:{},
            }
        },
        methods:{
            confirmButton() {
                if (this.form.allowDecimal == true) {
                    this.decimal = 1
                }else{
                    this.decimal = 2
                }

                console.log(
                    this.form,'Isi DD'
                )
                this.form.allowDecimal == true 
                this.ConfirmData = {
                    model : true,
                    title : "Create UOM",
                    text : "Are you sure want to create this UOM?",
                    urlPath : "/inventory/uom",
                    nextPath : "/inventory/uom",
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
