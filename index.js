const express = require('express');
const posts = require('./posts/postRouter');

const server = express();
const port = 4000;

server.use(express.json());
server.use('/api/posts', posts);

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Posts API</h2>
        <p>Welcome to the Lambda Posts API</p>
    `);
})

server.listen(port, () => {
    console.log(`\n*** Server running at http://localhost:${port} ***\n`)
});