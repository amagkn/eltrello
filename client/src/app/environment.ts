import * as process from 'process';

interface EnvironmentInterface {
  REACT_APP_API_URL: string;
}

export const environment: EnvironmentInterface = process.env as any;
