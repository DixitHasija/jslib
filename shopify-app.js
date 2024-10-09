// Create link element

// var sellerUuid= document.currentScript.src
//   .split("?")[1]
//   .split("&")
//   .reduce(
//     (obj, pair) => ((obj[pair.split("=")[0]] = pair.split("=")[1]), obj),
//     {}
//   )["uuid"];

// var sellerPreviewRequest = document.currentScript.src
//   .split("?")[1]
//   .split("&")
//   .reduce(
//     (obj, pair) => ((obj[pair.split("=")[0]] = pair.split("=")[1]), obj),
//     {}
//   )["preview"];

sellerUuid = '884235f3-0572-4c09-990d-bfd8a2a8402d';
sellerPreviewRequest = 'zop-by-shiprocket.myshopify.com';
 promiseLinkElement = document.createElement('link');
promiseLinkElement.rel = 'stylesheet';
promiseLinkElement.href = 'https://jslib-dixithasijas-projects.vercel.app/instant-widget.css';

// Create script element
 promiseScriptElement = document.createElement('script');
promiseScriptElement.src = `https://jslib-dixithasijas-projects.vercel.app/app-instant-widget.js?uuid=${sellerUuid}&preview=${sellerPreviewRequest}`
promiseScriptElement.defer = true; // Add the defer attribute

// Append link and script elements to the head of the document
document.head.appendChild(promiseLinkElement);
document.head.appendChild(promiseScriptElement);
  
