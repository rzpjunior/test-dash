<template>
    <v-autocomplete
            v-model="invoice_terms"
            :items="items"
            :loading="isLoading"
            name="invoice_term"
            :search-input.sync="search"
            placeholder="Select Invoice Term"
            @change="selected"
            :disabled="disabled"
            return-object
            clearable
            class="rounded-form"
            outlined
            :error-messages="error"
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
                <span v-if="!norequired"> Default Invoice Term <span style="color:red">*</span></span>
                <span v-else> Default Invoice Term </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectInvoiceTerm',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                invoice_terms:null
            };
        },
        props: ['invoice_term','disabled','clear','label','error', 'label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/finance/invoice/term",{params:{
                    perpage:10,
                        conditions:'name.icontains:'+search,
                        orderby:'-id',
                    }}).then(response => {
                    this.items = []
                    let arr = response.data.data
                    for (let i = 0; i < arr.length; i++) {
                        this.items.push({
                            value:arr[i].id,
                            id:arr[i].id,
                            name:arr[i].name
                        })
                    }
                    if(this.items === null){
                        this.items = []
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    // ini ke endpoint detail
                    this.$http.get("/finance/invoice/term/"+ val.id).then(response => {
                        // this.items.push(response.data.data)
                        this.invoice_terms = {
                            value:response.data.data.id,
                            id:response.data.data.id,
                            name:response.data.data.name
                        }
                    });
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
            this.remoteSearch('');
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val)
                    } else if(val== null) {
                        val = ""
                        this.isLoading = true
                        this.remoteSearch(val)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.invoice_terms = null
                    this.remoteSearch('')
                },
                deep: true
            },
            invoice_term:{
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
