// src/components/Navbar.js
import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import { RiDashboardFill, RiFileList3Fill, RiArchiveFill, RiBillFill } from "react-icons/ri";

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/1055px-7-eleven_logo.svg.png";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(true);

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-711 sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavCollapse}>
          <img src={LOGO_URL} alt="7-Eleven Logo" style={{ height: '45px', width: '45px', marginRight: '20px', borderRadius: '4px' }} />
          <div>
            7-ELEVEN Analysis
            <div style={{ fontSize: '0.9rem', fontWeight: 400, color: '#555', lineHeight: 1 }}>
              จังหวัดนราธิวาส
            </div>
          </div>
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={() => setIsNavCollapsed(!isNavCollapsed)} aria-controls="navbarNav" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/" onClick={handleNavCollapse}>
                <span className="icon-text"><RiDashboardFill /> หน้าหลัก</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/bills" onClick={handleNavCollapse}>
                <span className="icon-text"><RiFileList3Fill /> รายการบิล</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/products" onClick={handleNavCollapse}>
                <span className="icon-text"><RiArchiveFill /> จัดการสินค้า</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/new-bill" onClick={handleNavCollapse}>
                <span className="icon-text"><RiBillFill /> บันทึกบิลใหม่</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
