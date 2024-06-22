// loadTemplate.js
function loadTemplate(templateId, data) {
    const templateUrl = 'index.html';
    const templateContent = document.getElementById(templateId);
    const templateHTML = document.getElementById(templateId).innerHTML;

    Object.keys(data).forEach((key) => {
        const placeholder = `[${key}]`;
        const value = data[key];
        templateHTML = templateHTML.replace(new RegExp(placeholder, 'g'), value);
    });

    templateContent.innerHTML = templateHTML;
}

export default loadTemplate;