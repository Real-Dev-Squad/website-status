export const isValidDate = (dateString: string) => {
    // Validating the "YYYY-MM-DD" format strictly
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString) && !isNaN(new Date(dateString).getTime());
};
