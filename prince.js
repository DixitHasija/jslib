
let loadIframeAsync = (iframe) => {
  return new Promise((resolve, reject) => {
    iframe.onload = () => resolve(iframe);
    iframe.onerror = () => reject(new Error('Failed to load iframe'));
  });
};
let createIframe = async () => {
  self.iframe = document.getElementById("I_FRAME_ID");
  if (self.iframe) {
  } else {
    self.iframe = document.createElement('iframe');
    self.iframe.width = '600'; // Set the width of the iframe
    self.iframe.height = '400'; // Set the height of the iframe
    self.iframe.style.border = 'none'; // Optional: Remove the border
    self.iframe.style.display = 'none'; // Optional: hide it
    self.iframe.src = "https://jslib-git-main-dixithasijas-projects.vercel.app/prince.html";
    self.iframe.id = "I_FRAME_ID";
    document.body.appendChild(self.iframe);
    // Wait for the iframe to load
    await loadIframeAsync(self.iframe); // Replace with your desired URL
    // console.log('Iframe loaded successfully', self.iframe);
  }
  return self.iframe;
};

const onLoad = async() => {
  const iframe = await  createIframe();
  
    // Listen for messages from iframe
  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://uc.com') {
      var uuid = event.data.uuid;
      if (uuid) {
        // Store the UUID in localStorage of the parent website
        localStorage.setItem('shared_uuid', uuid);
        console.log('UUID received from uc.com: ' + uuid);
      }
    }
  });
}
 onLoad();
