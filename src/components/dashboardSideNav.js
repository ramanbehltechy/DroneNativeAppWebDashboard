
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequest } from "../redux/reducers/authSlice";

const DashboardSideNav = () => {
  let dispatch = useDispatch()
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary custom-height-full">
      <div
        className="offcanvas-lg offcanvas-start bg-body-tertiary h-100"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close" />
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100 justify-content-between">
          <ul className="nav flex-column px-3 py-3">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-3 active" aria-current="page" to="/" >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"  >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8799 0.221408C15.9634 0.292931 16.0319 0.380198 16.0816 0.478222C16.1313 0.576245 16.1612 0.683104 16.1696 0.792691C16.178 0.902277 16.1647 1.01244 16.1305 1.11689C16.0963 1.22134 16.0418 1.31802 15.9702 1.40142L13.3303 4.48193H16.5123C18.0369 4.48193 19.2671 4.48193 20.2341 4.61242C21.2379 4.74626 22.0833 5.03624 22.7547 5.70654C23.4261 6.37797 23.7139 7.22338 23.85 8.22716C23.9793 9.19415 23.9793 10.4243 23.9793 11.949V16.5329C23.9793 18.0576 23.9793 19.2878 23.85 20.2548C23.7139 21.2585 23.4261 22.104 22.7547 22.7754C22.0833 23.4468 21.2379 23.7346 20.2341 23.8706C19.2671 24 18.0369 24 16.5123 24H7.46706C5.94242 24 4.71222 24 3.74524 23.8706C2.74145 23.7346 1.89604 23.4468 1.22462 22.7754C0.553198 22.104 0.265446 21.2585 0.130492 20.2548C-1.66195e-08 19.2878 0 18.0576 0 16.5329V11.949C0 10.4243 -1.66195e-08 9.19415 0.130492 8.22716C0.26433 7.22338 0.554313 6.37797 1.22462 5.70654C1.89604 5.03512 2.74145 4.74737 3.74524 4.61242C4.71222 4.48193 5.94242 4.48193 7.46706 4.48193H10.6491L8.00799 1.40142C7.93225 1.31871 7.87392 1.22163 7.83646 1.11593C7.799 1.01023 7.78317 0.898084 7.78992 0.786148C7.79667 0.674212 7.82585 0.564775 7.87574 0.464345C7.92563 0.363915 7.99521 0.274541 8.08033 0.201537C8.16545 0.128533 8.26438 0.0733895 8.37124 0.0393851C8.4781 0.00538068 8.5907 -0.00679045 8.70236 0.00359524C8.81402 0.0139809 8.92245 0.0467114 9.0212 0.0998407C9.11996 0.15297 9.20702 0.225414 9.27722 0.312864L11.9897 3.47591L14.6999 0.312864C14.7714 0.229413 14.8587 0.160875 14.9567 0.111166C15.0547 0.0614579 15.1616 0.0315543 15.2712 0.0231644C15.3808 0.0147745 15.4909 0.0280629 15.5954 0.0622701C15.6998 0.0964772 15.7965 0.150932 15.8799 0.222524V0.221408ZM17.2874 6.1549V22.327C18.4541 22.3226 19.324 22.3047 20.011 22.2121C20.8297 22.1017 21.2624 21.8999 21.5714 21.592C21.8803 21.2831 22.0811 20.8503 22.1915 20.0306C22.3041 19.1885 22.3064 18.0721 22.3064 16.4716V12.0103C22.3064 10.4098 22.3041 9.29229 22.1915 8.45023C22.0811 7.63158 21.8792 7.19884 21.5714 6.8899C21.2624 6.58095 20.8297 6.3802 20.0099 6.26978C19.324 6.17721 18.4541 6.15825 17.2874 6.1549ZM15.6145 22.327V6.1549H7.5284C5.92792 6.1549 4.81037 6.15713 3.9683 6.26978C3.14966 6.3802 2.71692 6.58207 2.40797 6.8899C2.09903 7.19884 1.89827 7.63158 1.78786 8.45134C1.67521 9.29229 1.67298 10.4098 1.67298 12.0103V16.4716C1.67298 18.0721 1.67521 19.1885 1.78786 20.0317C1.89827 20.8503 2.10014 21.2831 2.40797 21.592C2.71692 21.901 3.14966 22.1017 3.96942 22.2121C4.81037 22.3248 5.92792 22.327 7.5284 22.327H15.6145Z"
                  />
                  <path d="M20.9123 16.4716C20.9123 16.1758 20.7948 15.8921 20.5856 15.683C20.3764 15.4738 20.0928 15.3563 19.797 15.3563C19.5012 15.3563 19.2175 15.4738 19.0083 15.683C18.7991 15.8921 18.6816 16.1758 18.6816 16.4716C18.6816 16.7674 18.7991 17.0511 19.0083 17.2603C19.2175 17.4694 19.5012 17.5869 19.797 17.5869C20.0928 17.5869 20.3764 17.4694 20.5856 17.2603C20.7948 17.0511 20.9123 16.7674 20.9123 16.4716ZM20.9123 12.0103C20.9123 11.7145 20.7948 11.4309 20.5856 11.2217C20.3764 11.0125 20.0928 10.895 19.797 10.895C19.5012 10.895 19.2175 11.0125 19.0083 11.2217C18.7991 11.4309 18.6816 11.7145 18.6816 12.0103C18.6816 12.3061 18.7991 12.5898 19.0083 12.799C19.2175 13.0081 19.5012 13.1257 19.797 13.1257C20.0928 13.1257 20.3764 13.0081 20.5856 12.799C20.7948 12.5898 20.9123 12.3061 20.9123 12.0103Z" />
                </svg>
                My Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-3" aria-current="page" to="/" >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg" >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.3636 8.72716C16.3636 9.88447 15.9039 10.9944 15.0855 11.8127C14.2672 12.6311 13.1573 13.0908 12 13.0908C10.8427 13.0908 9.73277 12.6311 8.91443 11.8127C8.09609 10.9944 7.63635 9.88447 7.63635 8.72716C7.63635 7.56985 8.09609 6.45994 8.91443 5.6416C9.73277 4.82326 10.8427 4.36353 12 4.36353C13.1573 4.36353 14.2672 4.82326 15.0855 5.6416C15.9039 6.45994 16.3636 7.56985 16.3636 8.72716ZM14.1818 8.72716C14.1818 9.30582 13.9519 9.86077 13.5428 10.2699C13.1336 10.6791 12.5786 10.909 12 10.909C11.4213 10.909 10.8664 10.6791 10.4572 10.2699C10.048 9.86077 9.81817 9.30582 9.81817 8.72716C9.81817 8.14851 10.048 7.59355 10.4572 7.18438C10.8664 6.77521 11.4213 6.54534 12 6.54534C12.5786 6.54534 13.1336 6.77521 13.5428 7.18438C13.9519 7.59355 14.1818 8.14851 14.1818 8.72716Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37273 0 0 5.37273 0 12C0 18.6273 5.37273 24 12 24C18.6273 24 24 18.6273 24 12C24 5.37273 18.6273 0 12 0ZM2.18182 12C2.18182 14.28 2.95964 16.3789 4.26327 18.0458C5.1788 16.8435 6.35989 15.8692 7.71429 15.1989C9.06869 14.5286 10.5597 14.1805 12.0709 14.1818C13.5625 14.1804 15.0348 14.5195 16.3756 15.1732C17.7163 15.827 18.8901 16.7781 19.8076 17.9542C20.7529 16.7145 21.3893 15.2675 21.6642 13.733C21.9392 12.1985 21.8448 10.6206 21.3889 9.1298C20.933 7.63902 20.1286 6.27823 19.0423 5.16004C17.9561 4.04185 16.6192 3.19839 15.1422 2.69946C13.6653 2.20054 12.0908 2.06048 10.5489 2.29088C9.00711 2.52128 7.54232 3.11552 6.27575 4.02442C5.00918 4.93333 3.97725 6.13077 3.26534 7.51767C2.55343 8.90457 2.18202 10.4411 2.18182 12ZM12 21.8182C9.74613 21.8216 7.56029 21.0462 5.81236 19.6233C6.51592 18.6161 7.45237 17.7937 8.54203 17.2262C9.63169 16.6587 10.8423 16.3628 12.0709 16.3636C13.2842 16.3627 14.4802 16.6512 15.5596 17.2052C16.6389 17.7592 17.5706 18.5628 18.2771 19.5491C16.5156 21.0182 14.2937 21.8214 12 21.8182Z"
                  />
                </svg>
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-3" aria-current="page" to="/" >
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg" >
                  <path d="M12.0688 7.33325C9.46877 7.33325 7.4021 9.39992 7.4021 11.9999C7.4021 14.5999 9.46877 16.6666 12.0688 16.6666C14.6688 16.6666 16.7354 14.5999 16.7354 11.9999C16.7354 9.39992 14.6688 7.33325 12.0688 7.33325ZM12.0688 15.3333C10.2021 15.3333 8.73543 13.8666 8.73543 11.9999C8.73543 10.1333 10.2021 8.66659 12.0688 8.66659C13.9354 8.66659 15.4021 10.1333 15.4021 11.9999C15.4021 13.8666 13.9354 15.3333 12.0688 15.3333Z" />
                  <path d="M23.1 9.525L21 8.85L20.55 7.725L21.6 5.775C21.825 5.325 21.75 4.725 21.375 4.35L19.575 2.55C19.2 2.175 18.6 2.1 18.15 2.325L16.2 3.375L15.075 2.925L14.4 0.825C14.25 0.375 13.8 0 13.275 0H10.725C10.2 0 9.75 0.375 9.675 0.9L9 3C8.55 3.075 8.175 3.225 7.8 3.45L5.85 2.4C5.4 2.175 4.8 2.25 4.425 2.625L2.625 4.425C2.25 4.8 2.175 5.4 2.4 5.85L3.375 7.725C3.225 8.1 3.075 8.55 2.925 8.925L0.825 9.6C0.375 9.75 0 10.2 0 10.725V13.275C0 13.8 0.375 14.25 0.9 14.4L3 15.075L3.45 16.2L2.4 18.15C2.175 18.6 2.25 19.2 2.625 19.575L4.425 21.375C4.8 21.75 5.4 21.825 5.85 21.6L7.8 20.55L8.925 21L9.6 23.175C9.75 23.625 10.2 24 10.725 24H13.275C13.8 24 14.25 23.625 14.4 23.175L15.075 21L16.2 20.55L18.15 21.6C18.6 21.825 19.2 21.75 19.575 21.375L21.375 19.575C21.75 19.2 21.825 18.6 21.6 18.15L20.55 16.2L21 15.075L23.175 14.4C23.625 14.25 24 13.8 24 13.275V10.725C24 10.2 23.625 9.675 23.1 9.525ZM22 13.05L19.8 13.875L19.725 14.25L19.05 15.825L18.825 16.2L19.8 18.675L18.5 19.8L16.2 18.825L15.825 19.05C15.3 19.35 14.775 19.575 14.25 19.725L13.875 19.8L13 22.3333H11L10.125 19.8L9.75 19.725L8.175 19.05L7.8 18.825L5.5 19.725L4.2 18.4567L5.175 16.2L4.95 15.825C4.65 15.3 4.425 14.775 4.275 14.25L4.2 13.875L1.79898 13.05V10.95L4.05 10.2L4.2 9.825C4.35 9.225 4.575 8.7 4.875 8.175L5.1 7.8L4.2 5.325L5.5 3.825L7.725 5.175L8.1 4.95C8.625 4.65 9.15 4.425 9.75 4.275L10.125 4.125L11 1.83334H13L13.875 4.125L14.25 4.275C14.775 4.425 15.3 4.65 15.825 4.95L16.2 5.175L18.5 4.125L19.8 5.55977L18.825 7.8L19.05 8.175C19.35 8.7 19.575 9.225 19.725 9.75L19.8 10.125L22 10.95V13.05Z" />
                </svg>
                Settings
              </Link>
            </li>
          </ul>

          <ul className="nav flex-column px-3 py-3">
            <li className="nav-item">
              <button onClick={() => { dispatch(logoutRequest()) }} className="nav-link d-flex align-items-center gap-3 logout-info">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.3343 21.3333L12.001 21.3333L12.001 24L21.3343 24C22.801 24 24.001 22.8 24.001 21.3333L24.001 2.66667C24.001 1.2 22.801 1.04907e-07 21.3343 2.33127e-07L12.001 1.04907e-06L12.001 2.66667L21.3343 2.66667L21.3343 21.3333ZM0.000975513 12L5.33431 17.3333L5.33431 13.3333L16.001 13.3333L16.001 10.6667L5.33431 10.6667L5.33431 6.66667L0.000975513 12Z"
                    fill="url(#paint0_linear_127_1801)"
                  />
                </svg> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default DashboardSideNav;