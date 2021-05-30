import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
import FlatButton from "../../components/button";

const window = Dimensions.get("window");

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
      mode: "outlined",
      placeholder: "Username",
      name: "username",
      error: errors.username && touched.username,
      onChangeText: handleChange("username"),
      value: values.username,
      onBlur: handleBlur("username"),
    },
    {
      mode: "outlined",
      placeholder: "Email",
      name: "email",
      error: errors.email && touched.email,
      onChangeText: handleChange("email"),
      value: values.email,
      onBlur: handleBlur("email"),
    },
    {
      mode: "outlined",
      placeholder: "Password",
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
      <View key={count}>
        <TextInput name={name} {...element} style={styles.input} />
        {errors[name] && touched[name] && (
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
        <Headline style={styles.title}>LOGIN</Headline>
        <Subheading style={styles.subTitle}>
          Welcome to Diary App
        </Subheading>
      </View>
      {renderedFields}
      <View style={styles.footer}>
        <FlatButton text="sign in" onPress={submitForm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    marginVertical: 15,
    alignItems: "center"
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 5,
    width: window.width - 30,
  },
  footer: {
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.primary 
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.colors.primary 
  }
});

export default Login;
