const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export { formatCurrency, formatDate, truncateText };