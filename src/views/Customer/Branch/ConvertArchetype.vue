<template>
    <v-form>
        <v-container>
            <v-subheader class="title"><v-icon large color="accent">mdi-label</v-icon> CONVERT ARCHETYPE
            </v-subheader>
            <v-card elevation="5" class="pt-2">
                <form>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <selectBusinessType @selected="businesstypeSelected" :business_type="business_type" required disabled class="mb-0"></selectBusinessType>
                            <SelectArchetype @selected="archetypeSelected" :archetype="archetype" :business_type_id="form.business_type_id" :aux_data="1" required :error="error.archetype_id" class="mb-0"></SelectArchetype>
                        </v-col>
                    </v-row>

                    <div class="d-flex justify-end pa-5">
                        <v-btn class="neutral" @click="cancel">cancel</v-btn>
                        <v-btn class="secondary ml-2" @click="submit">submit</v-btn>
                    </div>
                </form>
            </v-card>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data () {
            return {
                permission:[],
                archetype:null,
                business_type:null,
                form:{
                    archetype_id: '',
                    business_type_id: '',
                },
                error:{},
            }
        },
        methods: {
            submit() {
                console.log(
                    this.form, 'Isi DD'
                )
                this.$http.put('/customer/branch/convert/archetype/' + this.$route.params.id,
                    {
                        archetype_id: this.form.archetype_id,
                    }).then(response => {
                    console.log(response, 'Success')
                    this.$router.push('/customer/branch/detail/'+this.$route.params.id);
                })
                    .catch(e => {
                        console.log(e)
                        this.error = e.errors
                    });
            },
            cancel() {
                this.$router.push('/customer/branch/detail/'+this.$route.params.id);
            },
            permissionChecked(d) {
                if (d !== '') {
                    this.form.permission = d
                }
            },
            archetypeSelected(d) {
                this.archetype = null;
                this.form.archetype_id = '';
                if (d !== '' && d !== undefined) {
                    this.archetype = d;
                    this.form.archetype_id = d.id
                }
            },
            businesstypeSelected(d) {
                this.business_type = null;
                this.form.business_type_id = '';
                if (d !== '' && d !== undefined) {
                    this.business_type = d;
                    this.form.business_type_id = d.id
                }
            },
            renderData() {
                this.$http.get("/customer/branch/" + this.$route.params.id)
                    .then(response => {
                        console.log(response.data.data, "yhyhyhyh")
                        this.archetypeSelected(response.data.data.archetype)
                        this.businesstypeSelected(response.data.data.archetype.business_type_id)
                    });
            },
        },
        created() {
            this.renderData()
        },
    }
</script>
