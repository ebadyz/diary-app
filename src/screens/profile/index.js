import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Title,
  Subheading,
  Headline,
} from "react-native-paper";
import theme from "../../theme";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View>
          <Avatar.Image
            size={107}
            source={{
              uri: "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd",
            }}
          />
        </View>
        <Headline>John Doe</Headline>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.center}>
          <Title>12</Title>
          <Subheading>Total Diaries</Subheading>
        </View>
        <View style={styles.center}>
          <Title>7</Title>
          <Subheading>Fav Diaries</Subheading>
        </View>
      </View>
      <View style={styles.items}>
        <Card>
          <Card.Title
            title="Joined Date"
            subtitle="1 january 2020"
            left={(props) => (
              <Avatar.Icon {...props} icon="alarm" color="#ffffff" size={45}/>
            )}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  avatar: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  center: {
    alignItems: "center",
  },
  items: {
    flex: 1,
  },
});
