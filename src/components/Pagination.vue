<template>
  <div class="pagination" v-if="pages > 1">
    <button class="ghost" :disabled="page===1" @click="$emit('update:page', 1)">首页</button>
    <button class="ghost" :disabled="page===1" @click="$emit('update:page', page-1)">上一页</button>
    <span class="label">第 {{ page }} / {{ pages }} 页</span>
    <button class="ghost" :disabled="page===pages" @click="$emit('update:page', page+1)">下一页</button>
    <button class="ghost" :disabled="page===pages" @click="$emit('update:page', pages)">末页</button>
  </div>
</template>
<script setup>
const props = defineProps({
  total: { type: Number, required: true },
  page: { type: Number, required: true },
  pageSize: { type: Number, required: true }
});
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
</script>