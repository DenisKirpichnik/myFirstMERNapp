import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stuff.css";
import Loader from "../Loader";
import Paginate from "./Paginate";

function Stuff() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "r6UojLM0ER5GEfouZFna0ZaXD7GK49iq",
            limit: 50,
          },
        });

        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);
  // render error
  const renderError = () => {
    if (isError) {
      return (
        <div className="error">
          <p className="error__text">Unable to get gifs, TRY AGAIN IN A FEW MINUTES</p>
        </div>
      );
    }
  };
  // render function
  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }

    return currentItems.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  // handleSearch
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "r6UojLM0ER5GEfouZFna0ZaXD7GK49iq",
          q: search,
          limit: 50,
        },
      });
      setData(results.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // actual return
  return (
    <div className="stuff">
      {isError == true ? (
        <div className="error__container">{renderError()}</div>
      ) : (
        <div className="stuff1">
          <div className="stuff__searchForm">
            <input
              className="stuff__search"
              type="text"
              placeholder="  Search"
              onChange={handleSearch}
              value={search}
            />
            <button onClick={handleSubmit} className="stuff__formBtn" type="submit">
              Go
            </button>
          </div>

          <Paginate
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
          />

          <div className="stuff__grid">{renderGifs()}</div>
        </div>
      )}
    </div>
  );
}

export default Stuff;
