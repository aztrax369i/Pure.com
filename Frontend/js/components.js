async function loadComponent(elementId, path) {

    const prefix = window.location.pathname.includes("/pages/") ? "../" : "./";

    const response = await fetch(prefix + path);
    let content = await response.text();

    if (prefix === "../") { 
        content = content.replaceAll(`src="./`, `src="../`);
        content = content.replaceAll(`href="./`, `href="../`);
    }

    document.getElementById(elementId).innerHTML = content;
}

export {loadComponent}