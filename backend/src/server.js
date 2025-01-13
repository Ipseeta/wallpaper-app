require('dotenv').config();
const express = require('express');
const cors = require('cors');
const wallpaperRoutes = require('./routes/wallpaperRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/wallpapers', wallpaperRoutes);

// Add a test route
app.get('/', (req, res) => {
  res.json({ message: 'Wallpaper App Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`✨ Server is running at http://localhost:${PORT}`);
  console.log(`📱 Test the API at http://localhost:${PORT}/api/wallpapers`);
});
