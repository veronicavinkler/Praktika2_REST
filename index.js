
require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3000;

console.log("Starting server...");
console.log("App imported successfully:", app);

// Veahaldus serveri käivitamisel
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on("error", (err) => {
    console.error("Server startup error:", err.message);
    process.exit(1);
});

