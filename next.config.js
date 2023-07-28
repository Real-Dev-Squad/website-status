module.exports = {
    images: {
        domains: ['raw.githubusercontent.com', 'res.cloudinary.com'],
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/tasks',
                permanent: true,
            },
        ];
    },
};
