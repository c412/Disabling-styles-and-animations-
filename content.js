const styleProperties = [
    'height',
    'overflow-y',
    'margin',
    'padding',
    'box-sizing',
    'display',
    'background',
    'position',
    'opacity',
    'transition',
    'transform'
];

// Функция для инжектирования CSS-стилей
function injectCSS() {
    const style = document.createElement('style');
    style.id = 'custom-style-overrides';
    style.innerHTML = `
    .height-disabled { height: auto !important; }
    .overflow-y-disabled { overflow-y: visible !important; }
    .margin-disabled { margin: 0 !important; }
    .padding-disabled { padding: 0 !important; }
    .box-sizing-disabled { box-sizing: content-box !important; }
    .display-disabled { display: block !important; }
    .background-disabled { background: none !important; }
    .position-disabled { position: static !important; }
    .opacity-disabled { opacity: 1 !important; }
    .transition-disabled { transition: none !important; }
    .transform-disabled { transform: none !important; }
  `;
    if (!document.getElementById('custom-style-overrides')) {
        document.head.appendChild(style);
    }
}

// Функция для применения сохраненных стилей
function applySavedStyles() {
    chrome.storage.sync.get(styleProperties, (result) => {
        styleProperties.forEach(styleProperty => {
            if (result[styleProperty]) {
                toggleClass(styleProperty, true);
            }
        });
    });
}

// Функция для переключения классов
function toggleClass(styleProperty, applyOnly = false) {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        if (applyOnly) {
            element.classList.add(`${styleProperty}-disabled`);
        } else {
            element.classList.toggle(`${styleProperty}-disabled`);
        }
    });
}

// Инжектируем CSS и применяем сохраненные стили при загрузке страницы
window.onload = function () {
    injectCSS();
    applySavedStyles();
};