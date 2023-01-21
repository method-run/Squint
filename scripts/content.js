console.log('content script', document);

// let blurPx = 1;
// let grayScalePercent = 100;
// const styleEl = document.createElement('style');
// styleEl.id = 'chrome-ext-squint-el';
// styleEl.setAttribute('data-controlled-by-chrome-extension', 'squint');

// styleEl.innerHTML = `
// html {
//     -webkit-filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important; /* Safari 6.0 - 9.0 */
//     filter: grayscale(${grayScalePercent}%) blur(${blurPx}px) !important;
// }
// `;

// function injectedFunction() {
//     document.body.style.backgroundColor = "orange";
//   }

// document.body.append(styleEl);