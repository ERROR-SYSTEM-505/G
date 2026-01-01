/**
 * Goat Bot Render Deployment Fix by SaGor 
 */

const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const log = require("./logger/log.js");

// === Express server to keep Render service alive ===
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ======================
// 🚀 EXPRESS SERVER
// ======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
// === Start the Goat bot process ===
function startProject() {
        const child = spawn("node", ["Goat.js"], {
                cwd: __dirname,
                stdio: "inherit",
                shell: true
        });

        child.on("close", (code) => {
                if (code === 2) {
                        log.info("Restarting Project...");
                        startProject();
                }
        });
}

startProject();
