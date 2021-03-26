<template>
    <v-autocomplete
        v-model="categories"
        :items="items"
        :loading="isLoading"
        item-text="name"
        name="category"
        :search-input.sync="search"
        placeholder="Select Category"
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
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
        <template v-slot:label>
            <span v-if="!norequired">
                Category <span style="color:red">*</span>
            </span>
            <span v-else>
                Category 
            </span>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectCategory',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                categories:null,
                
            };
        },
        props: ['category','disabled','clear','label','error', 'norequired'],
        methods: {
            remoteSearch(search) {
                // ini ke endpoint get all
                this.$http.get("/inventory/category",{params:{
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
                    this.$http.get("/inventory/category/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.categories = response.data.data

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
                handler: function (val) {
                    this.categories = null
                    this.remoteSearch('',true)
                },
                deep: true
            },
            category: {
                handler: function (val) {
                    if(val){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            },
        },
    };
</script>