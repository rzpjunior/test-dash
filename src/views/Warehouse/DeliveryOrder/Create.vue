<template>
    <v-form>
        <v-container class="px-6">
            <v-col cols="12" sm="0"></v-col>
            <form>
                <v-row>
                    <v-col  cols="12" sm="12" md="6">
                        <v-text-field
                                name="name"
                                v-model="form.ctg_name"
                                :counter="20"
                                maxlength="20"
                                required
                                outlined
                                class="pl-4 pr-4 rounded-form"
                                :error-messages="error.name"
                                readonly
                        >
                            <template v-slot:label>
                                <div>
                                    Order Code <span style="color:red;">*</span>
                                </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                                name="name"
                                v-model="form.ctg_name"
                                :counter="20"
                                maxlength="20"
                                required
                                outlined
                                class="pl-4 pr-4 rounded-form"
                                :error-messages="error.name"
                                readonly
                        >
                            <template v-slot:label>
                                <div>
                                    Order Delivery Date <span style="color:red;">*</span>
                                </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                            name="customer"
                            required
                            outlined
                            class="pl-4 pr-4 rounded-form"
                            :error-messages="error.name"
                            readonly
                        >
                            <template v-slot:label>
                                    <div>
                                        Customer <span style="color:red">*</span>
                                    </div>
                            </template>
                        </v-text-field>
                        <v-textarea
                                name="note"
                                v-model="form.note"
                                :counter="100"
                                maxlength="100"
                                outlined
                                class="pl-4 pt-0 pr-4 mt-0 rounded-form"
                        >
                             <template v-slot:label>
                                    <div>
                                        Shipping Address <span style="color:red">*</span>
                                    </div>
                            </template>
                        </v-textarea>
                    </v-col>
                    <v-col  cols="12" sm="12" md="6">
                        <v-text-field
                                name="name"
                                v-model="form.ctg_name"
                                :counter="20"
                                maxlength="20"
                                required
                                outlined
                                class="pl-4 pr-4 rounded-form"
                                :error-messages="error.name"
                                readonly
                        >
                            <template v-slot:label>
                                <div>
                                    Order Date <span style="color:red;">*</span>
                                </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                                name="name"
                                v-model="form.ctg_name"
                                :counter="20"
                                maxlength="20"
                                required
                                outlined
                                class="pl-4 pr-4 rounded-form"
                                :error-messages="error.name"
                                readonly
                        >
                            <template v-slot:label>
                                <div>
                                    WRT <span style="color:red;">*</span>
                                </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                            name="customer"
                            required
                            outlined
                            class="pl-4 pr-4 rounded-form"
                            :error-messages="error.name"
                            readonly
                        >
                            <template v-slot:label>
                                    <div>
                                        Outlet <span style="color:red;">*</span>
                                    </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                            name="customer"
                            required
                            outlined
                            class="pl-4 pr-4 rounded-form"
                            :error-messages="error.name"
                            readonly
                        >
                            <template v-slot:label>
                                    <div>
                                        Delivery Date <span style="color:red;">*</span>
                                    </div>
                            </template>
                        </v-text-field>
                        <v-text-field
                            name="customer"
                            required
                            outlined
                            class="pl-4 pr-4 rounded-form"
                            :error-messages="error.name"
                            readonly
                        >
                            <template v-slot:label>
                                    <div>
                                        Warehouse Origin <span style="color:red;">*</span>
                                    </div>
                            </template>
                        </v-text-field>
                    </v-col>
                    <!-- untuk upload single image -->
                    <!-- <v-col  cols="12" sm="12" md="6" class="px-4">
                        <SelectImage :nameCreate="form.ctg_name"></SelectImage>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="100"
                        label="Note"
                        maxlength="100"
                        outlined
                        class="pl-4 pt-6 pr-4 mt-0 rounded-form"
                    >
                    </v-textarea>
                </v-row>
                <div class="row">
                    <div class="col-lg-12 pt-16" >
                    <div class="title-table">
                        <label class="label-title">
                        Products
                        </label>
                    </div>
                    <v-simple-table height="300px">
                        <template>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>UOM</th>
                                    <th>Order Qty</th>
                                    <th>Delivery Qty <span class="color:red;">*</span></th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <v-text-field
                                            name="customer"
                                            required
                                            outlined
                                            class="pt-5 rounded-form"
                                            :error-messages="error.name"
                                        >
                                        </v-text-field>
                                    </td>
                                    <td>KG</td>
                                    <td>10.00</td>
                                    <td>
                                        <v-text-field 
                                            outlined 
                                            class="pt-5 rounded-form" 
                                            ref="field" 
                                            v-model="value" />
                                    </td>
                                    <td>
                                        <v-text-field
                                            name="customer"
                                            required
                                            outlined
                                            class="pt-5 rounded-form"
                                            :error-messages="error.name"
                                        >
                                        </v-text-field>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <!-- <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :items-per-page="5"
                    ></v-data-table> -->
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
                            >Create</v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </form>
         <ConfirmationDialog :sendData="ConfirmData"/>
        </v-container>
    </v-form>
</template>

<script>
import AutoNumeric from "autonumeric";
    export default {
        data () {
            return {
                ConfirmData:[],
                permission:[],
                form:{
                    ctg_name: '',
                    // untuk upload single image
                    // image_url: '',
                    note: '',
                },
                error:{},
                headers: [
                    {
                      text: 'No',
                      align: 'start',
                      sortable: false,
                      value: 'name',
                    },
                    { text: 'Province', value: 'calories' },
                    { text: 'City', value: 'fat' },
                    { text: 'District', value: 'carbs' },
                    { text: 'Subdistrict', value: 'carbs' },
                    { text: 'Postal Code', value: 'carbs' },
                  ],
                desserts: [
                  {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                  },
                  {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                  },
                  {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                  },
                ],
            }
        },
        methods:{
            confirmButton() {
                console.log(
                    this.form,'Isi DD'
                )
                this.ConfirmData = {
                    model : true,
                    title : "Create Delivery Order",
                    text : "Are you sure want to create this Delivery Order?",
                    urlApi : "/inventory/category",
                    nextPath : "/inventory/category",
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
        mounted () {
            let self = this
            // untuk upload single image
            // this.$root.$on('send_image_url', function(d){
            //     self.form.image_url = d
            // });
            this.$root.$on('event_error', function(err){
                self.error = err
            });
            new AutoNumeric(this.$refs.field.$refs.input, [{
                decimalCharacterAlternative: ","
            }]);
        },
    }
</script>
