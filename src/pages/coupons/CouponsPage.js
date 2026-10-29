import React from "react";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Coupon } from "../../components/coupon/Coupon";
import coupon_page from "../../assets/couponPage.png";
import couponImage from "../../assets/coupon_desk.svg"
import classes from "./couponsPage.module.css";
import useGetCouponsList from "../../tanstack-query/couponsList/useGetCouponsList";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { couponAdded, selectCouponState } from "../../store/coupon/couponSlice";

export const CouponsPage = () => {
  const placeholder = "Search...";
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess } = useGetCouponsList();
  const coupon = useSelector(selectCouponState);

  // console.log(data ? data.data.data : null);

  const handleCouponApply = (id) => {
    console.log("coupon",id)
    dispatch(couponAdded({ id }));
    navigate(-1);
  };

  return (
    <div className={classes.box}>
      
    
      <div className={classes.box__coupons}>
        <div className={classes.box__coupons__content}>
          <div className={classes.box__coupons__content__head}>
            <div className={classes.box__coupons__content__head__info}>
              <h1 className={classes.box__coupons__content__head__info__title}>
                Discount coupons
              </h1>
              <p className={classes.box__coupons__content__head__info__para}>
                Shop smarter, save bigger – grab your exclusive coupons now!
              </p>
            </div>

            <img
              src={couponImage}
              className={classes.box__coupons__content__head__img}
              alt="coupons"
            />
          </div>
          {/* <div className={classes.box__coupons__search}>
            <label
              htmlFor="searchInput"
              className={classes.box__coupons__search__label}
            >
              <input
                id="searchInput"
                type="search"
                placeholder="Type coupon code here"
                className={classes.box__coupons__search__input}
              />
            </label>
            <button className={classes.box__coupons__search__btn}>Apply</button>
          </div> */}
        </div>
        <div className={classes.box__coupons__container}>
          <h3 className={classes.box__coupons__container__title}>
            Best coupons for you
          </h3>
          <div className={classes.box__coupons__list}>
            {isSuccess ? (
              data?.data?.data.map((coupon) => (
                <Coupon
                  key={coupon.id}
                  coupon={coupon}
                  onCouponApply={() => handleCouponApply(coupon.id)}
                />
              ))
            ) : (
              <CartLoader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};