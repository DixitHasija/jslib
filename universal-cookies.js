async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.defer = true;
    const uc_script = document.getElementById('uc_shiprocket');
    if (uc_script) {
      // Extract the src attribute of the script element
      const src = uc_script.src;
      // Parse the URL parameters
      const urlParams = new URLSearchParams(src.split('?')[1]);
      // Get the channel_id parameter
      const channelId = urlParams.get('channel_id');
      script.src = url + '?channel_id=' + channelId;
      script.setAttribute('id', 'uc_shiprocket');
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

    document.head.appendChild(script);
  });
}
window.addEventListener('load', async function () {
  // Load another JavaScript file
  try {
    // await loadScript('./dist/uc.js');
    await loadScript(
      'https://sr-promise-prod.s3.ap-south-1.amazonaws.com/sr-promise/static/uc.js',
    );
    console.log('uc.js has been loaded and executed');
    if (window.SHIPROCKET_ANALYTICS) {
      window.SHIPROCKET_ANALYTICS.initialize();
      window.ua = {
        event: window.SHIPROCKET_ANALYTICS.event,
      };
      delete window.SHIPROCKET_ANALYTICS;
    }
  } catch (error) {
    console.error(error);
  }
});
