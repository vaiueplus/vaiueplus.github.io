import { Combine_Path } from '@/utility/dynamic_utility';
import Link from 'next/link';

export const RenderHeaderComponent  = async () => {


    return (
        <nav className="navbar homepage_header container" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src={Combine_Path('texture/icon/vaiue_logo.png')} ></img>
          </a>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" className="navbar-menu">      
          <div className="navbar-end">

            <div className="navbar-end quick_link_group">
              <a className="navbar-item">
                News
              </a>

              <a className="navbar-item">
                Product
              </a>

              <a className="navbar-item">
                Pricing
              </a>

              <a className="navbar-item">
                About us
              </a>
            </div>

            <div className="navbar-item">
              <Link href="/platform/" className="button">
                GET STARTED
              </Link>
            </div>
          </div>
        </div>        
      </nav>
    );
}