app.get('/news', async (req, res) => {
    try {
        const news = [
            {
                id: 1,
                title: 'Improved Seed Varieties Help Farmers',
                description: 'Farmers across India are adopting new hybrid seed varieties...',
                image: 'https://example.com/seed-image.jpg',
                timestamp: '1 hour ago',
            },
            {
                id: 2,
                title: 'Government Provides Subsidies for Irrigation',
                description: 'The government has announced new subsidies for small-scale irrigation systems...',
                image: 'https://example.com/irrigation-image.jpg',
                timestamp: '2 hours ago',
            },
        ];
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news' });
    }
});
