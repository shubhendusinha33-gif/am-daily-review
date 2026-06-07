const C='vmm-v2';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/index.html','/manifest.json'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('firebase')||e.request.url.includes('googleapis')||e.request.url.includes('gstatic')||e.request.url.includes('emailjs')||e.request.url.includes('cdnjs'))return;
  e.respondWith(fetch(e.request).then(r=>{if(e.request.method==='GET'&&r.status===200){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl))}return r}).catch(()=>caches.match(e.request)));
});
