const fs = require('fs');
const http = require('http');
const JWT = require('jsonwebtoken');

// Generate a valid JWT token with artist role
const token = JWT.sign({ 
  id: '507f1f77bcf86cd799439011',
  role: 'artist' 
}, process.env.JWT_SECRET || 'my_super_secret_key_123!');

console.log('\n=== Test Music Upload ===');
console.log('Token:', token);

// Create a test file
const testFilePath = './test-music.mp3';
fs.writeFileSync(testFilePath, 'dummy audio content');

// Create multipart form data manually
const boundary = 'WebKitFormBoundary7MA4YWxkTrZu0gW';
const fileData = fs.readFileSync(testFilePath);

const body = Buffer.concat([
  Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="title"\r\n\r\n` +
    `Test Music Upload\r\n` +
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="files"; filename="test-music.mp3"\r\n` +
    `Content-Type: audio/mpeg\r\n\r\n`
  ),
  fileData,
  Buffer.from(
    `\r\n--${boundary}--\r\n`
  )
]);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/music/upload',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length,
    'Authorization': `Bearer ${token}`,
    'Connection': 'close'
  }
};

console.log('\nRequest:');
console.log('- URL: http://localhost:3000/api/music/upload');
console.log('- Method: POST');
console.log('- Token: ' + token.substring(0, 30) + '...');

// Make request
const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse:');
    console.log('Status:', res.statusCode);
    try {
      const json = JSON.parse(data);
      console.log('Body:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Body:', data);
    }
    
    // Cleanup
    fs.unlinkSync(testFilePath);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('\nError:', error.message);
  fs.unlinkSync(testFilePath);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('\nRequest timeout');
  req.destroy();
  fs.unlinkSync(testFilePath);
  process.exit(1);
});

req.setTimeout(10000);
req.write(body);
req.end();

console.log('\nSending request...');
