import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserRequest ,setEditingItem ,clearEditingItem, deleteUserRequest, deleteUserSuccess, deleteUserFailure, postUserRequest } from '../../redux/reducers/userSlice'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ConfirmAlertDialogBox from '../../common/ConfirmAlertDialogBox';
import { toast } from 'react-toastify';
const UserList = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const { loading, user } = useSelector((state) => state.getuserReducer);
  const deleteshowRes = useSelector((state) => state.deleteUserReducer);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const recordsPerPageOptions = [10,20,50];
  const [selectedRecordsPerPage, setSelectedRecordsPerPage] = useState(10);
  useEffect(()=>{
     dispatch(getUserRequest({page,limit:selectedRecordsPerPage}))
    

    // dispatch(postUserRequest(null));
    if (deleteshowRes?.response?.success) {
      toast(deleteshowRes?.response?.message);
      dispatch(deleteUserSuccess(null));
    }
    else {
      toast(deleteshowRes?.response?.message);
      dispatch(deleteUserFailure(null));
    }
  },[deleteshowRes?.response?.message, deleteshowRes?.response?.success, dispatch,page,selectedRecordsPerPage])

  const tableHeadingList = [
    {
      colWidth: "5%",
      heading: "S.No",
    },
    {
      colWidth: "15%",
      heading: "Name",
    },
    {
      colWidth: "15%",
      heading: "Email",
    },
    {
      colWidth: "15%",
      heading: "Role",
    },
    {
      colWidth: "10%",
      heading: "Action",
    }
  ];
  const handleAddShow = () => {
    dispatch(clearEditingItem())
  }

  const handleEditClick = (item) => {
    navigate('/add-user')
    dispatch(setEditingItem(item));
  }

  const handleDeleteShow = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlertDialogBox onClose={onClose} handleClickDelete={() => dispatch(deleteUserRequest({ id }))} />
        );
      }
    });
  }

      const totalRecords=  user?.totalCount || 0;
      const totalPages=Math.ceil(user?.totalCount/selectedRecordsPerPage);
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
        
        <h1 className="h3 mb-0">User List</h1>
        </div>
        <div className="btn-toolbar mb-0 mb-md-0 justify-content-end" onClick={() => handleAddShow()}>
          <div className="btn-group">
            <Link to="/add-user"
              type="button"
              className="btn add-btn-custom btn-outline-secondary" >
              Add User
            </Link>
          </div>
        </div>
      </div>
      <div className='user-list-table'>
      <div className="table-responsive table-custom">
        <table className="table table-sm">
          <thead>
            <tr>
              {tableHeadingList.map(item => {
                return (<th scope="col" style={{ width: item.colWidth }} key={item.heading}>{item.heading}</th>)
              })}
            </tr>
          </thead>
          <tbody>
            {loading ?
              <tr>
                <td colSpan={tableHeadingList?.length}>
                  loading...
                </td>
              </tr>
              :
              <>
                {user?.data?.length > 0
                  ?
                  user?.data.map((user,index) => {
                    const serialNumber=(page-1) * selectedRecordsPerPage + index + 1;
                    return (
                      <tr key={user._id}>
                          <td>{serialNumber}</td>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                        <td>
                          <ul className="list-inline m-0 d-flex">
                            <li>
                              <button
                               onClick={() => handleEditClick(user)}
                                className="btn btn-primary btn-sm rounded-0 me-2" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                            </li>
                            <li>
                              <button  
                               onClick={() => handleDeleteShow(user._id)}
                                className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                            </li>
                          </ul>
                        </td>

                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={tableHeadingList?.length}>
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
                className="page-link previous"
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
  )
}

export default UserList