const titles = {
  dashboard: "总览",
  leads: "线索任务池",
  people: "人员配置",
  scenes: "场景管理"
};

const funnel = [
  ["未加微线索", 4820, "100%"],
  ["AI外呼完成", 4316, "89.5%"],
  ["AI接通", 1864, "43.2%"],
  ["有效交互", 1092, "58.6%"],
  ["高意向", 342, "18.4%"],
  ["同意加微", 183, "9.8%"],
  ["人工接管", 1742, "93.5%"],
  ["加微成功", 528, "30.3%"]
];

const scenes = [
  {
    name: "新车加微",
    direction: "新车",
    status: "启用",
    owner: "陈主管",
    desc: "承接新车业务未加微线索，完成AI前置触达和人工加微承接。",
    leadPool: "CRM新车未加微线索池",
    source: "CRM自动同步",
    idField: "customer_id",
    phoneField: "phone",
    ownerPhoneField: "owner_phone",
    dataStatus: "正常",
    syncTime: "2026-06-01 09:30",
    sms: "已配置",
    rpa: "已配置",
    wecom: "懂车帝新车企微",
    template: "新车报价资料加微模板",
    team: "BPO一组 / 直营顾问组",
    assign: "按原跟进人",
    p0Sla: "15分钟",
    p1Sla: "2小时",
    peopleCount: 36,
    metrics: ["今日外呼 4,820", "加微成功 528", "人工接管 1,742"],
    warnings: ["线索字段完整", "加微接口正常"]
  },
  {
    name: "二手车加微",
    direction: "二手车",
    status: "启用",
    owner: "王同学",
    desc: "面向二手车询价、置换、到店咨询线索，区分车源城市与预算承接。",
    leadPool: "CRM二手车询价线索池",
    source: "CRM自动同步",
    idField: "biz_id",
    phoneField: "encrypt_phone",
    ownerPhoneField: "sales_phone",
    dataStatus: "正常",
    syncTime: "2026-06-01 09:18",
    sms: "已配置",
    rpa: "未配置",
    wecom: "二手车顾问企微",
    template: "二手车车源推荐模板",
    team: "二手车顾问组",
    assign: "按团队轮转",
    p0Sla: "20分钟",
    p1Sla: "4小时",
    peopleCount: 18,
    metrics: ["今日外呼 1,286", "加微成功 164", "人工接管 492"],
    warnings: ["RPA加微待接入"]
  },
  {
    name: "沉默线索唤醒",
    direction: "存量回捞",
    status: "启用",
    owner: "李同学",
    desc: "回捞历史沉默、长期未联系和公海沉淀线索，优先筛出仍有购车兴趣客户。",
    leadPool: "CRM沉默30天未加微线索池",
    source: "CRM批量同步",
    idField: "lead_id",
    phoneField: "phone",
    ownerPhoneField: "last_owner_phone",
    dataStatus: "字段待校验",
    syncTime: "2026-06-01 08:50",
    sms: "已配置",
    rpa: "已配置",
    wecom: "存量运营企微",
    template: "沉默线索唤醒模板",
    team: "BPO二组",
    assign: "主管手动分配",
    p0Sla: "30分钟",
    p1Sla: "6小时",
    peopleCount: 22,
    metrics: ["今日外呼 2,104", "加微成功 96", "人工接管 388"],
    warnings: ["跟进人电话字段缺失 6条"]
  },
  {
    name: "战败线索回捞",
    direction: "存量回捞",
    status: "停用",
    owner: "陈主管",
    desc: "针对历史战败和无效线索做低成本触达，重新识别购车周期和加微信意愿。",
    leadPool: "CRM历史战败线索池",
    source: "CRM手动圈选",
    idField: "customer_id",
    phoneField: "phone",
    ownerPhoneField: "owner_phone",
    dataStatus: "待配置",
    syncTime: "-",
    sms: "未配置",
    rpa: "未配置",
    wecom: "待绑定",
    template: "待配置",
    team: "待绑定",
    assign: "主管手动分配",
    p0Sla: "30分钟",
    p1Sla: "1天",
    peopleCount: 0,
    metrics: ["今日外呼 0", "加微成功 0", "人工接管 0"],
    warnings: ["线索池未启用", "加微接口未配置"]
  }
];

const leads = [
  {
    id: "CRM102938",
    customer: "陈先生 138****4218",
    contact: "已接通",
    callCount: 2,
    wechat: "未加微",
    intent: "高意向",
    owner: "待分配",
    ownerPhone: "-",
    cleaner: "张同学",
    created: "2026-05-21 09:12",
    handoff: "P0高优待跟进",
    task: "BPO一组未加微未联系",
    script: "加微引导标准版",
    intentInfo: {
      model: "凯迪拉克CT5",
      city: "重庆",
      budget: "20-25万",
      cycle: "1个月内",
      type: "置换购车"
    },
    labels: {
      objection: "客户反感：轻微",
      bought: "已买车：否",
      issue: "AI通话问题：无",
      assistant: "语音助理：否",
      wechatWay: "加微方式：RPA加微",
      lastNode: "最后节点：询问预算",
      effective: "有效交互：是"
    },
    callRecords: [
      { type: "AI外呼", time: "2026-05-21 10:36", result: "已接通", duration: "84秒", summary: "客户愿意了解购车方案，但要求减少电话打扰。AI识别为高意向，建议人工优先接管。" },
      { type: "AI外呼", time: "2026-05-20 16:02", result: "未接通", duration: "-", summary: "电话未接通，未产生有效沟通。" }
    ],
    ops: ["命中高意向未加微转人工规则", "等待人工接管"]
  },
  {
    id: "CRM102944",
    customer: "赵女士 186****0921",
    contact: "已接通",
    callCount: 1,
    wechat: "同意加微",
    intent: "中意向",
    owner: "王同学",
    ownerPhone: "13800008888",
    cleaner: "张同学",
    created: "2026-05-21 09:26",
    handoff: "已跟进",
    task: "直营高价值未加微",
    script: "高价值客户精简版",
    intentInfo: {
      model: "宝马3系",
      city: "成都",
      budget: "25-30万",
      cycle: "2周内",
      type: "首次购车"
    },
    labels: {
      objection: "客户反感：无",
      bought: "已买车：否",
      issue: "AI通话问题：无",
      assistant: "语音助理：否",
      wechatWay: "加微方式：短信加微",
      lastNode: "最后节点：发送资料",
      effective: "有效交互：是"
    },
    callRecords: [
      { type: "AI外呼", time: "2026-05-21 10:42", result: "已接通", duration: "61秒", summary: "客户有近期看车计划，愿意接收车型资料。AI识别为中意向，建议由原跟进人继续确认。" },
      { type: "人工外呼", time: "2026-05-21 11:08", result: "已接通", duration: "126秒", summary: "王同学完成电话确认，客户同意添加微信并接收宝马3系报价资料。" }
    ],
    ops: ["分配给王同学", "已发送短信加微"]
  },
  {
    id: "CRM102951",
    customer: "李女士 159****7742",
    contact: "已接通",
    callCount: 3,
    wechat: "未加微",
    intent: "高意向",
    owner: "待分配",
    ownerPhone: "-",
    cleaner: "赵同学",
    created: "2026-05-21 10:04",
    handoff: "P0高优待跟进",
    task: "BPO一组未加微未联系",
    script: "加微引导标准版",
    intentInfo: {
      model: "奥迪A4L",
      city: "杭州",
      budget: "25万左右",
      cycle: "本周",
      type: "增购"
    },
    labels: {
      objection: "客户反感：无",
      bought: "已买车：否",
      issue: "AI通话问题：打断",
      assistant: "语音助理：否",
      wechatWay: "加微方式：RPA加微",
      lastNode: "最后节点：确认微信",
      effective: "有效交互：是"
    },
    callRecords: [
      { type: "AI外呼", time: "2026-05-21 10:18", result: "已接通", duration: "73秒", summary: "客户明确同意添加微信，AI完成称呼和手机号确认。建议立即人工外呼并同步RPA加微。" },
      { type: "AI外呼", time: "2026-05-20 11:25", result: "已接通", duration: "36秒", summary: "客户表示在比较车型，暂未确认预算，愿意后续沟通。" },
      { type: "AI外呼", time: "2026-05-19 15:10", result: "未接通", duration: "-", summary: "电话未接通，进入后续外呼策略。" }
    ],
    ops: ["命中同意加微优先承接规则", "接管SLA超时"]
  },
  {
    id: "CRM102966",
    customer: "周先生 136****8120",
    contact: "未接通",
    callCount: 1,
    wechat: "未加微",
    intent: "未知",
    owner: "李同学",
    ownerPhone: "13900006666",
    cleaner: "赵同学",
    created: "2026-05-21 10:42",
    handoff: "AI外呼中-无需接管",
    task: "沉默客户唤醒",
    script: "沉默客户唤醒版",
    intentInfo: {
      model: "未明确",
      city: "广州",
      budget: "未明确",
      cycle: "未明确",
      type: "未知"
    },
    labels: {
      objection: "客户反感：未知",
      bought: "已买车：未知",
      issue: "AI通话问题：无",
      assistant: "语音助理：否",
      wechatWay: "加微方式：未触达",
      lastNode: "最后节点：未接通",
      effective: "有效交互：否"
    },
    callRecords: [
      { type: "AI外呼", time: "2026-05-21 11:02", result: "未接通", duration: "-", summary: "AI外呼未接通，暂未生成意向判断。" }
    ],
    ops: ["等待外呼平台复呼策略处理"]
  },
  {
    id: "CRM102981",
    customer: "孙女士 188****6609",
    contact: "已接通",
    callCount: 2,
    wechat: "加微失败",
    intent: "中意向",
    owner: "王同学",
    ownerPhone: "13800008888",
    cleaner: "张同学",
    created: "2026-05-21 11:08",
    handoff: "P1择机跟进",
    task: "直营高价值未加微",
    script: "高价值客户精简版",
    intentInfo: {
      model: "理想L6",
      city: "苏州",
      budget: "30万左右",
      cycle: "1-3个月",
      type: "家庭增购"
    },
    labels: {
      objection: "客户反感：无",
      bought: "已买车：否",
      issue: "AI通话问题：识别偏差",
      assistant: "语音助理：否",
      wechatWay: "加微方式：短信加微",
      lastNode: "最后节点：加微失败",
      effective: "有效交互：是"
    },
    callRecords: [
      { type: "AI外呼", time: "2026-05-21 11:20", result: "已接通", duration: "52秒", summary: "客户愿意后续沟通，但本次加微链接未完成添加。AI识别为中意向，建议人工复核加微失败原因。" },
      { type: "人工外呼", time: "2026-05-21 11:42", result: "已接通", duration: "96秒", summary: "王同学确认客户可后续沟通，加微失败原因是短信链接过期，已重新发送。" },
      { type: "AI外呼", time: "2026-05-18 17:14", result: "已接通", duration: "41秒", summary: "客户表示需要与家人商量，暂未决定具体购车时间。" }
    ],
    ops: ["短信加微失败", "命中加微失败人工复核规则"]
  }
];

const people = [
  ["13800008888", "王同学", "BPO", "BPO一组", "女", "126", "18", "启用"],
  ["13900006666", "李同学", "销售", "直营顾问组", "男", "84", "9", "启用"],
  ["13700005555", "张同学", "BPO", "BPO一组", "女", "98", "14", "启用"],
  ["13600004444", "赵同学", "BPO", "BPO二组", "男", "76", "6", "启用"],
  ["13500003333", "陈主管", "主管", "BPO一组", "男", "0", "0", "启用"]
];

function tagClass(value) {
  if (value.includes("运行") || value.includes("高意向") || value.includes("成功") || value.includes("已接通") || value.includes("已跟进") || value.includes("无需接管")) return "green";
  if (value.includes("待") || value.includes("择机") || value.includes("中意向") || value.includes("同意")) return "orange";
  if (value.includes("超时") || value.includes("失败")) return "red";
  return "";
}

function renderFunnel() {
  const max = funnel[0][1];
  document.querySelector("#funnelChart").innerHTML = funnel.map(([name, value, rate]) => {
    const width = Math.max((value / max) * 100, 18);
    return `
      <div class="funnel-row">
        <div class="funnel-label"><b>${name}</b><span>${value.toLocaleString("zh-CN")} · ${rate}</span></div>
        <div class="funnel-track"><i style="width:${width}%"></i></div>
      </div>
    `;
  }).join("");
}

function renderTodos() {
  const p0Count = leads.filter((lead) => lead.handoff.includes("P0")).length;
  const p1Count = leads.filter((lead) => lead.handoff.includes("P1")).length;
  document.querySelector("#p0TodoCount").textContent = p0Count;
  document.querySelector("#p1TodoCount").textContent = p1Count;
}

function renderLeads() {
  const rows = leads
    .map((lead, index) => ({ lead, index }))
    .filter(({ lead }) => leadMatchesTagFilters(lead));
  document.querySelector("#leadTable").innerHTML = rows.map(({ lead, index }) => `
    <tr>
      <td>${lead.id}</td>
      <td>${lead.customer}</td>
      <td><span class="tag ${tagClass(lead.contact)}">${lead.contact}</span></td>
      <td>${lead.callCount}</td>
      <td><span class="tag ${tagClass(lead.wechat)}">${lead.wechat}</span></td>
      <td><span class="tag ${tagClass(lead.intent)}">${lead.intent}</span></td>
      <td>${lead.owner}</td>
      <td>${lead.cleaner}</td>
      <td>${lead.created}</td>
      <td><span class="tag ${tagClass(lead.handoff)}">${lead.handoff}</span></td>
      <td><button class="text-button lead-detail-button" data-index="${index}">详情</button></td>
    </tr>
  `).join("");
  document.querySelectorAll(".lead-detail-button").forEach((button) => {
    button.addEventListener("click", () => openLeadDetail(Number(button.dataset.index)));
  });
}

function renderScenes() {
  document.querySelector("#sceneGrid").innerHTML = scenes.map((scene, index) => `
    <article class="scene-card">
      <header>
        <div>
          <h2>${scene.name}</h2>
          <p>${scene.desc}</p>
        </div>
        <span class="tag ${scene.status === "启用" ? "green" : ""}">${scene.status}</span>
      </header>
      <div class="scene-meta">
        <span><b>业务方向</b>${scene.direction}</span>
        <span><b>线索池</b>${scene.leadPool}</span>
        <span><b>加微能力</b>短信 ${scene.sms} / RPA ${scene.rpa}</span>
        <span><b>承接团队</b>${scene.team}</span>
      </div>
      <div class="scene-metrics">
        ${scene.metrics.map((metric) => `<em>${metric}</em>`).join("")}
      </div>
      <div class="scene-actions">
        <button class="text-button scene-detail-button" data-index="${index}">详情</button>
        <button class="secondary-button scene-edit-button" data-index="${index}">编辑</button>
      </div>
    </article>
  `).join("");
  document.querySelectorAll(".scene-detail-button").forEach((button) => {
    button.addEventListener("click", () => openSceneDrawer(Number(button.dataset.index)));
  });
  document.querySelectorAll(".scene-edit-button").forEach((button) => {
    button.addEventListener("click", () => openSceneModal(Number(button.dataset.index)));
  });
}

function leadMatchesTagFilters(lead) {
  const objection = document.querySelector("#tagObjectionFilter")?.value || "全部反感标签";
  const bought = document.querySelector("#tagBoughtFilter")?.value || "全部购车状态";
  const issue = document.querySelector("#tagIssueFilter")?.value || "全部通话问题";
  return (objection.startsWith("全部") || lead.labels.objection === objection)
    && (bought.startsWith("全部") || lead.labels.bought === bought)
    && (issue.startsWith("全部") || lead.labels.issue === issue);
}

function renderPeople() {
  document.querySelector("#peopleTable").innerHTML = people.map((row) => `
    <tr>
      <td><b>${row[0]}</b></td>
      <td>${row[1]}</td>
      <td><span class="tag">${row[2]}</span></td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${row[6]}</td>
      <td><span class="tag green">${row[7]}</span></td>
    </tr>
  `).join("");
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

function bindLeadModal() {
  const modal = document.querySelector("#leadModal");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll(".close-lead-modal").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
}

function bindSceneManagement() {
  bindSceneDrawer();
  bindSceneModal();
}

function bindSceneDrawer() {
  const modal = document.querySelector("#sceneDrawer");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll(".close-scene-drawer").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
}

function bindSceneModal() {
  const modal = document.querySelector("#sceneModal");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelector("#openSceneModal").addEventListener("click", () => openSceneModal());
  document.querySelectorAll(".close-scene-modal").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.querySelector("#saveScene").addEventListener("click", () => {
    close();
    toast("场景配置已保存");
  });
}

function openSceneModal(index = null) {
  const scene = Number.isInteger(index) ? scenes[index] : null;
  document.querySelector("#sceneModalTitle").textContent = scene ? "编辑场景" : "新建场景";
  document.querySelector("#sceneNameInput").value = scene ? scene.name : "新业务场景";
  const modal = document.querySelector("#sceneModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openSceneDrawer(index) {
  const scene = scenes[index];
  document.querySelector("#sceneDrawerTitle").textContent = `${scene.name} 场景详情`;
  document.querySelector("#sceneDrawerContent").innerHTML = `
    <section class="detail-section first-section">
      <div class="info-grid">
        <span><b>场景状态</b>${scene.status}</span>
        <span><b>业务方向</b>${scene.direction}</span>
        <span><b>负责人</b>${scene.owner}</span>
        <span><b>最近同步</b>${scene.syncTime}</span>
      </div>
      <p>${scene.desc}</p>
    </section>
    <section class="detail-section">
      <h2>线索数据配置</h2>
      <div class="info-grid">
        <span><b>线索来源</b>${scene.source}</span>
        <span><b>线索池</b>${scene.leadPool}</span>
        <span><b>客户ID字段</b>${scene.idField}</span>
        <span><b>手机号字段</b>${scene.phoneField}</span>
        <span><b>跟进人电话字段</b>${scene.ownerPhoneField}</span>
        <span><b>数据状态</b>${scene.dataStatus}</span>
      </div>
    </section>
    <section class="detail-section">
      <h2>加微能力配置</h2>
      <div class="info-grid">
        <span><b>短信加微接口</b>${scene.sms}</span>
        <span><b>RPA加微能力</b>${scene.rpa}</span>
        <span><b>企微主体</b>${scene.wecom}</span>
        <span><b>加微模板</b>${scene.template}</span>
      </div>
    </section>
    <section class="detail-section">
      <h2>人员承接配置</h2>
      <div class="info-grid">
        <span><b>承接团队</b>${scene.team}</span>
        <span><b>分配方式</b>${scene.assign}</span>
        <span><b>P0 SLA</b>${scene.p0Sla}</span>
        <span><b>P1 SLA</b>${scene.p1Sla}</span>
        <span><b>可承接人员</b>${scene.peopleCount}人</span>
      </div>
    </section>
    <section class="detail-section">
      <h2>看板口径与状态</h2>
      <div class="label-cloud">
        ${scene.metrics.map((metric) => `<span class="tag">${metric}</span>`).join("")}
        ${scene.warnings.map((warning) => `<span class="tag ${warning.includes("正常") || warning.includes("完整") ? "green" : "orange"}">${warning}</span>`).join("")}
      </div>
    </section>
  `;
  const modal = document.querySelector("#sceneDrawer");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function bindLeadFilters() {
  ["#tagObjectionFilter", "#tagBoughtFilter", "#tagIssueFilter"].forEach((selector) => {
    document.querySelector(selector).addEventListener("change", renderLeads);
  });
}

function bindFeedbackModal() {
  const modal = document.querySelector("#feedbackModal");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll(".close-feedback-modal").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.querySelector("#saveFeedback").addEventListener("click", () => {
    close();
    toast("跟进反馈已保存并按配置回流CRM");
  });
}

function openFeedbackModal() {
  const modal = document.querySelector("#feedbackModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openLeadDetail(index) {
  const lead = leads[index];
  document.querySelector("#leadModalTitle").textContent = `${lead.id} 线索详情`;
  document.querySelector("#leadDetailContent").innerHTML = `
    <div class="lead-detail-layout">
      <section class="lead-detail-main">
        <div class="info-grid">
          <span><b>客户</b>${lead.customer}</span>
          <span><b>来源任务</b>${lead.task}</span>
          <span><b>AI话术</b>${lead.script}</span>
          <span><b>外呼次数</b>${lead.callCount}</span>
          <span><b>联系状态</b>${lead.contact}</span>
          <span><b>加微状态</b>${lead.wechat}</span>
          <span><b>跟进人</b>${lead.owner} ${lead.ownerPhone}</span>
          <span><b>清洗员</b>${lead.cleaner}</span>
        </div>
        <section class="detail-section">
          <h2>买车意图</h2>
          <div class="intent-grid">
            <span><b>意向车型</b>${lead.intentInfo.model}</span>
            <span><b>购车城市</b>${lead.intentInfo.city}</span>
            <span><b>购车预算</b>${lead.intentInfo.budget}</span>
            <span><b>购车周期</b>${lead.intentInfo.cycle}</span>
            <span><b>购车类型</b>${lead.intentInfo.type}</span>
          </div>
        </section>
        <section class="detail-section">
          <h2>客户标签</h2>
          <div class="label-cloud">
            ${Object.values(lead.labels).map((label) => `<span class="tag">${label}</span>`).join("")}
          </div>
        </section>
        <section class="detail-section">
          <h2>历史外呼与跟进记录</h2>
          <div class="call-history">
            ${lead.callRecords.map((record) => `
              <article>
                <header><b>${record.time}</b><span class="tag record-type">${record.type}</span><span class="tag ${tagClass(record.result)}">${record.result}</span><span>${record.duration}</span></header>
                <p>${record.summary}</p>
              </article>
            `).join("")}
            ${lead.ops.map((record) => `<article class="op-record"><p>${record}</p></article>`).join("")}
          </div>
        </section>
      </section>
      <aside class="handoff-panel">
        <div>
          <h2>人工接管</h2>
          <p>${lead.handoff}</p>
        </div>
        <div class="handoff-status">
          <span><b>承接人</b>${lead.owner} ${lead.ownerPhone}</span>
          <span><b>任务等级</b>${lead.handoff.includes("P0") ? "P0 高优" : lead.handoff.includes("P1") ? "P1 普通" : "未生成"}</span>
          <span><b>推荐动作</b>${lead.intent === "高意向" ? "优先人工外呼 + RPA加微" : "短信加微后电话确认"}</span>
        </div>
        <div class="handoff-actions">
          <button class="secondary-button">发起外呼</button>
          <button class="secondary-button">短信加微</button>
          <button class="secondary-button">RPA加微</button>
          <button class="primary-button" id="openFeedback">跟进反馈</button>
        </div>
      </aside>
    </div>
  `;
  const modal = document.querySelector("#leadModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#openFeedback").addEventListener("click", openFeedbackModal);
}

function bindActions() {
  document.querySelector("#businessSelect").addEventListener("change", (event) => {
    document.querySelector(".eyebrow").textContent = event.target.value;
    toast(`已切换到${event.target.value}场景`);
  });
  document.querySelector("#refreshBtn").addEventListener("click", () => {
    document.querySelectorAll("[data-count]").forEach((node) => {
      const value = Number(node.dataset.count) + Math.floor(Math.random() * 16);
      node.dataset.count = value;
      node.textContent = value.toLocaleString("zh-CN");
    });
    toast("数据已刷新");
  });
}

function bindPersonModal() {
  const modal = document.querySelector("#personModal");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelector("#openPersonModal").addEventListener("click", () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
  document.querySelectorAll(".close-person-modal").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.querySelector("#savePerson").addEventListener("click", () => {
    close();
    toast("人员已保存，电话将作为唯一ID");
  });
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 2200);
}

renderFunnel();
renderTodos();
renderLeads();
renderScenes();
renderPeople();
bindNavigation();
bindLeadModal();
bindLeadFilters();
bindFeedbackModal();
bindSceneManagement();
bindPersonModal();
bindActions();
