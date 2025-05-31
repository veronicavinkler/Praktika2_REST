const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Use environment variable for secret key
const secretKey = process.env.SECRET_KEY;

// 1 Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};


// 2 User login and JWT generation
exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(400).json({
        message: 'Invalid credentials'
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({
        message: 'Invalid credentials'
    });
    const token = jwt.sign(
        { username },
        secretKey,
        { expiresIn: '1h' }
    );
    res.json({ token });
});


// 3 Create a new user
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// 4 Update an user by ID
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kasutajat ei leitud" });
        }
        const updatedUser = await user.update(req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// 5 Delete an author by ID
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kasutajat ei leitud" });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

