async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.defer = true;

    // Check if there is an existing script element with ID 'uc_shiprocket'
    let uc_script = document.getElementById('uc_shiprocket');
    if (!uc_script && document?.currentScript?.src) {
      uc_script = document?.currentScript;
    }

    debugger;
    console.log(import.meta.url);
    
    
    if (uc_script) {
      // Extract the src attribute of the script element
      let src = uc_script.src;
      if (document?.currentScript?.src) {
        src = document?.currentScript?.src;
      }
      // Parse the URL parameters
      const urlParams = new URLSearchParams(src.split('?')[1]);
      // Get the channel_id parameter
      const channelId = urlParams.get('channel_id');
      // Append the channel_id to the new script's URL
      script.src = url + '?channel_id=' + channelId;
      script.setAttribute('id', 'uc_shiprocket');
    }

    // Resolve the promise when the script is loaded
    script.onload = () => resolve();
    // Reject the promise if there is an error loading the script
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

    // Append the script to the document head
    document.head.appendChild(script);
  });
}

window.addEventListener('load', async function () {
  // Load another JavaScript file after the window has fully loaded
  try {
    // Attempt to load the script from the provided URL
    // await loadScript('./dist/uc.min.js');
    // await loadScript(
    //   'https://jslib-dixithasijas-projects.vercel.app/universal-cookies.js',
    // );

    console.log(document?.currentScript, 'document?.currentScript');
    
    await loadScript(
      'https://jslib-dixithasijas-projects.vercel.app/uc.min.js?',
    );
    
    // await loadScript(
    //   'https://sr-promise-prod.s3.ap-south-1.amazonaws.com/sr-promise/static/uc.min.js',
    // );

    // Log a message to the console if the script is successfully loaded
    console.log(
      '%c Universal Cookies loaded!!',
      'font-weight: bold; font-size: 20px;color: red; text-shadow: 1px 1px 0 rgb(217,31,38) , 2px 2px 0 rgb(226,91,14) , 3px 3px 0 rgb(245,221,8) , 4px 4px 0 rgb(5,148,68) , 5px 5px 0 rgb(2,135,206) , 6px 6px 0 rgb(4,77,145) , 7px 7px 0 rgb(42,21,113)',
    );

    // Initialize SHIPROCKET_ANALYTICS if it's defined
    if (window.SHIPROCKET_ANALYTICS) {
      window.SHIPROCKET_ANALYTICS.initialize();
      window.ua = {
        event: window.SHIPROCKET_ANALYTICS.event,
        notify: window.SHIPROCKET_ANALYTICS.notify,
        profile: window.SHIPROCKET_ANALYTICS.getUserInfo,
        profileCallback:window.SHIPROCKET_ANALYTICS.profileCallback,
      };
      // Clean up the global namespace
      delete window.SHIPROCKET_ANALYTICS;
    }
  } catch (error) {
    // Log any errors that occur during the script loading
    console.error(error);
  }
});
