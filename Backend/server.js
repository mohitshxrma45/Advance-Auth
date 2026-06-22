import app from "./src/app.js";
import { connectDB } from "./src/config/db.connect.js";

const PORT = process.env.PORT || 3000;

connectDB().catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});