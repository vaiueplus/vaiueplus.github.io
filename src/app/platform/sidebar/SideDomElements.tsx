'use client'
import {SidebarProps, SidebarDesktopLink, SidebarMobileLink} from './SideDomClient';
import React from 'react';

export const VerticalSideBarDom  = () => {
  return <div className='menu desktop-menu'>

	<ul className='menu-list'>
		<SidebarDesktopLink name="Procedural" url="/platform/procedural"></SidebarDesktopLink>
	</ul>

	<p className="menu-label">
		Law Learning
	</p>
	<ul className='menu-list'>
		<SidebarDesktopLink name="Topic" url="/platform/procedural/topic"></SidebarDesktopLink>
		<SidebarDesktopLink name="Collection" url="/platform/procedural/data_collection"></SidebarDesktopLink>
		<SidebarDesktopLink name="Process" url="/platform/procedural/process"></SidebarDesktopLink>
		<SidebarDesktopLink name="Presentation" url="/platform/procedural/presentation"></SidebarDesktopLink>
		<SidebarDesktopLink name="Conclusion" url="/platform/procedural/conclusion"></SidebarDesktopLink>
	</ul>

	<p className="menu-label">
		Learing
	</p>
	<ul className='menu-list'>
		<SidebarDesktopLink name="Video resource" url="/platform/learning/video_resources"></SidebarDesktopLink>
	</ul>

	<p className="menu-label">
		Tools
	</p>
	<ul className='menu-list'>
		<SidebarDesktopLink name="Tools review" url="/platform/tools/tools_review"></SidebarDesktopLink>
	</ul>

    </div>;
  }

  export const HorizontalSideBarDom  = () => {

	function on_navbar_click(e: any) {
		document.querySelector(".navbar-burger")?.classList.toggle("is-active");
		document.querySelector(".navbar-menu")?.classList.toggle("is-active");
	}

	return (
	
	<nav className="navbar mobile-menu" role="navigation" aria-label="main navigation">
	<div className="navbar-brand">
		<a className="navbar-item" href="https://bulma.io">
		<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
		</a>

		<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={on_navbar_click}>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		</a>
	</div>

		<div className="navbar-menu">
			<div className="navbar-start">
				<div className="navbar-item has-dropdown is-hoverable">
					<SidebarMobileLink name="Procedural" url="/platform/procedural/topic" classname='navbar-link'></SidebarMobileLink>

					<div className="navbar-dropdown">
						<SidebarMobileLink name="Topic" url="/platform/procedural/topic" classname='navbar-item'></SidebarMobileLink>
						<SidebarMobileLink name="Collection" url="/platform/procedural/data_collection" classname='navbar-item'></SidebarMobileLink>
						<SidebarMobileLink name="Process" url="/platform/procedural/process" classname='navbar-item'></SidebarMobileLink>
						<SidebarMobileLink name="Presentation" url="/platform/procedural/presentation" classname='navbar-item'></SidebarMobileLink>
						<SidebarMobileLink name="Conclusion" url="/platform/procedural/conclusion" classname='navbar-item'></SidebarMobileLink>
					</div>
				</div>

				<SidebarMobileLink name="Video resource" url="/platform/learning/video_resources" classname='navbar-item'></SidebarMobileLink>
				<SidebarMobileLink name="Tools review" url="/platform/tools/tools_review" classname='navbar-item'></SidebarMobileLink>
			</div>
		</div>
	</nav>	
	);
}
  