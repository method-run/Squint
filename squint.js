function getGrayScalePercent() {
    return parseInt(document.querySelector('#grayScaleRange').value, 10);
}

function getBlurPx() {
    return parseInt(document.querySelector('#blurRange').value, 10);
}

document.querySelector('#grayScaleRange').addEventListener('change', updatePreviewStyles);
document.querySelector('#blurRange').addEventListener('change', updatePreviewStyles);

document.querySelector('#applyButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        chrome.scripting.executeScript({
            target : {tabId : currTab.id},
            func : updateHostStyles,
            args : [ getGrayScalePercent(), getBlurPx() ],
        });
    });    
});

document.querySelector('#resetButton').addEventListener('click', () => {
    document.querySelector('#grayScaleRange').value = '50';
    document.querySelector('#blurRange').value = '5';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        chrome.scripting.executeScript({
            target : {tabId : currTab.id},
            func : updateHostStyles,
            args : [ 0, 0 ],
            });
      });    
});

function writeStyleContents(grayScalePercent = 100, blurPx = 1) {
    return `
        -webkit-filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important; /* Safari 6.0 - 9.0 */
        filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important;
`;
}

function updatePreviewStyles() {
    const styleEl = document.querySelector('#style');
    styleEl.innerHTML = `.preview {${writeStyleContents(getGrayScalePercent(), getBlurPx())}}`;
}

function updateHostStyles(grayScalePercent = 100, blurPx = 1) {
    document.querySelectorAll('[data-controlled-by-chrome-extension="squint"]').forEach(el => el.remove());
    const styleEl = document.createElement('style');
    styleEl.id = 'chrome-ext-squint-el';
    styleEl.setAttribute('data-controlled-by-chrome-extension', 'squint');
    styleEl.innerHTML = `html {
        -webkit-filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important; /* Safari 6.0 - 9.0 */
        filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important;
    }`;
    document.body.append(styleEl);
}
