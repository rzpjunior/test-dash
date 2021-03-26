<template>
    <v-container class="Heiti px-12">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <v-btn 
                        class="px-6 ml-2 no-caps white--text" 
                        @click="exportProduct=true" 
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                        >Export Product Price</v-btn>
                    </div>
                    <div class="col">
                        <v-btn 
                        class="px-6 ml-2 no-caps white--text" 
                        @click="productPrice=true"  
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                        >Update Product Price</v-btn>
                    </div>
                    <div class="col">
                        <v-btn 
                        class="px-6 ml-2 no-caps white--text" 
                        @click="shadowPrice=true" 
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                        >Update Shadow Price</v-btn>
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
            <div class="col-4">
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search code or User..."
                    single-line
                    hide-details
                    rounded
                    outlined
                    style="margin-top:-5px;"
                ></v-text-field>
            </div>
        </div>
        <v-row class="px-4 mt-10">
            <div class="title-page">
                Filter
            </div>
        </v-row>
        <hr class="hr-solid">
        <v-row class="mt-8">
            <v-col cols="12" md="3">
                <SelectPriceSet
                    v-model="priceSetFilterID"
                    @selected="priceSetFilterIDSelected"
                    :price_set_filter_id="filter.price_set_filter_id"
                    :clear="clearPriceSetID"
                ></SelectPriceSet>
            </v-col>
            <v-col cols="12" md="3">
                <v-select
                    v-model="productCategoryStatus"
                    outlined
                    label="Category"
                    class="rounded-form"
                    :items="itemsSelect"
                    :category_status="filter.category_status"
                ></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select
                    v-model="productSalability"
                    outlined
                    label="Salability"
                    class="rounded-form"
                    :items="itemsSelect"
                    :product_salability="filter.product_salability"
                ></v-select>
            </v-col>
        </v-row>
        <div class="title-table">
            <label class="label-title">
                Product Price
            </label>
        </div>

        <v-data-table
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
                :mobile-breakpoint="0"
        >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.product.code }}</td>
                    <td>
                        {{ props.item.product.name }} <br>
                        <label style="color: #768F9C;">
                            {{ props.item.product.uom.name }}
                        </label>
                    </td>
                    <td>{{ props.item.product.category.name }}</td>
                    <td>{{ props.item.product.tag_product }}</td>
                    <td>{{ props.item.product.salability }}</td>
                    <td>
                        <!-- Rp {{ formatNumber(props.item.product.unit_price) }} <br> -->
                         Rp {{ props.item.unit_price }} <br>
                         <label style="color: #768F9C;">
                             {{ props.item.price_set.name }}
                        </label>
                    </td>
                    <td>
                        <!-- Rp {{ formatNumber(props.item.product.shadow_price) }} <br> -->
                        Rp {{ props.item.shadow_price }} <br>
                        <label style="color: #768F9C;"> 
                            {{ props.item.shadow_price_pct }}%
                        </label>
                    </td>
                </tr>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
        <v-dialog
            v-model="exportProduct"
            persistent
            max-width="350px"
            >
            <v-card class="Heiti" style="border-radius: 15px;">
                <div class="d-flex justify-end pt-4 pr-4">
                    <v-btn
                        icon
                        @click="exportProduct = false"
                    >
                        <v-img src="/icon/close.png" max-height="20px" max-width="20px"></v-img>
                    </v-btn>
                </div>
                <v-card-title style="margin-top:-20px">
                <span class="fs25 second-color mt-1">Export Product Price</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Export product price based on filters below</span>
                </v-card-text>
                <v-card-text>
                    <SelectPriceSet
                        v-model="priceSetID"
                        @selected="priceSetSelected"
                        :price_set_id="filter.price_set_id"
                    ></SelectPriceSet>
                     <v-select
                        v-model="productCategoryStatus"
                        style="margin-top:-15px"
                        outlined
                        label="Category"
                        class="rounded-form"
                        :items="itemsSelect"
                        :category_status="filter.category_status"
                    ></v-select>
                    <v-select
                        v-model="productSalability"
                        style="margin-top:-15px"
                        outlined
                        label="Salability"
                        class="rounded-form"
                        :items="itemsSelect"
                        :product_salability="filter.product_salability"
                    ></v-select>
                </v-card-text>
                <v-card-actions class="pb-8" style="margin-top:-35px">
                    <v-btn 
                        block
                        class="no-caps white--text" 
                        @click="exportProductPrice()" 
                        elevation="0"
                        rounded
                        style="background: #768f9c; height:45px"
                    >Export</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="productPrice"
            persistent
            max-width="902px"
            >
            <v-card class="Heiti" style="border-radius: 15px;">
                <v-card-title>
                    <span class="fs25 second-color mt-1">Update Product Price</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="productPrice = false"
                    >
                        <v-img src="/icon/close.png" max-height="20px" max-width="20px"></v-img>
                    </v-btn>
                </v-card-title>
                <v-card-text style="margin-top:-5px">
                    <span class="fs16 second-color-rule">Please check on shadow price, it must be greater than updated product price</span>
                </v-card-text>
                <v-card-text>
                    <v-row class="px-4">
                        <v-col style="border-right: 1px dashed #333;">
                            <div>
                                Step 1. Download Template
                            </div>
                            <div class="my-2 second-color">
                                Download template based on filters below
                            </div>
                            <SelectPriceSet
                                v-model="priceSetID"
                                @selected="priceSetSelected"
                                :price_set_id="filter.price_set_id"
                            >
                            </SelectPriceSet>
                            <v-select
                                v-model="productCategoryStatus"
                                style="margin-top:-15px"
                                outlined
                                label="Category"
                                class="rounded-form"
                                :items="itemsSelect"
                                :category_status="filter.category_status"
                            ></v-select>
                            <v-select
                                v-model="productSalability"
                                style="margin-top:-15px"
                                outlined
                                label="Salability"
                                class="rounded-form"
                                :items="itemsSelect"
                                :product_salability="filter.product_salability"
                            ></v-select>
                            <v-card-actions style="margin-top:-15px">
                                <v-spacer></v-spacer>
                                <v-btn
                                    v-if="!priceSetID"
                                    disabled
                                    class="px-7 no-caps white--text" 
                                    @click="downloadProductPrice()" 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px"
                                >Download</v-btn>
                                <v-btn
                                    v-if="priceSetID"
                                    class="px-7 no-caps white--text" 
                                    @click="downloadProductPrice()" 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px"
                                >Download</v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col style="border-right: 1px dashed #333;">
                            <div>
                                Step 2. Update Template
                            </div>
                            <div class="my-2 second-color">
                                Update with spreadsheet application
                            </div>
                            <!-- <v-img height="185" class="mt-4" src="/img/worktime.png" alt="" /> -->
                            <v-img height="185" class="mt-4" src="https://edenfarm-fe-testbucket.s3.amazonaws.com/assets/images/worktime.png" alt="" />
                        </v-col>
                        <v-col>
                            <div>
                                Step 3. Upload File <span style="color:red">*</span>
                            </div>
                            <div class="my-2 second-color">
                                Price will be updated based on selected price set
                            </div>
                            <!-- <vue-xlsx-table @on-select-file="handleSelectedFile" class="xlsx-button" :readAsBS="true"> <i class="fa fa-cloud-upload"></i> Upload</vue-xlsx-table> -->

                            <div style="border-radius: 20px; background: #E8E8E8;  height:185px; text-align: center;">
                                <img width="40" class="mt-4" src="/img/files.png" alt=""> <br>
                            <v-file-input id="fileUpload" type="file" v-model="image" style="display:none;"/>
                                <v-btn 
                                    v-if="!priceSetID|| disable" 
                                    disabled 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px" 
                                    class="px-6 ml-2 no-caps white--text"> 
                                    Choose File</v-btn>
                                <vue-xlsx-table v-if="priceSetID && !disable" @on-select-file="handleSelectedFile" style="background: #768f9c; height:45px; border-radius: 20px;" class="px-6 ml-2 no-caps white--text"  :readAsBS="true"> Choose File</vue-xlsx-table>

                                <h3 class="pt-3" style="color: #768f9c;">Or</h3>
                                <h3 class="pt-2" style="color: #768f9c;">Drop Files Here</h3>
                            </div>

                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="shadowPrice"
            persistent
            max-width="902px"
            >
            <v-card class="Heiti" style="border-radius: 15px;">
                <v-card-title>
                    <span class="fs25 second-color mt-1">Update Shadow Price</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="shadowPrice = false"
                    >
                        <v-img src="/icon/close.png" max-height="20px" max-width="20px"></v-img>
                    </v-btn>
                </v-card-title>
                <v-card-text style="margin-top:-5px">
                    <span class="fs16 second-color-rule">Rules : Shadow price must be greater than product price</span>
                </v-card-text>
                <v-card-text>
                    <v-row class="px-4">
                        <v-col style="border-right: 1px dashed #333;">
                            <div>
                                Step 1. Download Template
                            </div>
                            <div class="my-2 second-color">
                                Download template based on filters below
                            </div>
                            <SelectPriceSet
                                v-model="priceSetID"
                                @selected="priceSetSelected"
                                :price_set_id="filter.price_set_id"
                            >
                            </SelectPriceSet>
                            <SelectProductTag
                                    v-model="productTag"
                                    @selected="productTagSelected"
                                    :product_tag="filter.product_tag"
                                    style="margin-top: -10px;"
                            >
                            </SelectProductTag>
                            <v-select
                                v-model="productSalability"
                                style="margin-top:-15px"
                                outlined
                                label="Salability"
                                class="rounded-form"
                                :items="itemsSelect"
                                :product_salability="filter.product_salability"
                            ></v-select>
                            <v-card-actions style="margin-top:-15px">
                                <v-spacer></v-spacer>
                                <v-btn
                                    v-if="!priceSetID"
                                    disabled
                                    class="px-7 no-caps white--text" 
                                    @click="downloadShadowPrice()" 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px"
                                >Download</v-btn>
                                <v-btn
                                    v-if="priceSetID"
                                    class="px-7 no-caps white--text" 
                                    @click="downloadShadowPrice() + 'price_set_id=' + this.filter.price_set_id.id" 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px"
                                >Download</v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col style="border-right: 1px dashed #333;">
                            <div>
                                Step 2. Update Template
                            </div>
                            <div class="my-2 second-color">
                                Update with spreadsheet application
                            </div>
                            <!-- <v-img height="185" class="mt-4" src="/img/worktime.png" alt="" /> -->
                            <v-img height="185" class="mt-4" src="https://edenfarm-fe-testbucket.s3.amazonaws.com/assets/images/worktime.png" alt="" />
                        </v-col>
                        <v-col>
                            <div>
                                Step 3. Upload File <span style="color:red">*</span>
                            </div>
                            <div class="my-2 second-color">
                                Price will be updated based on selected price set
                            </div>
                            <div style="border-radius: 20px; background: #E8E8E8;  height:185px; text-align: center;">
                                <img width="40" class="mt-4" src="/img/files.png" alt=""> <br>
                            <v-file-input id="fileUpload" type="file" v-model="image" style="display:none;" @change="uploadFile"/>
                                <v-btn 
                                    v-if="!priceSetID || disable" 
                                    disabled 
                                    elevation="0"
                                    rounded
                                    style="background: #768f9c; height:45px" 
                                    class="px-6 ml-2 no-caps white--text"> 
                                    Choose File</v-btn>
                                <vue-xlsx-table v-if="priceSetID && !disable" @on-select-file="handleSelectedFileShadow" style="background: #768f9c; height:45px; border-radius: 20px;" class="px-6 ml-2 no-caps white--text"  :readAsBS="true"> Choose File</vue-xlsx-table>

                                <h3 class="pt-3" style="color: #768f9c;">Or</h3>
                                <h3 class="pt-2" style="color: #768f9c;">Drop Files Here</h3>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    AWS.config.region = 'ap-southeast-1'; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-southeast-1:fbf7d1ed-ee66-4919-9203-6345c06892fb' 
    });

    AWS.config.credentials.get(function(err) {
        if (err) alert(err);
        console.log(AWS.config.credentials);
    });

    var bucket = new AWS.S3({
        params: {
            Bucket: process.env.AWS_BUCKET_NAME
        }
    });

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const dateTime = date;
    
    import axios from "axios";

    export default {
        name: "ProductPrice",
        data() {
            return {
                itemsSelect: [1, 2],
                filter: {
                    price_set_id: '',
                    price_set_filter_id: '',
                    product_salability: 1,
                    category_status: 1,
                    product_salability_filter: '',
                    category_status_filter: '',
                    product_tag: '',
                },
                productTag: null,
                image: null,
                loading: false,
                exportProduct : false,
                shadowPrice : false,
                productPrice: false,
                priceSetID: null,
                productCategoryStatus: null,
                productSalability: null,
                clearPriceSetID: false,
                priceSetFilterID: null,
                productCategoryFilter: null,
                productSalability: null,
                productTag: null,
                disable: false,
                table: {
                    fields: [
                        {
                            text:'Product Code',
                            sortable: false,
                        },
                        {
                            text:'Product Name',
                            sortable: false
                        },
                        {
                            text:'Category',
                            sortable: false
                        },
                        {
                            text:'Price Tag',
                            sortable: false
                        },
                        {
                            text:'Salable',
                            sortable: false
                        },
                        {
                            text:'Unit Price',
                            sortable: false
                        },
                        {
                            text:'Shadow Price',
                            sortable: false
                        },
                    ],
                },
                search : '',
                loading : false,
                items:[],
                // price:{
                //     price_set_id: '',
                //     values:[]
                // },
                prices: []
            }
        },
        created(){
            this.renderData('', this.filter.price_set_filter_id)
        },

        methods: {
            handleSelectedFile (convertedData) {
                this.disable = false
                let that = this
                convertedData.body.forEach((item) => {
                    let value = {};
                    value.product_id = item.Product_ID;
                    value.unit_price = parseFloat(item.Unit_Price);
                    value.price_set_id = this.filter.price_set_id
                    that.prices.push(value)
                }); 
                console.log(that.prices)
                this.$http.put("/price/product_price/template/update", {
                    prices:that.prices
                })
                .then(response => {
                    this.$toast.open({
                        position: 'top-right',
                        message: 'Data has been saved successfully',
                        type: 'success',
                    });
                    window.location.reload("/price/product")
                    console.log(response);
                })
                .catch(err => {
                    this.$toast.open({
                        position: 'top-right',
                        message: 'Each price must be equal or greater than 0',
                        type: 'error',
                    });
                    console.log(err)
                })
            },

             handleSelectedFileShadow (convertedData) {
                this.disable = false
                let that = this
                convertedData.body.forEach((item) => {
                    let value = {};
                    value.product_id = item.Product_ID;
                    value.shadow_price = parseFloat(item.Shadow_Price);
                    value.price_set_id = this.filter.price_set_id
                    that.prices.push(value)
                }); 
                console.log(that.prices)
                this.$http.put("/price/product_price/template/shadow/update", {
                    prices:that.prices
                })
                .then(response => {
                    this.$toast.open({
                        position: 'top-right',
                        message: 'Data has been saved successfully',
                        type: 'success',
                    });
                    window.location.reload("/price/product")
                    console.log(response);
                })
                .catch(err => {
                    this.$toast.open({
                        position: 'top-right',
                        message: 'Each shadow price must be greater than unit price',
                        type: 'error',
                    });
                    console.log(err)
                })
            },

            uploadFile(){
                // var objKey = 'test-folder/';
                let resp = this.image
                let nameFile = this.nameFile
                // var objKey = 'ktp/' + nameFile;
                var objKey = 'test-folder/' + nameFile;
                var params = {
                    Key: objKey,
                    ContentType: resp.type,
                    Body: resp,
                    ACL: 'public-read'
                };
                bucket.putObject(params, function(err, data) {
                    if (err) {
                        results.innerHTML = 'ERROR: ' + err;
                        // console.log("error");
                    } else {
                        var s3url = bucket.getSignedUrl('getObject', {Key: params.Key});
                        console.log(s3url)
                    }
                });
            },

            chooseFiles() {
                document.getElementById("fileUpload").click()
            },
            submitFiles(){
                // var objKey = 'test-folder/';
                let resp = this.image
                let nameFile = this.nameFile
                // var objKey = 'ktp/' + nameFile;
                var objKey = 'test-folder/' + nameFile;
                var params = {
                    Key: objKey,
                    ContentType: resp.type,
                    Body: resp,
                    ACL: 'public-read'
                };
                bucket.putObject(params, function(err, data) {
                    if (err) {
                        results.innerHTML = 'ERROR: ' + err;
                        // console.log("error");
                    } else {
                        var s3url = bucket.getSignedUrl('getObject', {Key: params.Key});
                        console.log(s3url)
                    }
                }); 
            },
            formatNumber(val) {
                return (val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            renderData(priceSetFilterID){
                console.log(priceSetFilterID)
                 let that = this
                if(that.filter.price_set_filter_id === ''){
                    priceSetFilterID = ''
                }else{
                    priceSetFilterID = "price_set_id.e:"+that.filter.price_set_filter_id
                }
                this.$http.get("/price/product_price",{params:{
                        // perpage:100,
                        // embeds:'product,price_set_id,product.uom,product.category',
                        conditions: priceSetFilterID,
                        // embeds: 'product_id',
                        orderby:'-id',
                    }}).then(response => {
                        console.log(response.data.data)
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            priceSetFilterIDSelected(d){
                this.priceSetFilterID = null;
                this.filter.price_set_filter_id = '';
                if(d !== '' && d !== undefined){
                    console.log(d);
                    this.priceSetFilterID = d.id;
                    this.filter.price_set_filter_id = d.id              
                }
            },
            priceSetSelected(d){
                this.priceSetID = null;
                this.filter.price_set_id = '';
                if (d !== ''  && d !== undefined) {
                    console.log(d);
                    this.priceSetID = d.id;
                    this.filter.price_set_id= d.id
                }
            },

            productTagSelected(d){
                this.productTag = null;
                this.filter.product_tag = '';
                if (d !== ''  && d !== undefined) {
                    console.log(d);
                    this.productTag = d.id;
                    this.filter.product_tag= d.id
                }
            },

            categorySelected(d){
                this.productSalability = null;
                this.filter.category_status = '';
                if (d !== ''  && d !== undefined) {
                    console.log(d);
                    this.productSalability = d;
                    this.filter.category_status= d.id
                }
            },
            salabilitySelected(d){
                this.productCategoryStatus = null;
                this.filter.product_salability = '';
                if (d !== ''  && d !== undefined) {
                    console.log(d);
                    this.productCategoryStatus = d;
                    this.filter.product_salability = d.id
                }
            },
            exportProductPrice(priceSetID, productSalability, productCategoryStatus) {
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const dateTime = date;
                
                let that = this
                if(that.filter.price_set_id === ''){
                    priceSetID = ''
                }else{
                    priceSetID = "price_set_id.e:"+that.filter.price_set_id
                }
                if(that.filter.product_salability === ''){
                    productSalability = ''
                }else{
                    productSalability = "|product.salability:"+that.filter.product_salability
                }
                if(that.filter.category_status === ''){
                    productCategoryStatus = ''
                }else{
                    productCategoryStatus = "|product.category.status:"+that.filter.category_status
                }
                

                this.$http.get("/price/product_price/export?export=1", {params:{
                    // embeds:'price_set_id,product.salability,product.category.status',
                    conditions: priceSetID + productSalability + productCategoryStatus
                    }}).then(response => {
                    axios({
                        url: response.data.file,
                        method: 'GET',
                        responseType: 'blob',
                    }).then((responses) => {
                        console.log('BISA DONG WOI')
                        var fileURL = window.URL.createObjectURL(new Blob([responses.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'ProductPrice'+ dateTime + that.filter.price_set_id +'.xlsx');
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    });
                   
                        console.log(response.data.file,'awww')

                    }).catch((err) => {
                        return Promise.reject({ Error: 'something went wrong', err});
                    });
            },
            downloadProductPrice(priceSetID, productSalability, productCategoryStatus) {
                
                let that = this
                if(that.filter.price_set_id === ''){
                    priceSetID = ''
                }else{
                    priceSetID = "price_set_id.e:"+that.filter.price_set_id
                }
                if(that.filter.product_salability === ''){
                    productSalability = ''
                }else{
                    productSalability = "|product.salability:"+that.filter.product_salability
                }
                if(that.filter.category_status === ''){
                    productCategoryStatus = ''
                }else{
                    productCategoryStatus = "|product.category.status:"+that.filter.category_status
                }
                
                this.$http.get("/price/product_price/template?export=1", {params:{
                    // embeds:'price_set_id,product.salability,product.category.status',
                    conditions: priceSetID + productSalability + productCategoryStatus
                    }}).then(response => {
                    axios({
                        url: response.data.file,
                        method: 'GET',
                        responseType: 'blob',
                    }).then((responses) => {
                        console.log('BISA DONG WOI')
                        var fileURL = window.URL.createObjectURL(new Blob([responses.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'ProductPrice'+ dateTime + that.filter.price_set_id +'.xlsx');
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    });
                   
                        console.log(response.data.file,'awww')

                    }).catch((err) => {
                        return Promise.reject({ Error: 'something went wrong', err});
                    });
            },
            downloadShadowPrice(priceSetID, productSalability, productTag){
                let that = this
                if(that.filter.price_set_id === ''){
                    priceSetID = ''
                }else{
                    priceSetID = "price_set_id.e:"+that.filter.price_set_id
                }
                if(that.filter.product_salability === ''){
                    productSalability = ''
                }else{
                    productSalability = "|product.salability"+that.filter.product_salability
                }
                if(that.filter.product_tag === ''){
                    productTag = ''
                }else{
                    productTag = "|product.tag_product:"+that.filter.product_tag
                }

                this.$http.get("/price/product_price/template/shadow?export=1", {params:{
                    // embeds:'price_set_id,product.salability,product.category.status',
                    conditions: priceSetID + productTag
                    }}).then(response => {
                    axios({
                        url: response.data.file,
                        method: 'GET',
                        responseType: 'blob',
                    }).then((responses) => {
                        console.log('BISA DONG WOI')
                        var fileURL = window.URL.createObjectURL(new Blob([responses.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'ShadowPrice'+ dateTime +'.xlsx');
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    });
                        console.log(response.data.file,'awww')

                    }).catch((err) => {
                        return Promise.reject({ Error: 'something went wrong', err});
                    });
            },
            
        },
        watch:{
                'priceSetFilterID': {
                    handler: function (val) {
                        let that = this
                        that.renderData(val,this.filter.price_set_filter_id)
                    },
                    deep: true
                },
                // 'productCategoryFilter': {
                //     handler: function (val) {
                //         let that = this
                //         that.renderData(val,this.filter.category_status_filter)
                //     },
                //     deep: true
                // },
                // 'productSalabilityFilter': {
                //     handler: function (val) {
                //         let that = this
                //         that.renderData(val,this.filter.product_salability_filter)
                //     },
                //     deep: true
                // },
            }
    }
</script>