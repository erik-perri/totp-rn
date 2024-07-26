export default function safeInputToNumber(
  input: string,
  defaultValue: number = 0,
): number {
  const value = parseInt(input, 10);

  return isNaN(value) ? defaultValue : value;
}
