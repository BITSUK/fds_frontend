import React from "react";
import ImgSocialMedia from './images/social media.JPG';
import ImgClickHere from './images/click here.JPG';
import {Link} from "react-router-dom";
import './Footer.css';

function Footer(){
    return (
        <div className  ="footer-container">
			<div className="footer-3-cols">
				<div id="FTR-L" className="footer column1"><img id="social-media-handles" src = {ImgSocialMedia} alt="Social media"/></div>
				<div id="FTR-M" className="footer column2">Frequently asked questions <Link to = "/faq" > <img src = {ImgClickHere} alt="Click here"/> </Link></div>
				<div id="FTR-R" className="footer column3">
					Contact us: 99888 55533 <br/>
					Email: xyz@gmail.com <br/>
					Address: 5 Street,Sector 0, Great City - 123456.
				</div>
			</div>			

			<div>
				<div className="footer copyright-row">@Copyright - FSE WILP BITS 2022 - GRP4</div>				
			</div>
		</div>
    )
}

export default Footer;