// 메시지를 수신하고 선택한 텍스트에 스타일 적용
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'applyStyle') {
        const { textColor, bgColor } = request;
        applyStyleToSelectedText(textColor, bgColor);
    }
});

function applyStyleToSelectedText(textColor, bgColor) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.color = textColor;
    span.style.backgroundColor = bgColor;
    span.textContent = selection.toString();

    range.deleteContents();
    range.insertNode(span);
}
