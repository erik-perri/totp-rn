import {nativeEnum, number, object, output, string} from 'zod';
import TotpAlgorithm from '../enums/TotpAlgorithm';

export const authenticatorParser = object({
  algorithm: nativeEnum(TotpAlgorithm),
  codeSize: number(),
  icon: string(),
  id: string(),
  initialTime: number(),
  name: string(),
  secret: string(),
  timeStep: number(),
});

export type Authenticator = output<typeof authenticatorParser>;
