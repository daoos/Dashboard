<template>
<div id="app">
  <transition name="router-fade" mode="out-in">
  	<router-view class="router-view"></router-view>
  </transition>
</div>

</template>

<script>
export default {}

</script>

<style lang="stylus" scoped>
.router-fade-enter-active, .router-fade-leave-active {
  	transition: all .2s
}
.router-fade-enter, .router-fade-leave-active {
    opacity 0
}
</style>
