(async ()=>{
  async function wait(cond, timeout=20000){
    const start = Date.now();
    while(!cond()){
      if(Date.now() - start > timeout) throw new Error("timeout waiting for condition");
      await new Promise(r=>setTimeout(r,100));
    }
  }
  try{
    await wait(()=> window.require && (window.jQuery || window.$));
  }catch(e){
    console.warn("RequireJS/jQuery not available in time:", e);
  }

  let cfg = {};
  try{
    cfg = await fetch('./magento-init.json', {cache:'no-store'}).then(r=>r.json());
  }catch(e){
    console.warn("Failed to load magento-init.json", e);
  }

  const entries = Object.entries(cfg||{});
  entries.forEach(([selector, modules])=>{
    Object.entries(modules||{}).forEach(([name, options])=>{
      try{
        window.require([name], function(mod){
          const $ = window.jQuery || window.$;
          const el = document.querySelector(selector);
          // jQuery widget path
          try{
            if ($ && el && typeof $(el)[name] === 'function'){
              $(el)[name](options);
              return;
            }
          }catch(e){ console.warn('jQuery widget init failed', name, e); }
          // fallback: module as function
          try{
            if (typeof mod === 'function'){
              mod(el || document, options);
            }
          }catch(e){ console.warn('module call failed', name, e); }
        });
      }catch(e){
        console.warn("require call failed", name, e);
      }
    });
  });
})();
