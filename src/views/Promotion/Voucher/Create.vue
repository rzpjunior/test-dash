<template>
    <v-form>
        <v-container>
            <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon> CREATE VOUCHER
            </v-subheader>
            <v-card>
                <form >
                    <v-row>
                        <v-col cols="12" md="6" >
                            <v-text-field
                                    name="redeem_code"
                                    v-model="form.redeem_code"
                                    :counter="20"
                                    maxlength="20"
                                    label="Redeem Code*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                                    :rules="val_code_voucher"
                                    :error-messages="error.redeem_code"
                            ></v-text-field>
                            <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    :counter="20"
                                    maxlength="20"
                                    label="Name*"
                                    required
                                    outlined
                                    class="pl-4 pr-4"
                                    :error-messages="error.name"
                            ></v-text-field>
                            <v-select
                                    v-model="form.type"
                                    :items="type"
                                    item-text="text"
                                    item-value="value"
                                    outlined
                                    label="Type"
                                    class="pl-4 pr-4"
                                    :error-messages="error.type"
                            ></v-select>
                            <SelectArea
                                    required
                                    :error="error.area_id"
                                    v-model="area"
                                    class="pl-4 pr-4"
                                    @selected="areaSelected"
                            ></SelectArea>
                            <SelectBusinessType
                                    class="pl-4 pr-4"
                                    @selected="businessTypeSelected"
                                    v-model="business_type"
                                    :aux_data="'1.2'"
                            ></SelectBusinessType>
                            <SelectArchetype
                                    class="pl-4 pr-4"
                                    :disabled="disabledArchetype"
                                    @selected="archetypeSelected"
                                    :aux_data="'1.2'"
                                    :business_type_id="form.business_type_id"
                                    v-model="archetype"
                            ></SelectArchetype>
                            <SelectCustomerTag
                                    class="pl-4 pr-4"
                                    name="customer_tag"
                                    v-model="customerTag"
                                    :watchCustomerTag="customerTag"
                                    @selected="customerTagSelected"
                            ></SelectCustomerTag>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-datetime-picker  v-model="start_timestamp" date-format="dd-MM-yyyy"  :text-field-props="textFieldPropsStart" label="Start Time" :time-picker-props="timeProps"  ></v-datetime-picker>
                            <v-datetime-picker  v-model="end_timestamp" date-format="dd-MM-yyyy"  :text-field-props="textFieldPropsEnd" label="End Time" :time-picker-props="timeProps"  ></v-datetime-picker>
                                <vuetify-money
                                        class="pl-4 pr-4"
                                        v-model="form.overall_quota"
                                        label="Overall Quota"
                                        outlined
                                       :options="qtyInteger"
                                ></vuetify-money>
                            <vuetify-money
                                    class="pl-4 pr-4"
                                    v-model="form.user_quota"
                                    label="User Quota"
                                    outlined
                                    :options="qtyInteger"
                            ></vuetify-money>
                            <vuetify-money
                                    class="pl-4 pr-4"
                                    v-model="form.min_order"
                                    label="Minimum Order"
                                    outlined
                                    :options="money"
                            ></vuetify-money>
                            <vuetify-money
                                    class="pl-4 pr-4"
                                    v-model="form.disc_amount"
                                    label="Discount Amount"
                                    outlined
                                    :options="money"
                            ></vuetify-money>
                            <v-textarea
                                    name="note"
                                    v-model="form.note"
                                    :counter="100"
                                    maxlength="100"
                                    outlined
                                    class="pl-4 pt-0 pr-4 mt-0"
                            >
                                <template v-slot:label>
                                    <div>
                                        Note
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-end pa-5">
                        <!--<router-link  class="routerLink" :to="{ name: 'User'}"><v-btn class="neutral">Cancel</v-btn></router-link>-->
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>


        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "VoucherCrate",
        data () {
            return {
                area:null,
                business_type:null,
                archetype:null,
                customerTag:null,
                disabledArchetype:true,
                type:[{
                    text:'Total Discount',
                    value:1
                },{
                    text:'Grand Total Discount',
                    value:2
                },{
                    text:'Delivery Discount',
                    value:3
                }],
                start_timestamp:'',
                end_timestamp:'',
                form:{
                    redeem_code:'',
                    name:'',
                    type:0,
                    area_id:'',
                    archetype_id:'',
                    start_timestamp: this.$moment().format('YYYY-MM-DDTHH:mm:ssZ').toLocaleString("en-US", {timeZone: "Asia/Jakarta"}),
                    end_timestamp:  this.$moment().format('YYYY-MM-DDTHH:mm:ssZ').toLocaleString("en-US", {timeZone: "Asia/Jakarta"}),
                    overall_quota:0,
                    user_quota:0,
                    min_order:0.00,
                    disc_amount:0.00,
                    note:'',
                    business_type_id:'',
                    customer_tag:'',
                },
                timeProps: {
                    format: "24hr"
                },
                textFieldPropsStart: {
                    outlined:true,
                    class:'pl-4 pr-4',
                    errorMessages:'',
                    prependInnerIcon: 'event'
                },
                textFieldPropsEnd: {
                    outlined:true,
                    errorMessages:'',
                    class:'pl-4 pr-4',
                    prependInnerIcon: 'event'
                },
                error:{}
            }
        },
        methods:{
            async submit(){
                let id = [];
                if(this.customerTag){
                    await  this.customerTag.forEach((value) =>{
                        id.push(value.id)
                    });
                }
                this.$http.post('/promotion/voucher',
                    {
                        redeem_code:this.form.redeem_code,
                        name:this.form.name,
                        type:parseInt(this.form.type),
                        area_id:this.form.area_id,
                        archetype_id:this.form.archetype_id,
                        business_type_id:this.form.business_type_id,
                        tag_customer:this.form.customer_tag = id.join(","),
                        overall_quota:parseInt(this.form.overall_quota),
                        user_quota:parseInt(this.form.user_quota),
                        min_order:parseFloat(this.form.min_order),
                        disc_amount:parseFloat(this.form.disc_amount),
                        start_timestamp:this.form.start_timestamp,
                        end_timestamp:this.form.end_timestamp,
                        note:this.form.note
                    }).then(response => {
                    // this.$router.push('/user/user');
                })
                    .catch(e => {
                        this.error = e.errors
                    });
            },
            areaSelected(d) {
                this.area = null;
                this.form.area_id = '';
                if (d !== ''  && d !== undefined) {
                    this.area = d;
                    this.form.area_id = d.id
                }
            },
            businessTypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = '';
                this.archetype = null;
                this.form.archetype_id = '';
                this.disabledArchetype = true;
                if (d !== ''  && d !== undefined) {
                    this.business_type = d;
                    this.form.business_type_id = d.id;
                    this.disabledArchetype = false;
                }
            },
            archetypeSelected(d) {
                this.archetype = null;
                this.form.archetype_id = '';
                if (d !== ''  && d !== undefined) {
                    this.archetype = d;
                    this.form.archetype_id = d.id;
                }
            },
            customerTagSelected(d) {
                this.customerTag = null;
                // this.form.area_id = '';
                if (d !== ''  && d !== undefined) {
                    this.customerTag = d;
                    console.log(d,'eee')
                    // this.form.area_id = d.id
                }
            },
        },
        created(){
        },

        watch: {
            'start_timestamp': {
                handler(val) {
                    let dateObj = new Date(this.start_timestamp);
                    this.form.start_timestamp =  this.$moment(dateObj).format('YYYY-MM-DDTHH:mm:ssZ').toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
                },
                deep: true
            },
            'end_timestamp': {
                handler(val) {
                    let dateObj = new Date(this.end_timestamp);
                    this.form.end_timestamp = this.$moment(dateObj).format('YYYY-MM-DDTHH:mm:ssZ').toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
                },
                deep: true
            },
        },

    }
</script>
