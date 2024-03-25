import jwt from 'jsonwebtoken';

const users = [
  { id: 1, email: 'user@example.com', password: 'password' }
];

export const handler = async (event) => {

    console.log('event', event);
    console.log('event.body', event.body);

    const { email, password } = event.body;

    console.log('email', email);

    // Search for a user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    // Create a bearer token using JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
};
