export const TodoCreateSchema = {
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

export const TodoUpdateSchema = {
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
