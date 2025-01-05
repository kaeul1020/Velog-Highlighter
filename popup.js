// 버튼 클릭 시 content.js에 메시지 전달
document.getElementById('applyBtn').addEventListener('click', () => {
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;

    // 현재 활성화된 탭에 메시지를 보냄
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'applyStyle',
            textColor,
            bgColor
        });
    });
});
