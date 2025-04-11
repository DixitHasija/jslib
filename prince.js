 
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
   
