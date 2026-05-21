const titles = {
  dashboard: "总览",
  leads: "线索任务池",
  people: "人员配置",
  rules: "规则配置"
};

const funnel = [
  ["CRM进入AI范围", 4820, "100%"],
  ["AI外呼完成", 4316, "89.5%"],
  ["AI接通", 1864, "43.2%"],
  ["有效交互", 1092, "58.6%"],
  ["人工接管", 1742, "93.5%"],
  ["高意向", 342, "18.4%"],
  ["同意加微", 183, "9.8%"],
  ["加微成功", 528, "30.3%"]
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

const ruleForms = {
  callRules: {
    title: "新建AI外呼规则",
    button: "新建AI外呼规则",
    fields: [
      ["规则名称", "input", "BPO未加微未联系自动外呼"],
      ["适用同学/团队", "select", ["BPO一组", "直营顾问组", "BPO二组"]],
      ["CRM线索条件", "select", ["已分配 + 未加微 + 未联系", "高价值客户 + 未加微", "沉默30天 + 未加微"]],
      ["AI话术", "select", ["加微引导标准版", "高价值客户精简版", "沉默客户唤醒版"]]
    ],
    conditions: [
      ["线索状态", "已分配 / 未加微 / 未联系"],
      ["适用范围", "指定团队或同学名下线索"],
      ["执行动作", "进入AI外呼任务队列"]
    ]
  },
  handoffRules: {
    title: "新建转人工规则",
    button: "新建转人工规则",
    fields: [
      ["规则名称", "input", "高意向未加微转人工"],
      ["通话标签", "select", ["高意向 / 愿意加微", "中意向 / 需要资料", "反感 / 风险"]],
      ["加微状态", "select", ["未加微", "同意加微", "加微失败"]],
      ["承接团队", "select", ["原跟进人", "BPO主管分配", "直营顾问组"]]
    ],
    conditions: [
      ["历史沟通", "近7天无人工跟进"],
      ["任务等级", "P0高优 / P1普通"],
      ["推荐动作", "人工外呼 / 短信加微 / RPA加微"]
    ]
  },
  callbackRules: {
    title: "新建回流CRM规则",
    button: "新建回流CRM规则",
    fields: [
      ["规则名称", "input", "AI外呼完成状态回流"],
      ["回流节点", "select", ["AI外呼完成", "转人工生成", "人工反馈完成", "回流失败补偿"]],
      ["回流字段", "select", ["外呼状态 + 意向等级 + 摘要", "转人工状态 + 任务等级", "加微结果 + 失败原因"]],
      ["回流方式", "select", ["实时回流", "批量补偿", "失败重试"]]
    ],
    conditions: [
      ["幂等键", "客户ID + 状态类型 + 任务ID"],
      ["失败处理", "记录错误原因并进入补偿队列"],
      ["CRM状态", "按字段映射更新客户跟进记录"]
    ]
  }
};

let activeRuleTab = "callRules";

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

function ruleCard(rule, mode = "call") {
  const resultLabel = mode === "call" ? `转人工：${rule.handoff}` : `执行结果：${rule.result}`;
  const typeLabel = mode === "call" ? "AI外呼" : mode === "handoff" ? "转人工" : "回流CRM";
  return `
    <article class="rule-card">
      <header>
        <div>
          <h2>${rule.name}</h2>
          <p>${rule.owner}</p>
        </div>
        <button class="switch ${rule.enabled ? "on" : ""}" title="${rule.enabled ? "已启用" : "已停用"}"></button>
      </header>
      <span class="tag">${typeLabel}</span>
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
  document.querySelector("#callRuleGrid").innerHTML = callRules.map((rule) => ruleCard(rule, "call")).join("");
  document.querySelector("#handoffRuleGrid").innerHTML = handoffRules.map((rule) => ruleCard(rule, "handoff")).join("");
  document.querySelector("#callbackRuleGrid").innerHTML = callbackRules.map((rule) => ruleCard(rule, "callback")).join("");
  document.querySelectorAll(".switch").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("on");
      toast(button.classList.contains("on") ? "规则已启用" : "规则已停用");
    });
  });
}

function renderLeads() {
  document.querySelector("#leadTable").innerHTML = leads.map((lead, index) => `
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

function bindRuleTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
      document.querySelectorAll(".rule-pane").forEach((pane) => pane.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`#${button.dataset.ruleTab}`).classList.add("active");
      activeRuleTab = button.dataset.ruleTab;
      document.querySelector("#openRuleModal").textContent = ruleForms[activeRuleTab].button;
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
    renderRuleForm(activeRuleTab);
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

function renderRuleForm(tabName) {
  const config = ruleForms[tabName];
  document.querySelector("#ruleModalTitle").textContent = config.title;
  document.querySelector("#ruleForm").innerHTML = config.fields.map(([label, type, value]) => {
    if (type === "select") {
      return `<label>${label}<select>${value.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
    }
    return `<label>${label}<input value="${value}" /></label>`;
  }).join("");
  document.querySelector("#ruleBuilder").innerHTML = `
    <b>规则条件</b>
    ${config.conditions.map(([name, value]) => `<div class="condition-row"><span>${name}</span><em>${value}</em></div>`).join("")}
  `;
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
          <button class="secondary-button">跟进反馈</button>
        </div>
      </aside>
    </div>
  `;
  const modal = document.querySelector("#leadModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function bindActions() {
  document.querySelector("#businessSelect").addEventListener("change", (event) => {
    document.querySelector(".eyebrow").textContent = event.target.value;
    toast(`已切换到${event.target.value}`);
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
renderRules();
renderLeads();
renderPeople();
bindNavigation();
bindRuleTabs();
bindModal();
bindLeadModal();
bindPersonModal();
bindActions();
