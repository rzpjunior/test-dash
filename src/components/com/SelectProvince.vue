<template>
    <v-autocomplete
            v-model="provinces"
            :items="items"
            :loading="isLoading"
            item-text="province_name"
            :search-input.sync="search"
            @change="selected"
            :disabled="disabled"
            return-object
            class="rounded-form"
            outlined
            :error-messages="error"
            clearable
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.province_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.province_name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Province </span>
                <span v-else> Province </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectProvince',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                provinces:null
            };
        },
        props: ['province','disabled','clear','error','area_id','province_id','update',"label", 'norequired'],
        methods: {
            remoteSearch(search) {
                let area_id = ''
                if(this.area_id){
                    area_id = "area_id.e:" + this.area_id
                }
                this.items = []

                this.$http.get("/adm/division",{params:{
                        perpage:10,
                        conditions:'province_name.icontains:'+search+area_id,
                        fields:'province_id,province_name',
                        groupby:'province_id',
                    }}).then(response => {
                    let arr = []
                    if (response.data.data != null) {
                        arr = response.data.data
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.items.push({
                            province_id : arr[i].province_id,
                            province_name : arr[i].province_name
                        })
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.provinces = val
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('', '');
        },
        watch: {
            search: {
                handler: function (val) {
                    this.remoteSearch(val)
                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.provinces = null
                    if(val)this.remoteSearch('')
                },
                deep: true
            },
            province:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val !== null && val !== ''){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            },
            area_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null && val !== ''){ // ini untuk auto select
                        this.remoteSearch('')
                    }
                },
                deep: true
            },
        },
    };
</script>