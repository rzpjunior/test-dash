<template>
        <v-container>
                    <v-row>
                        <v-col  cols="12" sm="12" md="6">
                            <v-text-field
                                    name="code"
                                    v-model="form.code"
                                    label="Code*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    label="Name*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="area"
                                    v-model="form.area.name"
                                    label="Area*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="pic_name"
                                    v-model="form.pic_name"
                                    label="PIC Name"
                                    :rules="val_name_person"
                                    required
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="phone_number"
                                    v-model="form.phone_number"
                                    label="PIC Phone Number"
                                    :rules="val_phone_number"
                                    required
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="alt_phone_number"
                                    v-model="form.alt_phone_number"
                                    label="PIC Alternate Phone Number"
                                    :rules="val_phone_number"
                                    required
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :rules="val_note_short"
                                    counter="100"
                                    required
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
                        <v-col  cols="12" sm="12" md="6">
                            <v-textarea
                                    name="address"
                                    v-model="form.street_address"
                                    :rules="val_address"
                                    counter="350"
                                    required
                                    outlined
                                   class="rounded-form"
                            >
                                <template v-slot:label>
                                    <div>
                                        Address*
                                    </div>
                                </template>
                            </v-textarea>
                            <v-text-field
                                    name="city"
                                    v-model="form.sub_district.district.city.name"
                                    label="City*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="district"
                                    v-model="form.sub_district.district.name"
                                    label="District*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="sub_district"
                                    v-model="form.sub_district.name"
                                    label="Sub District*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                            <v-text-field
                                    name="postal_code"
                                    v-model="form.sub_district.postal_code"
                                    label="Postal Code*"
                                    required
                                    disabled
                                    outlined
                                    class="rounded-form"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- <div class="d-flex justify-end pb-5 pr-5">
                        <v-btn class="neutral" @click="cancel">cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div> -->
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
                        >Cancel
                        </v-btn>
                        <v-btn 
                            class="px-7 ml-2 no-caps white--text" 
                            @click="confirmButton()" 
                            elevation="0"
                            rounded
                            style="background: #768f9c; height:45px"
                            >Save
                        </v-btn>
                        </v-card-actions>
                        </v-col>
                    </v-row>
                <ConfirmationDialog :sendData="ConfirmData" />
        </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData: [],
                form:{
                    area: {},
                    sub_district: {
                        district: {
                            city: {},
                        }
                    },
                },
                error:{},
            }
        },
        methods:{
            confirmButton(){
                this.ConfirmData = {
                    model : true,
                    title : "Update Warehouse",
                    text : "Are you sure want to update this warehouse?",
                    urlPath : "/config/warehouse/",
                    nextPath : "/configuration/warehouse",
                    data : this.form
                }
            },

            submit () {
                console.log(
                    this.form,'Isi DD'
                )
                this.$http.put('/config/warehouse/'+ this.$route.params.id, //perlu di sesuaikan dengan endpoint
                {
                    pic_name        :this.form.pic_name,
                    phone_number    :this.form.phone_number,
                    alt_phone_number:this.form.alt_phone_number,
                    street_address  :this.form.street_address,
                    note            :this.form.note,
                }).then(response => {
                    console.log(response,'Success')
                    this.$router.push('/configuration/warehouse');
                })
                .catch(e => {
                    console.log(e)
                    this.error = e.errors
                });
            },
            cancel(){
                this.$router.push('/configuration/warehouse');
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
            renderData(){
                this.$http.get("/config/warehouse/"+ this.$route.params.id) //perlu di sesuaikan dengan endpoint
                    .then(response => {
                        if (response.data !== false) {
                            console.log(response.data.data)
                            this.form = response.data.data
                            this.district = response.data.data
                        }
                    });
            },
        },
        mounted() {
            this.renderData()
        },
    }
</script>
