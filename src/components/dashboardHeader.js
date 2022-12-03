import {React} from 'react'

const DashboardHeader = () => {

	
	
	return (
	<div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-12">
                        <div class="header-content">
                            <div class="header-left">
                                <div class="brand-logo"><a class="mini-logo" href="./"><img src="./images/logoi.png"
                                            alt="" width="40"/></a></div>
                                <div class="search">
                                    <form action="#"><span><i class="ri-search-line"></i></span><input type="text"
                                            placeholder="Search Here"/></form>
                                </div>
                            </div>
                            <div class="header-right">
                                

                                <div class="dark-light-toggle theme-switch" onclick="themeToggle()">
                                    <span class="dark"><i class="ri-moon-line"></i></span>
                                    <span class="light"><i class="ri-sun-line"></i></span>
                                </div>


                                <div class="nav-item dropdown notification dropdown">
                                    <div data-bs-toggle="dropdown">
                                        <div class="notify-bell icon-menu"><span><i
                                                    class="ri-notification-2-line"></i></span>
                                        </div>
                                    </div>
                                    <div tabindex="-1"
                                        class="dropdown-menu notification-list dropdown-menu dropdown-menu-end">
                                        <h4>Recent Notification</h4>
                                        <div class="lists">
                                            <a class="" href="./#">
                                                <div class="d-flex align-items-center"><span
                                                        class="me-3 icon success"><i class="ri-check-line"></i></span>
                                                    <div>
                                                        <p>Account created successfully</p><span>2020-11-04
                                                            12:00:23</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a class="" href="./#">
                                                <div class="d-flex align-items-center"><span class="me-3 icon fail"><i
                                                            class="ri-close-line"></i></span>
                                                    <div>
                                                        <p>2FA verification failed</p><span>2020-11-04 12:00:23</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a class="" href="./#">
                                                <div class="d-flex align-items-center"><span
                                                        class="me-3 icon success"><i class="ri-check-line"></i></span>
                                                    <div>
                                                        <p>Device confirmation completed</p><span>2020-11-04
                                                            12:00:23</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a class="" href="./#">
                                                <div class="d-flex align-items-center"><span
                                                        class="me-3 icon pending"><i
                                                            class="ri-question-mark"></i></span>
                                                    <div>
                                                        <p>xs verification pending</p><span>2020-11-04 12:00:23</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown profile_log dropdown">
                                    <div data-bs-toggle="dropdown">
                                        <div class="user icon-menu active"><span><img src="./images/avatar/9.jpg"
                                                    alt=""/></span>
                                        </div>
                                    </div>
                                    <div tabindex="-1" class="dropdown-menu dropdown-menu-end">
                                        <div class="user-email">
                                            <div class="user">
                                                <span class="thumb">
                                                    <img src="./images/profile/3.png" alt=""/>
                                                </span>
                                                <div class="user-info">
                                                    <h5>Jannatul Maowa</h5>
                                                    {/*<mailto:span>imsaifun@gmail.com</span>*/}
                                                    <span>imsaifun@gmail.com</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="dropdown-item" href="./profile.html">
                                            <span><i class="ri-user-line"></i></span>Profile
                                        </a>
                                        <a class="dropdown-item" href="./wallet.html">
                                            <span><i class="ri-wallet-line"></i></span>Wallet
                                        </a>
                                        <a class="dropdown-item" href="./settings-profile.html">
                                            <span><i class="ri-settings-3-line"></i></span>Settings
                                        </a>
                                        <a class="dropdown-item" href="./settings-activity.html">
                                            <span><i class="ri-time-line"></i></span>Activity
                                        </a>
                                        <a class="dropdown-item" href="./lock.html">
                                            <span><i class="ri-lock-line"></i></span>Lock
                                        </a>
                                        <a class="dropdown-item logout" href="./signin.html">
                                            <i class="ri-logout-circle-line"></i>Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default DashboardHeader;