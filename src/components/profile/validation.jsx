function validateFormData(formData) {
    let errors = [];

    // Helper function to validate email
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Helper function to check if the string is empty
    const isEmpty = (value) => {
        return !value || value.trim() === '';
    };

    const formEntries = Object.fromEntries(formData.entries());

    if (isEmpty(formEntries['firstName'])) errors.push("First name is required.");
    if (isEmpty(formEntries['lastName'])) errors.push("Last name is required.");
    if (isEmpty(formEntries['address'])) errors.push("Address is required.");
    if (isEmpty(formEntries['cellPhone'])) errors.push("Cellphone number is required.");

    if (!validateEmail(formEntries['email'])) errors.push("Email format is invalid.");
    
    
    if (isNaN(new Date(formEntries['DOB']).getTime())) errors.push("Date of birth is invalid.");

    if(!(/^\d{10}$/.test(formEntries['SSN'])) || isEmpty(formEntries['SSN'])) errors.push("SSN is not valid");
    


    // Check required file fields
    const fileFields = [
        { key: 'picture', name: 'Picture' },
        { key: 'workAuthorization_document', name: 'Work authorization document' },
        { key: 'driverLicense_document', name: 'Driver\'s license document' }
    ];

    fileFields.forEach(({ key, name }) => {
        if (formData.has(key)) {
            const file = formData.get(key);
            // Check if the file is present and its type is not 'image/png'
            if (file.name && ((!file.type.startsWith('image/'))&& (file.type !== 'application/pdf'))) {
                errors.push(`${name} must be an image or PDF file.`);
            }
        }
    });
    return errors.join("\n");
}

export default validateFormData