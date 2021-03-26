<template>
    <v-autocomplete
        v-model="payment_methods"
        :items="items"
        :loading="isLoading"
        item-text="name"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        outlined
        class="rounded-form"
        :error-messages="error"
        clearable
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Preferred Payment Method <span style="color:red">*</span></span>
                <span v-else> Preferred Payment Method </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectPaymentMethod',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                payment_methods:null
            };
        },
        props: ['payment_method','disabled','clear','error', 'label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/finance/payment",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search,
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
                if(val){
                    // ini ke endpoint detail
                    this.$http.get("/finance/payment/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.payment_methods = response.data.data
                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
            this.remoteSearch('', true);
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val)
                    } else if(val== null) {
                        val = ""
                        this.isLoading = true
                        this.remoteSearch(val)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.payment_methods = null
                },
                deep: true
            },
            payment_method:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            }
        },
    };
</script>