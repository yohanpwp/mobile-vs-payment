
const showOnlyAvailableText = (text: string | undefined): string => {
  return text ? text : "-";
};

const displayNumberWithComma = (value: string | number) => {
  let typeNumber = typeof value == "string" ? Number(value) : value;
  let displayNumber = typeNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
  return displayNumber;
};

const formatDatesPicker = (value: string) => {
  return Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(Date.parse(value));
};

export const displayText = {
  showOnlyAvailableText,
  formatDatesPicker,
};

export const displayNumber = { displayNumberWithComma };
