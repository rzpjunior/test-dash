<template>
    <v-container>
        <div class="px-12">
            <v-row>
                <v-col>
                    <SelectArea 
                        @selected="areaSelected" 
                        :area="area" 
                        required 
                        :error="error.area_id" 
                        disabled
                    ></SelectArea>
                    <v-text-field
                        name="minimum_order"
                        v-model="min_order"
                        required
                        outlined
                        class="rounded-form"
                        :error-messages="error.min_order"
                    >
                        <template v-slot:label>
                            Minimum Order Free Delivery <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                    <SelectPriceSet 
                        @selected="pricesetSelected" 
                        :price_set="price_set" 
                        required 
                        :error="error.default_price_set" 
                    ></SelectPriceSet>
                </v-col>
                <v-col>
                    <v-text-field
                        name="minimum_order"
                        v-model="delivery_fee"
                        required
                        outlined
                        class="rounded-form"
                        :error-messages="error.delivery_fee"
                    >
                        <template v-slot:label>
                            Delivery Fee <span style="color:red">*</span>
                        </template>
                    </v-text-field>
                    <v-menu
                        ref="menu"
                        v-model="order_time_limit"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="time"
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                outlined
                                class="rounded-form"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <template v-slot:label>
                                    Order Time Limit <span style="color:red">*</span>
                                </template>
                            </v-text-field>
                        </template>
                        <v-time-picker
                            v-if="order_time_limit"
                            v-model="time"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                    </v-menu>
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
                area:null,
                price_set:null,
                order_time_limit:'',
                min_order:'',
                delivery_fee:'',
                time:'',
                form:{
                    delivery_fee: 0.00,
                    min_order: 0.00,
                    order_time_limit: '',
                    area_id: '',
                    price_set_id:''
                },
                error:{},
                ConfirmData:{},
            }
        },
        methods:{
            
            areaSelected(d) {
                this.area = null;
                this.form.area_id = '';
                if (d !== '') {
                    this.area = d;
                    this.form.area_id = d.id
                }
            },
            pricesetSelected(d) {
                this.price_set = null;
                this.form.price_set_id = '';
                if (d) {
                    this.price_set = d;
                    this.form.price_set_id = d.id
                }
            },
            renderData(){
                this.$http.get("/config/area/policy/"+ this.$route.params.id)
                    .then(response => {
                        let del_fee = response.data.data.delivery_fee
                        let min_or = response.data.data.min_order

                        this.form.delivery_fee = `${del_fee}`
                        this.form.min_order = `${min_or}`
                        this.delivery_fee = `${del_fee}`
                        this.min_order = `${min_or}`

                        this.form = response.data.data

                        this.time = response.data.data.order_time_limit

                        this.areaSelected(response.data.data.area)
                        this.pricesetSelected(response.data.data.default_price_set)
                    });
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Area Policy",
                    text : "Are you sure want to update this Area Policy?",
                    urlApi : '/config/area/policy/'+ this.$route.params.id,
                    nextPage : "/configuration/area_policy",
                    data : {
                        delivery_fee : parseFloat(this.delivery_fee),
                        min_order: parseFloat(this.min_order),
                        order_time_limit: this.time,
                        area_id: this.form.area_id,
                        default_price_set: this.form.price_set_id,
                    }
                }
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        created() {
            this.renderData()
        },
    }
</script>
