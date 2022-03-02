import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getDiscounts,
  removeDiscount,
  createDiscount,
} from "../../../functions/discount";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateDiscountPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllDiscounts();
  }, []);

  const loadAllDiscounts = () =>
    getDiscounts().then((res) => setDiscounts(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.table(name, expiry, rate);
    createDiscount({ name, expiry, rate }, user.token)
      .then((res) => {
        loadAllDiscounts();
        setLoading(false);
        setName("");
        setRate("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (discountId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeDiscount(discountId, user.token)
        .then((res) => {
          loadAllDiscounts();
          setLoading(false);
          toast.error(`The "${res.data.name}" Discount has been deleted.`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Discount</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Rate %</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setRate(e.target.value)}
                value={rate}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button className="btn btn-outlined-primary">Save</button>
          </form>
          <br />
          <h4>{discounts.length} Discounts</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Rate</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{new Date(d.expiry).toLocaleDateString()}</td>
                  <td>{d.rate}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(d._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CreateDiscountPage;
