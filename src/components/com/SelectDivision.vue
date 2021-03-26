<template>
    <v-autocomplete
            v-model="divisions"
            :items="items"
            :loading="isLoading"
            item-text="name"
            name="division"
            :search-input.sync="search"
            placeholder="Select Division"
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
            Division <span style="color:red">*</span>
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectDivision',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                divisions:null
            };
        },
        props: ['division','disabled','clear','label','error','area_id'],
        methods: {
            remoteSearch(search) {
                // ini ke endpoint get all
                this.$http.get("/config/division/filter",{params:{
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
                    this.$http.get("/config/division/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.divisions = response.data.data

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
                    this.divisions = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            division: {
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            },
        },
    };
</script>