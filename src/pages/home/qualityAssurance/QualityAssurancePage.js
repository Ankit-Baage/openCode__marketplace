import React from 'react';
import qc from "../../../assets/qc.svg";
import oem from "../../../assets/oem.svg";
import shipping from "../../../assets/shipping.svg";
import qwarranty100 from "../../../assets/warranty100.svg";
import classes from "./qualityAssurancepage.module.css";

const qualities = [
  { text: "100% QC Passed", image: qc },
  { text: "OEM Standard Quality", image: oem },
  { text: "Fast Pan-India Shipping", image: shipping },
  { text: "Warranty Available", image: qwarranty100 },
];

export const QualityAssurancePage = () => {
  return (
    <div className={classes.box__quality}>
          <h3 className={classes.box__quality__title}>
            Quality & Testing Assurance
          </h3>
          <div className={classes.box__quality__container}>
            {qualities.map((quality) => (
              <div className={classes.box__quality__item} key={quality.text}>
                <img
                  src={quality.image}
                  alt={quality.text}
                  loading="lazy"
                  className={classes.box__quality__item__img}
                />
                <h4 className={classes.box__quality__item__text}>
                  {quality.text}
                </h4>
              </div>
            ))}
          </div>
        </div>
  )
}
