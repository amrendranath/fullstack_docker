// MongoDB initialization script
db = db.getSiblingDB("user_submission_db");

// Create the users collection
db.createCollection("users");

// Create an index on email for better performance
db.users.createIndex({ email: 1 });

// Insert sample data
db.users.insertMany([
  {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
]);

print("Database initialized successfully with sample data");
