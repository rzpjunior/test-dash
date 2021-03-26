<template>
    <v-autocomplete
            v-model="business_types"
            :items="items"
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
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Business Type <span style="color:red">*</span></span>
                <span v-else> Business Type </span>
            </div>
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
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
        name: 'SelectBusinessType',
        data() {
            return {
                items: [],
                search:'',
                business_types:null,
                typeId:'',
            };
        },
        props: ['business_type','disabled','clear','error','filtered','aux_data', 'norequired', 'label'],
        methods: {
            remoteSearch(search,typeId,aux_data) {
                //untuk memfilter data yang muncul hanya B2C dan B2B2C
                // if (this.filtered == 'agent'){
                //     typeId = '|id:3%2COr.id:4';
                // }else{
                //     typeId = '';
                // }
                if (aux_data !== '' && aux_data !== undefined){
                    aux_data = '|aux_data.in:'+aux_data;
                }else{
                    aux_data = '';
                }
                this.$http.get("/customer/business_type",{params:{
                        perpage:10,
                        // conditions:'name.icontains:'+search+typeId+aux_data,
                        conditions:'name.icontains:'+search+aux_data,
                        orderby:'id',
                    }}).then(response => {
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.business_types = val
                }
            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('','',this.aux_data);
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.remoteSearch(val,this.business_type,this.aux_data)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) { // clear data
                    this.business_types = null
                    this.remoteSearch('','','')
                },
                deep: true
            },
            business_type:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            },
            aux_data: { // for hide '' or show '2' aux data
                handler: function (val) {
                    if(val !== null){
                        this.remoteSearch(this.search,this.business_type,val)
                    }
                },
                deep: true
            },
        },
    };
</script>