
// 브라우저가 현재의 호스트 이름을 얻어오는 방법
const hostname = window && window.location && window.location.hostname;

console.log(hostname);

let backendHost; // 백엔드 호스트 이름
if (hostname === 'localhost'){
    backendHost = 'http://localhost:8080';
} else if (hostname === 'app-todo.s3-website.ap-northeast-2.amazonaws.com')
{
    backendHost = 'http://ec2-52-78-155-138.ap-northeast-2.compute.amazonaws.com';
}

export const API_BASE_URL = `${backendHost}`;