<template>
    <v-container class="pa-12">
        <div class="d-flex justify-end">
            <v-btn
                v-if="configurationareaDetail.status == 1"
                rounded
                elevation="0"
                class="no-caps"
                :color="statusMaster('active')"
                style="width:104px"
                >
                Active
            </v-btn>
            <v-btn
                v-if="configurationareaDetail.status == 2"
                elevation="0"
                rounded
                class="no-caps"
                :color="statusMaster('archived')"
                style="width:104px"
                >
                Archived
            </v-btn>
        </div>
        <div class="row mt-6 second-color" >
            <div class="col">
                <div class="row">
                    <div class="col-4">
                    Code :
                    </div>
                    <div class="col d-flex justify-end">
                    {{configurationareaDetail.code}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
                
                </div>
                <div style="width:5%"/>
            <div class="col">
                <div class="row">
                    <div class="col-4">
                    Name :
                    </div>
                    <div class="col d-flex justify-end">
                    {{configurationareaDetail.name}}
                    </div>
                </div>
                <v-divider class="my-md-2"/>
            </div>
        </div>
        <div class="title-table mt-15">
            <label class="label-title">
                Area Sub District
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.index + 1 }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.postal_code }}</td>
                    <td>{{ props.item.district.name }}</td>
                    <td>{{ props.item.district.city.name }}</td>
                    <td>{{ props.item.district.city.province.name }}</td>
                </tr>
            </template>
        </v-data-table>
        <hr class="hr-solid mt-5">
            <v-row class="mt-1">
                <v-col>
                    <v-btn 
                        rounded 
                        elevation="0" 
                        class="no-caps px-7" 
                        @click="$router.go(-1)"
                        style="background: #E6E9ED; color:#768F9C;height:45px"
                    >Back</v-btn>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ConfigurationAreaDetail",

        data() {
            return {
                area_id:'',
                area_id_decrypt:'', //decrypt sementara area_id
                post: null,
                configurationareaDetail:{},
                loading:true,

                // untuk sub area
                table: {
                    fields: [
                        {
                            text:'No',
                            width: "5%",
                            sortable: false,
                        },
                        {
                            text:'Sub District',
                            sortable: false
                        },
                        {
                            text:'Postal Code',
                            sortable: false
                        },
                        {
                            text:'District',
                            sortable: false
                        },
                        {
                            text:'City',
                            sortable: false
                        },
                        {
                            text:'Province',
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        methods:{
            renderData(){
                this.$http.get("/config/area/"+ this.$route.params.id).then(response => {
                    this.configurationareaDetail = response.data.data
                    this.area_id = response.data.data.id
                    this.area_id_decrypt = this.area_id / 65536

                    this.$http.get("/sub_district",{params:{
                            embeds:'area,district,district.city.province,district.city.province.country',
                            conditions:'area_id:' + this.area_id_decrypt,
                        }}).then(response => {
                        this.items = response.data.data
                        if(this.items === null){
                            this.items = []
                        }
                    });
                });
                this.loading= false
            },
        },
        mounted() {
            this.renderData()
        },
    }
</script>