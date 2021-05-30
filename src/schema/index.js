import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
