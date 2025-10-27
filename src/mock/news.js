function pick(arr, i) { return arr[i % arr.length]; }

export function generateMockNews(count = 30) {
  const reporters = ['Alice Zhang', 'Bob Li', 'Carol Wang', 'David Chen', 'Emma Liu', 'Frank Zhao', 'Grace Sun'];
  const baseDate = new Date('2025-10-10T09:00:00Z');
  const topics = [
    '城市停水传闻', '某明星离婚传闻', '新型病毒扩散消息', '学校停课通知真假', '粮食短缺谣言',
    '桥梁坍塌事件', '地震预警传播', '油价暴涨消息', '火车事故现场', '电商平台跑路'
  ];
  const list = [];
  for (let id = 1; id <= count; id++) {
    const topic = `${pick(topics, id)}（#${id}）`;
    const short = '简述：该新闻在社交平台广泛传播，需社区投票判定真伪。';
    const full = '详细：请依据官方通告、权威媒体报道、现场照片或视频等证据进行判断，并在评论区说明理由。';
    const reporter = pick(reporters, id);
    const reportedAt = new Date(baseDate.getTime() + id * 3600_000).toISOString();
    const imageUrl = `https://picsum.photos/seed/news-${id}/960/540`;
    const votes = generateVotes(id);
    list.push({ id, topic, short, full, reporter, reportedAt, imageUrl, votes });
  }
  return list;
}

function generateVotes(seed) {
  const votesCount = 8 + ((seed * 7) % 22); // 8~29
  const biasMod = seed % 3; // 0偏假,1偏不假,2接近持平
  const fakeRatio = biasMod === 0 ? 0.65 : biasMod === 1 ? 0.35 : 0.5;
  const voters = ['Liam', 'Noah', 'Emma','Olivia','Ava','Mia','Sophia','Isabella','Ethan','Logan','Lucas','James','Henry','Amelia'];
  const comments = [
    '来源可疑，未见权威报道。', '当地并无相关情况。', '官方已澄清此事。', '我认为属实。', '图片可能经过处理。',
    '我在现场拍的照片。', '需要更多证据支撑。', '媒体已辟谣。', '这条消息看着靠谱。', '建议谨慎转发。'
  ];
  const start = Date.now() - 5 * 86400_000; // 近 5 天
  const out = [];
  for (let i = 0; i < votesCount; i++) {
    const isFake = (i / votesCount) < fakeRatio;
    const voter = pick(voters, seed + i);
    const votedAt = new Date(start + i * 45000).toISOString();
    const comment = `${pick(comments, seed + i)}（#${seed}-${i}）`;
    const imageUrl = i % 6 === 0 ? `https://picsum.photos/seed/vote-${seed}-${i}/640/360` : '';
    out.push({ id: `${seed}-${i}`, voter, isFake, comment, imageUrl, votedAt });
  }
  return out;
}

export function computeStats(n) {
  const fake = n.votes.filter(v => v.isFake).length;
  const nonFake = n.votes.length - fake;
  const status = fake > nonFake ? 'fake' : (nonFake > fake ? 'non-fake' : 'pending');
  const fakePct = n.votes.length ? Math.round(fake / n.votes.length * 100) : 0;
  const nonFakePct = n.votes.length ? Math.round(nonFake / n.votes.length * 100) : 0;
  return { ...n, fakeCount: fake, nonFakeCount: nonFake, status, fakePct, nonFakePct };
}