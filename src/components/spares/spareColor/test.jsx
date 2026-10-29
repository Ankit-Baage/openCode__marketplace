{authToken ? (
          <span
            className={
              wishlist_status === 1
                ? classes.box__info__fav__active
                : classes.box__info__fav
            }
            onClick={onWishList}
          />
        ) : null}



















        .box {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  justify-content: center;
}

.box__info__wrapper {
  /* overflow: hidden; */

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.box__info {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.box__intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 16px;
}
@media screen and (min-width: 768px) {
  .box__intro {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.box__info__fav,
.box__info__fav__active {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}

.box__info__fav {
  background-image: url(../../../assets/heart.svg);
}

.box__info__fav__active {
  background-image: url(../../../assets/heart__filled.svg);
}

/* Spare Name Block */
.box__spareName {
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
/* @media screen and (min-width: 768px) {
  .box__spareName {
    display: block;
  }
  
} */
.box__spareName__title {
  font-size: 16px;
  line-height: 22px;
  color: #2f3567;
  font-family: "Poppins", sans;
  font-weight: 600;
  text-align: left;
}

.box__spareName__subtitle {
  font-size: 14px;
  line-height: 18.2px;
  color: #46cd80;
  font-family: "Poppins", sans;
  font-weight: 500;
}

.box__item__divider {
  background-color: #efefef;
  height: 1.5px;
}

.box__divider__tab {
  display: none;
}

/* Product Details Section */
.box__productDetails {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  justify-content: center;
}

.box__productDetails__head {
  font-size: 14px;
  color: #2f3567;
  font-family: "Poppins", sans;
  font-weight: 500;
  line-height: 14px;
}

.box__productDetails__points {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding-left: 12px;
}

@media screen and (min-width: 768px) {
  .box__productDetails__points {
    padding-left: 0;
  }
}

.box__productDetails__point {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.box__productDetails__point__bullet {
  width: 8px;
  height: 8px;
  background-image: url(../../../assets/bullet__detail__spares.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.box__productDetails__point__para,
.box__productDetails__empty {
  font-size: 14px;
  color: #4a4c5f;
  font-family: "Poppins", sans;
  line-height: 14px;
  font-weight: 400;
}

.box__divider {
  background-color: #efefef;
  height: 1px;
}

/* Buttons */

.box__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box__btns__btn {
  font-size: 12px;
  padding: 8px 24px;
  font-family: "Poppins", sans;
  font-weight: 400;
  line-height: 12px;
  cursor: pointer;
}

.box__btns__add {
  border: 1px solid #ff6f3f;
  border-radius: 4px;
  color: #ff6f3f;
  background-color: #ffffff;
}

.box__btns__buy {
  border-radius: 4px;
  color: #ffffff;
  background-color: #ff6f3f;
}

/* Optional: Adjustments for dynamic list, other sellers, etc. */
.box__otherSellers {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.box__otherSellers__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.box__otherSellers__info {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.box__otherSellers__info__title {
  font-size: 16px;
  color: #2f3567;
  font-family: "Poppins", sans;
  font-weight: 500;
  line-height: 20.8px;
}

.box__otherSellers__info__subtitle,
.box__otherSellers__info__price {
  font-size: 14px;
  color: #2f3567;
  font-family: "Poppins", sans;
  font-weight: 400;
  line-height: 18.2px;
}

.box__otherSellers__info__price {
  color: #ff6f3f;
  font-weight: 500;
}

.box__otherSellers__arrow {
  width: 5px;
  height: 10px;
  background-image: url(../../../assets/arrow_right.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.box__filter__btn {
  font-size: 14px;
  color: #ff6f3f;
  font-family: "Poppins", sans;
  font-weight: 400;
  line-height: 18.2px;
}

.box__content {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  .box__content {
    row-gap: 18px;
  }
}

.box__content__category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box__content__category__title {
  font-family: "Poppins", sans;
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  color: #ff6f3f;
}
@media screen and (min-width: 768px) {
  .box__content__category__title {
    font-size: 20px;
  }
}

.box__content__category__link {
  width: 87px;
  height: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../../../assets/viewMore.svg);
}
@media screen and (min-width: 768px) {
  .box__content__category__link {
    width: 97px;
    height: 13px;
  }
}

.box__content__container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
}

.box__content__sep {
  background-color: #efefef;
  height: 1.5px;
}

.box__productDetails__faqs {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.box__productDetails__faqs__block {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}
.box__productDetails__faqs__item {
  display: flex;
  align-items: flex-start;
  gap: 2px;
}

.box__productDetails__faqs__item__mark {
  font-family: "Poppins", sans;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #2f3567;
}

.box__productDetails__quest {
  font-family: "Poppins", sans;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #2f3567;
}

.box__productDetails__ans {
  font-family: "Poppins", sans;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #4a4c5f;
}

.box__productWrapper {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  justify-content: center;
}

@media screen and (min-width: 1024px) {
  .box__productWrapper {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
  }
  .box__divider {
    display: none;
  }
} */
