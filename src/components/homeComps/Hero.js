import React from "react";
import Logo from "../../images/Logo.png";

const Hero = () => {
  return (
    <div id="hero">
      <h1 class="hero-title">
        Small Business Applications
        <br />
        and Websites
      </h1>
      <h5 class="hero-text">
        At JustAPPin’, we solve your company’s present day problems with web
        applications of tomorrow. Let us mirror your hardworking and growing
        business with a beautiful and adequate Website.
      </h5>
      <div class="hero-action">
        <a class="hero-link" href="#cta">
          Contact Us
        </a>
        <div class="icons">
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
      <img class="hero-logo" src={Logo} alt="JustAPPin’ Logo" />
      {/* <Logo /> */}
      <i class="fas fa-2x fa-arrow-down"></i>
    </div>
  );
};
export default Hero;
