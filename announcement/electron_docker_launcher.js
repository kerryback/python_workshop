// main.js
const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  // Start the Docker container
  exec('docker run -d -p 8501:8501 your_docker_image_name', (err, stdout, stderr) => {
    if (err) {
      console.error('Failed to start Docker container:', err);
      return;
    }
    console.log('Docker container started:', stdout);
    // Load the local web app URL after container is up
    setTimeout(() => win.loadURL('http://localhost:8501'), 5000);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
