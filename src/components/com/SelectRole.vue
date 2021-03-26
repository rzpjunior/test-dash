<template>
        <v-autocomplete
                v-model="roles"
                :items="items"
                :loading="isLoading"
                item-text="name"
                :search-input.sync="search"
                placeholder="Select Role"
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
                Role <span style="color:red">*</span>
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.code }} - {{ data.item.name }}
            </template>
        </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectRole',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                roles:null
            };
        },
        props: ['role','disabled','clear','label','division_id','error'],
        methods: {
            remoteSearch(search,division_id) {
                if(division_id !== '' && division_id !== undefined){
                    division_id = "|division_id.e:" + division_id
                }else{
                    division_id = ''
                }

                // ini ke endpoint get all
                this.$http.get("/role/filter",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search + division_id,
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
                    this.$http.get("/role/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.roles = response.data.data

                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
            this.remoteSearch('', '');
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val,this.division_id)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.roles = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            role: {
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.autoSelectByID(val)
                    }

                },
                deep: true
            },
            division_id: { // ini fungsi untuk request by division_id
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.remoteSearch('',val)
                    }

                },
                deep: true
            },
        },
    };
</script>