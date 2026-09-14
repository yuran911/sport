// Видаляємо старі Service Workers
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
    console.log('✅ Service Worker видалено');
  }
});

// Видаляємо кеш
caches.keys().then(function(names) {
  for (let name of names) {
    caches.delete(name);
    console.log('✅ Кеш видалено:', name);
  }
});

// Видаляємо старі версії
localStorage.removeItem('app_version');
localStorage.removeItem('tg-queue-v2');
localStorage.removeItem('tg-sent-dates');

console.log('✅ ГОТОВО! Перезавантажте сторінку');