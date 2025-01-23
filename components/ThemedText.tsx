import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "default2";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const subTitle = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, "subText"),
  };

  const styles = StyleSheet.create({
    default: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaultSemiBold: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: "bold",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      lineHeight: 30,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "bold",
      lineHeight: 20,
      color: subTitle.color,
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: "#0a7ea4",
    },
    default2: {
      fontSize: 16,
      lineHeight: 24,
      color: subTitle.color,
    }
  });

  return (
    <Text
      className={`${className}`}
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "default2" ? styles.default2 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
