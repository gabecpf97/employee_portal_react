import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReports = createAsyncThunk(
    'facilityReports/fetchReports',
    async () => {
        const token = localStorage.getItem('authToken');
        const response  = await axios.get(
            'http://localhost:3000/housing/reports/all',
        {headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.reports.reverse();
    }
)

export const addReport = createAsyncThunk(
    'facilityReports/addReport', 
    async (report) => {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(
            'http://localhost:3000/housing/reports', 
            report,
            {headers: {
                Authorization: `Bearer ${token}`
                }
            },
            );
    return response.data.reports;
});

export const addComment = createAsyncThunk (
    'facilityReports/addComment', 
    async ({ reportId, comment }, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `http://localhost:3000/housing/reports/${reportId}/comments`, 
                { "description": comment },
                {headers: {
                    Authorization: `Bearer ${token}`
                    }
                },);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)



export const fetchComment = createAsyncThunk (
    'facilityReports/fetchComment', 
    async ({ reportId }) => {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
            `http://localhost:3000/housing/reports/${reportId}/comments`, 
            {headers: {
                Authorization: `Bearer ${token}`
                }
            },);
        return response.data;
    }
)

export const updateComment = createAsyncThunk(
    'facilityReports/updateComment', 
    async ({ newComment, reportId, commentId }, thunkAPI) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post(
                'http://localhost:3000/housing/comments/updateComment',
                {
                    newComment: newComment,
                    reportId: reportId,
                    commentId: commentId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return { reportId, commentId, updatedComment: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserDetails = createAsyncThunk(
    'userDetails/fetchUserDetails',
    async ({userId}, thunkAPI) => {
        const token = localStorage.getItem('authToken');
        // console.log("input id is correct?", userId);
        try {
            const response = await axios.post(
                'http://localhost:3000/housing/reports/getUserInfo',
                {
                    userIdfront : userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // console.log(response.data.userInfo.username);
            // return response.data.userInfo.username;
            return { userId, details: response.data.userInfo.username };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const facilityReportsSlice = createSlice({
    name: 'facilityReports',
    initialState: {
        reports: [],
        // comments:{},
        status: 'idle',
        error: null,
        users:{},
        loading: false,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reports = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addReport.fulfilled, (state, action) => {
                state.reports = [...state.reports, action.payload];
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { reportId, comment } = action.meta.arg; // Correct payload handling
                const report = state.reports.find(r => r._id === reportId);
                if (report) {
                    report.comments.push(comment);
                }
            })
            .addCase(fetchComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.comments[action.meta.arg] = action.payload; // Store comments by reportId
                state.status = 'succeeded';
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const { reportId, commentId, updatedComment } = action.payload;
                const report = state.reports.find(r => r._id === reportId);
                if (report) {
                    const commentIndex = report.comments.findIndex(c => c._id === commentId);
                    if (commentIndex !== -1) {
                        report.comments[commentIndex] = {...report.comments[commentIndex], ...updatedComment};
                    }
                }
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                const { userId, details } = action.payload;
                state.users[userId] = details;  // Update the user details in state
                state.status = 'done';
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.error = action.payload;  // Update the state with error information
            });
    }
});

export default facilityReportsSlice.reducer;