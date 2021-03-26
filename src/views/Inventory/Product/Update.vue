<template>
    <v-container>
        <div class="px-6">
            <v-row>
                <v-col>
                    <v-text-field
                        name="product_code"
                        v-model="items.code"
                        required
                        outlined
                        label="Code *"
                        disabled
                        class="rounded-form"
                    >
                    </v-text-field>
                    <SelectUom
                        name= "uom"
                        v-model="uoms"
                        @selected="uomSelected"
                        :uom="uoms"
                        required
                        disabled
                    ></SelectUom>
                    <div style="margin-top:-20px" class="second-color fs14"> Weigth *</div>
                    <vue-numeric-input 
                        id="product"
                        :precision="2"
                        name="weight"
                        disabled
                        align="center" 
                        style="width:100%" 
                        v-model="items.unit_weight">
                    </vue-numeric-input>
                </v-col>
                <v-col>
                    <v-text-field
                        name="product_name"
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
                                <MultiSelectProductTag v-model="productTags" :productTag="productTagsUpdate" @selected="productTagSelected" :error="error.product_tag"/>
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
                <MultipleImages :name="form.name" :data="arrImg" :error="error.images" class="ma-3"/>
            </v-row>
            <div class="title-table mt-8">
                <label class="label-title">
                    Strorability Warehouse List
                </label>
            </div>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th>
                        Storability Assigned Warehouse
                    </th>
                    <th width="50%">
                        Safety Stock
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    style="height:80px"
                    v-for="item in form.storability_stock"
                    :key="item.warehouse_id"
                    >
                    <td>{{ item.warehouse_name }}</td>
                    <td>
                        <vue-numeric-input 
                            id="updatePro"
                            align="center" 
                            style="width:126px" 
                            v-model="item.stock_qty">
                        </vue-numeric-input>
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
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
                >Update</v-btn>
                </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            ConfirmData : {},
            storability_stock: [],
            uoms : null,
            productTags : null,
            productTagsUpdate : null,
            categories : null,
            dialog : false,
            items : {},
            error : {},
            arrImg : [],
            form : {
                name: "",
                up_code:"",
                uom_id: "",
                description:"",
                category_id:"",
                product_tag:[],
                images: [],
                note:"",
                storability_stock: []
            }
        }
    },
    methods : {
        productTagSelected(d) {
            this.productTags = null;
            let arr = []
            if (d !== '') {
                this.productTags = d;
                for (let i = 0; i < d.length; i++) {
                    if (d[i].value) {
                        arr.push(d[i].value);
                    } else {
                        arr.push(d[i]);
                    }
                }
            }
            this.form.product_tag = arr
        },
        uomSelected(d) {
            this.uoms = null;
            this.form.uom_id = '';
            if (d !== ''  && d !== undefined) {
                this.uoms = d;
                if (d)
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
            let arr = []
            let producttag = []
            this.$http.get("/inventory/product/"+ this.$route.params.id).then(response => {
                this.items = response.data.data
                this.form = {
                    name: this.items.name,
                    up_code:this.items.up_code,
                    uom_id: this.items.uom.id,
                    description:this.items.description,
                    category_id:this.items.category.id,
                    note:this.items.note,
                    product_tag:[],
                    images: [],
                    storability_stock: []
                }
                if(this.items.tag_product.includes(",")) {
                    arr = this.items.tag_product.split(',')
                } else {
                    arr.push(this.items.tag_product)
                }
                this.form.product_tag = arr
                for (let i = 0; i < arr.length; i++) {
                    this.$http.get("inventory/tag_product?conditions=value:"+arr[i]).then(res => {
                        producttag.push(res.data.data[0])    
                    })
                }
                this.productTagsUpdate = producttag
                this.arrImg = []
                let img = this.items.product_image
                for (let i = 0; i < img.length; i++) {
                    this.arrImg.push(
                        {
                            image : true,
                            imageError : "",
                            imgUrl : img[i].image_url,
                            nameFile : img[i].image_url.split('ktp/')[1].split('.png')[0]
                        }
                    )
                    this.form.images.push(img[i].image_url)
                }
                this.uomSelected(response.data.data.uom)
                this.categorySelected(response.data.data.category)
            });
            
        },
        renderWarehouse() {
            let arr = []
            let arr2 = []
            this.form.storability_stock = []
            this.$http.get("/warehouse/stock?embeds=warehouse_id,warehouse.area_id&conditions=product_id.e:"+ this.$route.params.id).then(response => {
                arr2 = response.data.data
                for (let i = 0; i < arr2.length; i++) {
                    arr.push(
                        {
                            warehouse_id:arr2[i].warehouse.id,
                            warehouse_name : arr2[i].warehouse.code+" - "+arr2[i].warehouse.name+" ("+arr2[i].warehouse.area.code+" - "+arr2[i].warehouse.area.name+")",
                            stock_qty:arr2[i].safety_stock
                        }
                    )
                }
            });
            this.form.storability_stock = arr
        },
        confirmButton() {
            this.ConfirmData = {
                model : true,
                title : "Update Product",
                text : "Are you sure want to update this product?",
                urlApi : "/inventory/product/"+this.$route.params.id,
                nextPage : "/inventory/product/detail/"+this.$route.params.id,
                data : this.form,
                image : true
            }
        }
    },
    created() {
        this.renderData()
        setTimeout(() => {
            this.renderWarehouse()
        }, 1000);
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
}
</script>
