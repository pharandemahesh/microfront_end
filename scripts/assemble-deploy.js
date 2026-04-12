const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const deployDir = path.join(rootDir, "deploy");
const hostDistDir = path.join(rootDir, "host", "dist");
const remotes = ["home", "data", "settings", "state"];

function resetDir(dirPath) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirContents(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) {
        throw new Error(`Missing build output: ${sourceDir}`);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
            fs.cpSync(sourcePath, targetPath, { recursive: true });
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

resetDir(deployDir);
copyDirContents(hostDistDir, deployDir);

for (const remote of remotes) {
    copyDirContents(
        path.join(rootDir, remote, "dist"),
        path.join(deployDir, "mfes", remote)
    );
}

console.log(`Production bundle assembled at ${deployDir}`);
