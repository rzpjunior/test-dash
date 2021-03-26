<template>
    <v-container class="px-12">
        <v-row>
            <v-col>
                <v-text-field
                    name="business_type"
                    v-model="business_type_str"
                    required 
                    disabled
                    outlined
                    class="rounded-form"
                    label="Business Type *"
                    :error="error.business_type_id"
                ></v-text-field>
                <v-text-field
                    name="customer_group"
                    v-model="customer_group_str"
                    required 
                    disabled
                    class="rounded-form"
                    outlined
                    label="Customer Group *"
                    :error="error.customer_group_id"
                ></v-text-field>
            </v-col>
            <v-col>
                <SelectArchetype
                    name="archetype_name"
                    v-model="archetype"
                    @selected="archetypeSelected"
                    required
                    :customer_group="2"
                    :aux_data="2"
                    :statusArch="1"
                    :archetype="archetype"
                    :error="error.archetype_id"
                ></SelectArchetype>
            </v-col>
        </v-row>
        <v-row style="border-top: 1px solid #C8DDC8;">
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
                    >Save</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
        <ConfirmationDialog :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: 'ConvertArchetype',
        data () {
            return {
                form : {
                    prev_archetype : '',
                    archetype_id : ''
                },
                archetype : null,
                error : {},
                ConfirmData : {},
                business_type_str : '',
                customer_group_str : '',
            }
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Convert Archetype",
                    text : "Are you sure want to Convert this archetype?",
                    urlApi : "/customer/agent/archetype/"+this.$route.params.id,
                    nextPage : "/customer/agent/detail/"+this.$route.params.id,
                    data : this.form
                }
            },
            renderData(){
                this.$http.get("/customer/agent/"+this.$route.params.id).then(response => {
                    this.archetypeSelected(response.data.data[0].archetype)
                    this.form.prev_archetype = response.data.data[0].archetype.name
                });
            },
            archetypeSelected(d) {
                this.customer_group_str = ''
                this.business_type_str = ''
                this.archetype = null;
                this.form.archetype_id = '';
                if (d) {
                    this.archetype = d;
                    this.form.archetype_id = d.id
                    this.customer_group_str = 'Agent'
                    this.form.customer_group = 2
                    this.form.business_type = d.business_type.id
                    this.business_type_str = d.business_type.name
                }
            },
        },
        created(){
            this.renderData()
        },
    }
</script>
