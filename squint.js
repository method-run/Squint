function getGrayScalePercent() {
    return parseInt(document.querySelector('#grayScaleRange').value, 10);
}

function getBlurPx() {
    return parseInt(document.querySelector('#blurRange').value, 10);
}

function createStyleContents(grayScalePercent = 100, blurPx = 1) {
    return `
        -webkit-filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important; /* Safari 6.0 - 9.0 */
        filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important;
`;
}

function createStyleRule(grayScalePercent = 100, blurPx = 1) {
    return `html {${createStyleContents(grayScalePercent, blurPx)}}`
}

function updatePreviewStyles() {
    const styleEl = document.querySelector('#style');
    styleEl.innerHTML = `.preview {${createStyleContents(getGrayScalePercent(), getBlurPx())}}`;
}

let styleRule = '';

document.querySelector('#grayScaleRange').addEventListener('change', updatePreviewStyles);
document.querySelector('#blurRange').addEventListener('change', updatePreviewStyles);

document.querySelector('#applyButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        if (styleRule) {
            chrome.scripting.removeCSS({
                target : {tabId : currTab.id},
                css: styleRule,
            });
        }

        styleRule = createStyleRule(getGrayScalePercent(), getBlurPx());

        chrome.scripting.insertCSS({
            target : {tabId : currTab.id},
            css: styleRule,
        });
    });    
});

document.querySelector('#resetButton').addEventListener('click', () => {
    document.querySelector('#grayScaleRange').value = '50';
    document.querySelector('#blurRange').value = '5';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        if (styleRule) {
            chrome.scripting.removeCSS({
                target : {tabId : currTab.id},
                css: styleRule,
            });
        }
      });    
});
