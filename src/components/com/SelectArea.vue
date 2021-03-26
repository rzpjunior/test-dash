<template>
        <v-autocomplete
            v-model="areas"
            :items="items"
            :loading="isLoading"
            item-text="name"
            name="area"
            :search-input.sync="search"
            placeholder="Select Area"
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
                    <span v-if="!norequired"> Area <span style="color:red">*</span></span>
                    <span v-else> Area </span>
                </div>
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.code }} - {{ data.item.name }}
            </template>
        </v-autocomplete>

</template>
<script>
    export default {
        name: 'SelectArea',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                areas:null
            };
        },
        props: ['area','disabled','clear','label','error','aux_data', 'norequired'],
        methods: {
            remoteSearch(search,aux_data) {
                if (aux_data !== '' && aux_data !== undefined){
                    aux_data = '|aux_data.in:'+aux_data;
                }else{
                    aux_data = '';
                }
                // ini ke endpoint get all
                this.$http.get("/config/area/filter",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search + aux_data,
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
                    this.$http.get("/config/area/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.areas = response.data.data

                    });
                }
            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
            this.remoteSearch('',this.aux_data);
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 0){
                        this.isLoading = true
                        this.remoteSearch(val)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.areas = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            area: {
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }
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
