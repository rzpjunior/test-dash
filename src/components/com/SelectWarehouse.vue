<template>
    <v-autocomplete
            v-model="warehouses"
            :items="items"
            :loading="isLoading"
            item-text="name"
            name="warehouse"
            :search-input.sync="search"
            placeholder="Select Warehouse"
            @change="selected"
            :disabled="disabled"
            return-object
            clearable
            outlined
            class="rounded-form"
            :error-messages="error"
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
            <template v-slot:label>
                <div v-if="label">
                    <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                    <span v-else> {{ label }} </span>
                </div>
                <div v-else>
                    <span v-if="!norequired"> Warehouse <span style="color:red">*</span></span>
                    <span v-else> Warehouse </span>
                </div>
            </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectWarehouse',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                warehouses:null
            };
        },
        props: ['warehouse','disabled','clear','label','error','area_id','update', 'norequired', 'aux_data'],
        methods: {
            remoteSearch(search,area_id) {
                if(area_id !== '' && area_id !== undefined){
                    area_id = "|area_id.e:" + area_id
                }else{
                    area_id = ''
                }
                let aux = ''
                if (this.aux_data) {
                    aux = '|aux_data:' +this.aux_data
                } else {
                    aux = ''
                }

                // ini ke endpoint get all
                this.$http.get("/config/warehouse/filter",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search+area_id+aux,
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
                    this.$http.get("/config/warehouse/"+ val).then(response => {
                        this.items.push(response.data.data)
                        this.warehouses = response.data.data

                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('', '');
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 0){
                        this.isLoading = true
                        this.remoteSearch(val,this.area_id)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.warehouses = null;
                    if(val)this.remoteSearch('','')
                },
                deep: true
            },
            warehouse: {
                handler: function (val) {
                    if(val !== null && val !== ''){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            },
            area_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null && val !== ''){ // ini untuk auto select
                        this.remoteSearch('',val)
                    }
                },
                deep: true
            },
        },
    };
</script>
