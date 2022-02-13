import React from "react";
import Client1 from "../../images/iWax.png";
import ClientYou from "../../images/yourcompany.png";
import ClientWeb from "../../images/iWaxWeb.png";

const Testimony = () => {
  // Make this clients switchable
  return (
    <div class="testimony">
      <h2 class="test-title">Past Clients</h2>
      <p class="test-text">
        Here is some of the work JustAPPin’ has done in the past.
      </p>
      {/* TODO  switch picture of website based on which client is clicked */}

      <div class="test-clients">
        <div class="client c-top">
          <img src={Client1} class="client-pic" alt="" />
          <h5 class="client-text">
            "Since my Website went live I have been able to manage current
            clients and connect with new ones. I could not have before. It's so
            much easier telling someone to visit my website. THANK YOU
            JUSTAPPIN'"
          </h5>
          <h4 class="client-name">Lanee Green</h4>
          {/* Add anchor tago of https://www.iwax682.com */}
          <h6>
            <a
              class="client-company"
              href="https://www.iWax682.com/"
              target="_blank"
            >
              iWax
            </a>
          </h6>
        </div>
        <div class="client c-bottom">
          <img src={ClientYou} class="client-pic" alt="" />
          <h5 class="client-text">"This could be your comment here!"</h5>
          <h4 class="client-name">Your Name</h4>
          <h6 class="client-company">Your Company Name</h6>
        </div>
      </div>
      {/* TODO upload picture of websites made */}
      <img src={ClientWeb} class="client-web" alt="" />
    </div>
  );
};
export default Testimony;
