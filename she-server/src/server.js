console.log('Starting server...');
import app from './app.js';
import connectDatabase from './config/database.js';

// Connect to the database
await connectDatabase();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
console.log('Server started.');