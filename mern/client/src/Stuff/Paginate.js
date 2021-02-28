import React from "react";

function Paginate({ currentPage, itemsPerPage, totalItems, ...props }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginate">
      <h1 className="paginate__header">Pagination</h1>
      <ul className="pagination pagination-sm justify-content-end border-0">
        {pageNumbers.map((num) => {
          let classes = "page__item";
          if (num === currentPage) {
            classes += " activated";
          }

          return (
            <li onClick={() => props.pageSelected(num)} className={classes}>
              <a onClick={() => props.pageSelected(num)} className="page__link">
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginate;
