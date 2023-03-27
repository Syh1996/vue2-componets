<template>
  <section class="table-title">
    <h3 :style="{ borderColor: themeColor }">
      <span :style="{ backgroundColor: themeColor }" class="line"></span
      >{{ title || $t('search') }}
    </h3>
  </section>
</template>

<script>
export default {
   name: 'TableTitle',
   props:{
     title:{
       type: String,
       default: ''
     },
     themeColor:{
       type: String,
       default: "#2c75ec"
     }
   },
}
</script>

<style lang="less">
@import "@less/table-title.less";
</style>
