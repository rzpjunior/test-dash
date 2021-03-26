<template>
    <v-autocomplete
            v-model="sales_persons"
            :items="items"
            :loading="isLoading"
            item-text="name"
            :search-input.sync="search"
            @change="selected"
            :disabled="disabled"
            placeholder="Select Salesperson"
            class="rounded-form"
            return-object
            outlined
            :error-messages="error"
            clearable
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Salesperson <span style="color:red">*</span></span>
                <span v-else> Salesperson </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectSalesPerson',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                sales_persons:null
            };
        },
        props: ['sales_person','disabled','clear','error','filtered', "label", 'norequired'],
        methods: {
            remoteSearch(search) {
                this.$http.get("/sales/person",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search+'|role_group:1',
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
                    this.$http.get("/sales/person/"+val.id).then(response => {
                        this.items.push(response.data.data)
                        this.sales_persons = response.data.data
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
                    this.sales_persons = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            sales_person:{
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