import * as yup from "yup";
export const searchValdation = yup.object({
  search: yup.string().required("search field cant be empty"),
});
