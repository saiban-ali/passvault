export default {
  type: 'object',
  properties: {
    password: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['email', 'password'],
} as const;
