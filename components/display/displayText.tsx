import Ionicons from "@expo/vector-icons/Ionicons";

const showOnlyAvailableText = (text: string | undefined): string => {
  return text ? text : "-";
};

const showIconStatus = (status: string | undefined) => {
  switch (status) {
    case "Paid":
      return (
        <>
          <Ionicons name={"checkmark-circle"} size={28} color="green" />
          {status}
        </>
      );
    case "Canceled":
      return (
        <>
          <Ionicons name={"close-circle"} size={28} color="red" />
          {status}
        </>
      );
    case "Created":
      return (
        <>
          <Ionicons name={"add-circle"} size={28} color="blue" />
        </>
      );
    default:
      break;
  }
};

export const displayText = { showOnlyAvailableText, showIconStatus };
