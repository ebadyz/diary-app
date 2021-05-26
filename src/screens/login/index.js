import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Headline,
  Subheading,
  HelperText,
} from "react-native-paper";
import { useFormik } from "formik";
import theme from "../../theme";
import { AuthContext } from "../../contexts/auth";
import { loginSchema } from "../../schema";

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
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      signIn(values.username, values.email, values.password);
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const fields = [
    {
      label: "Username",
      name: "username",
      error: errors.username && touched.username,
      onChangeText: handleChange("username"),
      value: values.username,
      onBlur: handleBlur("username"),
    },
    {
      label: "Email",
      name: "email",
      error: errors.email && touched.email,
      onChangeText: handleChange("email"),
      value: values.email,
      onBlur: handleBlur("email"),
    },
    {
      label: "Password",
      name: "password",
      error: errors.password && touched.password,
      onChangeText: handleChange("password"),
      value: values.password,
      onBlur: handleBlur("password"),
    },
  ];

  const renderedFields = fields.map((element, count) => {
    const { name } = element;
    return (
      <View key={"field-" + count} style={styles.spacing}>
        <TextInput name={name} {...element} fullWidth />
        {touched[name] && (
          <HelperText type="error" visible={errors}>
            {errors[name]}
          </HelperText>
        )}
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
    flex: 3,
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
