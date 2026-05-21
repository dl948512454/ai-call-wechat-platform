const titles = {
  dashboard: "工作台",
  rules: "规则配置",
  leads: "线索管理",
  handoff: "转人工队列"
};

const taskRows = [
  ["BPO一组未加微未联系", "BPO一组 / 已分配未加微未联系", "加微引导标准版", "3,120 / 4,000", "44.8%", "236", "运行中"],
  ["直营高价值未加微", "直营顾问组 / 高价值未加微", "高价值客户精简版", "740 / 1,200", "51.6%", "88", "运行中"],
  ["沉默客户唤醒", "BPO二组 / 沉默30天未加微", "沉默客户唤醒版", "456 / 900", "31.2%", "38", "运行中"],
  ["公海回捞", "公海 / 已分配未联系", "加微引导标准版", "0 / 600", "-", "-", "待启动"]
];

const performance = [
  ["BPO一组未加微未联系", "命中 4,000", "接通率 44.8%", "转人工 236"],
  ["直营高价值未加微", "命中 1,200", "高意向率 24.1%", "转人工 88"],
  ["沉默客户唤醒", "命中 900", "有效交互率 42.6%", "转人工 38"]
];

const callRules = [
  {
    name: "BPO一组未加微未联系",
    owner: "BPO一组 24人",
    condition: "CRM已分配 + 未加微 + 未联系",
    script: "加微引导标准版",
    handoff: "高意向或同意加微，P0转人工",
    enabled: true
  },
  {
    name: "直营高价值未加微",
    owner: "直营顾问组 12人",
    condition: "高价值客户 + 未加微 + 无风险标签",
    script: "高价值客户精简版",
    handoff: "接通且中高意向，P0转人工",
    enabled: true
  },
  {
    name: "沉默客户唤醒",
    owner: "BPO二组 18人",
    condition: "沉默30天 + 未加微",
    script: "沉默客户唤醒版",
    handoff: "同意加微或需要资料，P1转人工",
    enabled: false
  }
];

const handoffRules = [
  {
    name: "高意向未加微转人工",
    owner: "全部团队",
    condition: "通话标签包含高意向，且加微状态为未加微",
    result: "P0任务 / 15分钟SLA / 推荐人工外呼",
    enabled: true
  },
  {
    name: "同意加微优先承接",
    owner: "BPO团队",
    condition: "客户明确同意加微，或AI识别愿意接收资料",
    result: "P0任务 / 推荐短信加微 + 电话确认",
    enabled: true
  },
  {
    name: "历史跟进缺口复核",
    owner: "直营顾问组",
    condition: "近7天无人工跟进，且AI识别中意向",
    result: "P1任务 / 分配原跟进人",
    enabled: true
  }
];

const callbackRules = [
  {
    name: "AI外呼完成回流",
    owner: "CRM客户状态",
    condition: "AI外呼完成后回流联系状态、意向等级和摘要",
    result: "实时回流",
    enabled: true
  },
  {
    name: "人工承接结果回流",
    owner: "CRM跟进记录",
    condition: "人工反馈加微成功、失败或需二次跟进",
    result: "实时回流",
    enabled: true
  },
  {
    name: "失败原因补偿回流",
    owner: "CRM异常状态",
    condition: "回流失败或字段校验失败",
    result: "每30分钟重试",
    enabled: true
  }
];

const leads = [
  ["CRM102938", "陈先生 138****4218", "已接通", "未加微", "高意向", "待分配", "张同学", "2026-05-21 09:12", "P0待接管"],
  ["CRM102944", "赵女士 186****0921", "已接通", "同意加微", "中意向", "王同学", "张同学", "2026-05-21 09:26", "P0跟进中"],
  ["CRM102951", "李女士 159****7742", "已接通", "未加微", "高意向", "待分配", "赵同学", "2026-05-21 10:04", "P0超时"],
  ["CRM102966", "周先生 136****8120", "未接通", "未加微", "未知", "李同学", "赵同学", "2026-05-21 10:42", "未转人工"],
  ["CRM102981", "孙女士 188****6609", "已接通", "加微失败", "中意向", "王同学", "张同学", "2026-05-21 11:08", "P1待接管"]
];

const handoffs = [
  {
    name: "陈先生",
    id: "CRM102938",
    phone: "138****4218",
    task: "BPO一组未加微未联系",
    level: "高意向",
    grade: "P0 高优",
    owner: "待分配",
    cleaner: "张同学",
    sla: "剩余06:20",
    time: "2026-05-21 10:36",
    summary: "客户愿意添加微信了解购车方案，但强调不希望频繁电话打扰。",
    action: "建议先短信加微，5分钟后人工电话确认。",
    records: ["AI外呼已接通，通话时长 84秒", "客户标签：高意向、愿意加微、价格敏感", "历史跟进：近7天无人工跟进"]
  },
  {
    name: "赵女士",
    id: "CRM102944",
    phone: "186****0921",
    task: "直营高价值未加微",
    level: "中意向",
    grade: "P0 高优",
    owner: "王同学",
    cleaner: "张同学",
    sla: "剩余11:48",
    time: "2026-05-21 10:42",
    summary: "客户近期有看车需求，愿意接收资料，需要人工进一步确认是否加微。",
    action: "建议发送车型资料短信，并由原跟进人电话确认。",
    records: ["AI外呼已接通，通话时长 61秒", "客户标签：需要资料、中意向", "历史跟进：3天前有CRM浏览记录"]
  },
  {
    name: "李女士",
    id: "CRM102951",
    phone: "159****7742",
    task: "BPO一组未加微未联系",
    level: "高意向",
    grade: "P0 高优",
    owner: "待分配",
    cleaner: "赵同学",
    sla: "超时03:12",
    time: "2026-05-21 10:18",
    summary: "客户明确同意添加微信，AI已完成称呼和手机号确认。",
    action: "建议立即人工外呼，并同步发起RPA加微。",
    records: ["AI外呼已接通，通话时长 73秒", "客户标签：同意加微、高意向", "历史跟进：无人工接管记录"]
  }
];

function tagClass(value) {
  if (value.includes("运行") || value.includes("高意向") || value.includes("成功") || value.includes("已接通")) return "green";
  if (value.includes("待") || value.includes("中意向") || value.includes("同意")) return "orange";
  if (value.includes("超时") || value.includes("失败")) return "red";
  return "";
}

function renderTasks() {
  document.querySelector("#taskTable").innerHTML = taskRows.map((row) => {
    return `<tr>${row.map((cell, index) => {
      if (index === 6) return `<td><span class="tag ${tagClass(cell)}">${cell}</span></td>`;
      return `<td>${cell}</td>`;
    }).join("")}</tr>`;
  }).join("");
}

function renderPerformance() {
  document.querySelector("#performanceGrid").innerHTML = performance.map((item) => `
    <article>
      <b>${item[0]}</b>
      <span>${item[1]}</span>
      <span>${item[2]}</span>
      <em>${item[3]}</em>
    </article>
  `).join("");
}

function ruleCard(rule, mode = "call") {
  const resultLabel = mode === "call" ? `转人工：${rule.handoff}` : `执行结果：${rule.result}`;
  return `
    <article class="rule-card">
      <header>
        <div>
          <h2>${rule.name}</h2>
          <p>${rule.owner}</p>
        </div>
        <button class="switch ${rule.enabled ? "on" : ""}" title="${rule.enabled ? "已启用" : "已停用"}"></button>
      </header>
      <div class="rule-meta">
        <span>条件：${rule.condition}</span>
        ${rule.script ? `<span>AI话术：${rule.script}</span>` : ""}
        <span>${resultLabel}</span>
      </div>
      <button class="secondary-button">编辑规则</button>
    </article>
  `;
}

function renderRules() {
  document.querySelector("#callRules").innerHTML = callRules.map((rule) => ruleCard(rule, "call")).join("");
  document.querySelector("#handoffRules").innerHTML = handoffRules.map((rule) => ruleCard(rule, "handoff")).join("");
  document.querySelector("#callbackRules").innerHTML = callbackRules.map((rule) => ruleCard(rule, "callback")).join("");
  document.querySelectorAll(".switch").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("on");
      toast(button.classList.contains("on") ? "规则已启用" : "规则已停用");
    });
  });
}

function renderLeads() {
  document.querySelector("#leadTable").innerHTML = leads.map((row) => `
    <tr>${row.map((cell, index) => {
      if ([2, 3, 4, 8].includes(index)) return `<td><span class="tag ${tagClass(cell)}">${cell}</span></td>`;
      return `<td>${cell}</td>`;
    }).join("")}</tr>
  `).join("");
}

function renderHandoffs(activeIndex = 0) {
  const list = document.querySelector("#handoffList");
  list.innerHTML = handoffs.map((item, index) => `
    <button class="queue-card ${index === activeIndex ? "active" : ""}" data-index="${index}">
      <header><b>${item.name}</b><span class="tag ${tagClass(item.sla)}">${item.sla}</span></header>
      <p>${item.id} · ${item.phone}</p>
      <p>${item.task}</p>
      <div><span class="tag ${tagClass(item.level)}">${item.level}</span><span class="tag ${tagClass(item.grade)}">${item.grade}</span></div>
    </button>
  `).join("");
  list.querySelectorAll(".queue-card").forEach((button) => {
    button.addEventListener("click", () => renderHandoffs(Number(button.dataset.index)));
  });
  renderDetail(activeIndex);
}

function renderDetail(index) {
  const item = handoffs[index];
  document.querySelector("#handoffDetail").innerHTML = `
    <div class="detail-head">
      <div>
        <h2>${item.name}</h2>
        <p>${item.id} · ${item.phone}</p>
      </div>
      <span class="tag ${tagClass(item.grade)}">${item.grade}</span>
    </div>
    <div class="info-grid">
      <span><b>来源任务</b>${item.task}</span>
      <span><b>跟进人</b>${item.owner}</span>
      <span><b>清洗员</b>${item.cleaner}</span>
      <span><b>任务时间</b>${item.time}</span>
    </div>
    <section class="detail-section">
      <h2>AI摘要</h2>
      <p>${item.summary}</p>
    </section>
    <section class="detail-section">
      <h2>推荐动作</h2>
      <p>${item.action}</p>
      <div class="detail-actions">
        <button class="primary-button">人工外呼</button>
        <button class="secondary-button">短信加微</button>
        <button class="secondary-button">RPA加微</button>
        <button class="secondary-button">反馈结果</button>
      </div>
    </section>
    <section class="detail-section">
      <h2>通话与跟进记录</h2>
      <div class="timeline">${item.records.map((record) => `<div>${record}</div>`).join("")}</div>
    </section>
  `;
}

function switchView(viewName) {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewName));
  document.querySelector("#pageTitle").textContent = titles[viewName];
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.jump));
  });
}

function bindRuleTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
      document.querySelectorAll(".rule-grid").forEach((grid) => grid.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`#${button.dataset.ruleTab}`).classList.add("active");
    });
  });
}

function bindModal() {
  const modal = document.querySelector("#ruleModal");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelector("#openRuleModal").addEventListener("click", () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
  document.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.querySelector("#saveRule").addEventListener("click", () => {
    close();
    toast("规则已保存");
  });
}

function bindActions() {
  document.querySelector("#refreshBtn").addEventListener("click", () => {
    document.querySelectorAll("[data-count]").forEach((node) => {
      const value = Number(node.dataset.count) + Math.floor(Math.random() * 16);
      node.dataset.count = value;
      node.textContent = value.toLocaleString("zh-CN");
    });
    toast("数据已刷新");
  });
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 2200);
}

renderTasks();
renderPerformance();
renderRules();
renderLeads();
renderHandoffs();
bindNavigation();
bindRuleTabs();
bindModal();
bindActions();
