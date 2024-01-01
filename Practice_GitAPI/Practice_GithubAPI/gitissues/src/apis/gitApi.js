import axios from 'axios';

export const BaseUrl = 'https://api.github.com/repos';
export const Owner = 'angular';
export const Repo = 'angular-cli';
export const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
//export default { BaseUrl, Owner, Repo, githubToken };

export const GitApiIssues = async (page, perPage, sort, state) => {
    const response = await axios.get(`${BaseUrl}/${Owner}/${Repo}/issues`, {
        headers: {
            Authorization: `Bearer ${githubToken}`,
        },
        params: {
            page,
            per_page: perPage,
            sort: sort, // 생성, 업데이트, 댓글순 정렬
            state: state, // open:문제의 공개 진행중 closed: 문제 종료
        },
    });
    return response;
};
