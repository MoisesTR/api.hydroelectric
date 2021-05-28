import mongoose from 'mongoose';
import { variables } from '../environment/variables';

export default async () => {
  return mongoose.connect(
    `mongodb+srv://${variables.MONGO_USERNAME}:${variables.MONGO_USER_PWD}@${variables.MONGO_CLUSTER_URL}/${variables.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  );
};
