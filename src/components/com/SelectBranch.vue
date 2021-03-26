<template>
    <v-autocomplete
        v-model="branches"
        :items="items"
        :loading="isLoading"
        item-text="name"
        :search-input.sync="search"
        :placeholder="`Select ${label}`"
        @change="selected"
        class="rounded-form"
        :disabled="disabled"
        return-object
        outlined
        :error-messages="error"
        clearable
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Branch <span style="color:red">*</span></span>
                <span v-else> Branch </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectBranch',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                branches:null
            };
        },
        props: ['branch','disabled','clear','error', 'label', "norequired", "merchant"],
        methods: {
            remoteSearch(search) {
                let merchant = ''
                if (this.merchant) {
                    merchant = '|merchant.id.e:'+this.merchant
                }
                this.$http.get("/customer/branch",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search+merchant,
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
                    this.$http.get("/customer/branch/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.branches = response.data.data
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
                    this.branches = null
                },
                deep: true
            },
            branch:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            },
            merchant:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                     this.remoteSearch();
                },
                deep: true
            }
        },
    };
</script>