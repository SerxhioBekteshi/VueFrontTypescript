import axios from "axios";
import * as yup from "yup";
import debounce from "lodash/debounce";

export const modalOrderSchema = yup.object().shape({
  quantity: yup.number().required("Quantity is required").label("Quantity"),
});

export const stockOrderSchema = yup.object().shape({
  stock: yup.number().required("stock is required").label("Stock"),
});

export const mealSchema = yup.object().shape({
  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required").label("Name"),
      portion: yup.number().required("Portion is required").label("Portion"),
    })
  ),
  name: yup.string().required("Name is required").label("Name"),
  price: yup.number().required("Price is required").label("Price"),
  cousine: yup.string().required("Cousine is required").label("Cousine"),
  carbonFootprint: yup
    .number()
    .required("Carbon footprint is required")
    .label("Carbon footprint"),
  dietCategory: yup
    .string()
    .required("Diet category is required")
    .label("Diet category"),
  calories: yup.string().required("Calories are required").label("Calories"),
  achievement: yup
    .string()
    .required("Health goal is required")
    .label("Health goal"),
});

export const questionValidationSchema = yup.object().shape({
  question: yup.string().required("Question is required").label("question"),
  order: yup.number().required("Order is required").label("Order"),
  fieldName: yup
    .string()
    .required("Field name is required")
    .label("Field Name"),
  questionOptions: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .required("Label for question is required")
          .label("Label"),
        value: yup.string().required("Value required").label("Value"),
      })
    )
    .strict(),
});

export const passwordValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Current Password is required")
    .min(8, "Current Password must be at least 8 characters long"),
  password: yup
    .string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*()_+{}|:<>?~]/,
      "Password must contain at least one special character."
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  passwordConfirm: yup
    .string()
    .required("Confirm New Password is required")
    .min(8, "Confirm New Password must be at least 8 characters long")
    .test(
      "passwords-match",
      "Confirm new password must match with new password",
      function (value) {
        return value === this.parent.password;
      }
    ),
});

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*()_+{}|:<>?~]/,
      "Password must contain at least one special character."
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  passwordConfirm: yup
    .string()
    .required("Confirm New Password is required")
    .min(8, "Confirm New Password must be at least 8 characters long")
    .test(
      "passwords-match",
      "Confirm new password must match with new password",
      function (value) {
        return value === this.parent.password;
      }
    ),
});

export const profileDetailsSchema = yup.object().shape({
  name: yup.string().required("Name is required").label("Name"),
  lastName: yup.string().required("Last name is required").label("Last Name"),
  email: yup.string().required("Email is required").label("Email"),
  gender: yup.string().required("Gender is required").label("Gender"),
  address: yup.string().required("Address is required").label("Address"),
  state: yup.string().required("State is required").label("State"),
  birthDate: yup.string().required("Birthdate is required").label("Birthdate"),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*()_+{}|:<>?~]/,
      "Password must contain at least one special character."
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  passwordConfirm: yup
    .string()
    .required("Confirm New Password is required")
    .min(8, "Confirm New Password must be at least 8 characters long")
    .test(
      "passwords-match",
      "Confirm new password must match with new password",
      function (value) {
        return value === this.parent.password;
      }
    ),
});

export const registrationProviderSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  nipt: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*()_+{}|:<>?~]/,
      "Password must contain at least one special character."
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  passwordConfirm: yup
    .string()
    .required("Confirm New Password is required")
    .min(8, "Confirm New Password must be at least 8 characters long")
    .test(
      "passwords-match",
      "Confirm new password must match with new password",
      function (value) {
        return value === this.parent.password;
      }
    ),
});

const menuPermissionNameValidation = async () => {
  try {
    const res: any = await axios.get("menu/no-role-get-all");
    if (res && res.data) {
      return res.data.map((obj: any) => obj.label);
    }
  } catch (err) {
    console.log(err, "ERR");
  }
};
// const debouncedMenuPermissionNameValidation = debounce(
//   menuPermissionNameValidation,
//   1000
// );

export const permissionSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .label("Name")
    .test("menu-permission-name", async function (value) {
      const validPermissionNames = await menuPermissionNameValidation();

      return (
        validPermissionNames.includes(value) ||
        this.createError({
          path: "name",
          message: `Permission name should equal one of the following values: "${validPermissionNames.join(
            "----"
          )}"`,
        })
      );
    }),
  roles: yup.array().of(yup.string()).label("Roles"),
  action: yup.string().required("Action is required").label("Action"),
  description: yup.string().notRequired().label("Description"),
  isActive: yup.boolean().notRequired().label("Active permission"),
  subjectId: yup.string().notRequired().label("Menu Subject"),
});
