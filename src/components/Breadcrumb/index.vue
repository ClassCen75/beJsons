<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in store.state.BreadcrumbData"
        :key="index"
        style="font-size: 0.8rem"
        >{{ $t(`message.${item.title}`) }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
</script>

<style scoped lang="scss"></style>
