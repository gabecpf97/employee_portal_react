import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, 
    CardContent, 
    CardHeader, 
    TextField, 
    Button, 
    Box, 
    Grid, 
    Paper, 
    Pagination, 
    Chip, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl } from '@mui/material';
import { fetchReports, 
    addReport, 
    addComment, 
    updateComment,
    updateStatus, } from '../../store/slices/facilityReports.slice.js';

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

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            alert('Title and Description cannot be empty.');
            return;
        }

        try {
            await dispatch(addReport({ title, description })).unwrap();
            setTitle('');
            setDescription('');
            dispatch(fetchReports());
        } catch (error) {
            console.error('Failed to add report:', error);
            alert('Failed to add report: ' + error.message);
        }
    };

    const handleCommentChange = (reportId, index, text) => {
        const newCommentTexts = { ...commentTexts, [`${reportId}-${index}`]: text };
        setCommentTexts(newCommentTexts);
    };

    const handleAddComment = async (report, index) => {
        const commentText = commentTexts[`${report._id}-${index}`];
        if (!report || !report._id || !commentText || commentText.trim() === '') {
            alert('Invalid report or comment text.');
            return;
        }

        try {
            await dispatch(addComment({ reportId: report._id, comment: commentText })).unwrap();
            dispatch(fetchReports());
            setCommentTexts(prev => ({ ...prev, [`${report._id}-${index}`]: '' }));
        } catch (error) {
            console.error('Failed to add comment:', error);
            alert('Failed to add comment: ' + error.message);
        }
    };

    const handleUpdateComment = async (reportId, commentId) => {
        const updatedComment = updatedCommentTexts[commentId];
        if (!reportId || !commentId || !updatedComment || updatedComment.trim() === '') {
            alert('Invalid report or comment.');
            return;
        }

        try {
            await dispatch(updateComment({
                newComment: updatedComment,
                reportId: reportId,
                commentId: commentId
            })).unwrap();
            dispatch(fetchReports());
            setEditingCommentId(null);
            setUpdatedCommentTexts(prev => ({ ...prev, [commentId]: '' }));
        } catch (error) {
            console.error('Failed to update comment:', error);
            alert('Failed to update comment: ' + error.message);
        }
    };

    const toggleEditMode = (commentId) => {
        setEditingCommentId(prev => (prev === commentId ? null : commentId));
    };

    const scrollToBottom = (reportId) => {
        if (commentsRefs.current[reportId]) {
            commentsRefs.current[reportId].scrollTop = commentsRefs.current[reportId].scrollHeight;
        }
    };

    useEffect(() => {
        reports.forEach(report => {
            if (report && report._id) {
                scrollToBottom(report._id);
            }
        });
    }, [reports]);

    const handlePageChange = (event, page) => setCurrentPage(page);

    const paginatedReports = reports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleStatusChange = (reportId, value) => {
        setNewStatus((prev) => ({
            ...prev,
            [reportId]: value
        }));
    };

    const handleUpdateStatus = async (reportId) => {
        const statusToUpdate = newStatus[reportId];
        if (!statusToUpdate) {
            alert('Please select a valid status.');
            return;
        }
        try {
            await dispatch(updateStatus({ reportId, status: statusToUpdate })).unwrap();
            dispatch(fetchReports());
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status: ' + error.message);
        }
    };

    return (
        <Box m={3}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <h2>Add a New Report</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Submit Report</Button>
                </form>
            </Paper>

            <h1>Facility Reports</h1>
            {status === 'loading' && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <Box mt={2}>
                <Grid container spacing={3} alignItems="stretch">
                    {paginatedReports.filter(report => report && report._id).map((report, reportIndex) => (
                        <Grid item xs={12} md={4} key={report._id}>
                            <Card elevation={3} style={{ height: '100%' }}>
                                <CardHeader
                                    title={report.title}
                                    subheader={`Created by: ${report.createdBy}, Time: ${new Date(Number(report.timestamp)).toLocaleString()}`}
                                />
                                <CardContent>
                                    <div><h3>Description: {report.description}</h3></div>
                                    <FormControl fullWidth margin="normal">
                                            <InputLabel><h2>Status: </h2></InputLabel>
                                            <br></br>
                                            <br></br>
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
                                            {report.comments.map((comment) => (
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
                                                    <br></br>
                                                    <span>Created by: {comment.createdBy} </span>
                                                    <>Time: {new Date(Number(comment.timestamp)).toLocaleString()}</>
                                                    {comment.createdBy === currentUserId && (
                                                        <Button variant="outlined" onClick={() => toggleEditMode(comment._id)}>
                                                            {editingCommentId === comment._id ? 'Cancel' : 'Edit'}
                                                        </Button>
                                                    )}
                                                    {editingCommentId === comment._id && (
                                                        <Button onClick={() => handleUpdateComment(report._id, comment._id)}>Submit Edit</Button>
                                                    )}
                                                </Box>
                                            ))}
                                        </Box>

                                        <TextField
                                            label="Add a comment..."
                                            multiline
                                            rows={2}
                                            fullWidth
                                            value={commentTexts[`${report._id}-${reportIndex}`] || ''}
                                            onChange={(e) => handleCommentChange(report._id, reportIndex, e.target.value)}
                                        />
                                        <Button onClick={() => handleAddComment(report, reportIndex)} variant="contained" color="primary">Add Comment</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination count={Math.ceil(reports.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
                </Box>
            </Box>
        </Box>
    );
};

export default FacilityReports;
