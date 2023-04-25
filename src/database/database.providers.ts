
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://cem:mongonest0510@cluster0.pqpndhu.mongodb.net/?retryWrites=true&w=majority'),
  },
];
