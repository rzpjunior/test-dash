<template>
        <v-autocomplete
                v-model="supplier_types"
                :items="items"
                :loading="isLoading"
                item-text="name"
                label="Category"
                :search-input.sync="search"
                placeholder="Select Category"
                @change="selected"
                :disabled="disabled"
                return-object
                outlined
                class="rounded-form"
        >
            <template slot="selection" slot-scope="data">
                {{ data.item.category.status }}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.category.status  }}
            </template>
        </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectProduct',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                supplier_types:null
            };
        },
        props: ['supplier_type','disabled','clear'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/inventory/product",{params:{
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
                    this.$http.get("/inventory/product/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.supplier_types = response.data.data
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
                    this.supplier_types = null
                },
                deep: true
            },
            supplier_type:{
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