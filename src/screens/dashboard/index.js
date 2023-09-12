import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getShowRequest, deleteShowRequest, deleteShowSuccess } from "../../redux/reducers/showSlice";
import { clearEditingItem, setEditingItem } from "../../redux/reducers/editSlice";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toast } from "react-toastify";
import ConfirmAlertDialogBox from "../../common/ConfirmAlertDialogBox";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recordsPerPageOptions = [10,20,50];
  const { loading, res } = useSelector((state) => state.getShow);
  const deleteshowRes = useSelector((state) => state.deleteShow);
  const { tokenData } = useSelector((state) => state.auth);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [selectedRecordsPerPage, setSelectedRecordsPerPage] = useState(10);

  useEffect(() => {
     dispatch(getShowRequest({page,limit: selectedRecordsPerPage }))
    if (deleteshowRes?.deleteDataRes?.success) {
      toast(deleteshowRes?.deleteDataRes?.message);
      dispatch(deleteShowSuccess(null));
    }
    else {
      toast(deleteshowRes?.deleteDataRes?.message);
      dispatch(deleteShowSuccess(null));
    }
  }, [dispatch,page,selectedRecordsPerPage,deleteshowRes?.deleteDataRes?.success, deleteshowRes?.deleteDataRes?.message]);


  const handleEditClick = (item) => {
    navigate('/add-show')
    dispatch(setEditingItem(item));
  }
  const handleAddShow = () => {
    dispatch(clearEditingItem())
  }
  const tableHeadingList = [
    {
      colWidth: "5%",
      heading: "S.No",
    },
    {
      colWidth: "15%",
      heading: "Show Title",
    },
    {
      colWidth: "40%",
      heading: "Description",
    },
    {
      colWidth: "15%",
      heading: "Start Date & Time",
    },
    {
      colWidth: "20%",
      heading: "Location",
    },
    {
      colWidth: "10%",
      heading: "Radius",
    },
    {
      colWidth: "10%",
      heading: "Action",
    }
  ];
  let modifiedTableHeadingList = [...tableHeadingList];
  if (tokenData?.role !== "admin") {
    modifiedTableHeadingList = modifiedTableHeadingList.filter(item => item.heading !== "Action");
  }

  const handleDeleteShow = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlertDialogBox onClose={onClose} handleClickDelete={() => dispatch(deleteShowRequest({ id }))} />
        );
      }
    });
  }

const totalRecords=  res?.totalCount || 0;
      const totalPages=Math.ceil(res?.totalCount/selectedRecordsPerPage);
      const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
      };

      const handleRecordsPerPageChange=(event)=>{
        setSelectedRecordsPerPage(parseInt(event.target.value));
        setPage(1)
      }
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3">
        <div className='d-flex'>
        
          <h1 className="h3 mb-0">Show List</h1>
         </div>
          <div className="btn-toolbar mb-0 mb-md-0" onClick={() => handleAddShow()}>
            <div className="btn-group">
              <Link to="/add-show"
                type="button"
                className="btn add-btn-custom btn-outline-secondary" >
                Add Show
              </Link>
            </div>
          </div>
        </div>
        <div className='user-list-table'>
        <div className="table-responsive table-custom">
          {/* Show List */}
          <table className="table table-sm">
            <thead>
              <tr>
                {modifiedTableHeadingList.map(item => {
                  return (<th scope="col" style={{ width: item.colWidth }} key={item.heading}>{item.heading}</th>)
                })}
              </tr>
            </thead>
            <tbody>
              {loading ?
                <tr>
                  <td colSpan={modifiedTableHeadingList?.length}>
                    loading...
                  </td>
                </tr>
                :
                <>
                  {res?.data?.length > 0
                    ?
                    res?.data.map((item,index) => {
                      const serialNumber=(page-1) * selectedRecordsPerPage + index + 1
                      return (
                        <tr key={item._id}>
                           <td>{serialNumber}</td>
                          <td>{item.showTitle}</td>
                          <td>{item.description}</td>
                          <td>{item.date} {item.startTime}</td>
                          <td>{item.address}</td>
                          <td>{item.radius && `${item.radius} miles`}</td>
                            {tokenData?.role === "admin"  && 
                          <td>
                            <ul className="list-inline m-0 d-flex">
                              <li>
                                <button onClick={() => handleEditClick(item)} className="btn btn-primary btn-sm rounded-0 me-2" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                              </li>
                              <li>
                                <button onClick={() => handleDeleteShow(item._id)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                              </li>
                            </ul>
                          </td>
                            }

                        </tr>
                      )
                    })
                    :
                    <tr>
                      <td colSpan={modifiedTableHeadingList?.length}>
                        There is No data to show.
                      </td>
                    </tr>
                  }
                </>
              }
            </tbody>
          </table>
        </div>
        </div>

      {/* Pagination */}
     
    <div className="pagination-btm d-flex justify-content-between align-items-center mt-4">
    <div className="d-flex align-items-center">
      <span>No. of Records: <b>{totalRecords}</b> </span>
      <div className='d-flex align-items-center ms-5'>
          <label className='me-2'>Lists Per Page</label>
        <select
            value={selectedRecordsPerPage}
            onChange={handleRecordsPerPageChange}
            className="form-select"
          >
            {recordsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
        </div>
        </div>
       
        <div className="pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <li className={`page-item ${pageNumber === page ? "active" : ""}`} key={pageNumber}>
                <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
        </div> 
       
        
      </main>
    </>
  );
}
export default Dashboard;