// validations.js

const validateRFC = (rfc) => {
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    return rfcRegex.test(rfc);
};

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const validateZipcode = (zipcode) => {
    const zipcodeRegex = /^[0-9]{5}$/;
    return zipcodeRegex.test(zipcode);
};

const validateFields = (fullname, rfc, email, zipcode) => {
    return fullname && rfc && email && zipcode;
};

module.exports = { validateRFC, validateEmail, validateZipcode, validateFields };
