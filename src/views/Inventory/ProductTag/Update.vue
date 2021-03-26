<template>
    <v-container>
        <div>
            <div class="px-6 pt-5">
                <v-row>
                    <v-col cols="12" md="6" style="text;margin-top:-20px">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-text-field
                                    name="name"
                                    v-model="form.name"
                                    required
                                    outlined
                                    height="70"
                                    class="rounded-form"
                                    maxlength="30"
                                    :error-messages="error.name"
                                    v-on="{ ...tooltip}"
                                >
                                    <template v-slot:label>
                                        Name <span style="color:red">*</span>
                                    </template>
                                </v-text-field>
                            </template>
                            <span>Name will be shown as category name in mobile application</span>
                        </v-tooltip>
                    </v-col>
                     <v-col cols="12" md="6" style="margin-top:-20px">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip}">
                                    <v-text-field
                                        name="area"
                                        v-model="areas"
                                        outlined
                                        disabled
                                        height="70"
                                        class="rounded-form"
                                        v-on="{ ...tooltip}"
                                    >
                                        <template v-slot:label>
                                            Area *
                                        </template>
                                    </v-text-field>
                                </div>
                            </template>
                            <span>Tag will be shown in selected area</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" style="margin-top:-20px">
                        <v-textarea
                            name="note"
                            v-model="form.note"
                            :counter="100"
                            maxlength="100"
                            outlined
                            label="Note"
                            class="rounded-form"
                        />
                    </v-col>
                    <v-col cols="12" md="3" style="margin-top:-20px">
                        <v-col style="margin-top:-20px">Image <span style="color:red">*</span></v-col>
                        <v-file-input id="fileUpload" type="file" accept="image/png, image/jpeg, image/bmp" v-model="image" style="display:none;" @change="verifyFileUpload()"/>
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip}">
                                    <!-- Upload File png-->
                                    <div 
                                        class="rounded-form image-box-error pt-2"
                                        v-if="image == null && imageError !== ''"
                                        @click="chooseFiles()"
                                        style="color:#768F9C;"
                                    >
                                        <span style="font-size:80%;" class="ml-3">Min Resolution : 250 x 250 pixels</span>
                                        <v-flex class="hello-text mt-5" style="text-transform: capitalize;">
                                            <v-icon style="font-size:80px;">mdi-camera</v-icon>
                                            <span><b>Upload Image</b></span>
                                            <span style="font-size:80%;">Max : 300 Kb</span>
                                        </v-flex>
                                    </div>
                                    <div 
                                        class="rounded-form image-box pt-2"
                                        v-if="image == null && imageError == ''"
                                        @click="chooseFiles()"
                                        style="color:#768F9C;"
                                    >
                                        <span style="font-size:80%;" class="ml-3">Min Resolution : 250 x 250 pixels</span>
                                        <v-flex class="hello-text mt-5" style="text-transform: capitalize;">
                                            <v-icon style="font-size:80px;">mdi-camera</v-icon>
                                            <span><b>Upload Image</b></span>
                                            <span style="font-size:80%;">Max : 300 Kb</span>
                                        </v-flex>
                                    </div>
                                    <div v-if="image !== null" class="rounded-form image-box" style="position:relative;">
                                        <v-btn
                                            style="position:absolute;"
                                            class="btn-remove"
                                            fab
                                            x-small
                                            plain
                                            @click="onRemove()"
                                        >
                                            <v-icon dark>
                                                mdi-close
                                            </v-icon>
                                        </v-btn>
                                        <v-img 
                                            v-if="update"
                                            :src="form.image"
                                            class="rounded-form" 
                                            style="width:299px;height:198px;"
                                        />
                                        <v-img 
                                            v-else
                                            :src="url"
                                            class="rounded-form" 
                                            style="width:299px;height:198px;"
                                        />
                                    </div>
                                    <div class="mt-1 ml-3" style="color:red;">{{imageError}}</div>
                                    <!-- <div class="mt-3 ml-3">{{form.image}}</div> -->
                                    <!-- Upload File png-->
                                </div>
                            </template>
                            <span>Image will be shown as category icon in our mobile application</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <hr class="hr-solid mt-16">
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
    AWS.config.region = 'ap-southeast-1'; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-southeast-1:fbf7d1ed-ee66-4919-9203-6345c06892fb' 
    });
    AWS.config.credentials.get(function(err) {
        if (err) alert(err);
        console.log(AWS.config.credentials);
    });
    var bucketName = 'edenfarm-courier-ktp';
    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName   
        }
    });
    export default {
        data () {
            return {
                ConfirmData:[],
                image: null,
                imageError: '',
                dialog : false,
                currentTime: this.$moment().format('YYYY-MM-DD_HH-mm-ss'),
                nameFile:'',
                areas:'',
                items:[],
                update:'',
                form:{
                    name: '',
                    area: [],
                    note: '',
                    image:'',
                },
                error:{},
            }
        },
        methods:{
            renderData(){
                this.$http.get("/inventory/tag_product/"+this.$route.params.id).then(response => {
                    this.items = response.data.data
                    this.form.name = response.data.data.name
                    this.form.note = response.data.data.note
                    this.image = response.data.data.image_url
                    this.form.image = response.data.data.image_url
                    this.areas = response.data.data.area
                    this.update = true
                });
            },
            chooseFiles() {
                if(this.form.name){
                    document.getElementById("fileUpload").click()
                }else{
                    this.imageError=""
                    this.imageError="Please input name before upload image"
                }
            },
            verifyFileUpload(){
                let that = this
                var file = document.getElementById("fileUpload");
                if (file && file.files.length > 0) 
                {
                    var img = new Image();
                    var resp = file.files[0]
                    img.src = window.URL.createObjectURL( file.files[0] );
                    img.onload = function(){
                        var width = this.naturalWidth,
                            height = this.naturalHeight;
                        if(width < 250 && height < 250){
                            that.imageError = "Min resolution: 250 x 250 pixels";
                            that.image = null;
                        }else{
                            that.imageError = "";
                            const isLt2M = resp.size / 1024 / 1024 < 0.3;
                            if (!isLt2M) {
                                that.image = null;
                                that.imageError = "Max file size: 300kb";
                            }else {
                                // Upload to AWS S3
                                that.imageError = "";
                                that.nameFile = (that.form.name + "-" + that.currentTime).replace(/ /g, "");
                                var objKey = 'ktp/' + that.nameFile +'.png';
                                var params = {
                                    Key: objKey,
                                    ContentType: resp.type,
                                    Body: resp,
                                    ACL: 'public-read'
                                };
                                bucket.putObject(params, function(err, data) {
                                    console.log(params);
                                    if (err) {
                                        results.innerHTML = 'ERROR: ' + err;
                                        console.log(err);
                                    } else {
                                        let url = (bucket.getSignedUrl('getObject', {Key: params.Key}));
                                        that.form.image=url.substring(0, url.lastIndexOf('?'));
                                        console.log("url = ",that.form.image)
                                    }
                                });
                                // Upload to AWS S3
                            }
                        }
                    };
                }
            },
            onRemove() {
                let that = this
                console.log(that.nameFile)
                this.error = '';
                bucket.deleteObject({
                    Key: 'ktp/' + that.nameFile + '.png'
                },function (err,data){
                     if (err) {
                        results.innerHTML = 'ERROR: ' + err;
                        console.log(err);
                    } else {
                        console.log("Success Remove Image");
                        localStorage.removeItem('url');
                        that.image = null;
                        that.form.image = null;
                    }
                })
            },
            confirmButton() {
                console.log(
                    this.form,'Isi DD'
                )
                this.ConfirmData = {
                    model : true,
                    title : "Update Product Tag",
                    text : "Are you sure want to Update this product Tag?",
                    urlApi : "/inventory/tag_product/"+this.$route.params.id,
                    nextPage : "/inventory/product-tag",
                    data : this.form
                }
            }
        },
        created () {
            this.renderData()
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
                self.imageError = err.image;
            });
        },
        computed: {
            url() {
            if (!this.image) return;
                return URL.createObjectURL(this.image);
            }
        },
        watch: {
            'form.name': {
                handler: function (val) {
                    let that = this
                    that.imageError = "";
                },
                deep: true
            },
        },
    }
</script>
<style scoped>
    .hello-text {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .image-box {
        width:300px;
        height:200px;
        border-style:solid;
        border-color:gray;
        border-width:1px;
    }
    .image-box-error {
        width:300px;
        height:200px;
        border-style:solid;
        border-color:red;
        border-width:2px;
    }
    .btn-remove {
        z-index:1;
        background:#FC7079;
        color:white;
        right:10px;
        top:10px
    }
</style>
