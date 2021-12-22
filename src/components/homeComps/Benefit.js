import React from "react";
import Bene from "../../images/benefitsPic.jpg";
const Benefit = () => {
  return (
    <div class="benefit">
      {/* TODO Picture of happy business internet user */}
      <img class="bene-pic" src={Bene} alt="" />
      <div class="bene-container">
        <h2 class="bene-container-title">Website Benefits</h2>
        <div class="bene item1">
          <h4 class="bene-title">Online Presence 24/7</h4>
          <p class="text-gray">
            Customers will always be able to find you anytime, anywhere. Even
            outside of business hours, your website will continue to find and
            secure new customers.
          </p>
        </div>
        <div class="bene item2">
          <h4>Credibility</h4>
          <p class="text-gray">
            You will meet today's expecation for any reputable business to have
            an online presence. Potential customers would trust your company
            because of online credentails.
          </p>
        </div>
        <div class="bene item3">
          <h4>Advertising</h4>
          <p class="text-gray">
            SEO and Online advertising will help build up the company's
            awareness. Your business will see a substantial increase in customer
            traffic.
          </p>
        </div>
        <div class="bene item4">
          <h4>Growth Opportunity</h4>
          <p class="text-gray">
            Websites, in general, are great ways to providing a place that
            potential investors can be referred to. Your company will be able to
            reach buyers that were never aware of the business.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Benefit;
