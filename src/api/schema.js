import { schema } from 'normalizr';

export const defination = new schema.Entity('definations');

export const word = new schema.Entity('words', {
    explanations: [{ senses: [{ definations: [defination] }] }],
  },
);

defination.define({ word });
