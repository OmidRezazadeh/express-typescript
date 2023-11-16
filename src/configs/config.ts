interface EnvironmentVariables {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  NODE_ENV: string;
 
}

export const config: EnvironmentVariables = {
  PORT: 5000,
  MONGO_URI: 'mongodb://localhost:27017/typescript',
  JWT_SECRET: 'hV37j4WfWxqz9r2',
  NODE_ENV: 'development',
};