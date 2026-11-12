// node portfolio-local/check-companions.cjs
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
let frames=[],painted=0,packets=0;
const ctx=new Proxy({}, {get(target,key){if(key in target)return target[key];return (...args)=>{if(key==='fillRect')assert.ok(args.every(Number.isFinite));if(key==='fillText'&&args[0]==='[+]')packets++;painted++;};},set(t,k,v){t[k]=v;return true;}});
const hero={clientWidth:855,clientHeight:960,getBoundingClientRect:()=>({left:0,top:0})};
const actors=['codex','claude','gemini'].map((name,i)=>({dataset:{companion:name},getContext:()=>ctx,getBoundingClientRect:()=>({left:20+i*140,top:700,width:148,height:141})}));
const sandbox={time:0,sceneVisible:true,width:855,height:960,size:700,devicePixelRatio:1,
 document:{hidden:false,querySelector:q=>q==='.hero'?hero:{prepend(){}},querySelectorAll:()=>actors,getElementById:()=>hero,
  createElement:()=>({setAttribute(){},getContext:()=>ctx})},Image:class{},addEventListener(){},requestAnimationFrame:fn=>frames.push(fn)};
vm.createContext(sandbox);vm.runInContext(fs.readFileSync(`${__dirname}/companions.js`,'utf8'),sandbox);
for(const [t,state] of [[0,'typing'],[4.2,'slumping'],[5.2,'wiping'],[6.2,'checking'],[7,'stashing'],[8.5,'restoring'],[10,'committing'],[12,'pushing'],[13.5,'delivered'],[14.5,'rebasing'],[16,'conflicted'],[18,'resolving'],[19.5,'continuing'],[21,'pushing']]){
 assert.equal(vm.runInContext(`companionPose(${t}).state`,sandbox),state);
}
assert.ok(vm.runInContext('companionStages.every(stage=>[...stage[3]].every(c=>c.charCodeAt(0)<128))',sandbox),'All visible event labels are English/ASCII');
assert.notEqual(vm.runInContext('companionPose(.1).leftTap',sandbox),vm.runInContext('companionPose(.2).leftTap',sandbox));
let stamp=0;
function frame(t){sandbox.time=t;stamp+=100;const next=frames;frames=[];next.forEach(fn=>fn(stamp));}
frame(4.2);assert.equal(actors[0].dataset.state,'slumping');assert.equal(actors[1].dataset.state,'pushing');assert.equal(actors[2].dataset.state,'pushing');
frame(12);assert.ok(packets>0,'Push must travel to the tree');
const before=painted;frame(12);assert.equal(painted,before,'Paused shared clock must not animate');
sandbox.sceneVisible=false;frame(12.2);assert.equal(painted,before,'Offscreen animation stops');
console.log('PASS: typing hands, tears/rest, stash/pop, rebase/conflict/continue, staggered workers, push delivery, pause and offscreen behavior');
