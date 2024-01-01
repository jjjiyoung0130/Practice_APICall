import { combineReducers } from '@reduxjs/toolkit';

import { issueSlice } from './issuesSlice';

export const rootReducer = combineReducers({ issues: issueSlice.reducer });
// combineReducers - 각가의 reducer들을 하나로 합쳐줄 수 있다. 유지보수 측면
