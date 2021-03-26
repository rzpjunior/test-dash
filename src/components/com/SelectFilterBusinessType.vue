<template>
    <v-autocomplete
            v-model="business_types"
            :items="items"
            :loading="isLoading"
            label="Business Type"
            item-text="name"
            :search-input.sync="search"
            placeholder="Select Business Type"
            @change="selected"
            :disabled="disabled"
            return-object
            clearable
            outlined
            class="rounded-form"
            :error-messages="error"
            :filtered="filtered"
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
        name: 'SelectFilterBusinessType',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                business_types:null,
            };
        },
        props: ['business_type','disabled','clear','error','filtered','aux_data'],
        methods: {
            remoteSearch(search,aux_data) {
                if (aux_data !== '' && aux_data !== undefined){
                    aux_data = '|aux_data.in:'+aux_data;
                }else{
                    aux_data = '';
                }
                this.$http.get("/customer/business_type",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search+aux_data,
                        // orderby:'id',
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
        created() {
            this.remoteSearch('',this.aux_data);
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val,this.aux_data)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.business_types = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            aux_data: {
                handler: function (val) {
                    if(val !== null){
                        this.remoteSearch(this.search,val)
                    }
                },
                deep: true
            },
        },
    };
</script>