<template>
    <v-autocomplete
            v-model="product_tags"
            :items="items"
            :loading="isLoading"
            item-text="name"
            label="Product Tag"
            :search-input.sync="search"
            @change="selected"
            :disabled="disabled"
            return-object
            outlined
            :error-messages="error"
            clearable
            class="rounded-form"
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectProductTag',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                product_tags:null
            };
        },
        props: ['product_tag','disabled','clear','error'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/inventory/tag_product",{params:{
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
                    this.$http.get("/inventory/tag_product/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.product_tags = response.data.data
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
                    this.product_tags = null
                    if(val)this.remoteSearch('')
                },
                deep: true
            },
            product_tag:{
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