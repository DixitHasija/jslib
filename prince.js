
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

const onLoad = () => {
const iframe = await  createIframe();
}
 onLoad();

    // Wait a bit to ensure iframe is loaded
    setTimeout(() => {
      // Add user to IndexedDB inside iframe
      iframe.contentWindow.postMessage({
        action: "addUser",
        user: { id: 1, name: "Alice", age: 30 }
      }, "https://iframe.com");

      // Read the user after 2 seconds
      setTimeout(() => {
        iframe.contentWindow.postMessage({
          action: "getUser",
          id: 1
        }, "https://jslib-git-main-dixithasijas-projects.vercel.app");
      }, 2000);
    }, 1000);

    // Handle response from iframe
    window.addEventListener("message", (e) => {
      // if (e.origin !== "https://iframe.com") return;
      console.log("Response from iframe:", e.data);
    });
