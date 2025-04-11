 
    function getQueryParam(key) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(key);
    }

    const nameKey = 'name';
    const existingValue = localStorage.getItem(nameKey);

    if (existingValue) {
      // Check if div already exists
      if (!document.getElementById('nameDisplay')) {
        const div = document.createElement('div');
        div.id = 'nameDisplay';
        div.textContent = `${nameKey}: ${existingValue}`;
        document.body.appendChild(div);
      }
    } else {
      const nameFromUrl = getQueryParam(nameKey);
      if (nameFromUrl) {
        localStorage.setItem(nameKey, nameFromUrl);
      }
    }
   

let createIframe = async () => {
  self.iframe = document.getElementById(I_FRAME_ID);
  if (self.iframe) {
  } else {
    self.iframe = document.createElement('iframe');
    self.iframe.width = '600'; // Set the width of the iframe
    self.iframe.height = '400'; // Set the height of the iframe
    self.iframe.style.border = 'none'; // Optional: Remove the border
    self.iframe.style.display = 'none'; // Optional: hide it
    self.iframe.src = import.meta.env.VITE_IFRAME_URL;
    self.iframe.id = I_FRAME_ID;
    document.body.appendChild(self.iframe);
    // Wait for the iframe to load
    await loadIframeAsync(self.iframe); // Replace with your desired URL
    // console.log('Iframe loaded successfully', self.iframe);
  }
  return self.iframe;
};
