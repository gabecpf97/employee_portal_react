import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchHousingById } from '../../store/slices/housing.slice.js';

const HousingSummary = () => {
    const dispatch = useDispatch();
    // Get housing ID from URL
    const { housingId } = useParams();
    // Access the nested houseInfo
    const housingData = useSelector(state => state.housing.housingInfo.houseInfo);
    const status = useSelector(state => state.housing.status);
    const error = useSelector(state => state.housing.error);

    useEffect(() => {
        if (housingId) {
            dispatch(fetchHousingById(housingId));
        }
    }, [dispatch, housingId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Housing Details</h2>
            {housingData && (
                <>
                    <h3>Address:</h3>
                    <p>{housingData.address.buildingAptNum}, {housingData.address.street}, {housingData.address.city}, {housingData.address.state} {housingData.address.zip}</p>
                    <h3>Landlord Info:</h3>
                    <p>{housingData.landlord.firstName} {housingData.landlord.lastName}</p>
                    <p>Email: {housingData.landlord.email}</p>
                    <p>Phone: {housingData.landlord.phone}</p>
                    <h3>Furniture Status:</h3>
                    <p>Beds: {housingData.furniture.bed}</p>
                    <p>Mattress: {housingData.furniture.mattress}</p>
                    <p>Tables: {housingData.furniture.table}</p>
                    <p>Chairs: {housingData.furniture.chair}</p>
                    <h3>Roommates:</h3>
                    <ul>
                        {housingData.residentIds.map(resident => (
                            <li key={resident._id}>{resident.username}</li> // Use the unique `_id` as key and show username
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default HousingSummary;
