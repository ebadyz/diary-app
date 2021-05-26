import * as React from "react";
import { View, styleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";

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
  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
    return (
      <View key={"field-" + count}>
          <TextInput
            variant="outlined"
            label={label}
            name={name}
            // onChangeText={handleChange(name)}
            // onBlur={handleBlur(name)}
            // value={values.name}
            fullWidth
          />
      </View>
    );
  });

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={(values) => console.log("values", values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, onBlur }) => (
        <View>
          {renderedFields}
          <Button title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default Login;
