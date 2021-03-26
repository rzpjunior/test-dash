<template>
        <v-autocomplete
            v-model="productTags"
            :items="items"
            :loading="isLoading"
            item-text="name"
            :search-input.sync="search"
            @change="selected"
            :disabled="disabled"
            return-object
            clearable
            outlined
            chips
            multiple
            class="rounded-form"
            :error-messages="error"
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                  color="#8DC53F"
                  dark
                  @click="data.select"
                >
                  {{ data.item.name }}
                </v-chip>
            </template>
            <template v-slot:label>
                <span v-if="!norequired"> Product Tag <span style="color:red">*</span></span>
                <span v-else> Product Tag </span>
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.code }} - {{ data.item.name }}
            </template>
        </v-autocomplete>
</template>
<script>
    export default {
        name: 'MultiSelectProductTag',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                productTags: []
            };
        },
        props: ['productTag','disabled','clear','label','error','aux_data', 'norequired'],
        methods: {
            remoteSearch(search,aux_data) {
                if (aux_data !== '' && aux_data !== undefined){
                    aux_data = '|aux_data.in:'+aux_data;
                }else{
                    aux_data = '';
                }
                // ini ke endpoint get all
                this.$http.get("/inventory/tag_product/filtered",{params:{
                        // perpage:10,
                        conditions:'name.icontains:'+search + aux_data,
                        orderby:'-id',
                    }}).then(response => {
                    
                  if(response.data.data){
                      response.data.data.forEach((value, index) =>{
                          this.items.push(response.data.data[index])
                      });
                  }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    // ini ke endpoint detail
                    this.productTags= []
                    for (let i = 0; i < val.length; i++) {
                        this.productTags.push(val[i].value)    
                    }
                }
            },
            selected(event) {
                this.$emit('selected', event);
            },
            remove (item) {
                const index = this.productTags.indexOf(item.name)
                if (index >= 0) this.productTags.splice(index, 1)
            },
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
                    this.productTags = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            productTag: {
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
