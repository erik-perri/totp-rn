import {nativeEnum, number, object, optional, output, string} from 'zod';

import TotpAlgorithm from '../enums/TotpAlgorithm';

export const authenticatorParser = object({
  algorithm: nativeEnum(TotpAlgorithm),
  codeSize: number(),
  id: string(),
  initialTime: number(),
  issuer: string(),
  secret: string(),
  timeStep: number(),
  username: optional(string()),
});

export type Authenticator = output<typeof authenticatorParser>;
export type AuthenticatorWithoutId = Omit<Authenticator, 'id'>;
