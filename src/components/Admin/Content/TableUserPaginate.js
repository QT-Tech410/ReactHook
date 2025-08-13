import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TableUserPaginate = (props) => {
  const { t } = useTranslation();

  const { listUsers, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.manage-user.username")}</th>
            <th scope="col">Email</th>
            <th scope="col">{t("admin.manage-user.role")}</th>
            <th>{t("admin.manage-user.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => props.handleClickBtnView(item)}
                    >
                      {t("admin.manage-user.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      {t("admin.manage-user.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      {t("admin.manage-user.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan="4"> {t("admin.manage-user.no-user")} </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-paginaion">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage ? props.currentPage - 1 : 0}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
