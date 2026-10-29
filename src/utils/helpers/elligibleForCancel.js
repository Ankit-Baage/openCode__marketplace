export const eligibleForCancel = (
  orderStatusCode,
  ordered_on,
  allowedWindowInHours = 12
) => {
  const nonCancelableStatuses = [10, 11, 12, 13];
  const canCancelByStatus = !nonCancelableStatuses.includes(orderStatusCode);

  const orderedTime = ordered_on * 1000; // assuming ordered_on is in seconds
  const now = Date.now();
  const cancelDeadline = orderedTime + allowedWindowInHours * 60 * 60 * 1000;

  const msLeft = cancelDeadline - now;
  const canCancelByTime = msLeft > 0;

  let formattedTimeLeft = "0 minutes";
  if (canCancelByTime) {
    const totalMinutes = Math.ceil(msLeft / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hrLabel = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
    const minLabel = minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

    formattedTimeLeft = [hrLabel, minLabel].filter(Boolean).join(" ");
  }

  return {
    canCancel: canCancelByStatus && canCancelByTime,
    cancelDuration: formattedTimeLeft,
  };
};
