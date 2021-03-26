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
                        :error-messages="error.code"
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
                        v-model="items.name"
                        required
                        outlined
                        disabled
                        class="rounded-form"
                        label="Product Name *"
                        :error-messages="error.name"
                    >
                    </v-text-field>
                    <SelectCategory
                        v-model="categories"
                        @selected="categorySelected"
                        :category="categories"
                        name= "category"
                        required
                        disabled
                    ></SelectCategory>
                    <v-text-field
                        name="univ_product_code"
                        v-model="items.up_code"
                        required
                        outlined
                        disabled
                        class="rounded-form"
                        :error-messages="error.name"
                        label="Universal Product Code"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row style="margin-top:-20px">
                <v-col>
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <div v-on="{ ...tooltip }">
                            <v-textarea
                                name="note"
                                v-model="items.note"
                                :counter="100"
                                maxlength="100"
                                outlined
                                label="Note"
                                class="rounded-form"
                                disabled
                                
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
                                <v-autocomplete
                                    name="product_tag"
                                    v-model="productTag"
                                    :items="productTag"
                                    outlined
                                    chips
                                    class="rounded-form"
                                    label="Product Tag *"
                                    multiple
                                    disabled
                                >
                                <template #selection="{ item }">
                                    <v-chip color="#CECECE" text-color="white">{{item}}</v-chip>
                                </template>
                                </v-autocomplete>
                            </div>
                        </template>
                        <span>Product classification in mobile application</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <div v-on="{ ...tooltip }">
                            <v-textarea
                                name="description"
                                v-model="items.description"
                                :counter="100"
                                maxlength="100"
                                outlined
                                disabled
                                label="Description"
                                class="rounded-form"
                            />
                            </div>
                        </template>
                        <span>Product description in mobile application</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <span class="second-color fs14">Main Image <span style="color:red">*</span></span>
            <div class="mt-3">
                <div class="row">
                    <div v-for="(item, idx) in items.product_image" :key="idx">
                        <v-tooltip top v-if="idx==0">
                            <template v-slot:activator="{ on: tooltip }">
                                <div class="img-product ma-3" v-on="{ ...tooltip }">
                                    <v-img
                                        class="rounded-form"
                                        height="180"
                                        width="250"
                                        :src="item.image_url"
                                    ></v-img>
                                    <div class="second-color mt-2">Max : 2 Mb</div>
                                </div>
                            </template>
                            <span>Default image shown in catalog</span>
                        </v-tooltip>
                        <div class="img-product ma-3" v-else>
                            <v-img
                                class="rounded-form"
                                height="180"
                                width="250"
                                :src="item.image_url"
                            ></v-img>
                            <div class="second-color mt-2">Max : 2 Mb</div>
                        </div>
                    </div>
                </div>
            </div>
            <v-row class="px-4 mt-8">
                <div class="title-page">
                    Availability
                </div>
            </v-row>
            <hr class="hr-solid">
            <div class="title-table mt-6">
                <label class="label-title">
                    Storability
                </label>
            </div>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th>
                        Warehouse
                    </th>
                    <th>
                        Area
                    </th>
                    <th>
                        Storability
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in warehouselists"
                    :key="item.warehouse"
                    >
                    <td>{{ item.code}} - {{item.name }}</td>
                    <td>{{ item.area.code }} - {{ item.area.name }}</td>
                    <td>
                        <v-checkbox
                            color="#50AE55"
                            v-model="data.warehouse_checked"
                            multiple
                            :value="item.id"
                        ></v-checkbox>
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
            warehouselists : [],
            data : {
                storability: "",
                warehouse_checked: [],
                warehouse_unchecked: []
            },
            uoms : null,
            categories : null,
            items : {},
            error : {},
            productTag : [],
        }
    },
    methods : {
        confirmButton() {
            let arr = []
            for (let i = 0; i < this.warehouselists.length; i++) {
                arr.push(this.warehouselists[i].id)
            }
            this.data.storability = 1
            this.data.warehouse_unchecked = arr.filter(x => !this.data.warehouse_checked.includes(x));
            if (this.data.warehouse_checked.length == 0) {
                this.data.storability = 2
            }
            this.ConfirmData = {
                model : true,
                title : "Update Product - Storability",
                text : "Are you sure you want to update this product storability?",
                urlApi : "/inventory/product/storability/"+this.$route.params.id,
                nextPage : "/inventory/product/detail/"+this.$route.params.id,
                data : this.data
            }
        },
        uomSelected(d) {
            this.uoms = null;
            this.items.uom = '';
            if (d !== ''  && d !== undefined) {
                this.uoms = d;
                this.items.uom = d.id
            }
        },
        categorySelected(d) {
            this.categories = null;
            this.items.category = '';
            if (d !== ''  && d !== undefined) {
                this.categories = d;
                if (d)
                this.items.category = d.id
            }
        },
        renderData() {
            this.$http.get("/inventory/product/"+ this.$route.params.id).then(response => {
                this.items = response.data.data
                this.data.storability = this.items.storability
                this.data.warehouse_checked = this.items.warehouse_sto_arr
                if(this.items.tag_product_str !== "")
                this.productTag = this.items.tag_product_str.split(',');
                this.uomSelected(response.data.data.uom)
                this.categorySelected(response.data.data.category)
            });
            this.$http.get("config/warehouse?embeds=area_id,sub_district_id&conditions=aux_data:2").then(response => {
                this.warehouselists = response.data.data
            });
        }
    },
    created() {
        this.renderData()
    }
}
</script>