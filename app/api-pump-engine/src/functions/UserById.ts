// functions/UserById.ts
import jwt from 'jsonwebtoken';

export const handler = async (event) => {
  const authHeader = event.headers?.Authorization || event.headers?.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Missing token' }),
    };
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    // Your business logic here
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid token' }),
    };
  }
};
