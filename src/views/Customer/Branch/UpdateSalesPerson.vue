<template>
    <v-form>
        <v-container>
            <v-subheader class="title"><v-icon large color="accent">mdi-label</v-icon> UPDATE SALES PERSON
            </v-subheader>
            <v-card elevation="5" class="pt-2">
                <form>
                    <v-row>
                        <v-col  cols="6" sm="6" md="6">
                            <SelectSalesPerson @selected="salespersonSelected" :sales_person="salesperson" required :error="error.salesperson_id" class="mb-0"></SelectSalesPerson>
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
                salesperson:null,
                form:{
                    salesperson_id: '',
                },
                error:{},
            }
        },
        methods: {
            submit() {
                console.log(
                    this.form, 'Isi DD'
                )
                this.$http.put('/customer/branch/sales/person/' + this.$route.params.id,
                    {
                        salesperson_id: this.form.salesperson_id,
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
            salespersonSelected(d) {
                this.salesperson = null;
                this.form.salesperson_id = '';
                if (d !== '' && d !== undefined) {
                    this.salesperson = d;
                    this.form.salesperson_id = d.id
                }
            },
            renderData() {
                this.$http.get("/customer/branch/" + this.$route.params.id)
                    .then(response => {
                        console.log(response.data.data, "yhyhyhyh")
                        this.salespersonSelected(response.data.data.salesperson)
                    });
            },
        },
        created() {
            this.renderData()
        },
    }
</script>
