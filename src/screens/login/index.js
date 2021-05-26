import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Headline, Subheading } from "react-native-paper";
import { useFormik } from "formik";
import theme from "../../theme";
import { AuthContext } from "../../contexts/auth";

const fields = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Password",
    name: "password",
  },
];

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const {
    values,
    errors,
    touched,
    handleChange,
    submitForm,
    handleBlur,
    isValid,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
      signIn();
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
    return (
      <View key={"field-" + count} style={styles.spacing}>
        <TextInput
          mode="outlined"
          label={label}
          name={name}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={values.name}
          fullWidth
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Headline style={{ color: theme.colors.primary }}>LOGIN</Headline>
        <Subheading style={{ color: theme.colors.primary }}>
          Welcome to Diary App
        </Subheading>
      </View>
      <View style={styles.main}>{renderedFields}</View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          uppercase={false}
          color={theme.colors.primary}
          style={styles.btn}
          labelStyle={{ color: theme.colors.text }}
          onPress={submitForm}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  spacing: {
    paddingBottom: 20,
  },
  head: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 2,
  },
  btn: {
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
  },
});

export default Login;
