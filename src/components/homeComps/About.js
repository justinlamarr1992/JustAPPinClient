import React from "react";
import Multi from "../../images/MultiScreenLogo.png";

const About = () => {
  return (
    <div id="about">
      <img class="about-image" src={Multi} alt="Multiple Screens with Logo" />
      <h2 class="about-title">About Us</h2>

      <p class="about-text text-gray">
        JustAPPin’ is a Website and Mobile application Design Agency based in
        the Dallas-Fort Worth Metroplex. We are a small Black Owned, Family
        Business with a pretty big goal of designing a website for all of the
        smaller businesses, yes ALL of the businesses in the area. Find out why!
      </p>
      {/* TODO: Video for people to see */}

      <div class="about-action">
        {/* <i class="fas action-web fa-7x fa-play-circle"></i> */}
        {/* <i class="fas action-mob fa-4x fa-play-circle"></i> */}
        <button data-modal-target="#modal1">Learn More</button>
      </div>
      <div class="modal" id="modal1">
        <div class="modal-header">
          <div class="title">About Us</div>
          <button data-close-button class="close-button">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <span class="modal-text-title">Why we do what we do</span>
          <br />
          JustAPPin’ began because we noticed a
          <span class="modal-text-bold">BIG</span> problem. Many new businesses
          go towards website builders (Wix, WordPress, Shopify, Squarespace,
          etc…) to start their journey. Why? The new company could
          <span class="modal-text-bold">NEED</span> the help with building a
          website. There are also so many entrepreneurs that rely
          <span class="modal-text-bold">SOLELY</span> on Social Media platforms
          to promote their own products. Again Why? The company could
          <span class="modal-text-bold">NEED</span> the exposure Social Media
          and their platforms bring. To be fair, At first these Web Builders and
          Social Media provide good services and give awareness about the
          compnay but over time it's <span class="modal-text-bold">NOT</span> as
          helpful as one would think. After a length of time,
          <span class="modal-text-bold">MORE MONEY AND RESOURCES</span> are put
          into the web builder or the Social Media platform than into the
          entrepreneurs products. A company could theoretically sell product's
          on Facebook and pay a <span class="modal-text-bold">PREMIUM</span> to
          Facebook because they were doing so. What could have been extra money
          that could have be funneled into growth in the company now becomes a
          source of <span class="modal-text-bold">PASSIVE INCOME</span> for the
          Social Media company instead.
          <br />
          <br />
          <span class="modal-text-title">That's messed up, right?</span>
          <br />
          So we figured we would
          <span class="modal-text-bold">DO SOMETHING ABOUT IT</span>. How about
          we help <span class="modal-text-bold">FIX</span> the issue instead of
          overlooking it. How about we
          <span class="modal-text-bold">DESIGN </span>the website for the
          company instead. Now
          <span class="modal-text-bold">ALL OF THE INCOME</span> goes to the
          family so they can make the next steps. They will
          <span class="modal-text-bold">NO LONGER NEED</span> another platform
          to growth the business. We want the family that sells food from their
          kitchen to have a website just as McDonald's has one. How amazing
          would it be to help them move from their kitchen to a
          <span class="modal-text-bold">STORE FRONT</span>. If a sole proprietor
          makes clothes we want the online presence to be felt the
          <span class="modal-text-bold">SAME</span> as Forever 21, their website
          would also look better !
          <br />
          <br />
          <span class="modal-text-title">Well, That’s Inspiring!</span>
          <br />
          We want to build an avenue, from the small businesses front door to
          the world wide web <span class="modal-text-bold"> DIRECTLY</span>. No
          Web Builder promotion, no Social Media confusion
          <span class="modal-text-bold"> JUST</span> the
          <span class="modal-text-bold"> BUSINESS OWNER</span> and their
          <span class="modal-text-bold"> CUSTOMERS</span>. We want them to
          promote their gifts to the world
          <span class="modal-text-bold"> WITHOUT</span> worrying about an
          algorithm or amount paid for the month in order for them to do so. We
          also want to do this
          <span class="modal-text-bold"> WITHOUT</span> breaking their banks.
          <br />
          <br />
          <span class="modal-text-title">Our Values</span>
          <br />
          JustAPPin’ believes in
          <span class="modal-text-bold"> SERVICE AND DEDICATION</span> into our
          own community. What better way can we help
          <span class="modal-text-bold"> BUILD</span> our own community than by
          building a website for the businesses that support the area.
          <br />
          <br />
          So, that's what we're going to do. We will
          <span class="modal-text-bold"> BUILD AND BUILD</span> until
          <span class="modal-text-bold"> EVERY</span> small business has
          <span class="modal-text-bold"> THEIR OWN</span>
          website.
        </div>
      </div>
    </div>
  );
};
export default About;
