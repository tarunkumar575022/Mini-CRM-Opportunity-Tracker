const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Opportunity = require('./models/Opportunity');

dotenv.config({ path: __dirname + '/../.env' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await Opportunity.deleteMany();
    await User.deleteMany();
    console.log('Existing Data Cleared');

    // Create Test Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash1 = await bcrypt.hash('test123', salt);
    const passwordHash2 = await bcrypt.hash('demo123', salt);

    const users = await User.insertMany([
      {
        name: 'Tarun Kumar',
        email: 'test@pipelineiq.com',
        password: passwordHash1,
      },
      {
        name: 'Demo User',
        email: 'demo@pipelineiq.com',
        password: passwordHash2,
      },
    ]);

    console.log('Users Created');

    // Create Test Opportunities
    const ops = [
      {
        owner: users[0]._id,
        customerName: 'TechCorp Solutions',
        contactName: 'Alice Smith',
        contactEmail: 'alice@techcorp.com',
        contactPhone: '555-0101',
        requirement: 'Looking for a comprehensive CRM integration and data migration.',
        estimatedValue: 1500000,
        stage: 'Proposal Sent',
        priority: 'High',
        nextFollowUpDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
        notes: 'They are evaluating our competitor as well.',
      },
      {
        owner: users[0]._id,
        customerName: 'Global Industries',
        requirement: 'Needs a basic internal portal.',
        estimatedValue: 500000,
        stage: 'Qualified',
        priority: 'Medium',
      },
      {
        owner: users[0]._id,
        customerName: 'StartupX',
        contactName: 'Bob Johnson',
        requirement: 'MVP Development for new product',
        estimatedValue: 2000000,
        stage: 'Won',
        priority: 'High',
      },
      {
        owner: users[1]._id,
        customerName: 'Demo Client Alpha',
        requirement: 'Marketing website redesign',
        estimatedValue: 250000,
        stage: 'Contacted',
        priority: 'Low',
        nextFollowUpDate: new Date(Date.now() + 86400000 * 5),
      },
      {
        owner: users[1]._id,
        customerName: 'Demo Client Beta',
        requirement: 'E-commerce platform upgrade',
        estimatedValue: 800000,
        stage: 'New',
        priority: 'Medium',
      },
    ];

    await Opportunity.insertMany(ops);
    console.log('Opportunities Created');

    console.log('Data Seeding Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
