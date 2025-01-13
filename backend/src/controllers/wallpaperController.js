const azure = require('../config/azure');

const generateWallpapers = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt);
    
    const enhancedPrompt = `Create a beautiful vertical wallpaper art of the given keyword: ${prompt}. Focus on the subject matter without showing any devices or frames. Make it visually striking with rich colors and details, perfectly composed for mobile screens in portrait orientation.`;
    console.log('Enhanced prompt:', enhancedPrompt);
    
    console.log('Making request to Azure...');
    const imagePromises = Array(5).fill().map(async () => {
      const result = await azure.images.generate({
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1792'
      });
      return result.data[0].url; 
    });
    
    const imageURLs = await Promise.all(imagePromises);
    
    console.log('Azure response received:', imageURLs);
    res.json({ images: imageURLs });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Failed to generate wallpapers',
      details: error.message 
    });
  }
};

module.exports = {
  generateWallpapers,
};
