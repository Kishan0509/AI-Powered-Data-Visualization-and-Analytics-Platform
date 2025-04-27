exports.generateInsights = async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const columns = Object.keys(data[0]);
        const insights = {};

        columns.forEach(col => {
            const values = data.map(row => row[col]).filter(val => typeof val === "number");
            if (values.length > 0) {
                const sum = values.reduce((a, b) => a + b, 0);
                const mean = (sum / values.length).toFixed(2);
                const min = Math.min(...values);
                const max = Math.max(...values);

                insights[col] = { mean, min, max };
            }
        });

        res.json({ message: "Insights generated", insights });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
