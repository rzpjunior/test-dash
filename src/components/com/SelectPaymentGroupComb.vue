<template>
    <v-autocomplete
        v-model="payment_groups"
        :items="items"
        :loading="isLoading"
        item-text="id"
        :search-input.sync="search"
        :placeholder="`Select ${label}`"
        @change="selected"
        class="rounded-form"
        :disabled="disabled"
        return-object
        outlined
        :error-messages="error"
        clearable
    >
        <template slot="selection" slot-scope="data">
                {{ data.item.invoice_term.name }}
        </template>
        <template slot="item" slot-scope="data">
                {{ data.item.invoice_term.name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Payment Group <span style="color:red">*</span></span>
                <span v-else> Payment Group </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectPaymentGroupComb',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                labels:'',
                payment_groups:null
            };
        },
        props: ['payment_group', 'pg', 'pt', 'disabled','clear','error','label', "norequired"],
        methods: {
            remoteSearch(search) {
                let pt = ''
                if (this.pt) {
                    pt = 'invoiceterm__name.icontains:'+search+'|paymentterm.e:'+this.pt+'|paymentterm.status:1'
                }
                this.$http.get("/payment/payment_group_comb",{params:{
                        embeds:'payment_group_sls_id,term_payment_sls_id,term_invoice_sls_id',
                        conditions:pt,
                        orderby:'-id',
                    }}).then(response => {
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                this.payment_groups = val
            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('');
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.payment_groups = null
                    console.log(val)
                },
                deep: true
            },
            payment_group:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    this.autoSelectByID(val)
                },
                deep: true
            },
            pg:{
                handler: function (val) { 
                    this.remoteSearch('')
                },
                deep: true
            },
            pt:{
                handler: function (val) { 
                    this.remoteSearch('')
                },
                deep: true
            }
        },
    };
</script>