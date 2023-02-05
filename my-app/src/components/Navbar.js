import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElement';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
        <NavLink to='/' activeStyle>
            Home
		</NavLink>
		<NavLink to='/calendar' activeStyle>
            Calender
		</NavLink>
		<NavLink to='/mars' activeStyle>
            Mars
		</NavLink>
		{/* <NavLink to='/events' activeStyle>
			Events
		</NavLink>
		<NavLink to='/annual' activeStyle>
			Annual Report
		</NavLink>
		<NavLink to='/team' activeStyle>
			Teams
		</NavLink>
		<NavLink to='/blogs' activeStyle>
			Blogs
		</NavLink>
		<NavLink to='/sign-up' activeStyle>
			Sign Up
		</NavLink> */}
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		{/* <NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
	</Nav>
	</>
);
};

export default Navbar;