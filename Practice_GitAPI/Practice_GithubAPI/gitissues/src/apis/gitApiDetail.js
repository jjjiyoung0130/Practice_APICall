import axios from 'axios';

import { BaseUrl, githubToken, Owner, Repo } from './gitApi';

export const GitApiIssuesDetail = async issueNumber => {
    const response = await axios.get(
        `${BaseUrl}/${Owner}/${Repo}/issues/${issueNumber}`,
        {
            headers: {
                Authorization: `Bearer ${githubToken}`,
            },
        },
    );
    return response;
};
