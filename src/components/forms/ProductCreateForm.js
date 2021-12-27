import React, { useState } from "react";

import { Select } from "antd";

const { Option } = Select;
const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  handleImageChange,
  preview,
  setPreview,
}) => {
  const {
    title,
    desciption,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    articles,
    color,
    article,
    categories,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <h3>test image</h3>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image./*"
          // hidden
        />
        <img src={preview} alt="Preview Image" className="img m-2" />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={desciption}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          id=""
          className="form-control"
          onChange={handleChange}
        >
          <option>Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          name="color"
          id=""
          className="form-control"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Article of Clothing</label>
        <select
          name="article"
          id=""
          className="form-control"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {articles.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please Select Category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {subOptions ? subOptions.length : "no subs yet"}

      {showSub && (
        <div>
          <label> SubCategory</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};
export default ProductCreateForm;