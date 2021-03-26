<template>
    <v-autocomplete
            v-model="price_sets"
            :items="items"
            :loading="isLoading"
            item-text="name"
            placeholder="Select Price Set"
            :search-input.sync="search"
            @change="selected"
            :disabled="disabled"
            return-object
            outlined
            :error-messages="error"
            clearable
            class="rounded-form"
    >
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Price Set <span style="color:red">*</span></span>
                <span v-else> Price Set </span>
            </div>
        </template>
        <template slot="selection" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectPriceSet',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                price_sets:null
            };
        },
        props: ['price_set','disabled','clear','error',"label", 'norequired'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/price/set",{params:{
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
                    this.price_sets = val
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
                    this.price_sets = null
                    if(val)this.remoteSearch('')
                },
                deep: true
            },
            price_set:{
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