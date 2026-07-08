const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.text({ type: 'text/html', limit: '10mb' })); // To parse raw HTML bodies

// Create public/hosted directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
const hostedDir = path.join(publicDir, 'hosted');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(hostedDir)) {
    fs.mkdirSync(hostedDir);
}

// Serve the hosted directory as static files
app.use('/hosted', express.static(hostedDir));

// Deploy endpoint
app.post('/deploy', (req, res) => {
    try {
        const htmlContent = req.body;
        
        if (!htmlContent || typeof htmlContent !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing HTML content' });
        }

        const id = nanoid(10);
        const filename = `project-${id}.html`;
        const filePath = path.join(hostedDir, filename);

        // Write HTML to file
        fs.writeFileSync(filePath, htmlContent, 'utf8');

        // Construct the public URL
        // In production on AMD Cloud, this might need to reflect the public IP/domain
        const host = req.get('host');
        const protocol = req.protocol;
        const publicUrl = `${protocol}://${host}/hosted/${filename}`;

        console.log(`Deployed new project: ${filename}`);

        res.status(200).json({
            success: true,
            id: id,
            url: publicUrl
        });

    } catch (error) {
        console.error('Deployment error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Simple health check
app.get('/', (req, res) => {
    res.send('AMD Developer Cloud Deployment Server is running.');
});

app.listen(PORT, () => {
    console.log(`🚀 Deployment server running on port ${PORT}`);
    console.log(`Hosted files will be served at /hosted/`);
});
