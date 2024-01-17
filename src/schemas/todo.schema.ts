export const TodoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    task: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
  },
  required: ['task', 'status'],
  additionalProperties: false,
};

export const FindOneSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: ['id'],
  additionalProperties: false,
};
