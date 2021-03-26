<template>
    <v-autocomplete
        v-model="districts"
        :items="items"
        :loading="isLoading"
        item-text="district_name"
        class="rounded-form"
        :search-input.sync="search"
        @change="selected"
        :disabled="disabled"
        return-object
        outlined
        :error-messages="error"
        clearable
    >
        <template slot="selection" slot-scope="data">
            {{ data.item.district_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.district_name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> District </span>
                <span v-else> District </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectDistrict',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                districts:null,
            };
        },
        props: ['district','disabled','clear','error','city_id','province_id', 'area_id', 'district_id',"label", 'norequired'],
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
                let city_id = ''
                if(this.city_id){
                    city_id = "|city_id.e:" + this.city_id
                }
                this.items = []
                this.$http.get("/adm/division",{params:{
                        perpage:10,
                        conditions:'district_name.icontains:'+search+area_id+province_id+city_id,
                        fields:'district_id,district_name',
                        groupby:'district_id'
                    }}).then(response => {
                    let arr = []
                    if (response.data.data != null) {
                        arr = response.data.data
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.items.push({
                            district_id : arr[i].district_id,
                            district_name : arr[i].district_name
                        })
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.districts = val
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
                        this.remoteSearch(val)
                    }

                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.districts = null
                    if(val)
                    this.remoteSearch('')
                },
                deep: true
            },
            district:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val !== null){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            },
            city_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null && val !== ''){ // ini untuk auto select
                    this.remoteSearch('')
                    }
                },
                deep: true
            },
            province_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null && val !== ''){ // ini untuk auto select
                    this.remoteSearch('')
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