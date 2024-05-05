import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Card, CardContent, CardHeader, TextField, Button, Box, Grid, Paper, Pagination, Chip, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {
    fetchReports, addReport, addComment, updateComment, updateStatus
} from '../../store/slices/facilityReports.slice.js';

// Utility function to get status chip properties based on the current status
const getStatusChipProps = (status) => {
    switch (status) {
        case 'open':
            return { label: status, style: { backgroundColor: '#f44336', color: '#fff' } }; // Red
        case 'in progress':
            return { label: status, style: { backgroundColor: '#ffeb3b', color: '#000' } }; // Yellow
        case 'closed':
            return { label: status, style: { backgroundColor: '#4caf50', color: '#fff' } }; // Green
        default:
            return { label: status, style: { backgroundColor: '#9e9e9e', color: '#fff' } }; // Default gray
    }
};

// Main functional component for managing facility reports
const FacilityReports = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [commentTexts, setCommentTexts] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedCommentTexts, setUpdatedCommentTexts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [newStatus, setNewStatus] = useState({});
    const itemsPerPage = 6;

    const dispatch = useDispatch();
    const reports = useSelector(state => state.facilityReports.reports);
    const status = useSelector(state => state.facilityReports.status);
    const error = useSelector(state => state.facilityReports.error);
    const currentUserId = window.localStorage.getItem('userId');
    const commentsRefs = useRef({});

    // Fetch the facility reports when the component is mounted
    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

    // Handles report submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            alert('Title and Description cannot be empty.');
            return;
        }

        try {
            await dispatch(addReport({ title, description })).unwrap();
            await dispatch(fetchReports());
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Failed to add report:', error);
            alert('Failed to add report: ' + error.message);
        }
    };

    // Handle changes in comment input
    const handleCommentChange = (reportId, index, text) => {
        setCommentTexts({ ...commentTexts, [`${reportId}-${index}`]: text });
    };

    // Add a new comment
    const handleAddComment = async (report, index) => {
        const commentText = commentTexts[`${report._id}-${index}`];
        if (!commentText || commentText.trim() === '') {
            alert('Comment text cannot be empty.');
            return;
        }

        try {
            await dispatch(addComment({ reportId: report._id, comment: commentText })).unwrap();
            setCommentTexts(prev => ({ ...prev, [`${report._id}-${index}`]: '' }));
            await dispatch(fetchReports());
        } catch (error) {
            console.error('Failed to add comment:', error);
            alert('Failed to add comment: ' + error.message);
        }
    };

    // Update an existing comment
    const handleUpdateComment = async (reportId, commentId) => {
        const updatedComment = updatedCommentTexts[commentId];
        if (!updatedComment || updatedComment.trim() === '') {
            alert('Invalid report or comment.');
            return;
        }

        try {
            await dispatch(updateComment({ newComment: updatedComment, reportId, commentId })).unwrap();
            setEditingCommentId(null);
            setUpdatedCommentTexts(prev => ({ ...prev, [commentId]: '' }));
            await dispatch(fetchReports());
        } catch (error) {
            console.error('Failed to update comment:', error);
            alert('Failed to update comment: ' + error.message);
        }
    };

    // Toggle edit mode for a specific comment
    const toggleEditMode = (commentId) => setEditingCommentId(prev => (prev === commentId ? null : commentId));

    // Scroll to the bottom of the comments section
    const scrollToBottom = (reportId) => {
        if (commentsRefs.current[reportId]) {
            commentsRefs.current[reportId].scrollTop = commentsRefs.current[reportId].scrollHeight;
        }
    };

    // Scroll to the bottom whenever the reports change
    // useEffect(() => {
    //     reports.forEach(report => report._id && scrollToBottom(report._id));
    // }, [reports]);

    useEffect(() => {
        reports
            .filter(report => report && typeof report === 'object' && '_id' in report)
            .forEach(report => scrollToBottom(report._id));
    }, [reports]);

    // Handle page change for pagination
    const handlePageChange = (_, page) => setCurrentPage(page);

    // Paginate the reports
    const paginatedReports = reports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle changes in status
    const handleStatusChange = (reportId, value) => {
        setNewStatus((prev) => ({ ...prev, [reportId]: value }));
    };

    // Update the status of a report
    const handleUpdateStatus = async (reportId) => {
        const statusToUpdate = newStatus[reportId];
        if (!statusToUpdate) {
            alert('Please select a valid status.');
            return;
        }

        try {
            await dispatch(updateStatus({ reportId, status: statusToUpdate })).unwrap();
            await dispatch(fetchReports());
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status: ' + error.message);
        }
    };

    return (
        <Box m={3}>
            {/* Report Submission Form */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <h2>Add a New Report</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Submit Report</Button>
                </form>
            </Paper>

            {/* Facility Reports Section */}
            <h1>Facility Reports</h1>
            {status === 'loading' && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <Box mt={2}>
                <Grid container spacing={3} alignItems="stretch">
                    {paginatedReports.length > 0 ? paginatedReports.map((report, reportIndex) => (
                        report && (
                            <Grid item xs={12} md={4} key={report._id}>
                            <Card elevation={3} style={{ height: '100%' }}>
                                <CardHeader
                                    title={report.title || 'Untitled Report'}
                                    subheader={`Created by: ${report.createdBy?.username ?? 'Unknown'}, Time: ${new Date(Number(report.timestamp)).toLocaleString()}`}
                                />
                                <CardContent>
                                    <div><h3>Description: {report.description}</h3></div>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel><h2>Status:</h2></InputLabel>
                                        <br></br><br></br>
                                        <Box mt={1} mb={2}>
                                            <Chip {...getStatusChipProps(report.status)} />
                                        </Box>

                                        <Select
                                            value={newStatus[report._id] || report.status}
                                            onChange={(e) => handleStatusChange(report._id, e.target.value)}
                                        >
                                            <MenuItem value="open">Open</MenuItem>
                                            <MenuItem value="in progress">In Progress</MenuItem>
                                            <MenuItem value="closed">Closed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdateStatus(report._id)}
                                    >
                                        Update Status
                                    </Button>
                                    <Box mt={2}>
                                        <h3>Comments:</h3>
                                        <Box
                                            ref={(el) => { commentsRefs.current[report._id] = el; }}
                                            maxHeight={200}
                                            overflow="auto"
                                            border="1px solid #ccc"
                                            p={1}
                                            mb={2}
                                        >
                                            {report.comments.length > 0 ? (
                                                report.comments.map((comment) => (
                                                    <Box key={`${report._id}-${comment._id}`} mb={2}>
                                                        <span>
                                                            Message: {editingCommentId === comment._id ? (
                                                                <TextField
                                                                    value={updatedCommentTexts[comment._id] || comment.description}
                                                                    onChange={(e) => setUpdatedCommentTexts({ ...updatedCommentTexts, [comment._id]: e.target.value })}
                                                                    multiline
                                                                    rows={2}
                                                                    fullWidth
                                                                />
                                                            ) : comment.description}
                                                        </span>
                                                        <br/>
                                                        <span>{comment.createdBy?.username ?? 'Unknown User'}</span>
                                                        <>Time: {new Date(Number(comment.timestamp)).toLocaleString()}</>
                                                        {comment.createdBy?._id === currentUserId && (
                                                            <Button variant="outlined" onClick={() => toggleEditMode(comment._id)}
                                                            disabled={report.status === 'closed'}>
                                                                {editingCommentId === comment._id ? 'Cancel' : 'Edit'}
                                                            </Button>
                                                        )}
                                                        {editingCommentId === comment._id && (
                                                            <Button onClick={() => handleUpdateComment(report._id, comment._id)}>Submit Edit</Button>
                                                        )}
                                                    </Box>
                                                ))
                                            ) : (
                                                <div>No Comments Available</div>
                                            )}
                                        </Box>

                                        {/* Add Comment Text Field and Button */}
                                        <TextField
                                            label="Add a comment..."
                                            multiline
                                            rows={2}
                                            fullWidth
                                            value={commentTexts[`${report._id}-${reportIndex}`] || ''}
                                            onChange={(e) => handleCommentChange(report._id, reportIndex, e.target.value)}
                                        />
                                        <Button 
                                            onClick={() => handleAddComment(report, reportIndex)} 
                                            variant="contained" 
                                            color="primary"
                                            disabled={report.status === 'closed'}
                                            >Add Comment</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        )
                    )) : (
                        <div><h1>No reports available</h1></div>
                    )}
                    
                </Grid>
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination count={Math.ceil(reports.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
                </Box>
            </Box>
        </Box>
    );
};

export default FacilityReports;
