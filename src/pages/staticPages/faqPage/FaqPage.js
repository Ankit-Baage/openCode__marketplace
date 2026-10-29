import React from "react";
import classes from "./faqPage.module.css";

export const FaqPage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}> Frequently Asked Questions (FAQs)</h1>
        <div className={classes.box__head__title__sub}>
          <p className={classes.box__head__title__sub__para}>
            Have questions? We’ve got answers! Browse our Frequently Asked
            Questions for quick solutions to common queries about orders,
            payments, shipping, and more.
          </p>
        </div>
      </div>
      <div className={classes.box__content}>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
            Here are some frequently asked questions to help you out.
            </h2>
          </div>
          <div className={classes.box__content__item__info}>
            <div className={classes.box__content__item__info__main__except}>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: How do I initiate a return or exchange ?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Simply log in to your account and under "My Order" select specific shipment to request a return.
                  </p>
                </div>
              </div>

              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: What happens after I return an item?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: We’ll arrange for the item to be picked up from your location.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: Where can I find exclusive deals and discounts?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Offers are available on product pages or at checkout.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: How do I apply a coupon code?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Apply coupon codes at checkout for instant savings.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: What payment methods are available?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: We accept credit/debit cards, net banking, UPI and wallets for eligible orders.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: Is my payment information secure?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Yes, payments are processed through secure gateways to protect your financial details.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: Will I get a confirmation after making a payment?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Yes, you’ll receive instant confirmation and an invoice for every successful transaction.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: What product categories does Mobigarage offer?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: We offer VRP (premium devices), Prexo (refurbished phones), Spare (individual parts), Open Box (unboxed phones with accessories), and New Phones (brand-new devices).
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: How can I manage my profile information?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: You can update personal info and manage saved payment methods through your profile.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <h3
                    className={
                      classes.box__content__item__info__main__point__highlighted
                    }
                  >
                    Q: How do I track my orders?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Track your orders, view past purchases, and access invoices directly from your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
