<template>
    <v-autocomplete
        v-model="cities"
        :items="items"
        :loading="isLoading"
        item-text="city_name"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        outlined
        :error-messages="error"
        clearable
        class="rounded-form"
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.city_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.city_name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> City </span>
                <span v-else> City </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectCity',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                cities:null,
            };
        },
        props: ['city','disabled','clear','error', 'province_id', 'area_id','city_id','update',"label", 'norequired'],
        methods: {
            remoteSearch(search) {
                let area_id = ''
                if(this.area_id){
                    area_id = "area_id.e:" + this.area_id
                }
                let province_id = ''
                if(this.province_id){
                    province_id = "|province_id.e:" + this.province_id
                }
                this.items = []
                this.$http.get("/adm/division",{params:{
                        perpage:10,
                        conditions:'city_name.icontains:'+search+area_id+province_id,
                        fields:'city_id,city_name',
                        groupby:'city_id',
                    }}).then(response => {
                    let arr = []
                    if (response.data.data != null) {
                        arr = response.data.data
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.items.push({
                            city_id : arr[i].city_id,
                            city_name : arr[i].city_name
                        })
                    }
                    this.isLoading = false
                });
                this.isLoading = false

            },
            autoSelectByID(val) {
                if(val){
                    this.cities = val
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
           if(!this.update) this.remoteSearch('', this.province_id, this.area_id);

        },
        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.remoteSearch(val)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.cities = null
                    if(val)this.remoteSearch('')
                },
                deep: true
            },
            city:{
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
            province_id: { // ini fungsi untuk request by province_id
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