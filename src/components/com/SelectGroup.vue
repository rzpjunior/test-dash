<template>
    <v-card-text>
    <v-autocomplete
            v-model="groups"
            :items="items"
            :loading="isLoading"
            item-text="group_name"
            label="Group"
            :search-input.sync="search"
            placeholder="Select Group"
            @change="selected"
            :disabled="disabled"
            return-object
            outlined
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.group_name }} - {{ data.item.item_uom.item_uom_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.group_name }} - {{ data.item.item_uom.item_uom_name }}
        </template>
    </v-autocomplete>

    </v-card-text>
</template>
<script>
    export default {
        name: 'SelectGroup',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                groups:null
            };
        },
        props: ['group','disabled','clear'],
        methods: {
            remoteSearch(search) {
                    this.$http.get("/inventory/group",{params:{
                            perpage:10,
                            embeds:'item_uom_id',
                            conditions:'group_name.icontains:'+search,
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
                    this.$http.get("/inventory/group/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.groups = response.data.data

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
                handler: function (val) { // ini untuk clear data
                    this.groups = null
                },
                deep: true
            },
            group:{
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