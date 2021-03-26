<template>
 <v-container>  
   <div class="mb-16">
     <div class="px-6">
       <v-row class="px-3">
         <v-col class="fs25" style="color:#333333;">
           {{ supplierDetail.name }}
         </v-col>
         <v-col class="d-flex justify-end align-end">
            <v-btn
              v-if="supplierDetail.reg_status === 1"
              outlined
              rounded
              class="no-caps"
              color="#7CE363"
              style="width:104px"
            >
              New
            </v-btn>
            <v-btn
              v-else
              outlined
              rounded
              class="no-caps"
              color="#fa9a4a"
              style="width:104px"
            >
              Registered
            </v-btn>
            <div class="mx-3"></div>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <v-list style="background: #E8EFF2">
                    <v-list-item  :to="{ name: 'SupplierCreate' }">
                        <v-list-item-content>
                            <v-list-item-title>Register</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <div class="px-md-4">
                      <v-divider></v-divider>
                    </div>
                    <v-list-item  @click="decline(supplierDetail.id)">
                        <v-list-item-content>
                            <v-list-item-title>Decline</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
         </v-col>
       </v-row>
       <v-row class="row mt-6 ml-6 mr-2 second-color">
         <v-col cols="6" class="pr-13">
           <DetailRow :name="'Phone Number'" :value="supplierDetail.phone_number" />
           <DetailRow :name="'Comodity'" :value="supplierDetail.commodity" />
           <DetailRow :name="'Subdistrict'" :value="supplierDetail.sub_district.name" />
           <DetailRow :name="'District'" :value="supplierDetail.sub_district.district.name" />
           <DetailRow :name="'Province'" :value="supplierDetail.sub_district.district.city.province.name" />
           <DetailRow :name="'PIC Phone Number'" :value="supplierDetail.pic_phone_number" />
         </v-col>
         <v-col cols="6" class="pl-13">
           <DetailRow :name="'Alternative Phone Number'" :value="supplierDetail.alt_phone_number" />
           <DetailRow :name="'Address'" :value="supplierDetail.street_address" />
           <DetailRow :name="'Postal Code'" :value="supplierDetail.sub_district.postal_code" />
           <DetailRow :name="'City'" :value="supplierDetail.sub_district.district.city.name" />
           <DetailRow :name="'PIC Name'" :value="supplierDetail.pic_name" />
           <DetailRow :name="'Best Time To Call'" :value="supplierDetail.time_consent === 1 ? 'Morning' : supplierDetail.time_consent === 2 ?  'Afternoon' : 'Night'" />
         </v-col>
       </v-row>
     </div>
   </div>
      
        <div style="padding: 20px;" class="row d-flex align-end justify-end">
          <v-btn
            rounded
            elevation="0"
            class="no-caps px-7"
            :to="'/customer/prospect-customer'"
            style="background: #E6E9ED; color: #768F9C; height: 45px;"
          >
            Back
          </v-btn>
        </div>
         <ModalDirection v-model="modalOpen" :sendData=confirmation></ModalDirection>
    </v-container>
</template>

<script>
    import ModalDirection from "../../../components/PopupDialog";
    export default {
        name: "ProspectSupplierDetail",
        components: {
            ModalDirection
        },
        data() {
            return {
                modalOpen: false,
                post: null,
                supplierDetail:{},
                loading:true,
                confirmation:{
                    valueName: 'ProspectiveSupplier',
                    status:'',
                    urlPath:'',
                    parentPath:'/purchase/prospective/supplier',
                }
            }
        },
        methods:{
            renderData(){
                this.$http.get("/purchase/prospect/supplier/"+ this.$route.params.id).then(response => {
                    this.supplierDetail = response.data.data
                    this.loading= false
                });
            },
            register(id, address, name, phone_number, pic_name, pic_phone_number, sub_district_id){
                this.confirmation.action = 'Register'
                this.confirmation.status = '4'
                this.confirmation.urlPath ='/purchase/prospect/supplier/register/'+id;

                this.confirmation.address = address
                this.confirmation.name = name
                this.confirmation.phone_number = phone_number;
                this.confirmation.pic_name = pic_name;
                this.confirmation.pic_phone_number = pic_phone_number;
                this.confirmation.sub_district_id = sub_district_id;

                this.modalOpen = !this.modalOpen;
            },
            decline(id){
                this.confirmation.action= 'Decline'
                this.confirmation.status = '5';
                this.confirmation.urlPath='/purchase/prospect/supplier/decline/'+id;
                this.modalOpen = !this.modalOpen;
            },
        },
        mounted() {
            this.renderData()
        },
    }
</script>

<style scoped>

</style>