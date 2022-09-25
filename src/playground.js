const interval = setInterval(() => {
  console.log("print every 2 secs");
}, 2000);

setTimeout(() => {
  clearInterval(interval);
}, 10000);
