import * as React from "react";
import { View, StyleSheet, type ViewStyle, type StyleProp } from "react-native";
import { useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { PropsWithChildren } from "react";
import { Text } from "@/components/Themed";
import { appColors } from "@/constants/Colors";

export const InfoCard = ({
  style,
  children,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  const isDark = useColorScheme();
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>
        <Ionicons
          name="information-circle-sharp"
          size={20}
          style={{ marginRight: 10 }}
          color={
            isDark
              ? appColors.infoCardActive.dark
              : appColors.infoCardActive.light
          }
        />
        {typeof children === "string" ? (
          <Text style={styles.text}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: appColors.infoCardActive.light,
    borderRadius: 10,
    $dark: {
      borderColor: appColors.infoCardActive.dark,
    },
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 15,
  },
  text: {
    flex: 1,
  },
});
