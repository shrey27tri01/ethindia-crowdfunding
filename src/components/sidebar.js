import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
        const Sidebar = () => {

            const [isDisplay, setIsDisplay] = useState(false);


            useEffect(() => {
            let x = JSON.parse(localStorage.getItem('user'));
            if(x.isAdmin)
            {
                // console.log("----------isAdmin-------");
                // getData1(x.id);
                setIsDisplay(true);

            }
            //
    }, []);



return (
        <div className="sidebar">
    <div className="brand-logo">
        <a className="full-logo" href="/">
            <img src="./images/logo.png" alt="" width="55" /> <strong>Shiny Lobster</strong></a>
    </div>
    <div className="menu">
        <ul>
            <li>
                <a href="./dashboard">
                    <span><i className="ri-layout-grid-fill"></i></span>
                    <span className="nav-text">Dashboard</span>
                </a>
            </li>
            {
                isDisplay?(
                    <li className="">
                        <a href="./notification">
                            <span><i class="ri-notification-2-line"></i></span>
                            <span className="nav-text">Notification</span></a>
                    </li>
                ):(
                    <li className="">
                        <a href="./myactivity">
                            <span><i class="ri-time-line"></i></span>
                            <span className="nav-text">My Activity</span></a>
                    </li>
                   )
            }
        
            {
                isDisplay?(
                    <li className="">
                        <Link to="/upload">
                            <span><i class="ri-file-list-3-line"></i></span>
                            <span className="nav-text">Upload</span></Link>
                    </li>
                ):null
            }

        </ul>
    </div>
</div>
        )
        }

export default Sidebar;