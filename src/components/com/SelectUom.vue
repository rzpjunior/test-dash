<template>
    <v-autocomplete
            v-model="uoms"
            :items="items"
            :loading="isLoading"
            item-text="name"
            name="uom"
            :search-input.sync="search"
            placeholder="Select Uom"
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
            <span v-if="!norequired">
                UOM <span style="color:red">*</span>
            </span>
            <span v-else>
                UOM 
            </span>
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectUom',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                uoms:null
            };
        },
        props: ['uom','disabled','clear','label','error', 'norequired'],
        methods: {
            remoteSearch(search) {
                // ini ke endpoint get all
                this.$http.get("/inventory/uom",{params:{
                            // perpage:10,
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
                    this.$http.get("/inventory/uom/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.uoms = response.data.data

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
                    this.uoms = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            uom: {
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            }
        },
    };
</script>