import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShowRequest } from "../../redux/reducers/showSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, res } = useSelector((state) => state.getShow);

  useEffect(() => {
    dispatch(getShowRequest())
  }, [dispatch]);

  const tableHeadingList = [
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
    }
  ];

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3">
          <h1 className="h3 mb-0">Show List</h1>
          <div className="btn-toolbar mb-0 mb-md-0">
            <div className="btn-group">
              <Link to="/add-show"
                type="button"
                className="btn add-btn-custom btn-outline-secondary" >
                Add Show
              </Link>
            </div>
          </div>
        </div>
        <div className="table-responsive table-custom">
          {/* Show List */}
          <table className="table table-sm">
            <thead>
              <tr>
                {tableHeadingList.map(item => {
                  return (<th scope="col" style={{ width : item.colWidth}} key={item.heading}>{item.heading}</th>)
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
                  {res?.data?.length > 0
                    ?
                    res?.data.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.showTitle}</td>
                          <td>{item.description}</td>
                          <td>{item.date} {item.startTime}</td>
                          <td>{item.address}</td>
                          <td>{item.radius && `${item.radius} miles`}</td>
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
      </main>
    </>
  );
}
export default Dashboard;