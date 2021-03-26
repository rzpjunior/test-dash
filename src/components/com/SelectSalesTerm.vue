<template>
    <v-autocomplete
        v-model="sales_terms"
        :items="items"
        :loading="isLoading"
        item-text="name"
        :search-input.sync="search"
        placeholder="Select Sales Term"
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
                <span v-if="!norequired"> Sales Term <span style="color:red">*</span></span>
                <span v-else> Sales Term </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectSalesTerm',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                labels:'',
                sales_terms:null
            };
        },
        props: ['sales_term','disabled','clear','error','label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/finance/sales/term",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search+'|status:1',
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
                    this.$http.get("/finance/sales/term/"+ val.id).then(response => {
                        this.items.push(response.data.data)
                        this.sales_terms = response.data.data
                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('');
            if(this.label == undefined){
                this.labels = 'Sales Term'
            }else{
                this.labels = this.label
            }
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
                    this.sales_terms = null
                },
                deep: true
            },
            sales_term:{
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