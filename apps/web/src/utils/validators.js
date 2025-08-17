const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
};

const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3-20 characters
    return re.test(String(username));
};

const validateQuestionTitle = (title) => {
    return title.length > 0 && title.length <= 100; // Title should not be empty and max 100 characters
};

const validateBidAmount = (amount) => {
    return amount > 0; // Amount should be greater than 0
};

const validateReviewRating = (rating) => {
    return rating >= 1 && rating <= 5; // Rating should be between 1 and 5
};

export {
    validateEmail,
    validatePassword,
    validateUsername,
    validateQuestionTitle,
    validateBidAmount,
    validateReviewRating
};