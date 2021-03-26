<template>
    <v-autocomplete
            v-model="archetypes"
            :items="items"
            :loading="isLoading"
            item-text="name"
            :search-input.sync="search"
            placeholder="Select Archetype"
            @change="selected"
            :disabled="disabled"
            return-object
            class="rounded-form"
            clearable
            outlined
            :error-messages="error"
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Archetype <span style="color:red">*</span></span>
                <span v-else> Archetype </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectArchetype',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                archetypes:null
            };
        },
        props: ['archetype','disabled','clear','error','label','business_type_id','aux_data', "norequired", "customer_group", "statusArch"],
        methods: {
            remoteSearch(search,business_type_id,aux_data) {
                if(business_type_id !== '' && business_type_id !== undefined){
                    business_type_id = "|business_type_id.e:" + business_type_id
                }else{
                    business_type_id = ''
                }
                if (aux_data !== '' && aux_data !== undefined){
                    aux_data = '|aux_data.in:'+aux_data;
                }else{
                    aux_data = '';
                }
                let cg = ''
                if (this.customer_group){
                    cg = '|customer_group:'+this.customer_group;
                }else{
                    cg = '';
                }
                let sts = ''
                if (this.statusArch){
                    sts = '|status:'+this.statusArch;
                }else{
                    sts = '';
                }
                // ini ke endpoint get all
                this.$http.get("/customer/archetype/filtered",{params:{
                        embeds:'business_type_id',
                        perpage:10,
                        conditions:'name.icontains:'+search+business_type_id+aux_data+cg+sts,
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
                    this.archetypes = val
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('', '',this.aux_data);
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val,this.business_type_id,this.aux_data)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.archetypes = null
                    this.remoteSearch('','','')
                },
                deep: true
            },
            archetype: {
                handler: function (val) {
                    if(val){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            },
            business_type_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.remoteSearch('',val,this.aux_data)
                    }

                },
                deep: true
            },
            aux_data: {
                handler: function (val) {
                    if(val !== null){
                        this.remoteSearch(this.search,this.business_type_id,val)
                    }
                },
                deep: true
            },
        },
    };
</script>