import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GitApiIssues } from 'apis/gitApi';
import { GitApiIssuesDetail } from 'apis/gitApiDetail';

// createAsyncThunk
// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )
// 비동기 요청의 수명 주기를 나타내는 추가 Redux 작업 유형 상수를 생성하는 데 사용되는 문자열입니다.
// 예를 들어 type 인수 'users/requestStatus' 는 다음 작업 유형을 생성합니다.
// pending:'users/requestStatus/pending'
// fulfilled:'users/requestStatus/fulfilled'
// rejected:'users/requestStatus/rejected'

export const fetchGitApi = createAsyncThunk(
    'issues/fetchGitApiStatus',
    async ({ page, perPage, sort, state }) => {
        const response = await GitApiIssues(page, perPage, sort, state);
        return response.data;
    },
);

export const fetchGitApiDetail = createAsyncThunk(
    'issues/fetchGitApiDetailStatus',
    async ({ issueNumber }) => {
        const response = await GitApiIssuesDetail(issueNumber);
        return response.data;
    },
);

// 초기 상태 값
// useState로 관리했던 상태 값
const initialState = {
    issueList: [],
    issueDetail: {},
    isLoading: false,
    error: null,
};

// action 에 따라 상태 변경
// ex) useState 의 setState
export const issueSlice = createSlice({
    name: 'issues',
    initialState,
    extraReducers: builder => {
        // 대기중
        builder.addCase(fetchGitApi.pending, state => {
            state.isLoading = true;
            state.error = null; // 초기화
        });
        // 성공
        builder.addCase(fetchGitApi.fulfilled, (state, action) => {
            state.issueList = action.payload;
            console.log(action.payload);
            state.isLoading = false;
            state.error = null;
        });
        // 실패
        builder.addCase(fetchGitApi.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        // 대기중
        builder.addCase(fetchGitApiDetail.pending, state => {
            state.isLoading = true;
            state.error = null; // 초기화
        });
        // 성공
        builder.addCase(fetchGitApiDetail.fulfilled, (state, action) => {
            state.issueDetail = action.payload;
            // console.log(action.payload);
            state.isLoading = false;
            state.error = null;
        });
        // 실패
        builder.addCase(fetchGitApiDetail.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});
