import React from "react";
import Logo from "../../images/AltLogo.png";
const Footer = () => {
  return (
    <footer>
      <div class="foot1">
        <img class="footer-logo" src={Logo} alt="" />
        <a class="footer-link" href="#about">
          About Us
        </a>
        <div class="footer-icons">
          <a
            href="https://www.facebook.com/Justappin-109278647984311"
            target="_blank"
          >
            <i class="icon fab fa-lg fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/JustAppin" target="_blank">
            <i class="icon fab fa-lg fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/justappinllc/" target="_blank">
            <i class="icon fab fa-lg fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="foot2">
        <h4>Blog</h4>
        <p>Blogs Coming Soon</p>
      </div>
      <div class="foot3">
        <h4>Contact</h4>
        <a class="footer-anchor" href="tel:+3145466723">
          (314) 546-6723
        </a>
        <br />
        <a class="footer-anchor" href="mailto:justappinllc@gmail.com">
          justappinllc@gmail.com
        </a>
      </div>
      <div class="foot4">
        <h4 class="f4-title">Instagram</h4>
        <p class="f4-pic1">Social Media Post Coming Soon</p>
        {/* <p class="f4-pic1">pic</p>
        <p class="f4-pic2">pic</p>
        <p class="f4-pic3">pic</p>
        <p class="f4-pic4">pic</p>
        <p class="f4-pic5">pic</p>
        <p class="f4-pic6">pic</p> */}
      </div>
      <div class="foot-dis">
        <p>© Copyright 2021. JustAPPin’ LLC. All Right Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
