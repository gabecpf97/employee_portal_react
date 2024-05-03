import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports, addReport, addComment } from '../../store/slices/facilityReports.slice.js';

const FacilityReports = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [commentTexts, setCommentTexts] = useState({});

    const dispatch = useDispatch();
    const reports = useSelector(state => state.facilityReports.reports);
    const status = useSelector(state => state.facilityReports.status);
    const error = useSelector(state => state.facilityReports.error);

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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

    const handleCommentChange = (reportId, index, text) => {
        const newCommentTexts = { ...commentTexts, [`${reportId}-${index}`]: text };
        setCommentTexts(newCommentTexts);
    };

    const handleAddComment = async (report, index) => {
        const commentText = commentTexts[`${report._id}-${index}`];
        if (commentText) {
            try {
                console.log(commentText);
                await dispatch(addComment({ reportId: report._id, comment: commentText })).unwrap();
                await dispatch(fetchReports());
                setCommentTexts(prev => ({ ...prev, [`${report._id}-${index}`]: '' }));
            } catch (error) {
                console.error('Failed to add comment:', error);
                alert('Failed to add comment: ' + error.message);
            }
        } else {
            alert('Comment text cannot be empty');
        }
    };

    return (
        <div>
            <h1>Add a New Report</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <br></br>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <br></br>
                <button type="submit">Submit Report</button>
            </form>
            <h2>Facility Reports</h2>
            {status === 'loading' && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <ul>
                {reports.filter(report => report).slice().reverse().map((report, reportIndex) => (
                    <li key={report._id}>
                        <h2>{report.title}</h2>
                        <p>Description: {report.description}</p>
                        <p>created by: {report.createdBy} </p>
                        <p>TimeStamp: {new Date(Number(report.timestamp)).toLocaleString()}</p>
                        <p>Status: {report.status}</p>

                        <div>
                            <h3>Comments:</h3>
                            <ul>
                                {report.comments.map((comment) => (
                                    <li key={`${report._id}-${comment._id}`}>
                                        <p>Message: {comment.description}</p>
                                        <p>created by: {comment.createdBy} </p>
                                        <p>TimeStamp: {new Date(Number(comment.timestamp)).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                            <textarea
                                value={commentTexts[`${report._id}-${reportIndex}`] || ''}
                                onChange={(e) => handleCommentChange(report._id, reportIndex, e.target.value)}
                                placeholder="Add a comment..."
                                required
                            />
                            <button onClick={() => handleAddComment(report, reportIndex)}>Add Comment</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default FacilityReports;
