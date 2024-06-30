export default function safeBigIntToNumber(value: bigint): number {
  if (value < Number.MIN_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `Value is out of bounds. Expected between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER, got "${value.toString()}"`,
    );
  }

  return Number(value);
}
