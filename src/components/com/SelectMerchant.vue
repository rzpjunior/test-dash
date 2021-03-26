<template>
    <v-autocomplete
        v-model="merchants"
        :items="items"
        :loading="isLoading"
        item-text="name"
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
                <span v-if="!norequired"> Merchant <span style="color:red">*</span></span>
                <span v-else> Merchant </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectMerchant',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                merchants:null
            };
        },
        props: ['merchant','disabled','clear','error', 'label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/customer/merchant",{params:{
                        perpage:10,
                        embeds:'finance_area_id',
                        conditions:'status:1|name.icontains:'+search,
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
                    this.$http.get("/customer/merchant/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.merchants = response.data.data
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
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.merchants = null
                },
                deep: true
            },
            merchant:{
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