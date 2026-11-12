'use strict';
(() => {
  const section = document.getElementById('journey');
  const canvas = document.getElementById('timeline-art');
  const ctx = canvas.getContext('2d', {alpha: true});
  const entries = [...section.querySelectorAll('.milestone')];
  let width=0, height=0, axis=0, nodes=[], pending=false, dpr=1;
  // Only entries left visible by the timeline filter are drawn; leaving entries drop out at once.
  let shown=entries;
  const isShown=entry=>!entry.hidden&&!entry.classList.contains('is-leaving');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let powered=-1, ignition=null, previousFrame=-100;
  const duration=1050;
  function ignite(index,now) {
    if(index===powered) return;
    if(powered>=0&&shown[powered]) shown[powered].classList.remove('is-igniting');
    powered=index;
    if(reduced.matches) {ignition=null;return;}
    ignition={index,start:now};
    shown[index].classList.add('is-igniting');
  }
  reduced.addEventListener('change',()=>{
    ignition=null; entries.forEach(e=>e.classList.remove('is-igniting')); schedule();
  });
  const colors={mint:'#a3d7b8',blue:'#99c8da',gold:'#d2bd91'};
  // Study and project branches. slot: lane beside the trunk (+ right, - left); forkAt: index of the
  // main milestone a branch leaves from (otherwise it forks just above its first event).
  const branches={
    algorithm:{color:'#ffcf3f',slot:1,forkAt:0},
    certs:{color:'#5cc8ff',slot:-1},
    security:{color:'#ff6f5e',slot:2,ongoing:true},
    'ci-cd':{color:'#ff9b4a',slot:1,ongoing:true},
    infra:{color:'#4fe08a',slot:-1,ongoing:true},
    'open-source':{color:'#b88cff',slot:-2,ongoing:true,upstream:true}};
  entries.forEach(entry=>{const b=branches[entry.dataset.branch];if(b)entry.dataset.side=b.slot<0?'left':'right';});
  let lanes=[];
  function layout() {
    width=section.clientWidth; height=section.clientHeight;
    const mobile=width<=700;
    const padding=parseFloat(getComputedStyle(section).paddingLeft);
    axis=mobile ? padding+10 : width*.5;
    dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const bounds=section.getBoundingClientRect();
    const laneX=slot=>mobile ? axis+16+((Math.abs(slot)-1)*2+(slot<0?1:0))*13 : axis+slot*26;
    const next=entries.filter(isShown);
    if(next.length!==shown.length||next.some((e,i)=>e!==shown[i])) {
      entries.forEach(e=>{e.classList.remove('is-igniting','is-current');e.removeAttribute('aria-current');});
      powered=-1; ignition=null;
    }
    shown=next;
    nodes=shown.map((entry,i)=>{
      const copy=entry.querySelector('.milestone-copy'), content=copy.getBoundingClientRect();
      const name=entry.dataset.branch, branch=branches[name];
      const declared=entry.dataset.side;
      const side=mobile ? 1 : declared==='left' ? -1 : declared==='right' ? 1 : i%2===0 ? 1 : -1;
      const x=branch ? laneX(branch.slot) : axis;
      const inset=branch&&!mobile ? parseFloat(getComputedStyle(copy)[side>0?'paddingLeft':'paddingRight'])||0 : 0;
      const left=content.left-bounds.left, textEdge=side>0 ? left+inset : left+content.width-inset;
      return {entry, y:content.top-bounds.top+content.height/2, x, side, branch:branch?name:null,
        reach:Math.max(22,Math.abs(textEdge-x)-12),
        tone:branch ? branch.color : colors[entry.dataset.tone]};
    });
    lanes=Object.entries(branches).map(([name,b])=>{
      const own=nodes.filter(n=>n.branch===name);
      if(!own.length) return null;
      const x=own[0].x, first=own[0].y, last=own[own.length-1].y;
      const forkNode=b.forkAt!=null ? nodes.find(n=>n.entry===entries[b.forkAt]) : null;
      const forkY=forkNode ? forkNode.y : first-48;
      return {x,color:b.color,forkY,bendY:forkY+Math.min(36,Math.abs(x-axis)*1.1+10),last,ongoing:!!b.ongoing,upstream:b.upstream?own:null};
    }).filter(Boolean);
    draw();
  }
  function draw(now=performance.now()) {
    pending=false;
    now=Number.isFinite(now)?now:performance.now();
    const bounds=section.getBoundingClientRect();
    if(bounds.bottom<0 || bounds.top>innerHeight || document.hidden || !nodes.length) {
      if(ignition&&shown[ignition.index]) shown[ignition.index].classList.remove('is-igniting');
      ignition=null; if(!nodes.length) ctx.clearRect(0,0,width,height); return;
    }
    ctx.clearRect(0,0,width,height);
    ctx.font='10px Plex, Consolas, monospace';ctx.textAlign='center';
    const focus=Math.max(0,Math.min(height,innerHeight*.52-bounds.top));
    let current=0;
    nodes.forEach((n,i)=>{if(Math.abs(n.y-focus)<Math.abs(nodes[current].y-focus)) current=i;});
    const inBand=Math.abs(nodes[current].y-focus)<=Math.min(150,innerHeight*.19);
    if(inBand) ignite(current,now);
    if(ignition && now-ignition.start>=duration) {
      shown[ignition.index].classList.remove('is-igniting'); ignition=null;
    }
    shown.forEach((entry,i)=>{
      entry.classList.toggle('is-current',i===current&&inBand);
      entry.classList.toggle('is-past',nodes[i].y<focus);
      if(i===current&&inBand) entry.setAttribute('aria-current','step');
      else entry.removeAttribute('aria-current');
    });
    function glyph(char,x,y,color,alpha=1) {
      ctx.fillStyle=color;ctx.globalAlpha=alpha;ctx.fillText(char,Math.round(x/6)*6,Math.round(y/10)*10);
    }
    function line(a,b,color,alpha=1) {
      const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/8));
      const char=Math.abs(b[0]-a[0])<2 ? '|' : Math.abs(b[1]-a[1])<2 ? '-' : (b[0]>a[0])===(b[1]>a[1]) ? '\\' : '/';
      for(let i=0;i<=n;i++) glyph(char,a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,color,alpha);
    }
    // Two roots converge into the chronological backbone.
    const firstY=nodes[0].y;
    const mobile=width<=700;
    const rootX=mobile ? width*.87 : width*.65;
    const joinY=firstY-65;
    const turnY=mobile ? Math.max(170,joinY-58) : 30;
    if(mobile) {
      line([width*.5,0],[rootX,44],'#37584c',.8);
      line([width*.5-14,0],[rootX-14,44],'#29443b',.8);
    }
    line([rootX,mobile?44:0],[rootX,turnY],'#37584c',.8);
    line([rootX,turnY],[axis,joinY],'#4e7764',.75);
    line([rootX-14,mobile?44:0],[rootX-14,turnY],'#29443b',.8);
    line([rootX-14,turnY],[axis-12,joinY],'#315448',.7);
    const end=height-80;
    for(let y=joinY;y<end;y+=10) {
      const passed=y<=focus;
      const alpha=passed ? .9 : .5;
      glyph(Math.round(y/10)%7===0 ? '+' : '|',axis,y,passed ? '#7dffac' : '#639c7c',alpha);
      const weave=Math.sin(y*.022)*9;
      glyph(':',axis-14+weave,y,'#325346',passed ? .85 : .5);
      glyph('.',axis+15-weave,y,'#527e68',passed ? .7 : .4);
    }
    // Branch lanes leave the trunk diagonally, run beside it and stay open while still active.
    for(const lane of lanes) {
      line([axis,lane.forkY],[lane.x,lane.bendY],lane.color,lane.forkY<=focus ? .8 : .45);
      const stop=lane.ongoing ? height-80 : lane.last;
      for(let y=lane.bendY+10;y<stop;y+=10) {
        const tail=y>lane.last;
        const fade=tail ? Math.max(.12,.5-(y-lane.last)/600) : y<=focus ? .8 : .42;
        glyph(tail ? ':' : '|',lane.x,y,lane.color,fade);
      }
      // Contributions merged upstream: each one rejoins the trunk with a merge arrow.
      if(lane.upstream) for(const n of lane.upstream) {
        const drop=Math.abs(lane.x-axis)+14, merged=n.y<=focus;
        line([lane.x,n.y+10],[axis,n.y+drop],lane.color,merged ? .9 : .5);
        glyph(merged ? '@' : 'o',axis,n.y+drop,merged ? '#e4dcff' : lane.color,merged ? 1 : .6);
      }
    }
    nodes.forEach((n,i)=>{
      const active=i===current&&inBand;
      const alpha=active ? 1 : i<current ? .85 : .65;
      const paint=active?'#8bffac':n.tone;
      const tip=[n.x+n.side*n.reach,n.y];
      if(n.branch) {
        line([n.x+n.side*12,n.y],tip,paint,alpha*.85);
        glyph('(',n.x-6,n.y,paint,alpha);glyph('o',n.x,n.y,paint,active ? 1 : .9);glyph(')',n.x+6,n.y,paint,alpha);
      } else {
        const stemStart=[n.x,n.y+26], elbow=[n.x+n.side*25,n.y];
        line(stemStart,elbow,paint,alpha);line(elbow,tip,paint,alpha);
        const node=['  .  ',' / \ ','< + >',' \ / ','  \u0027  '];
        node.forEach((row,j)=>[...row].forEach((char,k)=>{if(char!==' ') glyph(char,n.x+(k-2)*6,n.y+(j-2)*10,paint,active ? 1 : .65);}));
      }
      glyph('+',tip[0],tip[1],paint,alpha);
      if(active) {
        const pad=n.branch ? 14 : 24;
        glyph('[',n.x-pad,n.y,paint);glyph(']',n.x+pad,n.y,paint);
        for(let j=0;j<3;j++) glyph('.',n.x+n.side*(n.reach+6),n.y-10+j*10,paint,.5);
      }
    });
    const signal=Math.max(joinY,Math.min(end,focus));
    glyph('*',axis,signal,'#e2f8e9');
    if(ignition) {
      const n=nodes[ignition.index],age=(now-ignition.start)/duration;
      const envelope=Math.sin(Math.min(1,age*2)*Math.PI*.5)*(1-age);
      const pulseX=n.x+n.side*n.reach*Math.min(1,age/.22);
      // Current travels down the backbone and out through the branch.
      ctx.shadowColor='#8bffac';ctx.shadowBlur=12;
      for(let k=0;k<7;k++) glyph(k===0?'*':'+',pulseX-n.side*k*6,n.y,'#8bffac',(1-k/8)*envelope);
      const entry=shown[ignition.index];
      const targets=[entry.querySelector('.milestone-copy'),entry.querySelector('.milestone-art')].filter(Boolean);
      for(const [targetIndex,target] of targets.entries()) {
        const box=target.getBoundingClientRect(),localY=box.top-bounds.top;
        const cx=box.left+box.width*.5,cy=localY+box.height*.5;
        // Broken ASCII filaments hug the content rather than flashing the viewport.
        for(let bolt=0;bolt<3;bolt++) {
          const direction=targetIndex===0?n.side:-n.side;
          const reach=Math.min(box.width*.65,120);
          const drift=age*18+bolt*1.7;
          const start=[cx-direction*reach*.5,cy+(bolt-1)*24];
          for(let j=0;j<11;j++) {
            const x=start[0]+direction*j*reach/10;
            const y=start[1]+Math.sin(j*2.1+drift)*9*(1-age);
            const visible=Math.sin(j*1.4+age*12+bolt)>-.3;
            if(visible) glyph(j%4===0?'*':j%2?'/':'\\',x,y,j%4===0?'#e4fff4':'#8bffac',envelope*.85);
          }
        }
        // A scan of energy crosses each symbol and disperses into a few sparks.
        const scanY=localY+box.height*Math.min(1,age/.75);
        for(let j=0;j<10;j++) glyph(j%3===0?'+':'-',box.left+box.width*j/10,scanY,'#8bffac',envelope*.6);
        for(let spark=0;spark<12;spark++) {
          const angle=spark*2.399+targetIndex;
          const r=15+age*85;
          const x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r*.6;
          glyph(spark%3===0?'*':'.',x,y,'#8bffac',envelope*.8);
        }
      }
      ctx.shadowBlur=0;
    }
    ctx.globalAlpha=1;
    if(ignition && !pending) {
      pending=true;
      requestAnimationFrame(stamp=>{
        if(stamp-previousFrame<1000/30) {pending=false;schedule();return;}
        previousFrame=stamp;draw(stamp);
      });
    }
  }
  function schedule() { if(!pending) {pending=true;requestAnimationFrame(draw);} }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',layout);
  addEventListener('timeline-filter',layout);
  if(typeof ResizeObserver!=='undefined') new ResizeObserver(layout).observe(section);
  document.fonts.ready.then(layout);
  layout();
})();
