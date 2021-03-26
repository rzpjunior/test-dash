<template>
    <v-card-text>
        <v-autocomplete
                v-model="item_uoms"
                :items="items"
                :loading="isLoading"
                item-text="item_uom_name"
                label="UOM"
                :search-input.sync="search"
                placeholder="Select Uom"
                @change="selected"
                :disabled="disabled"
                return-object
                cache-items
                outlined
        >
        </v-autocomplete>

    </v-card-text>
</template>
<script>
    export default {
        name: 'SelectItemUom',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                item_uoms:null
            };
        },
        props: ['item_uom','disabled','clear'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/inventory/item-uom",{params:{
                        perpage:10,
                        conditions:'item_uom_name.icontains:'+search+'|is_archived:0',
                        orderby:'-id',
                    }}).then(response => {
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                    this.isLoading = false
                });
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
            item_uom:{ // watch perubahan untuk auto select (biasa di pakai di page update)
                handler: function (val) {
                    this.item_uoms = val
                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.item_uoms = null
                    this.remoteSearch('', true);
                },
                deep: true
            },
        },
    };
</script>