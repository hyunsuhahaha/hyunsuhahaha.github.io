'use strict';
// One shared clock keeps the workers in sync with the site's pause/visibility controls.
const companionStages=[
  [0,3.8,'typing',''],[3.8,4.8,'slumping','...'],[4.8,5.8,'wiping',''],
  [5.8,6.8,'checking','git diff'],[6.8,8.2,'stashing','git stash'],
  [8.2,9.6,'restoring','git stash pop'],[9.6,11,'committing','git commit'],
  [11,13,'pushing','git push'],[13,14,'delivered','pushed.'],
  [14,15.8,'rebasing','git pull --rebase'],[15.8,17.2,'conflicted','CONFLICT'],
  [17.2,19,'resolving','fixing...'],[19,20.4,'continuing','git rebase --continue'],
  [20.4,22.4,'pushing','git push'],[22.4,23.4,'delivered','pushed.'],[23.4,24.5,'slumping','...']
];
function companionPose(t,offset=0) {
  const cycle=(t+offset)%24.5;
  const stage=companionStages.find(([start,end])=>cycle>=start&&cycle<end);
  const [start,end,state,status]=stage,stageProgress=(cycle-start)/(end-start);
  const slump=state==='slumping'?Math.sin(stageProgress*Math.PI):0;
  const wipe=state==='wiping'?Math.sin(stageProgress*Math.PI):0;
  const typing=['typing','resolving','checking','committing','continuing','rebasing'].includes(state);
  const speed=state==='resolving'?31:21;
  return {cycle,state,status,stageProgress,slump,wipe,typing,
    pushing:state==='pushing',delivered:state==='delivered',progress:stageProgress,
    committed:state==='committing',stashing:state==='stashing',restoring:state==='restoring',
    rebasing:state==='rebasing'||state==='continuing',conflicted:state==='conflicted',
    crying:state!=='delivered',
    leftTap:typing?Math.max(0,Math.sin(t*speed+offset))*4:0,
    rightTap:typing?Math.max(0,Math.sin(t*speed+offset+Math.PI))*4:0};
}
(() => {
  const stage=document.querySelector('.hero');
  const stream=document.createElement('canvas');stream.id='commit-stream';stream.setAttribute('aria-hidden','true');
  document.querySelector('.tree-companions').prepend(stream);
  const streamCtx=stream.getContext('2d');
  function sizeStream(){
    const dpr=Math.min(devicePixelRatio||1,2);
    stream.width=Math.round(stage.clientWidth*dpr);stream.height=Math.round(stage.clientHeight*dpr);
    streamCtx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener('resize',sizeStream);sizeStream();
  const actors=[...document.querySelectorAll('[data-companion]')].map(canvas=>{
    const claude=canvas.dataset.companion==='claude',gemini=canvas.dataset.companion==='gemini';
    const actor={canvas,ctx:canvas.getContext('2d'),claude,gemini,offset:claude?8.6:gemini?16.4:0,ready:false};
    actor.image=new Image();actor.image.onload=()=>{actor.ready=true;draw(actor,typeof time==='number'?time:0);};
    actor.image.src=gemini?'assets/companions/gemini-mark.png':claude?'assets/companions/claude-mark.svg':'assets/companions/codex-mark.png';
    return actor;
  });
  function draw(actor,t) {
    const {canvas,ctx,claude,gemini}=actor,p=companionPose(t,actor.offset);
    canvas.dataset.state=p.state;
    ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,176,168);ctx.imageSmoothingEnabled=false;
    const shell=gemini?'#b4c9e3':claude?'#dc8e66':'#d8ebe3',shade=gemini?'#486ea5':claude?'#985a49':'#789e96',highlight=gemini?'#edf5ff':claude?'#ffd1a1':'#f4fff6';
    const display=gemini?'#8cc0ff':claude?'#eec193':'#8fffc2';
    const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
    function poly(points,color){ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
    function limb(ax,ay,bx,by,color,width=6){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='square';ctx.beginPath();ctx.moveTo(Math.round(ax),Math.round(ay));ctx.lineTo(Math.round(bx),Math.round(by));ctx.stroke();}
    // Grounded little worker: feet, seated body and an actual open laptop.
    ctx.globalAlpha=.4;rect(40,143,104,2,'#476654');rect(49,146,83,1,'#284239');ctx.globalAlpha=1;
    rect(61,118,15,14,'#3d545a');rect(104,118,14,14,'#3d545a');
    rect(54,130,22,9,shade);rect(104,130,23,9,shade);
    rect(58,137,18,2,highlight);rect(105,137,20,2,highlight);
    poly([[68,65],[105,65],[117,85],[111,112],[64,112],[58,85]],shade);
    rect(68,69,36,36,shell);rect(74,78,24,20,claude?'#ba7255':'#9ec6b5');
    rect(83,80,6,5,highlight);rect(81,85,10,2,highlight);
    // Oversized brand-shaped heads lean into the work, then visibly droop.
    const headX=88+Math.sin(t*2.5)*1.2+(p.conflicted?Math.sin(t*23)*2.2:0),headY=40+p.slump*12+(p.typing?Math.sin(t*10)*.8:0);
    ctx.save();ctx.translate(headX,headY);ctx.rotate((claude?-.04:.035)+p.slump*(claude?-.16:.16));
    if(claude){
      if(actor.ready)ctx.drawImage(actor.image,-31,-31,62,62);
      else {rect(-23,-23,46,46,shell);}
      // Half-closed eyes and a tiny overworked mouth sit inside Claude's spark.
      rect(-12,-4,8,5,'#422c28');rect(6,-4,8,5,'#422c28');
      rect(-11,-5,7,2,'#ffcda0');rect(7,-5,7,2,'#ffcda0');
      rect(-2,6,7,2,'#422c28');rect(3,8,2,2,'#422c28');
    }else if(gemini){
      if(actor.ready)ctx.drawImage(actor.image,-29,-29,58,58);
      else rect(-24,-24,48,48,shell);
      rect(-10,-2,6,3,'#153d69');rect(3,-2,6,3,'#153d69');rect(-4,7,8,2,'#abcce4');
    }else{
      if(actor.ready)ctx.drawImage(actor.image,-29,-29,58,58);
      else {rect(-24,-24,48,48,shell);}
      // The OpenAI knot remains the head silhouette; tired eyes occupy its centre.
      rect(-8,-4,6,3,'#80ffc0');rect(4,-4,6,3,'#80ffc0');
      rect(-3,5,7,2,'#b8e2ce');
    }
    if(Math.sin(t*1.1+(claude?2:0))>.985){rect(-13,-7,27,6,claude?'#dc8e66':'#080d18');rect(-10,-4,8,2,claude?'#422c28':'#80ffc0');rect(5,-4,8,2,claude?'#422c28':'#80ffc0');}
    ctx.restore();
    // Upper arms pivot; the wrists alternate rapidly over the keyboard.
    limb(65,78,50,94,shade,8);limb(109,78,126,94,shade,8);
    const leftX=70-p.wipe*12,leftY=124-p.leftTap-p.wipe*79;
    limb(50,94,leftX,leftY,shell,7);limb(126,94,109,124-p.rightTap,shell,7);
    // Screen is tilted, keyboard has depth; little code lines move as they type.
    poly([[60,83],[122,83],[126,119],[62,119]],'#91a6ae');
    poly([[63,85],[119,85],[122,115],[65,115]],'#152733');
    rect(66,86,52,2,'#45616c');
    const caretFrame=Math.floor(t*8)%6;
    ctx.font='6px Consolas, monospace';ctx.fillStyle=p.conflicted?'#ff8d77':display;ctx.textAlign='left';
    ctx.fillText(p.conflicted?'!!':'>_',69,97);
    for(let row=0;row<3;row++)for(let col=0;col<7;col++)if((row*3+col+caretFrame)%5!==0)rect(70+col*5,101+row*4,3,1,row===1?'#7a9ba1':display);
    rect(108+caretFrame,109,3,4,display);
    poly([[62,118],[126,118],[140,131],[47,131]],'#718b95');
    poly([[65,120],[122,120],[129,126],[58,126]],'#283d48');
    for(let row=0;row<2;row++)for(let col=0;col<10;col++)rect(63+col*6-row*3,121+row*3,4,1,'#91b5bb');
    rect(80,128,27,2,'#9ebbc1');rect(49,131,90,3,'#344e5d');rect(54,134,80,1,'#adc3bf');
    // Hands remain in front of the keys, except when one wipes the forehead.
    rect(leftX-5,leftY-3,11,6,highlight);rect(104,121-p.rightTap,11,6,highlight);
    if(p.typing){rect(72,116-p.leftTap,3,2,display);rect(108,116-p.rightTap,3,2,display);}
    if(p.crying){
      const drop=(t*1.9+(claude?.4:0))%1;
      for(const side of [-1,1]){
        const tx=headX+side*13,ty=headY+1+drop*22;
        rect(tx,ty,3,6,'#8edfff');rect(tx-1,ty+5,5,2,'#8edfff');
      }
    }
    if(p.slump>.5){
      ctx.font='9px Consolas,monospace';ctx.fillStyle=claude?'#efb589':'#a1dbc5';ctx.fillText('...',headX+30,headY+7);
    }
    if(p.stashing||p.restoring){
      // The unfinished work goes into a tiny stash drawer, then comes back out.
      rect(140,123,22,13,'#6f6856');rect(138,120,26,4,'#b9a780');
      rect(145,127,12,3,'#253b3a');rect(148,128,6,1,'#a2d8bb');
      const f=p.stashing?p.stageProgress:1-p.stageProgress;
      const px=105+f*45,py=112+f*8-Math.sin(f*Math.PI)*15;
      ctx.font='7px Consolas,monospace';ctx.fillStyle=display;ctx.textAlign='center';ctx.fillText('[+]',px,py);
    }
    if(p.rebasing){
      // Three commits line up as the little worker rebases the branch.
      ctx.strokeStyle='#8baac2';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(132,47);ctx.lineTo(132,74);ctx.stroke();
      for(let i=0;i<3;i++){
        const x=132+Math.sin((p.stageProgress+i*.3)*Math.PI*2)*(1-p.stageProgress)*9;
        rect(x-2,49+i*10,4,4,display);
      }
    }
    if(p.conflicted){
      ctx.font='10px Consolas,monospace';ctx.fillStyle='#ef9c81';ctx.textAlign='center';ctx.fillText('?!',128,42);
    }
    if(p.status){
      ctx.textAlign='center';ctx.font='bold 8px Consolas,monospace';
      ctx.fillStyle=p.conflicted?'#ff8d77':p.delivered?'#baffc3':claude?'#ffd1a1':'#a3ffce';
      ctx.fillText(p.status,88,154);
    }

  }
  function drawTransfers(t){
    streamCtx.clearRect(0,0,stage.clientWidth,stage.clientHeight);
    const root=stage.getBoundingClientRect();
    const tree=document.getElementById('scene').getBoundingClientRect();
    const target={x:tree.left-root.left+width*(width<700?.5:.62),
      y:tree.top-root.top+height*(width<700?.50:.54)+.28*(width<700?1.25:1.05)*size};
    actors.forEach(actor=>{
      const pose=companionPose(t,actor.offset);
      if(!pose.pushing&&!pose.delivered)return;
      const box=actor.canvas.getBoundingClientRect();
      const source={x:box.left-root.left+box.width*.52,y:box.top-root.top+box.height*.73};
      const control={x:(source.x+target.x)*.5,y:Math.min(source.y,target.y)-45};
      function path(f){return {x:(1-f)**2*source.x+2*(1-f)*f*control.x+f*f*target.x,
        y:(1-f)**2*source.y+2*(1-f)*f*control.y+f*f*target.y};}
      const tone=actor.gemini?'#8bbdff':actor.claude?'#f4b17f':'#a4ffbf';
      streamCtx.font='10px Consolas,monospace';streamCtx.textAlign='center';
      if(pose.pushing){
        streamCtx.fillStyle=tone;
        for(let i=0;i<=24;i++){
          const f=i/24;if(f>pose.progress)break;
          const at=path(f);streamCtx.globalAlpha=.22;streamCtx.fillText(i%5===0?'+':'.',at.x,at.y);
        }
        const packet=path(pose.progress);streamCtx.globalAlpha=1;
        streamCtx.shadowColor=tone;streamCtx.shadowBlur=8;streamCtx.fillText('[+]',packet.x,packet.y);streamCtx.shadowBlur=0;
      }else{
        const fade=1-pose.stageProgress;
        streamCtx.fillStyle='#baffc4';streamCtx.globalAlpha=fade;
        streamCtx.shadowColor='#8bffac';streamCtx.shadowBlur=12;
        streamCtx.fillText('*',target.x,target.y);
        streamCtx.fillText('[ + ]',target.x,target.y-13);streamCtx.shadowBlur=0;
      }
      streamCtx.globalAlpha=1;
    });
  }
  let previous=-1,lastFrame=-100;
  function frame(now){
    const clock=typeof time==='number'?time:now/1000;
    if(!document.hidden&&(typeof sceneVisible==='undefined'||sceneVisible)&&clock!==previous&&now-lastFrame>=1000/30){
      actors.forEach(actor=>draw(actor,clock));drawTransfers(clock);previous=clock;lastFrame=now;
    }
    requestAnimationFrame(frame);
  }
  actors.forEach(actor=>draw(actor,0));requestAnimationFrame(frame);
})();
