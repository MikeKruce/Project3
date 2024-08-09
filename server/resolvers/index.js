const { User } = require('../models/User');

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (parent, args) => await User.findById(args.id),
    searchUsers: async (parent, { name }) => {
      return await User.find({ username: { $regex: name, $options: 'i' } });
    },
  },
  Mutation: {
    register: async (parent, args) => {
      const { username, email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');
      const token = jwt.sign({ id: user.id }, secretOrKey, { expiresIn: '1h' });
      return token;
    },
  },
};

module.exports = resolvers;
