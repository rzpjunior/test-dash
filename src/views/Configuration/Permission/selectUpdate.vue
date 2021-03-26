<template>
    <v-card-text>
        <v-treeview
            selectable
            name="permission_upd"
            :items="permission"
            selection-type="independent"
            @input="selected"
            selected-color="#50AE55"
            v-model="selectedItem"
            open-on-click
            open-all
        ></v-treeview>
    </v-card-text>
</template>
<script>
    export default {
        name: 'SelectUpdatePermission',
        data() {
            return {
                allParentNodes:false,
                permission: [],
                selectedItem: [],
                // permission: [
                //     {
                //         id: 1,
                //         name: 'Applications :',
                //         children: [
                //             { id: 2, name: 'Calendar : app' },
                //             { id: 3, name: 'Chrome : app' },
                //             { id: 4, name: 'Webstorm : app' },
                //         ],
                //     },
                // ],
            };
        },
        props: ['idPermission','disabled','clear'],
        methods: {
            selected(event) {
                this.$emit('selected', event);
            },
        },
        created() {
            this.$http.get('/permission',
            ).then(response => {
                let that = this
                response.data.data.forEach((value, index) => {
                    let parent = {id:value.id, name:value.name,children:[]} // Mengambil Parent
                    that.permission.push(parent)
                    value.child.forEach((child, idx) => {
                        let children = {id:child.id, name:child.name,children:[]} // Mengambil children
                        that.permission[index].children.push(children)
                        child.grand_child.forEach((gc, i) => {
                            let grand_children = {id:gc.id, name:gc.name}  // Mengambil grand children
                            that.permission[index].children[idx].children.push(grand_children)
                        });
                    });
                });

                this.idPermission.forEach((value, index) => {

                    this.selectedItem.push(value)
                });
            })
            .catch(e => {
                console.log(e)
                this.error = e.errors
            });
        },

        watch: {
            search: {
                handler: function (val) {
                    if(val && val.length > 1){
                        this.isLoading = true
                        this.remoteSearch(val)
                    }
                },
                deep: true
            },
            clear: {
                handler: function (val) { // ini untuk clear data
                    this.groups = null
                },
                deep: true
            },
            idPermission:{
                handler: function (val) { // watch perubahan saat checkbox di click
                    if(val.length > 0){
                       val.forEach((value, index) => {
                           this.selectedItem.push(value)
                       });
                   }else{
                       this.selectedItem = []
                   }
                },
                deep: true
            }
        },
    };
</script>
