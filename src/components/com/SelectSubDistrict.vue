<template>
    <v-autocomplete
        v-model="sub_districts"
        :items="items"
        :loading="isLoading"
        item-text="sub_district_name"
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
            {{ data.item.sub_district_name }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.sub_district_name }}
        </template>
        <template v-slot:label>
            <div v-if="label">
                <span v-if="!norequired"> {{ label }} <span style="color:red">*</span></span>
                <span v-else> {{ label }} </span>
            </div>
            <div v-else>
                <span v-if="!norequired"> Sub District <span style="color:red">*</span></span>
                <span v-else> Sub District </span>
            </div>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'SelectSubDistrict',
        data() {
            return {
                items: [],
                isLoading: false,
                search:'',
                sub_districts:null
            };
        },
        props: ['sub_district','disabled','clear','error','district_id','city_id','province_id', 'area_id',"label", 'norequired'],
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
                let district_id = ''
                if(this.district_id){
                    district_id = "|district_id.e:" + this.district_id
                }
                this.items = []

                this.$http.get("/adm/division",{params:{
                        perpage:10,
                        conditions:'sub_district_name.icontains:'+search+area_id+province_id+city_id+district_id,
                        fields:'sub_district_id,sub_district_name,postal_code,area_name,area_id',
                        groupby:'sub_district_id'
                    }}).then(response => {
                    let arr = []
                    if (response.data.data != null) {
                        arr = response.data.data
                    }
                    for (let i = 0; i < arr.length; i++) {
                        this.items.push({
                            sub_district_id : arr[i].sub_district_id,
                            sub_district_name : arr[i].sub_district_name,
                            postal_code : arr[i].postal_code,
                            area_id : arr[i].area_id,
                            area_name : arr[i].area_name
                        })
                    }
                    this.isLoading = false
                });
            },
            autoSelectByID(val) {
                if(val){
                    this.sub_districts = val
                }

            },
            selected(event) {
                this.$emit('selected', event);
            }
        },
        created() {
            this.remoteSearch('');
        },
        watch: {
            sub_district:{
                handler: function (val) { // watch perubahan untuk auto select (biasa di pakai di page update)
                    if(val !== null){
                        this.autoSelectByID(val)
                    }
                },
                deep: true
            },
            search: {
                handler: function (val) {
                    this.remoteSearch(val)
                },
                deep: true
            },
            clear: {
                handler: function (val) {
                    this.sub_districts = null;
                    if(val)
                    this.remoteSearch('')
                },
                deep: true
            },
            district_id: { // ini fungsi untuk request by area_id
                handler: function (val) {
                    if(val !== null){ // ini untuk auto select
                        this.remoteSearch('')
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