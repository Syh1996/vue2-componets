<template>
  <section class="table-title">
    <h3 :style="{ borderColor: themeColor }">
      <span :style="{ backgroundColor: themeColor }" class="line"></span
      >{{ title || $t('search') }}
    </h3>
  </section>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
@Component({
  name: 'dividerTitle'
})
export default class TableTitle extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "#2c75ec" }) themeColor!: string;
}
</script>

<style lang="less">
@import "@less/table-title.less";
</style>
