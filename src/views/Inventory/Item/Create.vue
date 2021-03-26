<template>
    <v-form v-model="valid">
        <v-container>
            <v-card >
                <v-subheader class="title"> <v-icon large color="accent">mdi-label</v-icon>CREATE ITEM
                </v-subheader>
                <form>
                    <v-row>
                    <v-col cols="12" md="6">
                        <v-card-title>GROUP</v-card-title>
                        <v-divider></v-divider>
                        <SelectGroup v-model="group"  @selected="groupSelected" :clear="clear" :disabled="create_group"></SelectGroup>
                        <v-checkbox
                                v-model="create_group"
                                :label="`Create New Group`"
                                class="pl-4 pt-0 pb-0 red--text font-italic"
                                style="margin-top: -5%"
                        ></v-checkbox>

                        <v-text-field
                                v-if="create_group"
                                v-model="form.group_name"
                                :rules="nameRules"
                                :counter="15"
                                label="Group Name"
                                required
                                outlined
                                class="pl-4 pr-4"
                        ></v-text-field>
                        <SelectItemUom v-if="create_group" @selected="uomSelected" class="mb-0"></SelectItemUom>
                        <v-textarea
                                v-if="create_group"
                                v-model="form.note_group"
                                :counter="255"
                                outlined
                                class="pl-4 pt-0 pr-4 mt-0"
                        >
                            <template v-slot:label>
                                <div>
                                    Note
                                </div>
                            </template>
                        </v-textarea>
                        <!--<input type="file" @change="onFileChange" />-->
                        <!--<v-slide-x-transition>-->
                        <!--<v-img v-if="url" :src="url"  aspect-ratio="2"></v-img>-->
                        <!--</v-slide-x-transition>-->

                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card-title>ITEM</v-card-title>

                        <v-divider></v-divider>
                        <SelectCategory :disabled="!create_group" required v-model="category" @selected="categorySelected" :clear="clear" :category="category" :label="'Category*'"></SelectCategory>
                        <v-text-field
                                v-model="form.item_name"
                                :rules="nameRules"
                                :counter="15"
                                :error-messages="error.item_name"
                                label="Item Name*"
                                required
                                outlined
                                class="pl-4 pr-4"
                        ></v-text-field>
                        <SelectItemUom @selected="uomItemSelected" :item_uom="item_uom" :clear="clear" disabled="disabled"  class="mb-0"></SelectItemUom>

                        <!--<v-text-field-->
                                <!--v-model="email"-->
                                <!--:rules="emailRules"-->
                                <!--:counter="10"-->
                                <!--label="Email name"-->
                                <!--required-->
                        <!--&gt;</v-text-field>-->
                        <v-text-field
                                v-model="form.item_weight" v-money="money"
                                label="Item Weight"
                                outlined
                                class="pl-4 pr-4"
                                required
                        ></v-text-field>
                        <v-textarea
                                v-model="form.note"
                                :counter="255"
                                outlined
                                class="pl-4 pt-0 pr-4 mt-0"
                        >
                            <template v-slot:label>
                                <div>
                                    Note
                                </div>
                            </template>
                        </v-textarea>
                        <upload-button title="Browse" :selectedCallback="fileSelectedFunc">
                        </upload-button>
                    </v-col>
                    </v-row>
                    <dir class="d-flex justify-end pa-5">
                        <v-btn class="neutral" @click="submit">cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </dir>
                </form>
            </v-card>

        </v-container>
    </v-form>
</template>

<script>
    AWS.config.region = 'ap-southeast-1'; // 1. Enter your region

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-southeast-1:fbf7d1ed-ee66-4919-9203-6345c06892fb' // 2. Enter your identity pool
    });

    AWS.config.credentials.get(function(err) {
        if (err) alert(err);
        console.log(AWS.config.credentials);
    });

    var bucketName = 'edenfarm-courier-ktp'; // Enter your bucket name
    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });


    import {VMoney} from 'v-money'
    import UploadButton from "../../../components/UploadButton";
    export default {
        directives: {money: VMoney},
        components: {UploadButton},
        data: () => ({
            name: "InventoryItemCreate",
            money: {
                decimal: '.',
                thousands: ',',
                precision: 2,
                masked: true
            },
            error:{},
            valid: false,
            disabled:false,
            clear:false,
            group:null,
            uom:null,
            item_uom:null,
            item_weight:0,
            category:null,
            create_group:false,
            form:{
                category_type_id: '',
                item_uom_id: '',
                item_name: '',
                image: '',
                note: '',
                // Group
                group_name:'',
                uom_id:'',
                group_id:'',
                note_group:'',
                item_weight:0
            },
            url: null,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 15 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }),
        methods:{
            submit () {
                console.log(
                    this.form,'Isi DD'
                )
                this.$http.post('/inventory/item',
                    {item_name :this.form.item_name,
                     category_type_id: this.form.category_type_id,
                     item_uom_id: this.form.item_uom_id,
                     image: this.form.image,
                     note: this.form.note,
                        // Group
                     group_name:this.form.group_name,
                     uom_id:this.form.uom_id,
                     group_id:this.form.group_id,
                     note_group:this.form.note_group,
                     create_group:this.create_group ? 1 : 0,
                     item_weight:parseFloat(this.form.item_weight)
                    }).then(response => {
                            console.log(response,'ewwww')
                            })
                    .catch(e => {
                        console.log(e)
                        this.error = e.errors
                    });
            },
            groupSelected(d) {
                this.group = null;
                this.form.group_id = '';
                if (d !== '') {
                        this.group = d;
                        this.form.group_id = d.id
                    this.uomItemSelected(d.item_uom)
                    let id = d.category_type_id*65536
                    this.$http.get("/inventory/category-type/"+ id).then(response => {
                     this.categorySelected(response.data.data)

                    });
                }
            },
            uomSelected(d) {
                this.uom = null;
                this.form.uom_id = '';
                if (d !== '') {
                    this.uom = d;
                    this.form.uom_id = d.id
                    this.uomItemSelected(d)
                }
            },
            uomItemSelected(d) {
                this.item_uom = null;
                this.form.item_uom_id = '';
                if (d !== '') {
                    this.item_uom = d;
                    this.form.item_uom_id = d.id
                }
            },
            categorySelected(d) {
                this.category = null;
                this.form.category_type_id = '';
                if (d !== '') {
                    this.category = d;
                    this.form.category_type_id = d.id
                }
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            },
            Preview_image(e)
            {
                if (e)
                {
                    $('#image_id').attr('src',URL.createObjectURL(e) ); // jQuery selector
                }
            },
            fileSelectedFunc(file){
                var objKey = 'ktp/' + 'testing';
                var params = {
                    Key: objKey,
                    ContentType: file.type,
                    Body: file,
                    ACL: 'public-read'
                };
                bucket.putObject(params, function(err, data) {
                    if (err) {
                        results.innerHTML = 'ERROR: ' + err;
                    } else {
                        var s3url = bucket.getSignedUrl('getObject', {Key: params.Key});
                        console.log(s3url,'timi')
                    }
                });
                // console.log((file))
            }

        },
        watch: {
            create_group: {
                handler: function (val) {
                    if(this.create_group){
                        this.clear= true
                    }else{
                        this.clear = false
                    }
                },
                deep: true
            },
        },
    }
</script>
<style scoped>
    .red--text /deep/ label {
        color: red;
    }
</style>
