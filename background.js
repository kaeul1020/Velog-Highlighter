console.log('Velog Highlighter 서비스 워커 시작됨');

chrome.runtime.onInstalled.addListener(() => {
    console.log('Velog Highlighter 확장 프로그램이 설치되었습니다.');
});
