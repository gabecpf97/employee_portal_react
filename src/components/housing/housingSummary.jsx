import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Box, Grid, Typography } from '@mui/material';
import { fetchHousingById } from '../../store/slices/housing.slice.js';

const HousingSummary = () => {
    const dispatch = useDispatch();
    const housingIdLocalStorage = window.localStorage.getItem('housingId');
    const housingData = useSelector(state => state.housing.housingInfo.houseInfo);
    const status = useSelector(state => state.housing.status);
    const error = useSelector(state => state.housing.error);

    useEffect(() => {
        if (housingIdLocalStorage) {
            dispatch(fetchHousingById(housingIdLocalStorage));
        }
    }, [dispatch, housingIdLocalStorage]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box
            m={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '600px' }}>
                <Typography variant="h4" gutterBottom>Housing Details</Typography>
                {housingData && (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Address</Typography>
                            <p>{housingData.address.buildingAptNum}, {housingData.address.street}, {housingData.address.city}, {housingData.address.state} {housingData.address.zip}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Landlord Info</Typography>
                            <p>Land Lord Name: {housingData.landlord.firstName} {housingData.landlord.lastName}</p>
                            <p>Email: {housingData.landlord.email}</p>
                            <p>Phone: {housingData.landlord.phone}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Furniture Status</Typography>
                            <p>Beds: {housingData.furniture.bed}</p>
                            <p>Mattress: {housingData.furniture.mattress}</p>
                            <p>Tables: {housingData.furniture.table}</p>
                            <p>Chairs: {housingData.furniture.chair}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Roommates</Typography>
                            <ul>
                                {housingData.residentIds.map((resident, index) => (
                                    <li key={`${resident._id}-${index}`}>{resident.username}</li>

                                ))}
                            </ul>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default HousingSummary;
