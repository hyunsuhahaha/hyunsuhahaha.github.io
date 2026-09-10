const categories = [
  { id:"security", name:"Security", color:"#147a52", x:350, y:300 },
  { id:"data", name:"Data", color:"#1686ae", x:500, y:640 },
  { id:"infra", name:"Cloud / Infra", color:"#b26a10", x:890, y:640 },
  { id:"ai", name:"AI", color:"#6636c6", x:710, y:230 },
  { id:"game", name:"Game", color:"#b51f3d", x:1090, y:390 }
];

const projects = [
  { id:"shadowtrace", name:"ShadowTrace", summary:"Passive pentest activity recorder", type:"개인 프로젝트", role:"Solo project", categories:["security"], primary:"security", x:150, y:150, work:"승인된 침투 테스트 활동과 증적을 로컬에서 수집하고, 프로세스·터미널·네트워크·파일 이벤트를 하나의 타임라인으로 연결했습니다.", stack:"React · FastAPI · SQLite · eBPF · Kali Linux", href:"https://github.com/hyunsuhahaha/ShadowTrace" },
  { id:"oscp", name:"OSCP Workspace", summary:"Pentesting study reference", type:"개인 프로젝트", role:"Personal study fork", categories:["security"], primary:"security", x:145, y:390, work:"OSCP 준비 과정의 열거, 취약점 분석, 권한 상승 명령과 체크리스트를 빠르게 찾을 수 있는 학습용 레퍼런스로 관리했습니다.", stack:"Kali Linux · Network Enumeration · Privilege Escalation", href:"https://github.com/hyunsuhahaha/OSCP-CheatSheet" },
  { id:"security-review", name:"Security Configuration Review", summary:"Server and infrastructure assessment", type:"회사 프로젝트", role:"Company internship", categories:["security","infra"], primary:"security", x:485, y:420, work:"사내 네트워크, 원격제어, 인증과 단말 설정을 점검하고 외부 보안 권고를 기준으로 개선 우선순위를 도출했습니다.", stack:"Windows · Network · MFA · Hardening", private:true },
  { id:"ai-review", name:"AI Code Verification", summary:"AI 코드 품질·보안 검증 파이프라인", type:"팀 프로젝트", role:"Team project", categories:["ai","security"], primary:"ai", x:500, y:110, work:"코드 변경의 의존 경로를 추적하고 발견한 데이터 정합성 문제를 테스트 DB에서 재현·검증하는 셀프 호스팅 PR 리뷰 파이프라인을 구성했습니다.", stack:"Python · Codex CLI · GitNexus · Gitea · Django", href:"https://github.com/hyunsuhahaha/gitea-auto-reviewer" },
  { id:"airpointer", name:"AirPointer", summary:"Screen context and gesture interface", type:"개인 프로젝트", role:"Solo project", categories:["ai"], primary:"ai", x:870, y:105, work:"현재 화면과 최근 기록을 AI에 전달하고 근거 시점을 다시 확인하는 브라우저·Windows 도구를 구현했습니다. 제스처, 단축키와 화면 기록을 지원합니다.", stack:"TypeScript · Next.js · Python · MediaPipe · Windows", href:"https://github.com/hyunsuhahaha/AirPointer" },
  { id:"c2pa", name:"C2PA Provenance Study", summary:"콘텐츠 출처·서명 검증 연구", type:"팀 프로젝트", role:"Academic team project", categories:["ai","data","security"], primary:"ai", x:760, y:430, work:"C2PA 기반 디지털 콘텐츠의 출처와 서명 정보를 검증하고, 파일 서명 유효성과 메타데이터 신뢰를 구분해 해석하는 방법을 연구했습니다.", stack:"Rust · C2PA · Digital Signature · Metadata", href:"https://github.com/hyunsuhahaha/c2pa-rs_dongguk" },
  { id:"last-haul", name:"LAST HAUL", summary:"벌목 기록전과 무한 디펜스 게임", type:"개인 프로젝트", role:"Game design & development", categories:["game"], primary:"game", x:1220, y:185, align:"end", work:"숲의 재생 속도를 따라잡으며 나무를 제거하는 LÖVE2D 게임입니다. 기록전, 무한 디펜스, 영구 연구, 잡 마스터와 플레이테스트 계측을 설계했습니다.", stack:"Lua · LÖVE2D · Game Systems · Pixel Art", href:"https://github.com/hyunsuhahaha/def_game" },
  { id:"keystroke-guitar", name:"KEYSTROKE / Guitar", summary:"Keyboard-playable 6-string instrument", type:"개인 프로젝트", role:"Game & audio development", categories:["game"], primary:"game", x:1230, y:570, align:"end", work:"키보드로 스트로크, 일렉 리드와 사용자 코드를 연주하는 6현 기타를 만들었습니다. 각 줄은 독립적인 Karplus–Strong 합성 음성으로 동작합니다.", stack:"Lua · LÖVE2D · Karplus–Strong Synthesis", href:"https://github.com/hyunsuhahaha/keystroke-guitar" },
  { id:"mes", name:"MES Data Automation", summary:"생산 데이터 수집·검증 자동화", type:"회사 프로젝트", role:"Project owner · Company internship", categories:["data","infra"], primary:"data", x:265, y:745, work:"MES 생산실적, 태그, QR 데이터를 수집·정규화하고 입력 누락과 불일치를 탐지하는 흐름을 설계했습니다. 수집, 판정, 보고를 하나의 도구로 연결했습니다.", stack:"Python · Playwright · FastAPI · React · Excel", href:"./projects/mes-anomaly-detection/", linkLabel:"Case study" },
  { id:"db", name:"DB Migration / Backup", summary:"Schema migration and backup automation", type:"회사 프로젝트", role:"Company project", categories:["data","infra"], primary:"data", x:690, y:760, work:"데이터베이스 스키마와 데이터의 마이그레이션, 동기화, 백업 절차를 반복 가능하게 만든 내부 자동화 프로젝트입니다.", stack:"Database tooling · Details undisclosed", private:true },
  { id:"cicd", name:"CI/CD Automation", summary:"Build, test and deployment automation", type:"회사 프로젝트", role:"Company project", categories:["infra"], primary:"infra", x:1110, y:735, align:"end", work:"애플리케이션의 테스트와 배포 과정을 반복 가능한 파이프라인으로 정리한 내부 자동화 프로젝트입니다.", stack:"Internal infrastructure · Details undisclosed", private:true }
];

const categoryById = Object.fromEntries(categories.map((item) => [item.id,item]));
const svg = document.querySelector("#network");
const viewport = document.querySelector("#viewport");
const edgeLayer = document.querySelector("#edges");
const nodeLayer = document.querySelector("#nodes");
const panel = document.querySelector("#detail-panel");
const initial = new Map([...categories,...projects].map((item) => [item.id,{ x:item.x,y:item.y }]));
let selectedCategory = null;
let selectedProject = null;
let view = { x:0,y:0,scale:1 };
let gesture = null;
let ignoreCanvasClick = false;
let nodeById = new Map();
let animationFrame = null;
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderLegend() {
  document.querySelector("#legend").innerHTML = categories.map((category) => {
    const count = projects.filter((project) => project.categories.includes(category.id)).length;
    return `<button type="button" data-category="${category.id}" data-count="${count}" aria-pressed="false" style="--category:${category.color}">${category.name}</button>`;
  }).join("");
}

function renderGraph() {
  edgeLayer.innerHTML = projects.flatMap((project) => project.categories.map((categoryId) => {
    const category = categoryById[categoryId];
    return `<line class="edge" data-project="${project.id}" data-category="${categoryId}" style="--category:${category.color}" x1="${project.x}" y1="${project.y}" x2="${category.x}" y2="${category.y}"></line>`;
  })).join("");

  const categoryNodes = categories.map((category) => `<g class="node category-node" data-category="${category.id}" role="button" tabindex="0" aria-label="${category.name}" aria-pressed="false" style="--category:${category.color}" transform="translate(${category.x} ${category.y})"><circle class="hit" r="64"></circle><circle class="halo" r="53"></circle><circle class="core" r="42"></circle><text class="label" y="1">${category.name}</text></g>`).join("");
  const projectNodes = projects.map((project) => {
    const color = categoryById[project.primary].color;
    const anchor = project.align === "end" ? "end" : "start";
    const labelX = project.align === "end" ? -22 : 22;
    return `<g class="node project-node" data-project="${project.id}" role="button" tabindex="0" aria-label="${project.name}" aria-pressed="false" style="--category:${color}" transform="translate(${project.x} ${project.y})"><circle class="hit" r="30"></circle><circle class="ring" r="16"></circle><circle class="dot" r="9"></circle><text class="label" x="${labelX}" y="1" text-anchor="${anchor}">${project.name}</text></g>`;
  }).join("");
  nodeLayer.innerHTML = categoryNodes + projectNodes;
  nodeById = new Map([...categories,...projects].map((item) => [item.id,nodeLayer.querySelector(`[data-${categoryById[item.id] ? "category" : "project"}="${item.id}"]`)]));
}

function updateEdges() {
  document.querySelectorAll(".edge").forEach((edge) => {
    const project = projects.find((item) => item.id === edge.dataset.project);
    const category = categoryById[edge.dataset.category];
    edge.setAttribute("x1",project.renderX ?? project.x); edge.setAttribute("y1",project.renderY ?? project.y);
    edge.setAttribute("x2",category.renderX ?? category.x); edge.setAttribute("y2",category.renderY ?? category.y);
  });
}

function updateTransform() {
  viewport.setAttribute("transform",`translate(${view.x} ${view.y}) scale(${view.scale})`);
}

function applySelection() {
  document.querySelectorAll(".legend button").forEach((button) => button.setAttribute("aria-pressed",String(button.dataset.category === selectedCategory)));
  document.querySelectorAll(".category-node").forEach((node) => {
    const active = selectedProject ? projects.find((item) => item.id === selectedProject).categories.includes(node.dataset.category) : node.dataset.category === selectedCategory;
    node.classList.toggle("is-muted",Boolean((selectedCategory || selectedProject) && !active));
    node.setAttribute("aria-pressed",String(active));
  });
  document.querySelectorAll(".project-node").forEach((node) => {
    const project = projects.find((item) => item.id === node.dataset.project);
    const active = selectedProject ? node.dataset.project === selectedProject : !selectedCategory || project.categories.includes(selectedCategory);
    node.classList.toggle("is-muted",!active);
    node.setAttribute("aria-pressed",String(node.dataset.project === selectedProject));
  });
  document.querySelectorAll(".edge").forEach((edge) => {
    const active = selectedProject ? edge.dataset.project === selectedProject : selectedCategory ? edge.dataset.category === selectedCategory : false;
    edge.classList.toggle("is-active",active);
    edge.classList.toggle("is-muted",Boolean((selectedCategory || selectedProject) && !active));
  });
}

function selectCategory(id) {
  selectedCategory = selectedCategory === id ? null : id;
  selectedProject = null;
  closePanel();
  applySelection();
}

function selectProject(id) {
  selectedProject = id;
  selectedCategory = null;
  applySelection();
  openPanel(projects.find((item) => item.id === id));
}

function openPanel(project) {
  const tags = project.categories.map((id) => `<span>${categoryById[id].name}</span>`).join("");
  const link = project.href ? `<a class="detail-link" href="${project.href}"${project.href.startsWith("http") ? " target=\"_blank\" rel=\"noopener noreferrer\"" : ""}>${project.linkLabel || "GitHub"} ↗</a>` : `<p class="detail-private">Private company repository</p>`;
  panel.innerHTML = `<button class="detail-close" type="button" aria-label="닫기">×</button><span class="detail-kind">${project.type}</span><h2>${project.name}</h2><p class="detail-summary">${project.summary}</p><div class="detail-tags">${tags}</div><dl class="detail-list"><div><dt>Role</dt><dd>${project.role}</dd></div><div><dt>What I did</dt><dd>${project.work}</dd></div><div><dt>Stack</dt><dd>${project.stack}</dd></div></dl>${link}`;
  panel.setAttribute("aria-hidden","false");
  panel.classList.add("is-open");
  panel.querySelector(".detail-close").addEventListener("click",clearSelection);
}

function closePanel() {
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden","true");
}

function clearSelection() {
  selectedCategory = null;
  selectedProject = null;
  closePanel();
  applySelection();
}

function graphPoint(clientX,clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX; point.y = clientY;
  return point.matrixTransform(viewport.getScreenCTM().inverse());
}

function moveNode(element,clientX,clientY) {
  const point = graphPoint(clientX,clientY);
  const item = element.dataset.project ? projects.find((entry) => entry.id === element.dataset.project) : categoryById[element.dataset.category];
  item.x = point.x; item.y = point.y;
  item.renderX = point.x; item.renderY = point.y;
  element.setAttribute("transform",`translate(${point.x} ${point.y})`);
  updateEdges();
}

function drawMotion(time = 0) {
  const items = [...categories,...projects];
  items.forEach((item,index) => {
    const isCategory = Boolean(categoryById[item.id]);
    const isDragged = gesture?.node === nodeById.get(item.id);
    const amplitude = motionPreference.matches || isDragged ? 0 : isCategory ? 2.2 : 3.8;
    const speed = .00016 + index % 5 * .000018;
    item.renderX = item.x + Math.sin(time * speed + index * 1.73) * amplitude;
    item.renderY = item.y + Math.cos(time * speed * .83 + index * 1.21) * amplitude;
    nodeById.get(item.id)?.setAttribute("transform",`translate(${item.renderX} ${item.renderY})`);
  });
  updateEdges();
}

function animate(time) {
  drawMotion(time);
  animationFrame = requestAnimationFrame(animate);
}

function syncMotion() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = null;
  if (motionPreference.matches || document.hidden) drawMotion();
  else animationFrame = requestAnimationFrame(animate);
}

svg.addEventListener("pointerdown",(event) => {
  const node = event.target.closest(".node");
  svg.setPointerCapture(event.pointerId);
  gesture = { node, startX:event.clientX, startY:event.clientY, lastX:event.clientX, lastY:event.clientY, moved:false };
  if (!node) svg.classList.add("is-panning");
});

svg.addEventListener("pointermove",(event) => {
  if (!gesture) return;
  const dx = event.clientX - gesture.lastX;
  const dy = event.clientY - gesture.lastY;
  if (Math.hypot(event.clientX - gesture.startX,event.clientY - gesture.startY) > 4) gesture.moved = true;
  if (gesture.node) moveNode(gesture.node,event.clientX,event.clientY);
  else {
    view.x += dx * 1400 / svg.clientWidth;
    view.y += dy * 850 / svg.clientHeight;
    updateTransform();
  }
  gesture.lastX = event.clientX; gesture.lastY = event.clientY;
});

svg.addEventListener("pointerup",(event) => {
  ignoreCanvasClick = Boolean(gesture?.moved || gesture?.node);
  if (ignoreCanvasClick) setTimeout(() => { ignoreCanvasClick = false; },0);
  if (gesture && !gesture.moved) {
    if (!gesture.node) clearSelection();
    else if (gesture.node.dataset.project) selectProject(gesture.node.dataset.project);
    else selectCategory(gesture.node.dataset.category);
  }
  gesture = null;
  svg.classList.remove("is-panning");
  if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
});

svg.addEventListener("click",(event) => {
  if (ignoreCanvasClick) { ignoreCanvasClick = false; return; }
  if (!event.target.closest(".node")) clearSelection();
});
document.querySelector(".canvas-background").addEventListener("click",clearSelection);
edgeLayer.addEventListener("click",clearSelection);

svg.addEventListener("wheel",(event) => {
  event.preventDefault();
  view.scale = Math.min(1.8,Math.max(.55,view.scale * (event.deltaY < 0 ? 1.1 : .9)));
  updateTransform();
},{ passive:false });

nodeLayer.addEventListener("keydown",(event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  const node = event.target.closest(".node");
  if (node.dataset.project) selectProject(node.dataset.project);
  else selectCategory(node.dataset.category);
});

document.querySelector("#legend").addEventListener("click",(event) => {
  const button = event.target.closest("button[data-category]");
  if (button) selectCategory(button.dataset.category);
});

document.addEventListener("click",(event) => {
  if (!selectedCategory && !selectedProject) return;
  if (event.target.closest("#network,#legend,#detail-panel,.graph-controls,a")) return;
  clearSelection();
});

function zoom(multiplier) {
  view.scale = Math.min(1.8,Math.max(.55,view.scale * multiplier));
  updateTransform();
}
document.querySelector("#zoom-in").addEventListener("click",() => zoom(1.15));
document.querySelector("#zoom-out").addEventListener("click",() => zoom(.85));
document.querySelector("#reset-view").addEventListener("click",() => {
  [...categories,...projects].forEach((item) => { item.x = initial.get(item.id).x; item.y = initial.get(item.id).y; });
  document.querySelectorAll(".category-node").forEach((node) => { const item = categoryById[node.dataset.category]; node.setAttribute("transform",`translate(${item.x} ${item.y})`); });
  document.querySelectorAll(".project-node").forEach((node) => { const item = projects.find((entry) => entry.id === node.dataset.project); node.setAttribute("transform",`translate(${item.x} ${item.y})`); });
  view = { x:0,y:0,scale:1 };
  updateTransform(); updateEdges(); clearSelection();
});

renderLegend();
renderGraph();
syncMotion();
motionPreference.addEventListener("change",syncMotion);
document.addEventListener("visibilitychange",syncMotion);
