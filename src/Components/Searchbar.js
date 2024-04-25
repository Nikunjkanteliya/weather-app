import { useFormik } from "formik";
import { React } from "react";
import { searchValdation } from "../schema/searchvalid";
// import { search_svg } from "../constants/const";
import { Search } from "lucide-react";

const Searchbar = ({ getcityName }) => {
  let search_value = { search: "" };
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: search_value,
    validationSchema: searchValdation,
    onSubmit: ({ search }, { resetForm }) => {
      getcityName(search);
      resetForm();
    },
  });

  return (
    <div className="text-center mb-[20px] mt-[20px]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center font-poppins"
      >
        <label htmlFor="search_values"></label>
        <input
          className="bg-[#fff] border-none rounded-[5px] text-[#555] text-[16px] h-[40px] w-[70%] px-[15px] py-[2px]"
          type="text"
          name="search"
          id="search_values"
          placeholder="enter city name"
          onChange={handleChange}
          value={values.search}
        />
        <button
          type="submit"
          className="px-[20px] h-[40px] py-[2px] border-none rounded-[5px] bg-[#84cef5] text-[#fff] ml-5 cursor-pointer hover:bg-[#fff] hover:text-[#f27089]"
        >
          {" "}
          <Search />
        </button>
      </form>
      {errors && touched ? (
        <p className="text-[14px] text-red-700 font-semibold pl-2 text-left text-pretty pt-3 text-center">
          {" "}
          {errors.search}{" "}
        </p>
      ) : null}
    </div>
  );
};

export default Searchbar;
