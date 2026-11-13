async function loadComponent(elementId, path) { 

    const response = await fetch(path);

    const content = await response.text();

    document.getElementById(elementId).innerHTML = content;
}

export {loadComponent}