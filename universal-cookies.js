async function loadScript(url){return new Promise((resolve,reject)=>{const script=document.createElement("script");script.type="text/javascript";script.src=url;script.defer=true;const uc_script=document.getElementById("uc_shiprocket");if(uc_script){const src=uc_script.src;const urlParams=new URLSearchParams(src.split("?")[1]);const channelId=urlParams.get("channel_id");script.src=url+"?channel_id="+channelId;script.setAttribute("id","uc_shiprocket")}script.onload=()=>resolve();script.onerror=()=>reject(new Error(`Failed to load script: ${url}`));document.head.appendChild(script)})}window.addEventListener("load",async function(){try{await loadScript("./dist/uc.min.js");console.log("%c Universal Cookies loaded!!","font-weight: bold; font-size: 20px;color: red; text-shadow: 1px 1px 0 rgb(217,31,38) , 2px 2px 0 rgb(226,91,14) , 3px 3px 0 rgb(245,221,8) , 4px 4px 0 rgb(5,148,68) , 5px 5px 0 rgb(2,135,206) , 6px 6px 0 rgb(4,77,145) , 7px 7px 0 rgb(42,21,113)");if(window.SHIPROCKET_ANALYTICS){window.SHIPROCKET_ANALYTICS.initialize();window.ua={event:window.SHIPROCKET_ANALYTICS.event};delete window.SHIPROCKET_ANALYTICS}}catch(error){console.error(error)}});
