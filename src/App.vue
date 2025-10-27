<template>
  <header class="header">
    <div class="header-inner">
      <h1 style="margin:0;font-size:20px;">社交反假新闻系统</h1>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/news/new">添加新闻</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
<script setup>
// 无需脚本
</script>
<style scoped>
/* 局部样式可按需添加 */
</style>