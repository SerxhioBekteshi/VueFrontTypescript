import * as yup from "yup";

export const modalOrderSchema = yup.object().shape({
  quantity: yup.number().required("Quantity is required").label("Quantity"),
});

export const mealSchema = yup.object().shape({
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .required("Ingredient name is required")
          .label("Name"),
        portion: yup
          .number()
          .required("Ingredient portion is required")
          .label("Portion"),
      })
    )
    .strict(),
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
  calories: yup.number().required("Calories are required").label("Calories"),
  achievement: yup
    .string()
    .required("Health goal is required")
    .label("Health goal"),
});
