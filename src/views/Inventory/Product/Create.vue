<template>
    <v-container>
        <div>
            <div class="px-6">
                <v-row>
                    <v-col style="text">
                        <v-text-field
                            name="name"
                            v-model="form.name"
                            required
                            outlined
                            class="rounded-form"
                            :error-messages="error.name"
                        >
                        <template v-slot:label>
                            Product Name <span style="color:red">*</span>
                        </template>
                        </v-text-field>
                        <SelectCategory
                            v-model="categories"
                            @selected="categorySelected"
                            :category="categories"
                            name= "category"
                            required
                            :error="error.category_id"
                        ></SelectCategory>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-text-field
                                        name="univ_product_code"
                                        v-model="form.up_code"
                                        required
                                        outlined
                                        class="rounded-form"
                                        label="Universal Product Code"
                                    >
                                    </v-text-field>
                                </div>
                            </template>
                            <span>Input product barcode</span>
                        </v-tooltip>
                    </v-col>
                    <v-col>
                        <SelectUom
                            name= "uom"
                            v-model="uoms"
                            @selected="uomSelected"
                            :uom="uoms"
                            required
                            :error="error.uom_id"
                        ></SelectUom>
                        <div v-if="error.uom_id" style="margin-top:-10px" class="second-color fs14"> Weigth <span style="color:red">*</span></div>
                        <div v-else style="margin-top:-20px" class="second-color fs14"> Weigth <span style="color:red">*</span></div>
                        <vue-numeric-input 
                            v-if="!error.weight"
                            id="product"
                            :precision="2"
                            name="weight"
                            align="center" 
                            style="width:100%" 
                            v-model="form.weight">
                        </vue-numeric-input>
                        <div v-else>
                            <vue-numeric-input 
                                id="productErr"
                                :precision="2"
                                name="weight"
                                align="center" 
                                style="width:100%" 
                                v-model="form.weight">
                            </vue-numeric-input>
                        <div class="mt-1 ml-3 fs12" style="color:red;">{{error.weight}}</div>
                        </div>
                    </v-col>
                </v-row>
                <v-row style="margin-top:-20px">
                    <v-col>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-textarea
                                        name="note"
                                        v-model="form.note"
                                        :counter="100"
                                        maxlength="100"
                                        outlined
                                        label="Note"
                                        class="rounded-form"
                                    />
                                </div>
                            </template>
                            <span>Internal purpose</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <v-row class="px-4">
                    <div class="title-page">
                        Catalog
                    </div>
                </v-row>
                <hr class="hr-solid">
                <v-row class="mt-8">
                    <v-col>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <MultiSelectProductTag v-model="productTags" @selected="productTagSelected" :error="error.product_tag"/>
                                </div>
                            </template>
                            <span>Product classification in catalog</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                <v-textarea
                                    name="description"
                                    v-model="form.description"
                                    :counter="250"
                                    maxlength="250"
                                    outlined
                                    label="Description"
                                    class="rounded-form"
                                />
                                </div>
                            </template>
                            <span>Product description in catalog</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <v-row style="mb-10">
                    <MultipleImages :name="form.name" :error="error.images" class="ma-3"/>
                </v-row>
                <v-row class="px-4 mt-8">
                    <div class="title-page">
                        Availability
                    </div>
                </v-row>
                <hr class="hr-solid">
                <v-row class="mt-2">
                    <v-col>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-switch
                                        v-model="form.storability"
                                        label="Storability"
                                        color="#50AE55"
                                        inset
                                        :error-messages="error.warehouse_sto"
                                        :false-value="2"
                                        :true-value="1"
                                        @click="switchSto()"
                                    ></v-switch>
                                </div>
                            </template>
                            <span>Product can be stored</span>
                        </v-tooltip>
                        <div style="margin-top:-20px;margin-left:54px" v-if="form.storability == 1">
                            <v-checkbox
                                :error="checkStr(error.warehouse_sto)"
                                v-for="(item, idx) in warehouselists" :key="idx"
                                v-model="form.warehouse_sto"
                                :label="`${item.code} - ${item.name} (${item.area.code} - ${item.area.name})`"
                                color="#50AE55"
                                @click="checkSto(item.id)"
                                style="margin-bottom:-28px"
                                multiple
                                :value="item.id"
                            ></v-checkbox>
                        </div>
                    </v-col>
                    <v-col>
                        <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <div v-on="{ ...tooltip }">
                                <v-switch
                                    v-model="form.purchasability"
                                    label="Purchasability"
                                    color="#50AE55"
                                    inset
                                    :error-messages="error.warehouse_pur"
                                    @click="switchPur()"
                                    :false-value="2"
                                    :true-value="1"
                                ></v-switch>
                            </div>
                        </template>
                        <span>Product can be purchased</span>
                    </v-tooltip>
                    <div style="margin-top:-20px;margin-left:54px" v-if="form.purchasability == 1">
                        <v-checkbox
                            v-for="(item, idx) in warehouselists" :key="idx"
                            :error="checkStr(error.warehouse_pur)"
                            v-model="form.warehouse_pur"
                            multiple
                            @click="checkPur(item.id)"
                            :value="item.id"
                            :label="`${item.code} - ${item.name} (${item.area.code} - ${item.area.name})`"
                            color="#50AE55"
                            style="margin-bottom:-28px"
                        ></v-checkbox>
                    </div>
                    </v-col>
                </v-row>
                <pre></pre>
                <hr class="hr-solid">
                <v-row class="mt-1">
                    <v-col>
                    <v-card-actions class="pb-4">
                        <v-spacer></v-spacer>
                    <v-btn 
                        rounded 
                        elevation="0" 
                        class="no-caps px-7" 
                        @click="$router.go(-1)"
                        style="background: #E6E9ED; color:#768F9C;height:45px"
                    >Cancel</v-btn>
                    <v-btn 
                    class="px-7 ml-2 no-caps white--text" 
                    @click="confirmButton()" 
                    elevation="0"
                    rounded
                    style="background: #768f9c; height:45px"
                    >Create</v-btn>
                    </v-card-actions>
                    </v-col>
                </v-row>
            </div>
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ConfirmData : {},
                warehouselists : [],
                form : {
                    "name": "",
                    "weight": 0.00,
                    "warehouse_sto": [],
                    "warehouse_pur": [],
                    "warehouse_sal": [],
                    "product_tag": [],
                    "storability": 2,
                    "purchasability": 2,
                    "salability": 2,
                    "uom_id": "",
                    "category_id": "",
                    "images": [],
                    "description": "",
                    "up_code": "",
                    "note":""
                },
                error:{},
                uoms : null,
                categories : null,
                productTags : null,
            }
        },
        created() {
            this.renderData()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
            this.$root.$on('event_multipleImage', function(url){
                self.form.images = url
            });
        },
        methods:{
            checkStr(val) {
                if (typeof val === 'string' || val instanceof String) {
                    return true
                } else {
                    return false
                }
            },
            switchPur() {
                this.form.storability = 1
                this.form.warehouse_pur = []
                this.error.warehouse_pur = null
            },
            checkPur(val) {
                this.error.warehouse_pur = null
                let status = false
                let push = true
                let compare = false
                for (let i = 0; i < this.form.warehouse_pur.length; i++) {
                    if (this.form.warehouse_pur[i] == val) {
                        status = true
                    }
                }
                if (status) {
                    for (let i = 0; i < this.form.warehouse_sto.length; i++) {
                        if (this.form.warehouse_sto[i] == val) {
                            push = false
                        }
                        if (i == this.form.warehouse_sto.length-1) {
                            compare = true
                        }
                    }
                    if (this.form.warehouse_sto.length == 0) {
                        compare = true
                    }
                }
                if (push && compare) {
                    this.form.warehouse_sto.push(val)
                }
            },
            switchSto() {
                this.form.purchasability = 2
                this.form.warehouse_sto = []
                this.form.warehouse_pur = []
                this.error.warehouse_sto = null
            },
            checkSto(val) {
                this.error.warehouse_sto = null
                let status = false
                let arr = this.form.warehouse_pur
                let arr2 = this.form.warehouse_pur
                for (let i = 0; i < this.form.warehouse_sto.length; i++) {
                    if (this.form.warehouse_sto[i] == val) {
                        status = true
                    }
                }
                if (!status) {
                    for (let i = 0; i < this.form.warehouse_pur.length; i++) {
                        if (this.form.warehouse_pur[i] == val) {
                            arr2 = arr.filter(e => e !== val)
                        }
                    }
                }
                this.form.warehouse_pur = arr2
            },
            productTagSelected(d) {
                this.productTags = null;
                let arr = []
                if (d !== '') {
                    this.productTags = d;
                    for (let i = 0; i < d.length; i++) {
                        arr.push(d[i].value);
                    }
                }
                this.form.product_tag = arr
            },
            uomSelected(d) {
                this.uoms = null;
                this.form.uom_id = '';
                if (d !== ''  && d !== undefined) {
                    this.uoms = d;
                    if(d)
                    this.form.uom_id = d.id
                }
            },
            categorySelected(d) {
                this.categories = null;
                this.form.category_id = '';
                if (d !== ''  && d !== undefined) {
                    this.categories = d;
                    if (d)
                    this.form.category_id = d.id
                }
            },
            renderData() {
                this.$http.get("config/warehouse?embeds=area_id,sub_district_id&conditions=aux_data:2").then(response => {
                    this.warehouselists = response.data.data
                });
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create Product",
                    text : "Are you sure want to create this product? product name, UOM, weight can not be updated afterwards.",
                    urlApi : "/inventory/product",
                    nextPage : "/inventory/product/detail/:id",
                    post : true,
                    data : this.form,
                    image : true
                }
            }
        },
    }
</script>
