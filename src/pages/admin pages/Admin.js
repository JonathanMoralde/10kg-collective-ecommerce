import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLineChart from "../../components/UserLineChart";

const Admin = ({ adminUser }) => {
  const [data, setData] = useState([]);
  const [itemSold, setItemSold] = useState([]);
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });
  const [date, setDate] = useState("");

  const [display, setDisplay] = useState([]);
  const [active, setActive] = useState("Sales Report");

  let componentMounted = true;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;

      if (active === "Sales Report") {
        response = await axios.get(
          "https://localhost/10kg-collective/admin/reports.php"
        );
      }
      if (active === "User Activity") {
        response = await axios.get(
          "https://localhost/10kg-collective/admin/user_activity.php"
        );
      }

      if (componentMounted) {
        setData(response.data);
        setDisplay(response.data);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    fetchData();
  }, [active]);

  const handleClick = (index) => {
    const selected = data[index];

    let selectedData = new FormData();
    selectedData.append("date_ordered", selected.date_ordered);

    axios
      .post(
        "https://localhost/10kg-collective/admin/reports_item_sold.php",
        selectedData
      )
      .then((response) => {
        setItemSold(response.data);
      });
  };

  const handleInputChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let filterData = new FormData();
    const url = "https://localhost/10kg-collective/admin/reports.php";
    if (e.target.name === "date_range") {
      filterData.append("filter_range", JSON.stringify(dateRange));
      axios.post(url, filterData).then((response) => {
        setDisplay(response.data);
      });

      // console.log(dateRange);
    }

    if (e.target.name === "specific_date") {
      filterData.append("filter_date", date);
      axios.post(url, filterData).then((response) => {
        // console.log(response.data);

        setDisplay(response.data);
      });
      console.log(date);
    }

    if (e.target.name === "reset") {
      setDisplay(data);
      setDate("");
      setDateRange({ ...dateRange, start_date: "", end_date: "" });
    }
  };

  console.log(data);
  return (
    <>
      <section className="container-fluid container-fix my-5 reports-page">
        <div className="row">
          <div className="col-md-3">
            <div className="user-title-wrapper py-3">
              <h3 className="text-capitalize user-title">Admin</h3>
              <h5 className="">{adminUser.admin_email}</h5>
            </div>
            <div className="py-3">
              {/* filter 1 */}
              <div className="accordion " id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Show Reports
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body dashboard-sublinks"
                      onClick={() => setActive("Sales Report")}
                    >
                      Sales Report
                    </div>
                    <div
                      class="accordion-body dashboard-sublinks my-3"
                      onClick={() => setActive("User Activity")}
                    >
                      User Activity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="sales-reports-section ">
              <div className="container-fluid mb-3">
                <h3 className="section-title mb-3">
                  {active === "Sales Report" && "Sales"}
                  {active === "User Activity" && "User Activity"}
                </h3>
                {active === "Sales Report" && (
                  <div className="row">
                    {/* date range */}
                    <form
                      className="col-md-6"
                      name="date_range"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div class="input-group mb-3">
                        <span class="input-group-text">Between </span>
                        <input
                          type="date"
                          name="start_date"
                          class="form-control"
                          value={dateRange.start_date}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <span class="input-group-text"> and </span>
                        <input
                          type="date"
                          name="end_date"
                          class="form-control"
                          value={dateRange.end_date}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <button
                          type="submit"
                          name="filter_range"
                          value="filter"
                          class="btn btn-secondary"
                        >
                          Filter
                        </button>
                      </div>
                    </form>

                    {/* specific date */}
                    <form
                      name="specific_date"
                      onSubmit={(e) => handleSubmit(e)}
                      className="col-md-4"
                    >
                      <div class="input-group mb-3">
                        <span class="input-group-text">Specific Date </span>
                        <input
                          type="date"
                          name="this_date"
                          class="form-control"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                          type="submit"
                          name="filter_date"
                          value="filter"
                          class="btn btn-secondary"
                        />
                      </div>
                    </form>
                    <div className="col-md-2">
                      <button
                        name="reset"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        className="btn btn-secondary"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="container-fluid">
                <div className="row ">
                  {loading && <h3 className="section-title">Loading...</h3>}

                  {active === "Sales Report" ? (
                    display.map((date, index) => {
                      const order_perc = (date.order_count / 10) * 100;

                      return (
                        <div className="col-md-4 mb-3 " key={index}>
                          <div className=" border p-3">
                            <h5>{date.date_ordered}</h5>
                            <div className="d-flex justify-content-between mb-1 ">
                              <p className="fs-5 mb-0">Total Order:</p>
                              <p className="fs-5 mb-0">{date.order_count}</p>
                            </div>
                            <div className="d-flex justify-content-between mb-1 border-top">
                              <p className="fs-5 mb-0">Total Sales:</p>
                              <p className="fs-5 mb-0">
                                PHP {date.total_sales}
                              </p>
                            </div>
                            <div className="mb-3 border-top">
                              <p className="fs-5 mb-0">
                                % based on Target(10):{" "}
                              </p>
                              <div
                                className="progress "
                                role="progressbar"
                                aria-label="Example with label"
                                aria-valuenow={order_perc}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className={`progress-bar ${
                                    order_perc < 25 && "text-bg-danger"
                                  } ${order_perc < 65 && "text-bg-warning"} ${
                                    order_perc < 95 && "text-bg-info"
                                  } ${order_perc > 95 && "text-bg-success"}`}
                                  style={{ width: `${order_perc}%` }}
                                >
                                  {order_perc}%
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-toggle="modal"
                              data-bs-target={`#exampleModal${index}`}
                              onClick={() => {
                                handleClick(index);
                              }}
                            >
                              Item Sold
                            </button>

                            <div
                              class="modal fade"
                              id={`exampleModal${index}`}
                              tabindex="-1"
                              aria-labelledby={`exampleModalLabel${index}`}
                              aria-hidden="true"
                            >
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id={`exampleModalLabel${index}`}
                                    >
                                      Items Sold for: {date.date_ordered}
                                    </h1>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body container-fluid">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <h5>Name</h5>
                                      </div>
                                      <div className="col-md-4">
                                        <h5>Orders</h5>
                                      </div>
                                      <div className="col-md-4">
                                        <h5>Sales Amount</h5>
                                      </div>
                                    </div>
                                    {itemSold.map((i, index) => {
                                      return (
                                        // <div>
                                        <div
                                          className="row border-top pt-3 text-capitalize"
                                          key={index}
                                        >
                                          <div className="col-md-4">
                                            <h5 className="fw-normal">
                                              {i.item_name}
                                            </h5>
                                          </div>
                                          <div className="col-md-4">
                                            <h5 className="fw-normal">
                                              {i.order_count}
                                            </h5>
                                          </div>
                                          <div className="col-md-4">
                                            <h5 className="fw-normal">
                                              {i.sales_amount}
                                            </h5>
                                          </div>
                                        </div>
                                        // </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <UserLineChart data={display} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
