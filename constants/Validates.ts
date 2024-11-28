export type PasswordValidateOptions =
  | "isUppercase"
  | "isLowercase"
  | "isSpecialChar"
  | "isNumber";

const value = (
  value: string,
  options: Array<PasswordValidateOptions> | PasswordValidateOptions
): boolean => {
  const upperCaseRegex = /[A-Z]/g;
  const lowerCaseRegex = /[a-z]/g;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
  const numberRegex = /[0-9]/g;

  if (typeof options === "string") {
    if (options.includes("isUppercase")) {
      return upperCaseRegex.test(value);
    }
    if (options.includes("isLowercase")) {
      return lowerCaseRegex.test(value);
    }
    if (options.includes("isSpecialChar")) {
      return specialCharRegex.test(value);
    }
    if (options.includes("isNumber")) {
      return numberRegex.test(value);
    } else {
      return false;
    }
  }

  if (Array.isArray(options)) {
    let result = true;
    options.forEach((option) => {
      if (option.includes("isUppercase")) {
        result = result && upperCaseRegex.test(value);
      }
      if (option.includes("isLowercase")) {
        result = result && lowerCaseRegex.test(value);
      }
      if (option.includes("isSpecialChar")) {
        result = result && specialCharRegex.test(value);
      }
      if (option.includes("isNumber")) {
        result = result && numberRegex.test(value);
      }
    });
    return result;
  }
  return false;
};

// set color based on password strength
const strengthColor = (count: number) => {
  if (count < 2) return { label: "Poor", color: "error.main" };
  if (count < 3) return { label: "Weak", color: "warning.main" };
  if (count < 4) return { label: "Normal", color: "warning.dark" };
  if (count < 5) return { label: "Good", color: "success.main" };
  if (count < 6) return { label: "Strong", color: "success.dark" };
  return { label: "Poor", color: "error.main" };
};

// password strength indicator
const strengthIndicator = (number: string) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (value(number, "isNumber")) strengths += 1;
  if (value(number, "isSpecialChar")) strengths += 1;
  if (value(number, ["isNumber", "isSpecialChar"])) strengths += 1;
  return strengths;
};

export const Validate = { value, strengthColor, strengthIndicator };
