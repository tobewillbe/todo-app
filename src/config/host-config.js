
// 브라우저가 현재의 호스트 이름을 얻어오는 방법
const hostname = window && window.location && window.location.hostname;

console.log(hostname);

let backendHost; // 백엔드 호스트 이름
if (hostname === 'localhost'){
    backendHost = 'http://localhost:8080';
}

export const API_BASE_URL = `${backendHost}`;