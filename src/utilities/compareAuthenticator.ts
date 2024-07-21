import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';

export default function compareAuthenticator(
  a: AuthenticatorWithoutId,
  b: AuthenticatorWithoutId,
) {
  return (
    a.algorithm === b.algorithm &&
    a.codeSize === b.codeSize &&
    a.initialTime === b.initialTime &&
    a.issuer === b.issuer &&
    a.secret === b.secret &&
    a.timeStep === b.timeStep &&
    a.username === b.username
  );
}
