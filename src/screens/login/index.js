import * as React from "react";
import { View, styleSheet } from "react-native";
import { TextInput } from "react-native-paper";
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
        <BoomTextField label={label}>
          <TextField
            variant="outlined"
            label={label}
            name={name}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            value={values.name}
            fullWidth
          />
        </BoomTextField>
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
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default Login;
