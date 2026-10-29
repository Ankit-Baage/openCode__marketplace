import React from "react";
import aboutUs__img from "../../../assets/aboutUs__img.png";
import classes from "./aboutUsPage.module.css";

export const AboutUsPage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}>About us</h1>
        <img
          src={aboutUs__img}
          className={classes.box__head__img}
          alt="about-us"
        />
      </div>
      <div className={classes.box__content}>
        <p className={classes.box__content__para}>
          MobiGarage, a brand of Fuevation Technology Solutions Private Limited,
          is a leading platform for electronics goods, specializing in{" "}
          <span className={classes.box__content__para__highlight}>
            refurbishment, recycling, e-waste management, and the liquidation of
            devices and spares
          </span>
          . We are committed to transforming the electronics industry by making
          high-quality, sustainable technology accessible to everyone
        </p>
        <p className={classes.box__content__para}>
          At MobiGarage, we operate on the{" "}
          <span className={classes.box__content__para__highlight}>
            circular economy model,
          </span>{" "}
          ensuring that devices and spare parts are efficiently refurbished,
          repurposed, and reintegrated into the market, minimizing electronic
          waste. Our mission,{" "}
          <span className={classes.box__content__para__highlight}>
            Green Digital Bharat,
          </span>{" "}
          drives us to create an eco-friendly and digitally inclusive future,
          where affordability meets sustainability
        </p>
        <p className={classes.box__content__para}>
          With a{" "}
          <span className={classes.box__content__para__highlight}>
            customer-first approach,
          </span>{" "}
          we ensure that every product undergoes rigorous quality checks,
          offering{" "}
          <span className={classes.box__content__para__highlight}>
            best-in-class pricing, reliability, and warranty assurance
          </span>
          . Our strong supply chain network optimises the sourcing and
          distribution of devices whether new or refurbished and components,
          making tech upgrades more affordable for individuals, businesses, and
          enterprises.
        </p>
        <p className={classes.box__content__para}>
          By choosing MobiGarage, you are not just purchasing a product—you are
          <span className={classes.box__content__para__highlight}>
            supporting a greener planet, reducing e-waste, and promoting
            sustainable consumption
          </span>
          . Join us in revolutionising the way technology is used and reused for
          a smarter, more sustainable tomorrow.
        </p>
      </div>
      <p className={classes.box__quote}>
        MobiGarage – Smart Tech, Sustainable Future.
      </p>
    </div>
  );
};
