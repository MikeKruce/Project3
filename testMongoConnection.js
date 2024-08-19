const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/artStudio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  const newUser = new User({ username: 'testuser', email: 'test@example.com', password: 'password' });
  await newUser.save();
  console.log('User saved');
  mongoose.connection.close();
})
.catch((error) => {
  console.error('Could not connect to MongoDB', error);
});
