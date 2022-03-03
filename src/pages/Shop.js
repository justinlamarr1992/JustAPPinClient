import React, { useEffect, useState } from "react";
import Star from "../components/forms/Star";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [articles, setArticles] = useState([
    "Hat",
    "Tie",
    "Jacket",
    "Coat",
    "Short Sleeve",
    "Long Sleeve",
    "Hoodie",
    "Sweater",
    "Joggers",
    "Shorts",
    "Tracksuit",
    "Vest",
    "Pajamas",
    "Socks",
  ]);
  const [article, setArticle] = useState("");
  const [colors, setColors] = useState([
    "White",
    "Black",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Orange",
    "Purple",
    "Yellow",
    "Pink",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("Yes");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  //   2load products on user search input
  useEffect(() => {
    // console.log("text", text);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
      return () => clearTimeout(delayed);
    }, 300);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    // console.log("ok to request");
    fetchProducts({ price });
    console.log("price", price);
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setCategoryIds([]);
    setStar("");
    setArticle("");
    setSub("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4 load products based on category
  // show categories in alist of checkboxes
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          checked={categoryIds.includes(c._id)}
          name="category"
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    // if not found returns -1 else returns index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    setStar("");
    setArticle("");
    setSub("");
    setColor("");
    setShipping("");
    fetchProducts({ category: inTheState });
  };

  // 5. Show ProductsbyStarRating
  const handleStarClick = (num) => {
    console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setArticle("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 lp-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. Show Products by Subs
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge bg-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log('Sub', s)
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setArticle("");
    setColor("");
    setShipping("");
    fetchProducts({ sub: sub });
  };

  // 7. Show Products based on the type of article of clothing
  const showArticles = () =>
    articles.map((a) => (
      <Radio
        key={a}
        value={a}
        name={a}
        checked={a === article}
        onChange={handleArticle}
        className="pb-1 pl-4 pr-4"
      >
        {a}
      </Radio>
    ));

  const handleArticle = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setArticle(e.target.value);
    setColor("");
    setShipping("");
    fetchProducts({ article: e.target.value });
  };

  // 8. Show Products based on Color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setArticle("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. Show Products based on ability to ship or not
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setArticle("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search/ Filter</h4>
          <hr />
          {/* When Page opens for the first time two submenus will be opened */}
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            {/* Price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            {/* Category */}
            <SubMenu
              key="2"
              title={
                <h6 className="h6">
                  <DownSquareOutlined />
                  Icon
                </h6>
              }
            >
              {/* Test code to use Pictures instead of text */}
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
            {/* Stars */}
            <SubMenu
              key="3"
              title={
                <h6 className="h6">
                  <StarOutlined />
                  Rating
                </h6>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>
            {/* Subs */}
            <SubMenu
              key="4"
              title={
                <h6 className="h6">
                  <DownSquareOutlined />
                  Items
                </h6>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showSubs()}</div>
            </SubMenu>
            {/* Articles of CLothing */}
            <SubMenu
              key="5"
              title={
                <h6 className="h6">
                  <DownSquareOutlined />
                  Article of Clothing
                </h6>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showArticles()}
              </div>
            </SubMenu>
            {/* Color */}
            <SubMenu
              key="6"
              title={
                <h6 className="h6">
                  <DownSquareOutlined />
                  Color
                </h6>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>
            {/* Shipping */}
            <SubMenu
              key="7"
              title={
                <h6 className="h6">
                  <DownSquareOutlined />
                  Shipping
                </h6>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>No Products found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
