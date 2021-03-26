<template>
    <v-autocomplete
        :loading="isLoading"
        v-model="customerTags"
        :items="items"
        height="55"
        item-text="name"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        clearable
        outlined
        chips
        multiple
        class="rounded-form"
        :error-messages="error"
    >
        <template v-slot:selection="{ item }">
            <v-chip color="#8DC53F" text-color="white">{{item.name}}</v-chip>
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Customer Tag <span style="color:red">*</span></span>
                <span v-else> Customer Tag </span>
            </div>
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectCustomerTag',
        data() {
            return {
                maxSelected:0,
                menuProps: {
                    disabled: false
                },
                items: [],
                isLoading: false,
                search:'',
                customerTags:[]
            };
        },
        props: ['watchCustomerTag','disabled','clear','label','error', 'norequired'],
        methods: {
           async remoteSearch(search) {
                // ini ke endpoint get all
              await  this.$http.get("/customer/tag/filtered",{params:{
                        perpage:10,
                        conditions:'name.icontains:'+search,
                        orderby:'-id',
                    }}).then(response => {
                  // for (const i in response.data.data) {
                  //     this.items.push(response.data.data[i])
                  // }
                  if(response.data.data){
                      response.data.data.forEach((value, index) =>{
                          this.items.push(response.data.data[index])
                      });
                  }

                    if(this.items === null){
                        this.items = []
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.customerTags= []
                    for (let i = 0; i < val.length; i++) {
                        this.customerTags.push(val[i])    
                    }
                }

            },
            selected(event) {
                this.$emit('selected', event);
            },
            adjustOptions: function(selectedIds) {
                const top5Selected = selectedIds.find(id => id == 1)
                if (top5Selected || selectedIds.length == 0) {
                    this.customerTags[0].disabled = false
                } else {
                    this.customerTags[0].disabled = false
                }
                if (this.computedCounterValue >= this.maxSelected) {
                    this.menuProps.disabled = true
                } else {
                    this.menuProps.disabled = false
                }
            },
        },
        created() {
            this.remoteSearch('');
            if(this.watchCustomerTag){
                this.autoSelectByID(this.watchCustomerTag)
            }
        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        console.log(val)
                        this.isLoading = true
                        this.remoteSearch(val)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.customerTags = null
                    this.remoteSearch('')
                },
                deep: true
            },
            watchCustomerTag:{
                handler: function (val) {
                    if (val) {
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            }
        },
    };
</script>