export const DownloadSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
    },
  },
  required: ['image'],
  additionalProperties: true,
};
