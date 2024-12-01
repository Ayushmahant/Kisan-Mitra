const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = 'mongodb://localhost:27017/kisanmitra';
mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    usertype: {
        type: String,
        required:true,
    },
    username: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
        minlength: 6, // Increased password length requirement
    },
    firstname: {
        type: String,
        required:true,
    },
    lastname: {
        type: String,
        required:true,
    },
    contactnumber: {
        type: String,
        required:true,
        maxlength: 10,
        unique: true,
    },
    adharnumber: {
        type: String,
        required:true,
        maxlength: 12,
        unique: true,
    },
}, {
    timestamps: true, 
});

const User = mongoose.model('Registration', userSchema);

// Register user
app.post('/register', async (req, res) => {
    console.log('Post method called');
    
    try {
        const { usertype, username, password, firstname, lastname, contactnumber, adharnumber } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { contactnumber }, { adharnumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this username, contact number, or Aadhar number' });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            usertype,
            username,
            password: hashedPassword, // Save the hashed password
            firstname,
            lastname,
            contactnumber,
            adharnumber,
        });

        // Save the user to the database
        await newUser.save();
        console.log("Data Saved");
        
        // Send success response
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log("Error:", error);  // Log the error
        res.status(500).send('Server error');
    }
});

// Login route (Optional)
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Send success response (you could return a token here as well)
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log("Error:", error);  // Log the error
        res.status(500).send('Server error');
    }
});

app.use('/images', express.static(path.join(__dirname)));

// Your news endpoint
app.get('/news', async (req, res) => {
    try {
        const news = [
            {
                id: 1,
                title: 'Improved Seed Varieties Help Farmers',
                description: 'Farmers across India are adopting new hybrid seed varieties...',
                image: '/images/seed.png',  // The image path is relative to the root of your server
                timestamp: '1 hour ago',
            },
            {
                id: 2,
                title: 'Government Provides Subsidies for Irrigation',
                description: 'The government has announced new subsidies for small-scale irrigation systems...',
                image: '/images/image.jpg',  // The image path is relative to the root of your server
                timestamp: '2 hours ago',
            },
        ];
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
