import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
	const { email, username, password } = req.body;

	try {

		const userFound = await User.findOne({ email });
		if (userFound) return res.status(400).json({ message: 'The email is already in use' });

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = new User({
			email,
			username,
			password: passwordHash
		});
		const savedUser = await newUser.save();

		const token = await createAccessToken({ id: savedUser._id });

		res.cookie('token', token);
		res.json({
			id: savedUser._id,
			email: savedUser.email,
			username: savedUser.username,
			createdAt: savedUser.createdAt
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: 'User not found' });

        const match = await bcrypt.compare(password, userFound.password);
        if (!match) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token);
		res.json({
			id: userFound._id,
			email: userFound.email,
			username: userFound.username,
			createdAt: userFound.createdAt
		});

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (_, res) => {
	res.clearCookie('token');
    res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    return res.json({
        id: userFound._id,
        email: userFound.email,
        username: userFound.username
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json({ message: 'Unauthorized' });
        
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(400).json({ message: 'User not found' });
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
};
