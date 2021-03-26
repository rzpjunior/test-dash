<template>
    <v-container class="Heiti px-12">
        <v-subheader>
            <v-row class="pt-5 pt-sm-5 mt-10 mt-sm-16 mt-md-1 pb-2">
                <v-col cols="4" md="2" lg="2">
                    <router-link  :to="{ name: 'ProductCreate' }" class="routerLink d-flex justify-end">
                        <v-btn
                                style= "background-color: #768F9C !important; border-color: #768F9C !important;"
                                block
                                color="primary"
                                elevation="2"
                                large
                                rounded
                                class="no-caps"
                        >
                        Create Product
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols="8" offset-md="6" md="4" lg="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search code or Product..."
                                    single-line
                                    hide-details
                                    style="margin-top:-10px;"
                                    v-on="{ ...tooltip }"
                                    rounded
                                    outlined
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-subheader>
        <v-row class="px-6 mt-12">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid mx-4">
        <v-col cols="12" class="mt-6">
            <v-row>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        class="rounded-form"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectUom
                        :norequired="true"
                        v-model="uoms"
                        @selected="uomSelected"
                        :uom="uoms"
                    ></SelectUom>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectCategory
                        :norequired="true"
                        v-model="categories"
                        @selected="categorySelected"
                        :category="categories"
                    ></SelectCategory>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectProductTag
                        v-model="productTags"
                        @selected="productTagSelected"
                        :product_tag="productTags"
                    ></SelectProductTag>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-col>
        <div class="title-table">
            <label class="label-title">
                Product
            </label>
        </div>
        <v-data-table
            :headers="table.fields"
            :items="items"
            :loading="loading"
            :items-per-page="10"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }} <br>
                        <span class="second-color">{{ props.item.uom.name }}</span>
                    </td>
                    <td>{{ props.item.category.name }}</td>
                    <td>{{ props.item.tag_product_str }}</td>
                    <td>
                        <div v-if="props.item.status == 1">
                            <v-chip
                                :color="statusMaster('active')"
                            > <span class="pa-md-2"> Active </span></v-chip>
                        </div>
                        <div v-else-if="props.item.status == 2">
                            <v-chip
                                :color="statusMaster('archived')"
                            > Archived </v-chip>
                        </div>
                    </td>
                    <td>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on: menu }">
                                <v-btn
                                    icon
                                    v-on="{ ...menu }"
                                ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                            </template>
                            <v-list style="background: #E8EFF2">
                                <v-list-item  :to="`/inventory/product/detail/${props.item.id}`" >
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <div class="px-md-2">
                                    <hr>
                                </div>
                               <v-list-item>
                                    <v-list-item-title >
                                        <router-link style="color: #333333; text-decoration: none;" :to="{ name: 'ProductUpdate', params: { id: props.item.id } }">Update</router-link>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "ProductList",
        data() {
            return {
                search: '',
                loading: false,
                uom : null,
                statuses:999,
                table: {
                    fields: [
                        {
                            text:'Code',
                            sortable: false,
                        },
                        {
                            text:'Name',
                            sortable: false
                        },
                        {
                            text:'Category',
                            sortable: false
                        },
                        {
                            text:'Product Tag',
                            alias: "product-tag",
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "10%",
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
                uoms : null,
                categories : null,
                productTags : null
            }
        },
        mounted() {
            this.renderData('',this.statuses)
        },
        methods: {
            productTagSelected(d) {
                this.productTags = null;
                if (d !== ''  && d !== undefined) {
                    this.productTags = d;
                }
                this.renderData('',this.statuses)
            },
            uomSelected(d) {
                this.uoms = null;
                if (d !== ''  && d !== undefined) {
                    this.uoms = d;
                }
                this.renderData('',this.statuses)
            },
            categorySelected(d) {
                this.categories = null;
                if (d !== ''  && d !== undefined) {
                    this.categories = d;
                }
                this.renderData('',this.statuses)
            },
            renderData(search,statuses){
                this.loading = true;
                if(statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+statuses
                }
                let uom = ''
                if (this.uoms !== null) {
                    uom = "|uom.id.e:"+this.uoms.id
                }
                let category = ''
                if (this.categories !== null) {
                    category = "|category.id.e:"+this.categories.id
                }
                let productTag = ''
                if (this.productTags !== null) {
                    productTag = this.productTags.value
                }
                this.$http.get("/inventory/product",{params:{
                        perpage:100,
                        conditions:'name.icontains:'+search+'%2COr.code.icontains:'
                        +search+statuses+uom+category,
                        embeds: 'uom_id,category_id',
                        orderby:'-id',
                        tagproduct : productTag
                    }}).then(response => {
                    this.loading = false;
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    that.renderData(val,this.statuses)
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search,val)
                },
                deep: true
            },
        },
    }
</script>