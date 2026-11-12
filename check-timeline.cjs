// node portfolio-local/check-timeline.cjs
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
for(const reduced of [false,true]) {
 let top=900,now=0,queue=[],draws=0;
 const events={};
 const entries=Array.from({length:6},(_,i)=>{
  const classes=new Set();
  return {dataset:{tone:'mint'},classList:{toggle(k,on){on?classes.add(k):classes.delete(k)},add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)},
   setAttribute(){},removeAttribute(){},querySelector(selector){return {getBoundingClientRect:()=>({top:top+250+i*255,left:selector==='.milestone-copy'?550:150,width:200,height:120})}}};
 });
 const ctx={setTransform(){},clearRect(){},fillText(char,x,y){assert.ok(Number.isFinite(x+y));draws++}};
 const section={clientWidth:900,clientHeight:2000,querySelectorAll:()=>entries,getBoundingClientRect:()=>({top,bottom:top+2000})};
 const canvas={getContext:()=>ctx};
 const sandbox={innerHeight:800,devicePixelRatio:1,performance:{now:()=>now},
  document:{hidden:false,fonts:{ready:{then(){}}},getElementById:id=>id==='journey'?section:canvas},
  matchMedia:()=>({matches:reduced,addEventListener(){}}),getComputedStyle:()=>({paddingLeft:'48'}),
  addEventListener:(name,fn)=>events[name]=fn,requestAnimationFrame:fn=>queue.push(fn)};
 vm.createContext(sandbox);vm.runInContext(fs.readFileSync(`${__dirname}/timeline.js`,'utf8'),sandbox);
 assert.equal(draws,0,'No offscreen rendering');
 function frame(){now+=34;const callbacks=queue;queue=[];callbacks.forEach(f=>f(now));}
 top=0;events.scroll();frame();
 assert.ok(entries[0].classList.contains('is-current'));
 assert.equal(entries[0].classList.contains('is-igniting'),!reduced);
 for(let i=0;i<40;i++)frame();
 assert.ok(!entries[0].classList.contains('is-igniting'),'Ignition must settle');
 assert.equal(queue.length,0,'No idle animation loop');
 events.scroll();frame();
 assert.ok(!entries[0].classList.contains('is-igniting'),'Same item must not retrigger');
 top=-180;events.scroll();frame();
 assert.ok(entries[1].classList.contains('is-current'),'Next item receives power');
 assert.equal(entries[1].classList.contains('is-igniting'),!reduced);
 top=-2500;events.scroll();frame();
 assert.ok(!entries[1].classList.contains('is-igniting'),'Offscreen animation cancels');
 console.log(`PASS reduced=${reduced}: activation, finite drawing, one-shot ignition, settling, idle, next item, offscreen cancellation`);
}
