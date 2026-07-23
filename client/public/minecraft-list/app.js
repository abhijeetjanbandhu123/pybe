/* =========================================================================
   NAVIGATION & SETUP
   ========================================================================= */
const tabs = document.querySelectorAll('nav.tabs button');
const views = document.querySelectorAll('.view');
const startBtn = document.getElementById('startBtn');

function switchTab(tabId) {
  tabs.forEach(t => t.classList.remove('active'));
  views.forEach(v => v.classList.remove('active'));
  
  const targetTab = document.querySelector(`nav.tabs button[data-tab="${tabId}"]`);
  const targetView = document.getElementById(`view-${tabId}`);
  
  if(targetTab) targetTab.classList.add('active');
  if(targetView) targetView.classList.add('active');
}

tabs.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

startBtn.addEventListener('click', () => switchTab('story'));

/* =========================================================================
   CORE ENGINE
   ========================================================================= */
let uidCounter = 1;
function makeStage(trackEl){
  return {
    trackEl,
    items: [], 
    speed: 1,
    init(arr){
      this.items = arr.map(v => ({id: uidCounter++, value: v.name, icon: v.icon}));
      this.render(null);
    },
    snapshot(){ return this.items.map(i=>({name: i.value, icon: i.icon})); },
 
    render(highlight){
      const track = this.trackEl;
      const existing = new Map();
      track.querySelectorAll('.cell').forEach(c => existing.set(Number(c.dataset.id), c));
 
      const firstRects = new Map();
      existing.forEach((el,id) => firstRects.set(id, el.getBoundingClientRect()));
 
      const currentIds = this.items.map(i=>i.id);
 
      existing.forEach((el,id) => {
        if(!currentIds.includes(id)){
          el.classList.add('leave');
          setTimeout(()=>el.remove(), 380/this.speed);
        }
      });
 
      if(this.items.length === 0){
        if(!track.querySelector('.empty-state')){
          const es = document.createElement('div');
          es.className='empty-state';
          es.innerHTML = `<div class="big">📦</div><div>Inventory is empty</div>`;
          track.appendChild(es);
        }
      } else {
        const es = track.querySelector('.empty-state');
        if(es) es.remove();
      }
 
      let after = track.querySelector('.rail');
      this.items.forEach((item, idx) => {
        let el = existing.get(item.id);
        let isNew = false;
        if(!el){
          isNew = true;
          el = document.createElement('div');
          el.className = 'cell enter';
          el.dataset.id = item.id;
          el.innerHTML = `<div class="box"><div class="idx"></div><div class="box-icon"></div><div class="box-label"></div></div>`;
        } else {
          el.classList.remove('leave');
        }
        el.querySelector('.box-icon').textContent = item.icon || '📦';
        el.querySelector('.box-label').textContent = item.value;
        el.querySelector('.idx').textContent = idx;
        track.appendChild(el); 
      });
 
      requestAnimationFrame(()=>{
        this.trackEl.querySelectorAll('.cell').forEach(el=>{
          const id = Number(el.dataset.id);
          const first = firstRects.get(id);
          if(first && !el.classList.contains('enter')){
            const last = el.getBoundingClientRect();
            const dx = first.left - last.left;
            if(dx !== 0){
              el.style.transition='none';
              el.style.transform = `translateX(${dx}px)`;
              requestAnimationFrame(()=>{
                el.style.transition = `transform ${0.5/this.speed}s cubic-bezier(.2,.8,.2,1)`;
                el.style.transform = 'translateX(0)';
              });
            }
          }
        });
      });
 
      track.querySelectorAll('.cell').forEach(el=>{
        el.classList.remove('hl-add','hl-access','hl-del','hl-search','hl-sort','hl-update','bounce');
      });
 
      if(highlight){
        (highlight.ids||[]).forEach(id=>{
          const el = track.querySelector(`.cell[data-id="${id}"]`);
          if(el) el.classList.add('hl-'+highlight.type);
        });
        (highlight.bounceIds||[]).forEach(id=>{
          const el = track.querySelector(`.cell[data-id="${id}"]`);
          if(el) el.classList.add('bounce');
        });
      }
 
      setTimeout(()=>{
        track.querySelectorAll('.cell.enter').forEach(el=>el.classList.remove('enter'));
      }, 460/this.speed);
    }
  };
}

function getIcon(name) {
  const icons = {'Wood':'🪵', 'Stone':'🪨', 'Sword':'🗡️', 'Pickaxe':'⛏️', 'Apple':'🍎', 'Diamond':'💎', 'Iron':'🪩'};
  return icons[name] || '📦';
}

/* =========================================================================
   STORY LOGIC
   ========================================================================= */
const storyTrack = document.getElementById('storyTrack');
const storyStage = makeStage(storyTrack);
storyStage.init([]);

const storySteps = [
  {
    title: "1. The Empty Inventory",
    story: "Steve just spawned in a new world! He is ready to gather resources. But first, he checks his inventory. Right now, his hotbar is completely empty.",
    python: "In Python, a list is exactly like Steve's inventory hotbar. We create an empty list by setting a variable equal to square brackets `[]`.",
    expected: /inventory\s*=\s*\[\]/i,
    hint: "Type: inventory = []",
    action: () => {
      document.getElementById('storyCodeLine').textContent = "inventory = []";
      document.getElementById('storyLenPill').textContent = "len = 0";
      return true;
    }
  },
  {
    title: "2. Punching Trees",
    story: "Steve punches a tree and a block of Wood pops out! He picks it up to put it in his inventory.",
    python: "In Python, to add an item to a list, we use the `append()` command. This command always places the new item into the very next empty slot at the end of the hotbar.",
    expected: /inventory\.append\(['"]Wood['"]\)/i,
    hint: "Type: inventory.append('Wood')",
    action: () => {
      storyStage.items.push({id: uidCounter++, value: 'Wood', icon: getIcon('Wood')});
      storyStage.render({type:'add', ids:[storyStage.items[0].id], bounceIds:[storyStage.items[0].id]});
      document.getElementById('storyCodeLine').textContent = "inventory.append('Wood')";
      document.getElementById('storyLenPill').textContent = "len = 1";
      return true;
    }
  },
  {
    title: "3. Mining Stone",
    story: "Now Steve crafts a wooden pickaxe and mines some Stone. He picks up the Stone block.",
    python: "Because we use the `append()` command, the Stone is placed exactly after the Wood in the next available slot.",
    expected: /inventory\.append\(['"]Stone['"]\)/i,
    hint: "Type: inventory.append('Stone')",
    action: () => {
      storyStage.items.push({id: uidCounter++, value: 'Stone', icon: getIcon('Stone')});
      storyStage.render({type:'add', ids:[storyStage.items[1].id], bounceIds:[storyStage.items[1].id]});
      document.getElementById('storyCodeLine').textContent = "inventory.append('Stone')";
      document.getElementById('storyLenPill').textContent = "len = 2";
      return true;
    }
  },
  {
    title: "4. Finding Diamonds",
    story: "Steve digs deep into a cave and strikes blue! It's a Diamond! He quickly grabs it.",
    python: "Again, we use `append()` to add the Diamond to the end of our growing list.",
    expected: /inventory\.append\(['"]Diamond['"]\)/i,
    hint: "Type: inventory.append('Diamond')",
    action: () => {
      storyStage.items.push({id: uidCounter++, value: 'Diamond', icon: getIcon('Diamond')});
      storyStage.render({type:'add', ids:[storyStage.items[2].id], bounceIds:[storyStage.items[2].id]});
      document.getElementById('storyCodeLine').textContent = "inventory.append('Diamond')";
      document.getElementById('storyLenPill').textContent = "len = 3";
      return true;
    }
  },
  {
    title: "5. Inventory Check (len)",
    story: "Steve's pockets feel a bit heavy. He wants to know exactly how many items he is carrying right now.",
    python: "In Python, we use the `len()` function to get the length (or total size) of the list.",
    expected: /len\(inventory\)/i,
    hint: "Type: len(inventory)",
    action: () => {
      document.getElementById('storyCodeLine').textContent = "len(inventory)";
      return true;
    }
  },
  {
    title: "6. Creeper! (Insert)",
    story: "Oh no! A Creeper approaches! Steve quickly crafts a Sword. He needs it in his main hand immediately, which is slot 0. If he appends it, it goes to slot 3, which is too far!",
    python: "We use the `insert(index, item)` command to force the Sword into index `0`. The other items automatically shift right to make room without being destroyed.",
    expected: /inventory\.insert\(0,\s*['"]Sword['"]\)/i,
    hint: "Type: inventory.insert(0, 'Sword')",
    action: () => {
      const item = {id: uidCounter++, value: 'Sword', icon: getIcon('Sword')};
      storyStage.items.splice(0, 0, item);
      const movedIds = storyStage.items.slice(1).map(it=>it.id);
      storyStage.render({type:'add', ids:[item.id], bounceIds:movedIds});
      document.getElementById('storyCodeLine').textContent = "inventory.insert(0, 'Sword')";
      document.getElementById('storyLenPill').textContent = "len = 4";
      return true;
    }
  },
  {
    title: "7. Attack! (Pop)",
    story: "Steve attacks the Creeper with the Sword and defeats it! Phew. He puts the Sword away, removing it completely from his main hand (slot 0).",
    python: "The `pop(0)` command removes the item from that exact index and returns it. Everything else in the hotbar shifts left to fill the gap.",
    expected: /inventory\.pop\(0\)/i,
    hint: "Type: inventory.pop(0)",
    action: () => {
      const removed = storyStage.items[0];
      const movedIds = storyStage.items.slice(1).map(it=>it.id);
      storyStage.render({type:'del', ids:[removed.id], bounceIds:movedIds});
      storyStage.items.splice(0,1);
      document.getElementById('storyCodeLine').textContent = "inventory.pop(0)";
      document.getElementById('storyLenPill').textContent = "len = 3";
      return true;
    }
  },
  {
    title: "8. Organization (Sort)",
    story: "Steve is safe, but his inventory is disorganized. Wood, Stone, Diamond... He wants them sorted alphabetically so he can find things easily.",
    python: "The `sort()` command modifies the original list, sorting all of the items alphabetically or numerically in place.",
    expected: /inventory\.sort\(\)/i,
    hint: "Type: inventory.sort()",
    action: () => {
      storyStage.items.sort((a,b)=> a.value.localeCompare(b.value));
      storyStage.render({type:'sort', ids: storyStage.items.map(i=>i.id)});
      document.getElementById('storyCodeLine').textContent = "inventory.sort()";
      return true;
    }
  },
  {
    title: "9. Survived the Night!",
    story: "Steve survived! You now know the basics of how Python Lists manage data just like Minecraft manages your items.",
    python: "Lists can be accessed, sorted, counted, reversed, and more. Now, jump into the Creative Sandbox and try all 17 operations yourself!",
    expected: /.*/, 
    hint: "Click Go to Sandbox!",
    btnText: "Go to Creative Sandbox",
    action: () => {
      switchTab('sandbox');
      return false; 
    }
  }
];

let currentStoryStep = 0;
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const pythonText = document.getElementById('pythonText');
const pythonInterpretation = document.getElementById('pythonInterpretation');
const storyActionBtn = document.getElementById('storyActionBtn');
const storyCodeInput = document.getElementById('storyCodeInput');
const storyFeedback = document.getElementById('storyFeedback');
const stepIndicators = document.querySelectorAll('.step');

storyActionBtn.addEventListener('click', () => {
  const step = storySteps[currentStoryStep];
  
  if (currentStoryStep === storySteps.length - 1) {
     step.action();
     return;
  }
  
  const val = storyCodeInput.value.trim();
  if (step.expected.test(val)) {
    storyFeedback.style.color = '#55ff55';
    storyFeedback.textContent = "Operation Successful!";
    const advance = step.action();
    
    if (advance && currentStoryStep < storySteps.length - 1) {
      stepIndicators[currentStoryStep].classList.add('completed');
      currentStoryStep++;
      stepIndicators[currentStoryStep].classList.add('active');
      
      setTimeout(() => {
        const nextStep = storySteps[currentStoryStep];
        storyTitle.textContent = nextStep.title;
        storyText.innerHTML = nextStep.story;
        if(nextStep.python) {
           pythonText.innerHTML = nextStep.python;
           pythonInterpretation.style.display = 'block';
        } else {
           pythonInterpretation.style.display = 'none';
        }
        storyCodeInput.value = "";
        storyCodeInput.placeholder = nextStep.hint;
        storyFeedback.textContent = "";
        if (currentStoryStep === storySteps.length - 1) {
           storyCodeInput.style.display = 'none';
           document.getElementById('storyInstruction').style.display = 'none';
           storyActionBtn.textContent = nextStep.btnText;
        }
      }, 1000); 
    }
  } else {
    storyFeedback.style.color = '#ff5555';
    storyFeedback.textContent = "Error: " + step.hint;
  }
});

storyCodeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    storyActionBtn.click();
  }
});

/* =========================================================================
   SANDBOX LOGIC (All 17 Operations)
   ========================================================================= */
const OPS = {
  append:   {label:'append(x)',        color:'add',    complexity:'O(1)'},
  insert:   {label:'insert(i, x)',     color:'add',    complexity:'O(n)'},
  popLast:  {label:'pop()',            color:'del',    complexity:'O(1)'},
  popIndex: {label:'pop(i)',           color:'del',    complexity:'O(n)'},
  remove:   {label:'remove(x)',        color:'del',    complexity:'O(n)'},
  clear:    {label:'clear()',          color:'del',    complexity:'O(1)'},
  access:   {label:'list[i]',          color:'access', complexity:'O(1)'},
  update:   {label:'list[i] = x',      color:'update', complexity:'O(1)'},
  len:      {label:'len(list)',        color:'access', complexity:'O(1)'},
  contains: {label:'x in list',        color:'search', complexity:'O(n)'},
  index:    {label:'index(x)',         color:'search', complexity:'O(n)'},
  count:    {label:'count(x)',         color:'search', complexity:'O(n)'},
  del:      {label:'del list[i]',      color:'del',    complexity:'O(n)'},
  slice:    {label:'list[a:b]',        color:'access', complexity:'O(k)'},
  copy:     {label:'copy()',           color:'access', complexity:'O(n)'},
  extend:   {label:'extend(iter)',     color:'add',    complexity:'O(k)'},
  reverse:  {label:'reverse()',        color:'sort',   complexity:'O(n)'},
  sort:     {label:'sort()',           color:'sort',   complexity:'O(n log n)'}
};

const pgTrack = document.getElementById('track');
const pgStage = makeStage(pgTrack);
pgStage.init([{name:'Wood', icon:'🪵'}, {name:'Stone', icon:'🪨'}]);

const codeLineEl = document.getElementById('codeLine');
const lenPillEl = document.getElementById('lenPill');
const opPillEl = document.getElementById('opPill');
const explainGrid = document.getElementById('explainGrid');
const errBanner = document.getElementById('errBanner');
const historyListEl = document.getElementById('historyList');
const speedSlider = document.getElementById('speedSlider');

let pgHistory = [{label:"inventory = ['Wood', 'Stone']"}];

speedSlider.addEventListener('input', ()=>{ pgStage.speed = Number(speedSlider.value); });

function pushHistory(code){
  pgHistory.push({label: code});
  historyListEl.innerHTML = pgHistory.map((h,idx)=>`
    <div class="history-item ${idx===pgHistory.length-1?'current':''}">${idx===0?'':'> '}${h.label}</div>
  `).join('');
  historyListEl.scrollTop = historyListEl.scrollHeight;
}

document.getElementById('resetBtn').addEventListener('click', () => {
  pgStage.init([]);
  pgHistory = [{label:"inventory = []"}];
  codeLineEl.textContent = "inventory = []";
  lenPillEl.textContent = "len = 0";
  errBanner.innerHTML='';
  pushHistory(""); // re-render
});

function runOp(stage, opKey, params) {
  let code = '', what = '', highlight = null;
  const n = stage.items.length;
  
  if (opKey === 'append') {
    const v = params.value;
    code = `inventory.append('${v}')`;
    const item = {id: uidCounter++, value: v, icon: getIcon(v)};
    stage.items.push(item);
    what = `'${v}' appended to the end.`;
    highlight = {type:'add', ids:[item.id], bounceIds:[item.id]};
  }
  else if (opKey === 'insert') {
    let i = params.index; i = Math.max(0, Math.min(i, n));
    const v = params.value;
    code = `inventory.insert(${i}, '${v}')`;
    const item = {id: uidCounter++, value: v, icon: getIcon(v)};
    stage.items.splice(i, 0, item);
    const movedIds = stage.items.slice(i+1).map(it=>it.id);
    what = `'${v}' inserted at index ${i}.`;
    highlight = {type:'add', ids:[item.id], bounceIds: movedIds};
  }
  else if (opKey === 'popLast') {
    if(n === 0) throw new Error("Inventory is empty!");
    code = `inventory.pop()`;
    const removed = stage.items[n-1];
    highlight = {type:'del', ids:[removed.id]};
    stage.render(highlight);
    stage.items.pop();
    what = `Last item ('${removed.value}') popped out.`;
  }
  else if (opKey === 'popIndex') {
    let i = params.index;
    if(i < 0 || i >= n) throw new Error("Index out of bounds!");
    code = `inventory.pop(${i})`;
    const removed = stage.items[i];
    const movedIds = stage.items.slice(i+1).map(it=>it.id);
    highlight = {type:'del', ids:[removed.id], bounceIds: movedIds};
    stage.render(highlight);
    stage.items.splice(i, 1);
    what = `Item at index ${i} ('${removed.value}') popped.`;
  }
  else if (opKey === 'remove') {
    const v = params.value;
    const idx = stage.items.findIndex(it => it.value === v);
    if(idx === -1) throw new Error(`'${v}' not found in inventory!`);
    code = `inventory.remove('${v}')`;
    const removed = stage.items[idx];
    const movedIds = stage.items.slice(idx+1).map(it=>it.id);
    highlight = {type:'del', ids:[removed.id], bounceIds: movedIds};
    stage.render(highlight);
    stage.items.splice(idx, 1);
    what = `First instance of '${v}' removed.`;
  }
  else if (opKey === 'clear') {
    code = `inventory.clear()`;
    const ids = stage.items.map(i=>i.id);
    highlight = {type:'del', ids};
    stage.render(highlight);
    stage.items = [];
    what = `Inventory completely cleared.`;
  }
  else if (opKey === 'access') {
    let i = params.index;
    if(i < 0 || i >= n) throw new Error("Index out of bounds!");
    code = `inventory[${i}]`;
    what = `Accessed index ${i}: '${stage.items[i].value}'.`;
    highlight = {type:'access', ids:[stage.items[i].id], bounceIds:[stage.items[i].id]};
  }
  else if (opKey === 'update') {
    let i = params.index;
    if(i < 0 || i >= n) throw new Error("Index out of bounds!");
    const v = params.value;
    code = `inventory[${i}] = '${v}'`;
    stage.items[i].value = v;
    stage.items[i].icon = getIcon(v);
    what = `Index ${i} updated to '${v}'.`;
    highlight = {type:'update', ids:[stage.items[i].id], bounceIds:[stage.items[i].id]};
  }
  else if (opKey === 'len') {
    code = `len(inventory)`;
    what = `Length is ${n}.`;
    highlight = {type:'access', ids: stage.items.map(i=>i.id)};
  }
  else if (opKey === 'contains') {
    const v = params.value;
    const idx = stage.items.findIndex(it=>it.value===v);
    code = `'${v}' in inventory`;
    what = idx === -1 ? `False ('${v}' not found).` : `True (found at index ${idx}).`;
    highlight = idx === -1 ? {type:'search', ids: stage.items.map(i=>i.id)} : {type:'search', ids:[stage.items[idx].id], bounceIds:[stage.items[idx].id]};
  }
  else if (opKey === 'index') {
    const v = params.value;
    const idx = stage.items.findIndex(it=>it.value===v);
    if(idx === -1) throw new Error(`'${v}' not in list!`);
    code = `inventory.index('${v}')`;
    what = `Found at index ${idx}.`;
    highlight = {type:'search', ids:[stage.items[idx].id], bounceIds:[stage.items[idx].id]};
  }
  else if (opKey === 'count') {
    const v = params.value;
    const matches = stage.items.filter(it=>it.value===v);
    code = `inventory.count('${v}')`;
    what = `Counted ${matches.length} instance(s) of '${v}'.`;
    highlight = {type:'search', ids: matches.map(m=>m.id), bounceIds: matches.map(m=>m.id)};
  }
  else if (opKey === 'del') {
    let i = params.index;
    if(i < 0 || i >= n) throw new Error("Index out of bounds!");
    code = `del inventory[${i}]`;
    const removed = stage.items[i];
    const movedIds = stage.items.slice(i+1).map(it=>it.id);
    highlight = {type:'del', ids:[removed.id], bounceIds: movedIds};
    stage.render(highlight);
    stage.items.splice(i, 1);
    what = `Item at index ${i} deleted.`;
  }
  else if (opKey === 'slice') {
    const start = params.a === '' ? 0 : Number(params.a);
    const stop = params.b === '' ? n : Number(params.b);
    code = `inventory[${params.a}:${params.b}]`;
    const sliceIds = [];
    for(let i=Math.max(0, start); i<Math.min(n, stop); i++) sliceIds.push(stage.items[i].id);
    what = `Sliced ${sliceIds.length} item(s) to a new list.`;
    highlight = {type:'access', ids: sliceIds, bounceIds: sliceIds};
  }
  else if (opKey === 'copy') {
    code = `inventory.copy()`;
    what = `Created a shallow copy of the inventory.`;
    highlight = {type:'access', ids: stage.items.map(i=>i.id)};
  }
  else if (opKey === 'extend') {
    const listStr = params.iter; // e.g. "Diamond,Iron"
    const arr = listStr.split(',').map(s=>s.trim()).filter(Boolean);
    code = `inventory.extend(['${arr.join("', '")}'])`;
    const newItems = arr.map(v => ({id: uidCounter++, value: v, icon: getIcon(v)}));
    stage.items.push(...newItems);
    what = `Extended inventory with ${arr.length} new items.`;
    highlight = {type:'add', ids: newItems.map(i=>i.id), bounceIds: newItems.map(i=>i.id)};
  }
  else if (opKey === 'reverse') {
    code = `inventory.reverse()`;
    stage.items.reverse();
    what = `Inventory order reversed in place.`;
    highlight = {type:'sort', ids: stage.items.map(i=>i.id)};
  }
  else if (opKey === 'sort') {
    code = `inventory.sort()`;
    stage.items.sort((a,b)=> a.value.localeCompare(b.value));
    what = `Inventory sorted alphabetically in place.`;
    highlight = {type:'sort', ids: stage.items.map(i=>i.id)};
  }
  
  const after = stage.snapshot();
  return { code, what, highlight, after, complexity: OPS[opKey].complexity };
}

function buildOpGroups(container) {
  const groups = [
    {key:'append', title:'append(x)', desc: 'Adds a single item to the very end of the list.', fields:[{n:'value', label:'Item Name', type:'text', ph:'Diamond'}]},
    {key:'access', title:'list[i]', desc: 'Gets the item at the specific index.', fields:[{n:'index', label:'Index', type:'number', ph:'0'}]},
    {key:'update', title:'list[i] = x', desc: 'Replaces the item at the specific index with a new item.', fields:[{n:'index', label:'Index', type:'number', ph:'0'}, {n:'value', label:'New Item Name', type:'text', ph:'Apple'}]},
    {key:'len', title:'len(list)', desc: 'Returns the total number of items in the list.', fields:[]},
    {key:'contains', title:'x in list', desc: 'Checks if an item exists in the list (returns True/False).', fields:[{n:'value', label:'Item Name', type:'text', ph:'Wood'}]},
    {key:'index', title:'index(x)', desc: 'Finds the first index where the item appears.', fields:[{n:'value', label:'Item Name', type:'text', ph:'Stone'}]},
    {key:'count', title:'count(x)', desc: 'Counts how many times an item appears in the list.', fields:[{n:'value', label:'Item Name', type:'text', ph:'Wood'}]},
    {key:'insert', title:'insert(i, x)', desc: 'Squeezes an item in at the specific index, pushing everything else to the right.', fields:[{n:'index', label:'Index', type:'number', ph:'0'}, {n:'value', label:'Item Name', type:'text', ph:'Sword'}]},
    {key:'remove', title:'remove(x)', desc: 'Finds and deletes the first matching item in the list.', fields:[{n:'value', label:'Item Name', type:'text', ph:'Wood'}]},
    {key:'popLast', title:'pop()', desc: 'Removes and returns the very last item in the list.', fields:[]},
    {key:'popIndex', title:'pop(i)', desc: 'Removes and returns the item at a specific index.', fields:[{n:'index', label:'Index', type:'number', ph:'0'}]},
    {key:'del', title:'del list[i]', desc: 'Deletes an item at a specific index without returning it.', fields:[{n:'index', label:'Index', type:'number', ph:'0'}]},
    {key:'slice', title:'list[a:b]', desc: 'Creates a new list holding a slice of items from index A to B (not including B).', fields:[{n:'a', label:'Start (empty=0)', type:'text', ph:''},{n:'b', label:'Stop (empty=end)', type:'text', ph:''}]},
    {key:'copy', title:'copy()', desc: 'Creates a full shallow copy of the entire list.', fields:[]},
    {key:'extend', title:'extend(iter)', desc: 'Adds all items from another list/iterable to the end.', fields:[{n:'iter', label:'Comma separated items', type:'text', ph:'Iron,Apple'}]},
    {key:'reverse', title:'reverse()', desc: 'Flips the entire list backwards, directly modifying the original list.', fields:[]},
    {key:'sort', title:'sort()', desc: 'Sorts the items alphabetically/numerically, directly modifying the original list.', fields:[]},
    {key:'clear', title:'clear()', desc: 'Deletes every item, leaving an empty list.', fields:[]}
  ];
  
  container.innerHTML = groups.map(g => {
    const fieldsHtml = g.fields.map(f => `
      <div><label>${f.label}</label><input id="op-${g.key}-${f.n}" type="${f.type}" placeholder="${f.ph}" ${f.type==='text' ? 'value="'+f.ph+'"' : ''}></div>
    `).join('');
    
    return `
      <details class="op-group">
        <summary>${g.title} <span class="chev">▶</span></summary>
        <div class="op-body">
          <div style="font-size: 16px; color: #555; margin-bottom: 8px; font-style: italic;">${g.desc}</div>
          ${fieldsHtml}
          <button class="runbtn" data-op="${g.key}">Run</button>
        </div>
      </details>
    `;
  }).join('');
  
  container.querySelectorAll('.runbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const op = btn.dataset.op;
      const group = groups.find(g=>g.key===op);
      const params = {};
      group.fields.forEach(f => {
        const val = document.getElementById(`op-${op}-${f.n}`).value;
        params[f.n] = f.type === 'number' ? Number(val) : val;
      });
      
      errBanner.innerHTML = '';
      try {
        const result = runOp(pgStage, op, params);
        codeLineEl.textContent = result.code;
        opPillEl.textContent = OPS[op].label;
        pgStage.render(result.highlight);
        lenPillEl.textContent = `len = ${result.after.length}`;
        
        explainGrid.innerHTML = `
          <div class="exp-card"><div class="k">What happened</div><div class="v">${result.what}</div></div>
          <div class="exp-card"><div class="k">Time Complexity</div><div class="v mono">${result.complexity}</div></div>
        `;
        
        pushHistory(result.code);
      } catch (e) {
        errBanner.innerHTML = `<div><b>Error:</b> ${e.message}</div>`;
      }
    });
  });
}

buildOpGroups(document.getElementById('op-groups'));
pushHistory();
