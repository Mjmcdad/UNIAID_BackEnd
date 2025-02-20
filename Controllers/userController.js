const User = require('../Models/user');
const Student = require('../Models/student');
const Teacher = require('../Models/teacher');
const Admin = require('../Models/admin')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUsersByRole = async (req, res) =>{
    const {role} = req.params; 
    try { 
        const users = await User.findAll({where: {role}});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber, role} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({firstName, lastName, email, password: hashedPassword, phoneNumber, role});
        
        
        if (role === 'student') {
            await Student.create({userId: User.id, firstName, lastName, email,});
        }
        
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password, phoneNumber, role} = req.body;
    try {
        const user = await User.update({firstName, lastName, email, password, phoneNumber, role}, {where: {id}});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.destroy({where: {id}});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createAdmin = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber} = req.body;
    try {
        const admin = await Admin.create({firstName, lastName, email, password, phoneNumber});
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    const { id, password } = req.body;
    try {
        const student = await Student.findByPk(id, {
            include: [{
                model: User,
                attributes: ['password', 'role']
            }]
        });

        if (!student || !student.User) {
            console.log('Student not found');
            return res.status(401).json({ message: 'Invalid ID or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.User.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid ID or password' });
        }

        const token = jwt.sign({ id: student.id, role: student.User.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, role: 'admin' } });
        if (!user) {
            console.log('Admin not found');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getAllUsers, getUsersByRole, createUser, updateUser, deleteUser, createAdmin, login, adminLogin};




