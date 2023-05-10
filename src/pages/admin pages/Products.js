import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Products = ({ adminUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [images, setImages] = useState([]);

  let componentMounted = true;
  const [loading, setLoading] = useState(false);

  // this will get all Items
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        "https://localhost/10kg-collective/displayModule/display.php"
      );

      // Get the itemlist object from the response
      const itemlist = await response.data;

      setData(itemlist);
    };

    getProduct();
  }, []);

  // // get IMAGES
  // useEffect(() => {
  //   const getImages = async () => {
  //     setLoading(true);
  //     const response = await axios.get(
  //       "https://localhost/10kg-collective/displayModule/images.php"
  //     );

  //     if (componentMounted) {
  //       setImages(response.data);
  //       setLoading(false);
  //     }

  //     return () => {
  //       componentMounted = false;
  //     };
  //   };

  //   getImages();
  // }, []);

  // Product delete
  const handleDel = (item_id) => {
    let delData = new FormData();
    delData.append("item_id", item_id); //will send item_id to backend for deleting

    axios
      .post(
        "https:/localhost/10kg-collective/admin/delete_product_handle.php",
        delData
      ) //update item status
      .then((response) => {
        if (response.data === 1) {
          toast.success("Product deleted successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Unable to delete product", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(response.data);
        }
      })
      .catch((error) =>
        toast.error("Error occured while deleting the product", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  // const [thumbnails, setThumbnails] = useState([]);
  // const [showcaseImage, setShowcaseImage] = useState([]);

  // useEffect(() => {
  //   let filteredThumbnails = images.filter((i) => i.image_use === "thumbnail");
  //   let filteredShowcaseImage = images.filter(
  //     (i) => i.image_use === "showcase"
  //   );

  //   setThumbnails(filteredThumbnails);
  //   setShowcaseImage(filteredShowcaseImage);
  // }, images);

  // console.log(images);
  // console.log(thumbnails);

  return (
    <>
      <div className="container-fluid container-fix">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h3 className="section-title">Products</h3>
          <Link
            className="btn btn-secondary"
            to="/admin/product-form"
            role="button"
          >
            Add New
          </Link>
        </div>
        <div className="row">
          {data.map((product) => {
            console.log(product.image_src);
            return (
              <div className="col-md-3 mb-2" key={product.item_id}>
                <div className="card mb-3">
                  <img
                    src={`${product.image_src}`}
                    className="card-img-top"
                    alt="product-img"
                    height="234px"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-black">
                      {product.item_name}
                    </h5>
                    <p className="card-text">{product.item_price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          navigate(
                            `/admin/edit-product/${product.item_id}/${product.item_name}/${product.item_price}`
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          handleDel(product.item_id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
