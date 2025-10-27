<template>
  <section class="card" v-if="news">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
      <h2 style="margin:0;">{{ news.topic }}</h2>
      <span class="status" :class="statusClass(news.status)">{{ statusText(news.status) }}</span>
    </header>
    <p class="meta">记者：{{ news.reporter }} ｜ 报告时间：{{ formatTime(news.reportedAt) }}</p>
    <img class="figure" :src="news.imageUrl" alt="事件图片"/>
    <p style="margin-top:12px;">{{ news.full }}</p>
    <p class="meta">
      投票统计：
      <span class="stat">假 {{ news.fakeCount }}（{{ news.fakePct }}%）</span>
      <span class="stat">不假 {{ news.nonFakeCount }}（{{ news.nonFakePct }}%）</span>
    </p>
    <div class="row">
      <RouterLink class="ghost" :to="`/news/${id}/vote`">去投票/评论</RouterLink>
      <RouterLink class="ghost" to="/">返回首页</RouterLink>
    </div>
  </section>

  <section class="card">
    <h3 class="section-title">评论与投票（分页）</h3>
    <div v-if="totalComments === 0" class="meta">暂无评论，快去投票吧。</div>
    <div v-else>
      <div class="grid">
        <article class="card" v-for="v in pagedComments" :key="v.id">
          <header class="row" style="justify-content:space-between;">
            <strong>{{ v.voter }}</strong>
            <span class="status" :class="v.isFake ? 'bad' : 'ok'">{{ v.isFake ? '投票：假' : '投票：不假' }}</span>
          </header>
          <p class="meta">时间：{{ formatTime(v.votedAt) }}</p>
          <p>{{ v.comment }}</p>
          <div v-if="v.imageUrl">
            <img class="figure" :src="v.imageUrl" alt="佐证图片"/>
          </div>
        </article>
      </div>
      <Pagination :total="totalComments" v-model:page="page" :pageSize="pageSize" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';
import Pagination from '../components/Pagination.vue';

const route = useRoute();
const id = Number(route.params.id);
const store = useNewsStore();

const news = computed(() => store.statsById(id));
const comments = computed(() => (store.byId(id)?.votes || []));
const page = ref(1);
const pageSize = ref(6);
const totalComments = computed(() => comments.value.length);

watch([comments, pageSize], () => { page.value = 1; });

const pagedComments = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return comments.value.slice(start, start + pageSize.value);
});

function formatTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
function statusClass(s) { return s === 'fake' ? 'bad' : s === 'non-fake' ? 'ok' : 'pending'; }
function statusText(s) { return s === 'fake' ? '判定：假' : s === 'non-fake' ? '判定：不假' : '待判定'; }
</script>