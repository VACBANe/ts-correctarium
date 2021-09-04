import React from "react";
import "./Footer.css";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="rights">
                    <a href="/ua/terms">Договір публічної оферти</a>
                    <p>© Correctarium</p>
                    <p>2015–2021</p>
                </div>
                <img
                    src={"https://correctarium.com/img/footer_logo.png"}
                    alt="logo"
                    style={{ height: "78px" }}
                />
                <div className="contacts">
                    <p>Надіслати текст на&nbsp;переклад:</p>
                    <a href="mailto:manager@correctarium.com" style={{textDecoration: 'underline'}}>
                        manager@correctarium.com
                    </a>
                </div>
            </div>  
        </div>
    );
};

export default Footer;
