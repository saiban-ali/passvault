export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
} as const;
