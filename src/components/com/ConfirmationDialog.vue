<template>
    <v-dialog
        v-model="sendData.model"
        persistent
        max-width="470px"
    >
        <v-card class="Heiti" style="border-radius: 15px;">
            <v-card-title>
            <span class="fs25 second-color mt-1">{{sendData.title}}</span>
            </v-card-title>
            <v-card-text>
                <span class="fs16 mt-1">{{sendData.text}}</span>
                <pre>{{sendData.data}}</pre>
            </v-card-text>
            <v-card-actions class="pb-4">
            <v-spacer></v-spacer>
                <v-btn 
                    rounded 
                    elevation="0" 
                    class="no-caps px-7" 
                    @click="sendData.model = false"
                    style="background: #E6E9ED;color:#768F9C;height:45px"
                >No</v-btn>
                <v-btn 
                    class="px-7 ml-2 no-caps white--text" 
                    @click="actions()" 
                    elevation="0"
                    rounded
                    style="background: #768f9c; height:45px"
                >Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import Vue from 'vue'
export default {
    name : "ConfirmationDialog",
    props: {
        sendData:{
            // type: Object,
        },
    },
    methods: {
        successToast() {
            let msg = 'Data has been saved successfully'
            if (this.sendData.statusMsg) {
                msg = this.sendData.statusMsg
            }
            Vue.$toast.open({
                position: 'top-right',
                message: msg,
                type: 'success',
            });
        },
        errorToast(data) {
            for (var key in data) {
                Vue.$toast.open({
                    position: 'top-right',
                    message: data[key],
                    type: 'error',
                });
            }
        },
        errorServerToast() {
            Vue.$toast.open({
                position: 'top-right',
                message: 'Internal Server Error',
                type: 'error',
            });
        },
        actions(){
            let self = this
            if (this.sendData.post) {
                this.$http.post(this.sendData.urlApi,this.sendData.data)
                .then(response => {
                    let url = this.sendData.nextPage
                    if (url.includes(':id')) {
                        let push = url.replace(":id", response.data.data.id)
                        this.$router.push(push)
                    } else {
                        this.$router.push(url)
                    }
                    if (this.sendData.image) {
                        self.$root.$emit('event_img', true)
                    }
                    this.successToast()
                })
                .catch(e => {
                    self.$root.$emit('event_error', e.errors)
                    // this.errorToast(e.errors)
                    this.sendData.model = false
                });
            } else if (this.sendData.status) {
                this.$http.put(this.sendData.urlApi,this.sendData.data)
                .then(response => {
                    self.$root.$emit('event_success', true)
                    this.sendData.model = false
                    this.successToast()
                })
                .catch(e => {
                    this.errorServerToast()
                    this.sendData.model = false
                });
            } else {
                this.$http.put(this.sendData.urlApi,this.sendData.data)
                .then(response => {
                    this.$router.push(this.sendData.nextPage)
                    this.successToast()
                    if (this.sendData.image) {
                        self.$root.$emit('event_img', true)
                    }
                })
                .catch(e => {
                    self.$root.$emit('event_error', e.errors)
                    // this.errorToast(e.errors)
                    console.log("ini e", e)
                    this.sendData.model = false
                });
            }
        },
    },
}
</script>
