import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  price: "",
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

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const navigate = useNavigate();

  const [subOptions, setSubOptions] = useState([]);
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("Single Product", p);
      // 1 load single product
      setValues({ ...values, ...p.data });
      // 2 load single product category sub
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in ant select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); //required for ant design to work
    });
  };
  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.err(err.response.data.err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUBS OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    console.log("Existing Category values.category", values.category);
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
    // setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}
          {JSON.stringify(values)}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
