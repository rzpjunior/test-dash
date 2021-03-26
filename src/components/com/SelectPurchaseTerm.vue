<template>
    <v-autocomplete
        v-model="purchase_terms"
        :items="items"
        :loading="isLoading"
        item-text="name"
        label="Purchase Term"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        outlined
        :error-messages="error"
        class="rounded-form"
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
                <span v-if="!norequired"> Payment Term <span style="color:red">*</span></span>
                <span v-else> Payment Term </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectPurchaseTerm',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                purchase_terms:null
            };
        },
        props: ['purchase_term','disabled','clear','error', 'label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/finance/purchase/term",{params:{
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
                    this.$http.get("/finance/purchase/term/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.purchase_terms = response.data.data
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
                    this.purchase_terms = null
                },
                deep: true
            },

            purchase_term:{
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