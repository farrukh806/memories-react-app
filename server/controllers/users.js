import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
dotenv.config();

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(404).json({ message: 'User not found' });

		const isPasswordMatched = bcrypt.compare(password, existingUser.password);
		if (!isPasswordMatched)
			return res.status(401).json({ message: 'Unauthorized! Access denied.' });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: '3d' }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		console.log(error.message);

		res.status(500).json({ message: error.message });
	}
};

export const signup = async (req, res) => {
	req.body = req.body;

	const { email, password, firstName, lastName, confirmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(409).json({ message: 'User already exist' });

		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Password not matched' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const createdUser = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email: createdUser.email, id: createdUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: '3d' }
		);

		res.status(200).json({ result: createdUser, token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
