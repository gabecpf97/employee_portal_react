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
        return response.data.reports;
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



const facilityReportsSlice = createSlice({
    name: 'facilityReports',
    initialState: {
        reports: [],
        // comments:{},
        status: 'idle',
        error: null
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
            // .addCase(addComment.fulfilled, (state, action) => {
            //     // Assuming each report has an array of comments and each report is identified by reportId
            //     const { reportId, comment } = action.payload;
            //     const report = state.reports.find(r => r._id === reportId);
            //     if (report) {
            //         report.comments.push(comment);
            //     }
            //     state.status = 'succeeded';
            //     // state.reports = state.reports.map(report =>
            //     //     report._id === reportId
            //     //         ? { ...report, comments: [...report.comments, comment] }
            //     //         : report
            //     // );
            //     // state.status = 'succeeded';
            // })
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
            });
    }
});

export default facilityReportsSlice.reducer;