// node portfolio-local/check-tree.cjs
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
for(const reduced of [false,true]) {
 const links=[],events={};let glyphs=0;
 const ctx={setTransform(){},fillRect(){},fillText(c,x,y){assert.ok(Number.isFinite(x+y));glyphs++;}};
 function element(tag){return {tag,children:[],attributes:{},events:{},style:{setProperty(k,v){this[k]=v;}},appendChild(e){this.children.push(e);if(e.className==='tech-fruit')links.push(e);},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,v){this.events[k]=v;}};}
 const canvas={clientWidth:390,clientHeight:770,offsetLeft:0,offsetTop:150,getContext:()=>ctx};
 const layer=element('nav'),button=element('button');
 const sandbox={devicePixelRatio:1,document:{hidden:false,getElementById:id=>id==='scene'?canvas:id==='tech-fruits'?layer:button,createElement:element},
  matchMedia:()=>({matches:reduced,addEventListener(){}}),Image:class{},requestAnimationFrame(){},addEventListener:(k,v)=>events[k]=v};
 vm.createContext(sandbox);vm.runInContext(fs.readFileSync(`${__dirname}/tree.js`,'utf8'),sandbox);
 assert.equal(links.length,17);assert.ok(glyphs>1000);
 assert.ok(vm.runInContext('fruits.every(f=>f.tip&&f.middle&&f.root&&f.position.every(Number.isFinite))',sandbox));
 assert.ok(vm.runInContext('fruits.every(f=>f.art.every(row=>[...row].every(c=>c.charCodeAt(0)<128)))',sandbox));
 for(const f of vm.runInContext('fruits.map(f=>({name:f.name}))',sandbox)) assert.ok(fs.existsSync(`${__dirname}/assets/tech/${f.name.toLowerCase()}.svg`));
 links[0].events.pointerenter();
 assert.equal(layer.children[0].hidden,false);assert.equal(layer.children[0].textContent,'Python');
 const before=vm.runInContext('spin',sandbox);vm.runInContext('frame(100);frame(150)',sandbox);
 assert.equal(vm.runInContext('spin',sandbox)>before,!reduced,'Hover must not freeze rotation');
 assert.ok(parseFloat(links[0].style.top)>=150,'DOM fruit includes canvas offset on mobile');
 links[0].events.pointerleave();assert.equal(layer.children[0].hidden,true);
 console.log(`PASS reduced=${reduced}: 17 anchored fruit, logo assets, ASCII fallback, mobile offset, hover tooltip, continuous rotation`);
}
