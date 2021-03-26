<template>
    <v-container >
      <div class="mb-16">
        <div class="px-6">
          <v-row class="px-3">
              <v-col class="fs25" style="color:#333333;">
                  {{ item.name }}
              </v-col>
              <v-col class="d-flex justify-end align-end">
                <v-btn
                    v-if="item.reg_status === 1"
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
                          <v-list-item  @click="register=true">
                              <v-list-item-content>
                                  <v-list-item-title>Register</v-list-item-title>
                              </v-list-item-content>
                          </v-list-item>
                          <div class="px-md-4">
                            <v-divider></v-divider>
                          </div>
                          <v-list-item  :to="'/user/user/detail/'">
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
                  <DetailRow  :name="'Archetype'" :value="item.archetype.name"/>
                  <DetailRow  :name="'Phone Number'" :value="item.phone_number"/>
              </v-col>
              <v-col cols="6" class="pl-13">
                  <DetailRow  :name="'PIC Name'" :value="item.pic_name"/>
                  <DetailRow  :name="'Best Time To Call'" :value="item.time_consent === 1 ? 'Morning' : item.time_consent === 2 ?  'Afternoon' : 'Night'"/>
              </v-col>
              <v-col cols="12" style="margin-top:-25px;">
                  <DetailRow  :name="'Address'" :value="item.street_address"/>
              </v-col>
              <v-col cols="6" class="pr-13" style="margin-top:-25px;">
                  <DetailRow  :name="'Subdistrict'" :value="item.sub_district.name"/>
                  <DetailRow  :name="'District'" :value="item.sub_district.district.name"/>
                  <DetailRow  :name="'Province'" :value="item.sub_district.district.city.province.name"/>
                  <DetailRow  :name="'Reference Info'" :value="item.reference_info"/>
              </v-col>
              <v-col cols="6" class="pl-13" style="margin-top:-25px;">
                  <DetailRow  :name="'Postal Code'" :value="item.sub_district.postal_code"/>
                  <DetailRow  :name="'City'" :value="item.sub_district.district.city.name"/>
                  <DetailRow  :name="'Area'" :value="item.sub_district.area.name"/>
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
      <v-dialog
        v-model="register"
        persistent
         max-width="402px"
      >
        <v-card class="Heiti" style="border-radius: 15px;">
            <v-card-title>
                <span class="fs25 second-color pt-4" style="margin: auto;">Register Prospective Customer</span>
            </v-card-title>
            <v-card-text>
                <v-img width="235" style="margin: auto;" src="/img/register-customer.png" alt="" />
                <SelectArchetype
                    name="archetype_name"
                    v-model="archetype"
                    @selected="archetypeSelected"
                    required
                    class="pt-6"
                ></SelectArchetype>
            </v-card-text>
            <v-card-actions class="d-flex justify-end pb-4">
                <v-btn 
                    rounded 
                    elevation="0" 
                    class="no-caps px-7" 
                    @click="register = false"
                    style="background: #E6E9ED;color:#768F9C;height:45px"
                >Cancel</v-btn>
                <v-btn 
                    v-if="!archetype"
                    disabled
                    class="px-7 ml-2 no-caps white--text" 
                    elevation="0"
                    rounded
                    style="background: #768f9c; height:45px"
                >Next</v-btn>
                <v-btn 
                    v-if="archetype"
                    class="px-7 ml-2 no-caps white--text" 
                    :to="{ name: 'BranchCreate', params: { id: archetype_id} }"
                    elevation="0"
                    rounded
                    style="background: #768f9c; height:45px"
                >Next</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "ProspectCustomerDetail",
        data () {
            return {
                register: false,
                loading:true,
                archetype: '',
                archetype_id:'',
                item:{
                    sub_district:{
                        district:{
                            city:{

                            }},
                        area:{},

                    }
                },
            }
        },
        methods: {
            async renderData(){
                await this.$http.get("/customer/prospect_customer/" + this.$route.params.id).then(response => {
                    this.item = response.data.data;
                    this.loading  = false
                });
            },

            archetypeSelected(d) {
              let that = this
                that.archetype = null;
                that.archetype_id = '';
                if (d) {
                    that.archetype = d;
                    that.archetype_id = d.id
                }
            },

        },
        created() {
            this.renderData()
        },

    }
</script>
