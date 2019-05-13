<template>
    <div>
        <div class="text-center" v-if="loader"> 
            <img src="@/assets/loading.svg">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        loader: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style>

</style>
