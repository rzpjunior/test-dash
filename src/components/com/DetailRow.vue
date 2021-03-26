<template>
<div class="second-color">
    <div v-if="align== true">
        <div class="row">
            <div class="col mt-1">
                {{name}} : {{value}}
            </div>
        </div>
        <v-divider class="my-3"/>
    </div>
    <div v-else>
        <div class="row">
            <div class="col mt-1">
                {{name}} :
            </div>
            <div class="col mt-1 d-flex justify-end">
                {{value}}
            </div>
        </div>
        <v-divider class="my-3"/>
    </div>
</div>
</template>
<script>
export default {
    name : "DetailRow",
    props : {
        name : "",
        value : "",
        align : true
    }
}
</script>