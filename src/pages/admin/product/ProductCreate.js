import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: [
    "White",
    "Black",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Orange",
    "Purple",
    "Yellow",
  ],
  articles: ["Short Sleeve", "Long Sleeve", "Hoodie", "Hat", "Socks"],
  color: "",
  article: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  // test mix appointment and ecomm
  const [preview, setPreview] = useState(
    "https:///via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(
          `${res.data.color} "${res.data.title}" is now available for customers to purchase`
        );
        // window.location.reload();
        console.log(res.data.images);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  // testing images
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setValues({ ...values, images: e.target.files[0] });
    setPreview(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUBS OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <pre>{JSON.stringify(values, null, 4)}</pre>

          <hr />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            handleImageChange={handleImageChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
            preview={preview}
            setPreview={setPreview}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
