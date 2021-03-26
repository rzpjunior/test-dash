<template>
        <v-autocomplete
                v-model="archetypes"
                :items="items"
                :loading="isLoading"
                item-text="name"
                label="Type"
                :search-input.sync="search"
                placeholder="Select Type"
                @change="selected"
                :disabled="disabled"
                return-object
                clearable
                outlined
                class="rounded-form"
        >
            <template slot="selection" slot-scope="data">
                {{ data.item.alias_name_idn }}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.alias_name_idn }}
            </template>
        </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectArchetypeByAlias',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                archetypes:null
            };
        },
        props: ['archetype','disabled','clear','label'],
        methods: {
            remoteSearch(search) {
                // ini ke endpoint get all
                this.$http.get("/customer/archetype/filtered",{params:{
                        perpage:10,
                        conditions:'alias_name_idn.icontains:'+search+'|AndNot.alias_name_idn:',
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
                    this.$http.get("/customer/archetype/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.archetypes = response.data.data

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
                    this.archetypes = null
                    this.remoteSearch('',true)
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
        },
    };
</script>