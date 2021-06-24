import express from 'express';
import { v4 } from 'uuid';
import Joi from 'joi';
import {createValidator} from 'express-joi-validation';


const app = express();
const PORT = 5000;
const validator = createValidator();

app.use(express.json());

const users = [];

const userSchema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().alphanum().required(),
	age: Joi.number().min(4).max(130).required(),
});

const createUser = (req, res) => {
	const user = req.body;
	console.log(req);
	const userId = v4();
	users.push({
		...user,
		id: userId,
		isDeleted: false
	});
	
	res.send(users);
};

const getUser = (req, res) => {
	const { id } = req.params;
	
	const user = users.find(user => user.id === id);

	if(!user) {
		res.status(404).send('User not found.')
	} else {
		res.send(user);
	}
};

const deleteUser = (req, res) => {
	const { id } = req.params;

	const user = users.find(user => user.id === id);

	if(!user || user.isDeleted) {
		res.status(404).send('User not found.');
	} else {
		user.isDeleted = true;
		res.send(`User '${user.login}' was deleted.`)
	}
};

const updateUser = (req, res) => {
	const { login, password, age } = req.body;
	const { id } = req.params;

	const user = users.find(user => user.id === id);

	if(!user) {
		res.status(404).send('User not found.');
	} else {
		if(login) user.login = login;
		if(password) user.password = password;
		if(age) user.age = age;

		res.send(`User info was updated.`);
	}
};

const getAutoSuggestUsers = (req, res) => {
	const { loginSubstring, limit } = req.query;
	console.log(users);
	const requiredUsers = users
		.filter(user => user.login.includes(loginSubstring))
		.sort((a, b) => a.login.localeCompare(b.login))
		.slice(0, limit);

	res.send(requiredUsers);
};

app.post('/users', validator.body(userSchema), createUser);
app.get('/users/:id', getUser);
app.get('/users', getAutoSuggestUsers);
app.delete('/users/:id', deleteUser);
app.put('/users/:id', updateUser);

app.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`);
});