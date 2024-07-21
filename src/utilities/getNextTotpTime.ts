export default function getNextTotpTime(
  currentTimeInMilliseconds: number,
  timeStepInSeconds: number,
) {
  const timeStepInMilliseconds = timeStepInSeconds * 1000;
  return (
    Math.ceil(currentTimeInMilliseconds / timeStepInMilliseconds) *
    timeStepInMilliseconds
  );
}
