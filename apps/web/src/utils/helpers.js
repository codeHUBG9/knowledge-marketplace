// This file contains helper functions for various tasks.

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmpty = (value) => {
    return value === null || value === undefined || value.trim() === '';
};

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};