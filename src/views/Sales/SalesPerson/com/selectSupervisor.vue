<template>
    <v-autocomplete
        v-model="supervisors"
        :items="items"
        :loading="isLoading"
        item-text="name"
        name="supervisor"
        :search-input.sync="search"
        placeholder="Select Supervisor"
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
            <span v-if="!norequired"> Supervisor <span style="color:red">*</span></span>
            <span v-else> Supervisor </span>
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.code }} - {{ data.item.name }}
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectSupervisor',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                supervisors:null
            };
        },
        props: ['supervisor','disabled','clear','error','filtered','norequired','reload'],
        methods: {
            remoteSearch(search) {
                console.log(search)
                this.$http.get("/user/supervisor",{params:{
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
                    this.supervisor = null
                    this.remoteSearch('','')
                },
                deep: true
            },
            reload: {
                handler:function (val) {
                    this.remoteSearch('', true)
                }
            }
        },
    };
</script>