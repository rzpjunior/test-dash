<template>
    <v-autocomplete
        v-model="sub_districts"
        :items="items"
        :loading="isLoading"
        item-text="concat_address"
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
            {{ data.item.concat_address }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.concat_address }}
        </template>
        <template v-slot:label>
            Sub District <span style="color:red">*</span>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectSubDistrictAll',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                sub_districts:null
            };
        },
        props: ['supplier_type','disabled','clear','error'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/sub_district",{params:{
                        perpage:10,
                        embeds : 'district.city.province_id',
                        conditions:'concat_address.icontains:'+search,
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
                    this.$http.get("/purchase/supplier_type/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.sub_districts = response.data.data
                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
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
                    this.sub_districts = null
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