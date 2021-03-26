<template>
    <v-container class="px-12">
        <v-row class="px-3 mt-12">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid">
        <v-col cols="12" class="mt-6">
            <v-row>
                <v-col cols="12" md="3">
                    <SelectGlossary 
                        @selected="AppsSelected"
                    ></SelectGlossary>
                </v-col>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Application Config
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>
                        <div v-if="props.item.application == 1">{{ 'Dino' }}</div>
                        <div v-else-if="props.item.application == 2">{{ 'Orca' }}</div>
                        <div v-else-if="props.item.application == 3">{{ 'Mantis' }}</div>
                        <div v-else-if="props.item.application == 4">{{ 'Beaver' }}</div>
                        <div v-else>{{ '' }}</div>
                    </td>
                    <td>{{ props.item.field }}</td>
                    <td>{{ props.item.attribute }}</td>
                    <td>{{ props.item.value }}</td>
                    <td>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                    icon
                                    v-on="{ ...menu }"
                                ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                            </template>
                            <v-list style="background: #E8EFF2">
                                <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'ApplicationUpdate', params: { id: props.item.id } }">Update</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "ApplicationConfig",
        data() {
            return {
                ConfirmData : {},
                loading: false,
                glossary:'',
                table: {
                    fields: [
                        {
                            text:'Application',
                            sortable: false
                        },
                        {
                            text:'Field',
                            sortable: false
                        },
                        {
                            text:'Attribute',
                            sortable: false
                        },
                        {
                            text:'Value',
                            sortable: false
                        },
                        {
                            text:'Action',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
            }
        },
        mounted() {
            this.renderData(this.glossary)
        },
        methods: {
            renderData(glossary){
                this.loading = true;
                if(glossary === ''){
                    glossary = ''
                }else{
                    glossary= "application:"+glossary
                }
                this.$http.get("/config/app",{params:{
                        perpage:100,
                        conditions:glossary,
                        orderby:'-id',
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            AppsSelected(d){
                this.glossary = '';
                if(d !== '' && d !== undefined){
                    this.glossary = d.value;
                }
            },
        },
        watch: {
            'glossary': {
                handler: function (val) {
                    let that = this
                    that.renderData(val)
                },
                deep: true
            },
        },
    }
</script>