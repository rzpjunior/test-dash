<template>
        <v-autocomplete
                v-model="users"
                :items="items"
                :loading="isLoading"
                item-text="name"
                label="Supervisor"
                :search-input.sync="search"
                placeholder="Select Supervisor"
                @change="selected"
                :disabled="disabled"
                return-object
                clearable
                outlined
                class="rounded-form"
        >
            <template slot="selection" slot-scope="data">
                {{ data.item.code }} - {{ data.item.name }}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.code }} - {{ data.item.name }}
            </template>
        </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectUser',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                users:null
            };
        },
        props: ['user','disabled','clear','label'],
        methods: {
            remoteSearch(search) {
                // ini ke endpoint get all
                this.$http.get("/user/filter",{params:{
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
                    this.$http.get("/user/staff/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.users = response.data.data

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
                    this.users = null
                    this.remoteSearch('',true)
                },
                deep: true
            },
            user: {
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