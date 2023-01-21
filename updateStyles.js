function getGrayScalePercent() {
    const grayScalePercent = parseInt(document.querySelector('#grayScaleRange').value, 10);
    console.log(grayScalePercent);
    return grayScalePercent;
}
function getBlurPx() {
    const blurPx = parseInt(document.querySelector('#blurRange').value, 10);
    console.log(blurPx);
    return blurPx;
}

document.querySelector('#applyButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        chrome.scripting.executeScript({
            target : {tabId : currTab.id},
            func : updateStyles,
            args : [ getGrayScalePercent(), getBlurPx() ],
        });
    });    
});

document.querySelector('#resetButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (!currTab) return;

        chrome.scripting.executeScript({
            target : {tabId : currTab.id},
            func : updateStyles,
            args : [ 0, 0 ],
            });
      });    
});

function updateStyles(grayScalePercent = 100, blurPx = 1) {
    console.log('BLAMMO', document);
    document.querySelectorAll('[data-controlled-by-chrome-extension="squint"]').forEach(el => el.remove());

    const styleEl = document.createElement('style');
    styleEl.id = 'chrome-ext-squint-el';
    styleEl.setAttribute('data-controlled-by-chrome-extension', 'squint');
    
    styleEl.innerHTML = `
    html {
        -webkit-filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important; /* Safari 6.0 - 9.0 */
        filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important;
    }
    `;
    
    document.body.append(styleEl);
}
