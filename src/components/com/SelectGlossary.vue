<template>
    <v-select
        v-model="glossary"
        :items="items"
        :loading="isLoading"
        item-text="name"
        label="Application"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        outlined
        class="rounded-form"
        required
        :error-messages="error"
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.value_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.value_name }}
        </template>
    </v-select>
</template>
<script>
    export default {
        name: 'SelectGlossary',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                glossary:''
            };
        },
        props: ['disabled','clear','error'],
        methods: {
            remoteSearch() {
                this.$http.get("/config/glossary",{params:{
                        perpage:10,
                        conditions:'table:config_app|attribute:application',
                        orderby:'-id',
                    }}).then(response => {
                    let arr = response.data.data
                    for (let i = 0; i < arr.length; i++) {
                        const element = arr[i];
                        this.items.push({
                            value:arr[i].value_int,
                            value_name:arr[i].value_name
                        })
                    }
                    this.items.push({
                        value:'',
                        value_name:'All Applications'
                    })
                    this.items.reverse();
                    if(this.items === null){
                        this.items = []
                    }
                    this.isLoading = false
                });
            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        mounted() {
            this.remoteSearch();
        },
    };
</script>