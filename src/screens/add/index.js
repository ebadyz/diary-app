import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Headline, Subheading } from "react-native-paper";
import { useFormik } from "formik";
import theme from "../../theme";

const fields = [
  {
    mode: "flat",
    placeholder: "title",
    name: "title",
  },
  {
    mode: "flat",
    placeholder: "dear diary ...",
    name: "diary",
    multiline: true,
    numberOfLines: 20
  },
];

const addDiary = () => {
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
      title: "",
      diary: "",
    },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
    //   signIn();
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const renderedFields = fields.map((element, count) => {
    const { label, name } = element;
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
          Create
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
    paddingVertical: 20
  },
  spacing: {
    paddingBottom: 10,
  },
  main: {
    flex: 6,
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

export default addDiary;
