import React from "react";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import {
  footerData__lg,
  footerData__media,
  footerData__sm,
} from "./footerData";
import footerLogo from "../../assets/footer__logo.svg";
import classes from "./footer.module.css";
import { useSelector } from "react-redux";
import { selectCouponState } from "../../store/coupon/couponSlice";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";

export const Footer = React.memo(() => {
  const coupon = useSelector(selectCouponState);
  const guestId = Cookies.get("guestId");
  const { data: cartData } = useGetCartList(coupon?.id, guestId);
  const cartItemsCount = cartData?.data?.data?.cart_items?.length || 0;

  return (
    <footer className={classes.footerWrapper} role="contentinfo">
      {/* === Mobile Footer Navigation === */}
      <nav
        className={classes.mobileFooter}
        aria-label="Mobile Site Navigation"
      >
        {footerData__sm.map(({ text, path, image, activeImage, badge }) => (
          <NavLink
            key={text}
            to={path}
            className={({ isActive }) =>
              `${classes.navItem} ${isActive ? classes.activeNavItem : ""}`
            }
            aria-label={`${text} page`}
          >
            {({ isActive }) => (
              <div className={classes.navInner}>
                {badge && cartItemsCount > 0 && (
                  <span
                    className={classes.box__catLink__badge}
                    aria-label={`${cartItemsCount} items in cart`}
                  >
                    {cartItemsCount}
                  </span>
                )}

                <img
                  src={isActive ? activeImage : image}
                  alt={`${text} icon`}
                  
                  loading="lazy"
                  className={classes.navIcon}
                />
                <span
                  className={`${classes.navLabel} ${
                    isActive ? classes.navLabelActive : ""
                  }`}
                >
                  {text}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* === Desktop Footer === */}
      <section className={classes.desktopFooter}>
        <div className={classes.footerContainer}>
          {/* Company Info */}
          <div
            className={`${classes.footerColumn} ${classes.companyColumn}`}
            itemScope
            itemType="https://schema.org/Organization"
          >
            <Link
              to="/"
              
              className={classes.logoLink}
              aria-label="Mobigarage Homepage"
            >
              <img
                src={footerLogo}
                alt="Mobigarage company logo"
                width="160"
                height="60"
                className={classes.logoImg}
                loading="lazy"
                itemProp="logo"
              />
            </Link>

            <div className={classes.footerSection}>
              <h2 className={classes.footerTitle}>Get in Touch</h2>
              <address
                className={classes.footerInfo}
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <a
                  href="tel:+919999123511"
                  className={classes.footerLink}
                  itemProp="telephone"
                  rel="nofollow"
                >
                  +91 9999123511
                </a>
                <a
                  href="mailto:contact@mobigarage.com"
                  className={classes.footerLink}
                  rel="nofollow"
                  itemProp="email"
                >
                  contact@mobigarage.com
                </a>
              </address>
            </div>

            {/* Social Links */}
            {footerData__media.map((media) => (
              <div className={classes.footerSection} key={media.id}>
                <h2 className={classes.footerTitle}>{media.title}</h2>
                <ul className={classes.socialLinks}>
                  {media.links.map((item) => (
                    <li key={item.id}>
                      <a
                      
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className={classes.footerLink}
                        
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          
                          loading="lazy"
                          className={classes.socialIcon}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Dynamic Footer Columns */}
          {footerData__lg.map((group, index) => (
            <div className={classes.footerColumn} key={index}>
              <h2 className={classes.footerTitle}>{group.title}</h2>
              <ul className={classes.footerInfo}>
                {group.links.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.redirectTo}
                      className={classes.footerLink}
                      aria-label={`Go to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </footer>
  );
});
