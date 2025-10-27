<template>
  <section class="card">
    <h2 style="margin:0 0 12px;">添加新闻</h2>

    <div class="grid">
      <div>
        <label class="label">新闻主题（必填）</label>
        <input type="text" v-model="topic" placeholder="例如：城市停水传闻"/>
      </div>
      <div>
        <label class="label">记者姓名（必填）</label>
        <input type="text" v-model="reporter" placeholder="例如：Alice Zhang"/>
      </div>
    </div>

    <div style="margin-top:12px;">
      <label class="label">简述（必填）</label>
      <textarea rows="3" v-model="short" placeholder="在列表页展示的简短说明"></textarea>
    </div>

    <div style="margin-top:12px;">
      <label class="label">详细（必填）</label>
      <textarea rows="6" v-model="full" placeholder="在详情页展示的完整内容"></textarea>
    </div>

    <h3 class="section-title">事件图片（可选，支持本地上传或 URL）</h3>
    <div class="grid">
      <div>
        <input type="file" accept="image/*" ref="fileInputRef" @change="onFileChange" />
      </div>
      <div>
        <input type="url" v-model="imageUrl" placeholder="或填写图片 URL，例如：https://..." />
      </div>
    </div>
    <div v-if="showPreview" class="meta">
      <a :href="imageUrl" target="_blank" rel="noopener">打开原图</a>
      <img class="figure" :src="imageUrl" alt="事件图片预览" />
    </div>
    <button class="ghost" v-if="imageUrl" @click="clearImage">移除图片</button>

    <div class="row" style="margin-top:12px;">
      <button :disabled="!canSubmit" @click="submit">提交新闻</button>
      <RouterLink class="ghost" to="/">返回首页</RouterLink>
    </div>

    <p v-if="error" style="color:var(--bad);margin-top:8px;">{{ error }}</p>
    <p v-if="ok" style="color:var(--ok);margin-top:8px;">提交成功，已添加到列表。</p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';

const store = useNewsStore();
const router = useRouter();

const topic = ref('');
const short = ref('');
const full = ref('');
const reporter = ref('');
const imageUrl = ref('');
const fileInputRef = ref(null);
const error = ref('');
const ok = ref(false);

function onFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { imageUrl.value = String(reader.result || ''); };
  reader.readAsDataURL(file);
}
function clearImage() {
  imageUrl.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
}

const showPreview = computed(() => {
  const u = imageUrl.value.trim();
  return u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:') || u.startsWith('blob:');
});

const canSubmit = computed(() =>
  topic.value.trim().length > 0 &&
  short.value.trim().length > 0 &&
  full.value.trim().length > 0 &&
  reporter.value.trim().length > 0
);

function submit() {
  error.value = '';
  ok.value = false;
  if (!canSubmit.value) {
    error.value = '请完整填写必填信息。';
    return;
  }
  store.addNews({
    topic: topic.value,
    short: short.value,
    full: full.value,
    reporter: reporter.value,
    imageUrl: imageUrl.value
  });
  ok.value = true;
  setTimeout(() => router.push('/'), 800);
}
</script>