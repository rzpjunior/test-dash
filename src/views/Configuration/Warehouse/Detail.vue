<template>
  <v-container>
    <div class="mb-16">
      <div class="px-6">
        <v-row class="px-3">
          <v-col class="fs25" style="color:#333333;">
            {{datas.name}}
          </v-col>
          <v-col class="d-flex justify-end align-end">
             <v-btn
              v-if="datas.status === 1"
              outlined
              rounded
              class="no-caps"
              color="#7CE363"
              style="width:104px"
            >
              Active
            </v-btn>
            <v-btn
              v-else
              outlined
              rounded
              class="no-caps"
              color="#fa9a4a"
              style="width:104px"
            >
              Archive
            </v-btn>
            <div class="mx-3"></div>
            <v-menu v-if="datas.status === 1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <v-list style="background: #E8EFF2">
                    <v-list-item  :to="{ name: 'WarehouseUpdate', params: { id: datas.id } }">
                        <v-list-item-content>
                            <v-list-item-title>Update</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <div class="px-md-4">
                      <v-divider></v-divider>
                    </div>
                    <v-list-item  :to="'/user/user/detail/'">
                        <v-list-item-content>
                            <v-list-item-title>Archive</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu v-else>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <v-list style="background: #E8EFF2">
                    <v-list-item  :to="{ name: 'WarehouseUpdate', params: { id: datas.id } }">
                        <v-list-item-content>
                            <v-list-item-title>Update</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <div class="px-md-4">
                      <v-divider></v-divider>
                    </div>
                    <v-list-item  :to="'/user/user/detail/'">
                        <v-list-item-content>
                            <v-list-item-title>Unarchive</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="row mt-6 ml-6 mr-2 second-color">
          <v-col cols="6" class="pr-13">
            <DetailRow :name="'Code'" :value="datas.code" />
            <DetailRow :name="'Address'" :value="datas.street_address" />
            <DetailRow :name="'PIC Phone Number'" :value="datas.phone_number" />
          </v-col>
          <v-col cols="6" class="pl-13">
            <DetailRow :name="'Area'" :value="datas.area.name" />
            <DetailRow :name="'PIC Name'" :value="datas.pic_name" />
            <DetailRow :name="'PIC Alternative Phone Number'" :value="datas.alt_phone_number" />
          </v-col>
          <v-col cols="12" style="margin-top:-25px;">
            <DetailRow :name="'Notes'" :value="datas.notes" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
              <div class="title-table">
                  <label class="label-title">
                      Warehouse Coverage
                  </label>
              </div>
              <v-data-table
                  :mobile-breakpoint="0"
                  :headers="table.fields"
                  :items="items"
                  :items-per-page="10"
              >
                  <td></td>
                  <td></td>
                  <td></td>
              </v-data-table>
            </v-col>
          </v-row>
      </div>
    </div>
      
      <v-divider class="my-md-2"/>
      <div style="padding: 20px;" class="row d-flex align-end justify-end">
        <v-btn
          rounded
          elevation="0"
          class="no-caps px-7"
          :to="'/configuration/warehouse'"
          style="background: #E6E9ED;color:#768F9C; height: 45px;"
        > 
          Back
        </v-btn>
      </div>
  </v-container>
</template>

<script>
    export default {
        name: "warehouse",
        data() {
            return {
                datas:{},
                area:'',
                loading:true,
                table: {
                    fields: [
                        {
                            text:'No',
                            sortable: false,
                        },
                        {
                            text:'Province',
                            sortable: false,
                        },
                        {
                            text:'City',
                            sortable: false
                        },
                        {
                            text:'District',
                            sortable: false
                        },
                        {
                            text:'Subdistrict',
                            sortable: false
                        },
                        {
                            text:'Postal Code',
                            sortable: false
                        },
                    ],
                },
              }
        },
        methods:{
            renderData(){
                this.$http.get("/config/warehouse/"+ this.$route.params.id).then(response => {
                    this.area = response.data.data.area
                    this.datas = response.data.data
                });
                this.loading= false
            },
            back(){
                this.$router.push('/configuration/warehouse');
            },
        },
        created() {
            this.renderData()
        },
    }
</script>