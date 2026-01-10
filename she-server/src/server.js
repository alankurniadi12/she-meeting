import app from './app.js';
import connectDatabase from './config/database.js';
const port = 3000;

// Connect to the database
await connectDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});