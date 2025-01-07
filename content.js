console.log('Velog 페이지에서 content.js가 실행되었습니다!');

// 메시지를 수신하고 선택한 텍스트에 스타일 적용
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('메시지 수신:', request);
    if (request.action === 'applyStyle') {
        modifyMarkdownText(request.textColor, request.bgColor);
    }
});

function modifyMarkdownText(textColor = '#e61919', bgColor = '#ffffff') {
    const selection = window.getSelection();

    if (!selection.rangeCount) {
        console.warn('선택된 텍스트가 없습니다.');
        return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) {
        console.warn('선택된 텍스트가 없습니다.');
        return;
    }

    console.log('선택된 텍스트:', selectedText);

    // 🔧 Markdown에 삽입할 HTML 태그
    const openingTag = '<span style="color:${textColor}; background-color:${bgColor};">';
    const closingTag = '</span>';
    const newText = `${openingTag}${selectedText}${closingTag}`;

    // 🔧 Markdown 입력 필드 수정
    const markdownInput = document.querySelector('.CodeMirror textarea');
    if (markdownInput) {
        const currentText = markdownInput.value;
        const updatedText = currentText.replace(selectedText, newText);
        markdownInput.value = updatedText;
        console.log('Markdown 텍스트 변경 완료:', updatedText);

        // React 입력 이벤트 트리거
        triggerInputEvent(markdownInput);
    } else {
        console.warn('Markdown 입력 필드를 찾을 수 없습니다.');
    }
}

// React 입력 이벤트 트리거 함수
function triggerInputEvent(element) {
    const inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
    console.log('React 입력 이벤트 트리거 완료');

    const changeEvent = new Event('change', { bubbles: true });
    element.dispatchEvent(changeEvent);
    console.log('React 변경 이벤트 트리거 완료');
}
