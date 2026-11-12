
'use strict';
const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d', {alpha: false});
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let width, height, size, cellX, cellY, columns, rows;
let time = 0, last = 0, rendered = -100, paused = motion.matches, sceneVisible = true;
let pointerX = 0, pointerY = 0, leanX = 0, leanY = 0;
let spin=.52, fruitFocus=-1;
let seed = 8128;
function random() { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }
const points = [], routes = [];
const fruits=[
  {
    "name": "Python",
    "tier": 0,
    "branch": 1,
    "tone": "#ffd644",
    "url": "https://github.com/hyunsuhahaha/gitea-auto-reviewer",
    "art": [
      "   .----.",
      "  / o   |",
      "  |  .--+",
      "  +--.  |",
      "  |   o /",
      "  '----'"
    ]
  },
  {
    "name": "C++",
    "tier": 1,
    "branch": 1,
    "tone": "#659eff",
    "url": "https://github.com/hyunsuhahaha",
    "art": [
      "   .####.",
      "  /######\\",
      " |## C++##|",
      "  \\######/",
      "   '####'"
    ]
  },
  {
    "name": "Java",
    "tier": 2,
    "branch": 1,
    "tone": "#ff8e38",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "     ) (",
      "    (  )",
      "   .----.",
      "   |    |)",
      "   `----'",
      "  ======="
    ]
  },
  {
    "name": "Go",
    "tier": 2,
    "branch": 5,
    "tone": "#30d6ff",
    "url": "https://github.com/hyunsuhahaha/public-api-monitor",
    "art": [
      "  __   __",
      " /o \\_/o \\",
      "|   ___   |",
      "|  (___)  |",
      " \\_______/",
      "   /   \\"
    ]
  },
  {
    "name": "Django",
    "tier": 3,
    "branch": 1,
    "tone": "#32df8b",
    "url": "https://github.com/hyunsuhahaha/gitea-auto-reviewer",
    "art": [
      "     _",
      "  __| | _",
      " / _` || |",
      "| (_| || |",
      " \\__,_|/ |",
      "     |__/"
    ]
  },
  {
    "name": "FastAPI",
    "tier": 3,
    "branch": 0,
    "tone": "#00e0ba",
    "url": "https://github.com/hyunsuhahaha",
    "art": [
      "    _____",
      "   /  __/",
      "  /  /__",
      " /____  /",
      "     / /",
      "    /_/"
    ]
  },
  {
    "name": "Spring",
    "tier": 3,
    "branch": 5,
    "tone": "#8ce33f",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "    __..--/",
      " .-\\   / /",
      "/  \\  / /",
      "|---\\/ /",
      " \\___\\/",
      "     /"
    ]
  },
  {
    "name": "Docker",
    "tier": 4,
    "branch": 1,
    "tone": "#20bfff",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "     [_]",
      " [_][_][_]",
      " [_][_][_]_",
      "============\\_",
      " \\_ o       _/",
      "   \\_______/"
    ]
  },
  {
    "name": "Kubernetes",
    "tier": 4,
    "branch": 5,
    "tone": "#6997ff",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "    \\ | /",
      "   .-\\|/-.",
      " --|--O--|--",
      "   '-/|\\-'",
      "    / | \\"
    ]
  },
  {
    "name": "PostgreSQL",
    "tier": 4,
    "branch": 6,
    "tone": "#62aaff",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "   .----.",
      "  / .  . \\",
      " /|  /\\  |\\",
      "(_| /  \\ |_)",
      "  | |  | |",
      "   \\_\\ |_/"
    ]
  },
  {
    "name": "AWS",
    "tier": 5,
    "branch": 0,
    "tone": "#ffb52e",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "",
      "  aws",
      "",
      "  \\______,",
      "        /"
    ]
  },
  {
    "name": "Cloudflare",
    "tier": 5,
    "branch": 4,
    "tone": "#ff8c2b",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "     \\|/",
      "   .-***-.",
      " _/       \\",
      "/  .---.   |",
      "\\_/     \\__/",
      " ==========="
    ]
  },
  {
    "name": "Terraform",
    "tier": 5,
    "branch": 6,
    "tone": "#b379ff",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "  ___  ___",
      " /__/|/__/|",
      " |  ||  |/",
      " |__|/___/",
      "    /__/|",
      "    |__|/"
    ]
  },
  {
    "name": "Airflow",
    "tier": 6,
    "branch": 7,
    "tone": "#49e7ce",
    "url": "https://github.com/hyunsuhahaha",
    "art": [
      "   /\\  __",
      "  /  \\/ /",
      "  \\  / /",
      "  / O /",
      " / /\\  \\",
      " \\/  \\_/"
    ]
  },
  {
    "name": "Linux",
    "tier": 6,
    "branch": 5,
    "tone": "#fff3b0",
    "url": "https://github.com/hyunsuhahaha",
    "art": [
      "    .--.",
      "   |o_o |",
      "   |:_/ |",
      "  /|   |\\",
      " ( |   | )",
      " /_'---'_\\"
    ]
  },
  {
    "name": "Git",
    "tier": 6,
    "branch": 3,
    "tone": "#ff684e",
    "url": "https://github.com/SoftBank-team-lily",
    "art": [
      "     /\\",
      "    /o \\",
      "   / |\\ \\",
      "   \\ o o/",
      "    \\  /",
      "     \\/"
    ]
  },
  {
    "name": "Gitea",
    "tier": 7,
    "branch": 0,
    "tone": "#a3e343",
    "url": "https://github.com/hyunsuhahaha/gitea-auto-reviewer",
    "art": [
      "    ____",
      "   |  > |__",
      "   | /o |  )",
      "   |  | |_/",
      "    \\___/",
      "   ======="
    ]
  }
];
const fruitLayer=document.getElementById('tech-fruits');
const fruitTooltip=document.createElement('div');
fruitTooltip.id='fruit-tooltip';fruitTooltip.hidden=true;fruitTooltip.setAttribute('role','tooltip');fruitLayer.appendChild(fruitTooltip);
fruits.forEach((fruit,index)=>{
  const link=document.createElement('a');link.className='tech-fruit';
  link.href=fruit.url;link.target='_blank';link.rel='noopener noreferrer';
  link.setAttribute('aria-label',`${fruit.name} — GitHub`);
  link.style.setProperty('--fruit-tone',fruit.tone);
  const drawing=document.createElement('pre');drawing.className='fruit-ascii';drawing.setAttribute('aria-hidden','true');
  fruit.art.forEach(row=>{const span=document.createElement('span');span.textContent=row||' ';drawing.appendChild(span);});
  link.appendChild(drawing);fruitLayer.appendChild(link);fruit.element=link;
  const enter=(keyboard=false)=>{
    if(keyboard&&fruit.tip)spin=Math.atan2(fruit.tip[2],fruit.tip[0])-Math.PI/2;
    fruitFocus=index;fruitTooltip.textContent=fruit.name;fruitTooltip.hidden=false;render();
  };
  const leave=()=>{if(fruitFocus===index){fruitFocus=-1;fruitTooltip.hidden=true;}render();};
  link.addEventListener('pointerenter',()=>enter());link.addEventListener('pointerleave',leave);
  link.addEventListener('focus',()=>enter(true));link.addEventListener('blur',leave);
  const image=new Image();
  image.onload=()=>{
    try {
      const sampler=document.createElement('canvas');sampler.width=128;sampler.height=128;
      const sample=sampler.getContext('2d',{willReadFrequently:true});sample.drawImage(image,0,0,128,128);
      const pixels=sample.getImageData(0,0,128,128).data;
      let left=128,right=0,top=128,bottom=0;
      for(let y=0;y<128;y++)for(let x=0;x<128;x++)if(pixels[(y*128+x)*4+3]>64){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
      if(right<=left||bottom<=top)return;
      const cols=20,rows=Math.max(5,Math.min(15,Math.round(cols*.60*(bottom-top+1)/(right-left+1))));
      const tiny=document.createElement('canvas');tiny.width=cols;tiny.height=rows;
      const paint=tiny.getContext('2d',{willReadFrequently:true});
      paint.drawImage(sampler,left,top,right-left+1,bottom-top+1,0,0,cols,rows);
      const ink=paint.getImageData(0,0,cols,rows).data;
      drawing.replaceChildren();fruit.art=Array.from({length:rows},()=>''.padEnd(cols,' '));
      for(let y=0;y<rows;y++){
        const row=document.createElement('span');row.className='fruit-row';
        for(let x=0;x<cols;x++){
          const k=(y*cols+x)*4,alpha=ink[k+3]/255;
          const glyph=document.createElement('span');glyph.className='fruit-glyph';
          glyph.textContent=alpha>.72?'#':alpha>.22?'%':' ';
          let r=ink[k],g=ink[k+1],b=ink[k+2],high=Math.max(r,g,b);
          if(high<45){r=110;g=133;b=145;}else if(high<160){const gain=185/high;r=Math.min(255,r*gain);g=Math.min(255,g*gain);b=Math.min(255,b*gain);}
          glyph.style.color=`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
          row.appendChild(glyph);
        }
        drawing.appendChild(row);
      }
      render();
    }catch{/* Character-drawn fallback remains usable when file origins forbid sampling. */}
  };
  image.src=`assets/tech/${fruit.name.toLowerCase()}.svg`;
});
const palette = ['#3d7350', '#69a677', '#94ce99', '#f0efd2', '#a28b4d', '#f1c95e', '#fff0a3', '#e65d4d'];
function point(x, y, z, char, color, phase = random() * 6.28) {
  points.push({x, y, z, char, color, phase});
}
function line(a, b, color = 1, char = '.', traffic = false) {
  const length = Math.hypot(b[0]-a[0], b[1]-a[1], b[2]-a[2]);
  const n = Math.max(2, Math.ceil(length / .007));
  for (let i=0; i<=n; i++) {
    const f = i/n;
    point(...a.map((v,k) => v+(b[k]-v)*f), char, color);
  }
  if (traffic) routes.push({a, b, phase: random(), speed: .09 + random() * .12});
}
function node(x, y, z, r, color) {
  // Hexagonal pod outlines; short rack-like slots live inside each pod.
  const vertices = Array.from({length: 6}, (_,i) => {
    const a = i*Math.PI/3;
    return [x+Math.cos(a)*r, y+Math.sin(a)*r*.72, z];
  });
  vertices.forEach((v,i) => line(v, vertices[(i+1)%6], color, i%3 === 1 ? '|' : ':'));
  for (let i=-1; i<=1; i++) {
    line([x-r*.45,y+i*r*.23,z+.001], [x+r*.32,y+i*r*.23,z+.001], color, '=');
  }
  point(x+r*.48, y, z+.003, '+', color === 5 ? 6 : 3);
}
// A branching topology: progressively wider tiers, irregular boughs, clustered pods.
for (let tier=0; tier<8; tier++) {
  const y = -.43 + tier*.110;
  const radius = .055 + tier*.045;
  const count = 5 + Math.floor(tier*.7);
  for (let j=0; j<count; j++) {
    const a = j/count*Math.PI*2 + tier*.79;
    const middle = [Math.cos(a)*radius*.52, y+.035, Math.sin(a)*radius*.52];
    const tip = [Math.cos(a)*radius, y+.012, Math.sin(a)*radius];
    line([0,y+.085,0], middle, 1, ':', true);
    line(middle, tip, j%3 === 0 ? 4 : 2, '-', true);
    const fruit=fruits.find(f=>f.tier===tier&&f.branch===j);
    if(fruit) {fruit.tip=tip;fruit.middle=middle;fruit.root=[0,y+.085,0];}
    else node(...tip, .018 + tier*.001, j%4 === 0 ? 5 : 2);
    for (let k=0; k<3; k++) {
      const side = a+(k-1)*.28;
      const r = radius*(.66+random()*.27);
      const twig = [Math.cos(side)*r, y-.025-random()*.026, Math.sin(side)*r];
      line(middle, twig, 1, '.', k===1);
      if (tier>1 && k!==1) node(...twig, .011, 1);
    }
    // Sparse needles preserve the tree silhouette without filling its negative space.
    for (let k=0; k<32; k++) {
      const r = radius*(.48+random()*.55), angle = a+(random()-.5)*.34;
      point(Math.cos(angle)*r, y+(random()-.5)*.06, Math.sin(angle)*r,
        ['.', ':', '+', '*'][Math.floor(random()*4)], random()<.14 ? 2 : 0);
    }
  }
}
// Irregular fixed world positions: separate only fruit that are physically too close.
for(const fruit of fruits) {
  const reach=1.08+random()*.15;
  fruit.position=[fruit.tip[0]*reach,fruit.tip[1]+.045+random()*.055,fruit.tip[2]*reach];
}
for(let pass=0;pass<10;pass++)for(let i=0;i<fruits.length;i++)for(let j=i+1;j<fruits.length;j++) {
  const a=fruits[i].position,b=fruits[j].position;
  const delta=a.map((v,k)=>v-b[k]);
  const distance=Math.hypot(...delta);
  if(distance>0&&distance<.125) {
    const push=Math.min(.012,(.125-distance)*.24);
    for(let k=0;k<3;k++){a[k]+=delta[k]/distance*push;b[k]-=delta[k]/distance*push;}
  }
}
// A braided backbone, rather than a Christmas-tree trunk.
for (let strand=0; strand<5; strand++) {
  let previous;
  for (let j=0; j<=110; j++) {
    const y = -.46+j/110*.94, a = y*15+strand/5*Math.PI*2;
    const current = [Math.cos(a)*.019,y,Math.sin(a)*.019];
    if (previous) line(previous,current,strand%2 ? 4 : 2,'|');
    previous = current;
  }
}
// Suspended control-plane crown, made of two open hexagonal circuits.
for (let ring=0; ring<2; ring++) {
  const corners = Array.from({length:6}, (_,i) => {
    const a = i*Math.PI/3;
    return [Math.cos(a)*(.031+ring*.013), -.485+ring*.028, Math.sin(a)*(.031+ring*.013)];
  });
  corners.forEach((v,i) => line(v,corners[(i+1)%6],ring ? 4 : 5,'+',true));
}
// Roots fan into angular circuit traces across the ground plane.
for (let i=0; i<18; i++) {
  const a = i/18*Math.PI*2+.12, r = .34+random()*.24;
  const bend = [Math.cos(a)*r*.52,.49,Math.sin(a)*r*.52];
  const end = [bend[0]+Math.cos(a+.36)*r*.48,.49,bend[2]+Math.sin(a+.36)*r*.48];
  line([Math.cos(a)*.018,.44,Math.sin(a)*.018],bend, i%3 ? 0 : 4,'.',true);
  line(bend,end,i%3 ? 0 : 4,':',true);
  node(...end,.009,i%4 ? 1 : 5);
}
// Warm data garlands: a gold helix ties the colored fruit to the green canopy.
for(let i=0;i<480;i++) {
  const f=i/479,y=-.34+f*.73,a=f*Math.PI*9+.7,r=.065+f*.30;
  point(Math.cos(a)*r,y,Math.sin(a)*r,i%6===0?'o':i%2?'-':':',i%6===0?6:5);
}
const dust = Array.from({length:100}, () => ({x:random(),y:random(),phase:random()*6.28}));
function resize() {
  width = canvas.clientWidth; height = canvas.clientHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  size = Math.min(height*.92,width < 700 ? width*.99 : width*.78);
  cellY = Math.max(7,Math.min(10,size/78)); cellX = cellY*.62;
  columns = Math.ceil(width/cellX); rows = Math.ceil(height/cellY);
  render();
}
function render() {
  ctx.globalAlpha=1; ctx.fillStyle='#080d18'; ctx.fillRect(0,0,width,height);
  ctx.font=`${cellY}px Consolas, 'Courier New', monospace`;
  ctx.textAlign='center';
  const cells = new Map();
  const rotation = spin+leanX*.15;
  const cos = Math.cos(rotation), sin = Math.sin(rotation);
  function project(p, packet = false) {
    const x = p.x*cos+p.z*sin, z = p.z*cos-p.x*sin;
    const perspective = 1+z*.28;
    const sx = width*(width < 700 ? .5 : .62)+x*size*perspective;
    const sy = height*(width < 700 ? .50 : .54)+(p.y*(width<700?1.25:1.05)+z*.23+leanY*z*.07)*size;
    const col = Math.round(sx/cellX), row = Math.round(sy/cellY);
    if(col<0 || col>=columns || row<0 || row>=rows) return;
    const key=row*columns+col, previous=cells.get(key);
    if(previous && previous.z>z && !packet) return;
    const depth = Math.max(.42, Math.min(1,.93+z*.62));
    const scan = Math.max(0,1-Math.abs(p.y-((time*.11)%1.15-.57))/.065);
    cells.set(key,{x:col*cellX,y:row*cellY,z,char:p.char,color:p.color,
      alpha:packet ? 1 : Math.min(1,depth+scan*.18)});
  }
  for(const p of points) project(p);
  for(const route of routes) {
    const f=(time*route.speed+route.phase)%1;
    project({x:route.a[0]+(route.b[0]-route.a[0])*f,
      y:route.a[1]+(route.b[1]-route.a[1])*f,
      z:route.a[2]+(route.b[2]-route.a[2])*f,
      char:f>.94 ? '*' : ':',color:route.phase>.92 ? 7 : 6},true);
  }
  for(const d of dust) {
    ctx.fillStyle='#d9dbc8'; ctx.globalAlpha=.12+.10*Math.sin(d.phase+time*.3);
    ctx.fillText('.',d.x*width,d.y*height);
  }
  for(const p of cells.values()) {
    ctx.fillStyle=palette[p.color]; ctx.globalAlpha=p.alpha;
    ctx.fillText(p.char,p.x,p.y);
  }
  drawFruits(cos,sin);
  ctx.globalAlpha=1;
}
function drawFruits(cos,sin) {
  const rotation=spin+leanX*.15;
  const projectPosition=([px,py,pz])=>{
    const x=px*cos+pz*sin,z=pz*cos-px*sin;
    return {x:width*(width<700?.5:.62)+x*size*(1+z*.28),y:height*(width<700?.50:.54)+(py*(width<700?1.25:1.05)+z*.23+leanY*z*.07)*size,z};
  };
  const fontSize=width<700?6.3:Math.max(6.8,Math.min(8.2,size/98));
  function wire(a,b,color,alpha=1) {
    const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/6));
    ctx.fillStyle=color;ctx.globalAlpha=alpha;ctx.font='9px Consolas, monospace';
    const char=Math.abs(a.x-b.x)<4?'|':(a.x>b.x)===(a.y>b.y)?'\\':'/';
    for(let j=0;j<=n;j++)ctx.fillText(j%5===0?'+':char,a.x+(b.x-a.x)*j/n,a.y+(b.y-a.y)*j/n);
  }
  for(let index=0;index<fruits.length;index++) {
    const fruit=fruits[index];if(!fruit.tip)continue;
    const a=projectPosition(fruit.tip);
    const angle=Math.atan2(fruit.tip[2],fruit.tip[0]);
    const facing=Math.sin(angle-rotation),planeAngle=angle-rotation-Math.PI/2;
    const scale=1+a.z*.28;
    const center=projectPosition(fruit.position);
    const w=Math.max(...fruit.art.map(row=>row.length))*fontSize*.60;
    const h=fruit.art.length*fontSize*1.05;
    const active=fruitFocus===index;
    fruit.element.style.left=`${canvas.offsetLeft+center.x}px`;
    fruit.element.style.top=`${canvas.offsetTop+center.y}px`;
    fruit.element.style.width=`${w}px`;fruit.element.style.height=`${h}px`;
    fruit.element.style.fontSize=`${fontSize}px`;
    fruit.element.style.transform=`translate(-50%,-50%) perspective(650px) rotateY(${planeAngle}rad) scale(${scale})`;
    fruit.element.style.opacity=facing>.08?String(.8+Math.min(1,facing)*.2):'0';
    fruit.element.style.pointerEvents=facing>.18?'auto':'none';
    fruit.element.style.zIndex=String(10+Math.round((a.z+.5)*10));
    if(facing>0)wire(a,{x:center.x,y:center.y-h*.38},active?'#fff2b2':'#d1b361',active?1:.75);
    if(active) {
      const root=projectPosition(fruit.root),middle=projectPosition(fruit.middle);
      ctx.shadowColor='#8bffac';ctx.shadowBlur=12;
      wire(root,middle,'#a6ffbc');wire(middle,a,'#a6ffbc');ctx.shadowBlur=0;
      fruitTooltip.style.left=`${canvas.offsetLeft+center.x}px`;
      fruitTooltip.style.top=`${canvas.offsetTop+center.y+h*.5+10}px`;
    }
  }
}
function frame(now) {
  const delta=Math.min((now-last)/1000,.1); last=now;
  if(!paused && !document.hidden && sceneVisible) {
    time+=delta;
    spin+=delta*.065;leanX+=(pointerX-leanX)*.04; leanY+=(pointerY-leanY)*.04;
    if(now-rendered>=1000/30) { render(); rendered=now; }
  }
  requestAnimationFrame(frame);
}
addEventListener('pointermove',e => { pointerX=e.clientX/width-.5; pointerY=e.clientY/height-.5; });
addEventListener('pointerout',e => { if(!e.relatedTarget) { pointerX=0; pointerY=0; } });

motion.addEventListener('change',e => { paused=e.matches; syncMotion(); });
addEventListener('resize',resize);
const motionButton = document.getElementById('motion');
function syncMotion() {
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? '트리 애니메이션 재생' : '트리 애니메이션 일시정지');
  motionButton.innerHTML = paused
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
}
motionButton.addEventListener('click', () => { paused=!paused; syncMotion(); });
if(typeof IntersectionObserver !== 'undefined') new IntersectionObserver(([entry]) => { sceneVisible=entry.isIntersecting; }).observe(canvas);
syncMotion(); resize(); requestAnimationFrame(frame);
