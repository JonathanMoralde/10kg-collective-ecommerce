import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../AppContext";

const CourierPage = ({ courier, setCourier }) => {
  const [order, setOrder] = useState([]);
  const { isNewOrder, setIsNewOrder } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  let componenMounted = true;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);

      const response = await axios.get(
        "https://localhost/10kg-collective/courier/courier_order_list.php"
      );

      if (componenMounted) {
        setOrder(response.data);
        setLoading(false);
      }

      return () => {
        componenMounted = false;
      };
    };

    fetchOrder();
  }, [isNewOrder]);

  // reset isNewOrder to false
  useEffect(() => {
    if (isNewOrder) {
      setIsNewOrder(false);
    }
  }, [isNewOrder]);

  const handleBtn = (e, order_id) => {
    const btnClicked = e.target.innerHTML;

    const url = "https://localhost/10kg-collective/admin/order_page_btn.php";

    let btnData = new FormData();
    btnData.append("action", btnClicked);
    btnData.append("order_id", order_id);

    axios
      .post(url, btnData)
      .then((response) => {
        setIsNewOrder(true);
        alert("Success");
      })
      .catch((error) => {
        alert(error.data);
      });
  };

  const handleSignOut = () => {
    let logData = new FormData();
    logData.append("logout", 1);

    axios
      .post(
        "https://localhost/10kg-collective/userModule/updateSession.php",
        logData
      )
      .then((response) => {
        alert(response.data);
        setCourier(null);
        navigate("/Courier");
      })
      .catch((error) => {
        alert(error.data);
      });
  };

  // console.log(courier);
  return (
    <>
      <section className="container-fluid container-fix my-5 courier-page">
        <div className="row">
          <div className="col-md-3">
            <div className="user-title-wrapper py-3">
              <h3 className="text-capitalize user-title">
                {courier.full_name}
              </h3>
              <h5 className="">{courier.courier_email}</h5>
            </div>
            <div className="py-3">
              <button className="dashboard-btn" onClick={() => handleSignOut()}>
                Sign out
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {loading ? (
              <h3 className="section-title">Loading</h3>
            ) : (
              <div className={`order-list-section`}>
                <h3 className="section-title">Orders</h3>
                <div className="container-fluid">
                  {order.map((o) => {
                    return (
                      <div
                        className={`row my-3 p-3 single-order admin-single-order ${
                          o.payment_status === "Paid" ? "no-blur" : ""
                        }`}
                        key={o.order_id}
                      >
                        <div className="col-md-2 so-img">
                          {/* image */}
                          <div className="order-track-img-wrapper w-100">
                            <img src="#" alt="img" className="img-fluid" />
                          </div>
                        </div>

                        <div className="col-md-10 so-info  pe-3">
                          {/* info */}
                          <div className="container-fluid">
                            <div className="row">
                              {/* upper half */}
                              <div className="col-md-12 d-flex">
                                <div className="w-100 order-track-info-wrapper d-flex align-items-center justify-content-between">
                                  <div className="w-50 text-capitalize">
                                    <h5>Product: {o.item_name}</h5>
                                    <div className="d-flex justify-content-between ">
                                      <div>
                                        <h5 className="fw-normal">
                                          variation: {o.item_variant}
                                        </h5>
                                        <h5 className="fw-normal">
                                          size: {o.item_size}
                                        </h5>
                                      </div>
                                      <div>
                                        <h5 className="fw-normal">
                                          quantity: {o.order_qty}
                                        </h5>
                                        <h5 className="fw-normal">
                                          date ordered: {o.date_ordered}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-25 text-end">
                                    <h5>₱{o.item_price}</h5>
                                  </div>
                                </div>
                              </div>

                              {/* bottom half */}
                              <div className="col-md-12 pt-3 d-flex ">
                                <div className="w-50">
                                  <h5 className="text-capitalize">
                                    Name: {o.full_name}
                                  </h5>
                                  <h5 className="text-capitalize">
                                    Address: {o.address}
                                  </h5>
                                </div>
                                <div className="w-100 d-flex justify-content-end text-end align-items-center">
                                  {/* delivered status - not yet shipped */}
                                  {o.delivery_status === "NS" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      To be shipped
                                    </h5>
                                  )}
                                  {/* delivered status - shipped */}
                                  {o.delivery_status === "S" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Shipped
                                    </h5>
                                  )}
                                  {/* delivered status - shipped */}
                                  {o.delivery_status === "D" && (
                                    <h5 className="ms-4 fst-italic text-success-emphasis">
                                      Delivered
                                    </h5>
                                  )}
                                  {/* delivered status - shipped */}
                                  {o.delivery_status === "R" && (
                                    <h5 className="ms-4 fst-italic text-danger-emphasis">
                                      Rejected by Customer
                                    </h5>
                                  )}
                                  {o.order_status !== "Canceled" &&
                                    (o.payment_status === "Unpaid" ? (
                                      <h5 className="ms-4 fst-italic text-danger-emphasis">
                                        Unpaid
                                      </h5>
                                    ) : (
                                      <h5 className="ms-4 fst-italic text-success-emphasis">
                                        Paid
                                      </h5>
                                    ))}
                                  <h5 className="ms-4">
                                    <span className="fw-normal">
                                      Order Total: ₱
                                    </span>
                                    {parseInt(o.item_price) *
                                      parseInt(o.order_qty)}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="admin-single-order-overlay d-flex align-items-center justify-content-center">
                          {o.delivery_status == "NS" && (
                            <button
                              className="btn btn-secondary me-3"
                              onClick={(e) => handleBtn(e, o.order_id)}
                            >
                              Ship Order
                            </button>
                          )}
                          {o.delivery_status == "S" && (
                            <div>
                              <button
                                className="btn btn-secondary me-3"
                                onClick={(e) => handleBtn(e, o.order_id)}
                              >
                                Delivered
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={(e) => handleBtn(e, o.order_id)}
                              >
                                Rejected
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourierPage;
