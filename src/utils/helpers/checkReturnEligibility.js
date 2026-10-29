export const checkReturnEligibility = (status, deliveredOn, return_status) => {
  console.log("checkEligibility-updated Code")
  console.log({ status, deliveredOn, return_status });

  if (status !== "Delivered") {
    return { isVisible: false, message: "", daysLeft: 0, returnStatus: "" };
  }

  const THREE_DAYS_IN_SECONDS = 3 * 24 * 60 * 60; // 3 days in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert current time to seconds
  const timeElapsed = currentTimestamp - deliveredOn;
  const timeLeft = THREE_DAYS_IN_SECONDS - timeElapsed;

  if (timeLeft <= 0) {
    console.log({
      isVisible: false,
      message: "Return period expired",
      daysLeft: 0,
      returnStatus: "",
    });

    return {
      isVisible: false,
      message: "Return period expired",
      daysLeft: 0,
      returnStatus: "",
    };
  }

  const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60)); // Convert remaining seconds to days

  const returnStatusMap = {
    1: "Return initiated",
    2: "Return approved",
    3: "Return rejected",
  };

  const returnStatus = returnStatusMap[return_status] || "";

  console.log({
    isVisible: true,
    message: `${daysLeft} days left to return`,
    daysLeft,
    returnStatus,
  });

  return {
    isVisible: true,
    message: `${daysLeft} days left to return`,
    daysLeft,
    returnStatus,
  };
};
