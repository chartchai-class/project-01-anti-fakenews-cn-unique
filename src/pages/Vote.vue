<template>
  <section class="card" v-if="news">
    <h2 style="margin:0 0 12px;">对「{{ news.topic }}」投票与评论</h2>
    <p class="meta">记者：{{ news.reporter }} ｜ 报告时间：{{ formatTime(news.reportedAt) }}</p>
    <img class="figure" :src="news.imageUrl" alt="事件图片"/>
  </section>

  <section class="card" v-if="news">
    <h3 class="section-title">投票（必选）</h3>
    <div class="row">
      <label><input type="radio" value="fake" v-model="voteChoice"> 假新闻</label>
      <label><input type="radio" value="non-fake" v-model="voteChoice"> 不假新闻</label>
    </div>

    <h3 class="section-title">评论（必填）</h3>
    <textarea rows="5" v-model="comment" placeholder="请说明你的判断理由（必填）"></textarea>

    <h3 class="section-title">佐证图片链接（可选）</h3>
    <input type="url" v-model="imageUrl" placeholder="例如：https://..."/>

    <h3 class="section-title">你的昵称（可选）</h3>
    <input type="text" v-model="voter" placeholder="匿名用户"/>

    <div class="row" style="margin-top:12px;">
      <button :disabled="!canSubmit" @click="submit">提交</button>
      <RouterLink class="ghost" :to="`/news/${id}`">返回详情</RouterLink>
    </div>

    <p v-if="error" style="color:var(--bad);margin-top:8px;">{{ error }}</p>
    <p v-if="ok" style="color:var(--ok);margin-top:8px;">提交成功，已写入评论列表。</p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const store = useNewsStore();
const news = computed(() => store.statsById(id));

const voteChoice = ref('');
const comment = ref('');
const imageUrl = ref('');
const voter = ref('');
const error = ref('');
const ok = ref(false);

const canSubmit = computed(() =>
  (voteChoice.value === 'fake' || voteChoice.value === 'non-fake') &&
  comment.value.trim().length > 0
);

function submit() {
  error.value = '';
  ok.value = false;
  if (!canSubmit.value) {
    error.value = '请完成投票并填写评论。';
    return;
  }
  store.addVote(id, {
    isFake: voteChoice.value === 'fake',
    comment: comment.value,
    imageUrl: imageUrl.value,
    voter: voter.value || '匿名用户'
  });
  ok.value = true;
  // 可选：短暂停留后跳转回详情
  setTimeout(() => router.push(`/news/${id}`), 800);
}

function formatTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
</script>