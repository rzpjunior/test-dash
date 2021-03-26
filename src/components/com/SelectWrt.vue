<template>
    <v-autocomplete
        v-model="wrts"
        :items="items"
        :loading="isLoading"
        item-text="name"
        class="rounded-form"
        placeholder="Select WRT"
        :search-input.sync="search"
        @change="selected"
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
            {{ data.item.code }} ({{ data.item.name }})
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> WRT <span style="color:red">*</span></span>
                <span v-else> WRT </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectWrt',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                wrts:null
            };
        },
        props: ['wrt','disabled','clear','error','label', "norequired"],
        methods: {
            remoteSearch(search) {
                this.$http.get("/config/wrt",{params:{
                        conditions:'name.icontains:'+search,
                        orderby:'-id',
                    }}).then(response => {
                    this.items = response.data.data
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.wrts = val
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
                    this.wrts = null
                },
                deep: true
            },
            wrt:{
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