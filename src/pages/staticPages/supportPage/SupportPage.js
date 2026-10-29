import React from "react";
import classes from "./supportPage.module.css";

export const SupportPage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}>Help & Support</h1>
        <div className={classes.box__head__title__sub}>
          <p className={classes.box__head__title__sub__para}>
            Welcome to the MobiGarage Help Center. We are here to assist you
            with any queries or concerns regarding our products and services.
            Below, you will find useful information on how to reach us and get
            the support you need.
          </p>
        </div>
      </div>
      <div className={classes.box__content}>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              1. Contact Us
            </h2>
            <p className={classes.box__content__item__head__title__sub}>
              If you need any help, feel free to reach out to our support team:
            </p>
          </div>
          <div className={classes.box__content__item__info}>
            <div className={classes.box__content__item__info__main}>
            <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    <span
                      style={{ paddingRight: "4px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      Email: 
                    </span>
                    contact@mobigarage.com
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    <span
                      style={{ paddingRight: "4px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      Phone:
                    </span>
                    +91 9999123511
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
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
                    Postal Address:
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    MobiGarage, a brand of Fuevation Technology Solutions
                    Private Limited CGN 181, 18th Floor, DLF Capital Greens,
                    15th Shivaji Marg New Delhi, Delhi, 110015, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              2. Frequently Asked Questions (FAQs)
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
                    Q: How do I place an order?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: You can browse our website or mobile application, select
                    the products you want, add them to your cart, and proceed to
                    checkout.
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
                    Q: What types of products do you offer?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: We sell a wide range of electronic devices and spares,
                    including refurbished, new, open-box, and broken devices.
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
                    Q: How do I track my order?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: You can browse our website or mobile application, select
                    the products you want, add them to your cart, and proceed to
                    checkout.
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
                    Q: What is your return policy?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Our return policy varies by product. Please refer to our
                    Exchange and Return Policy page for details.
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
                    Q: Do you provide warranty on products?
                  </h3>
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    A: Yes, warranty details are mentioned on the respective
                    product pages. Please check before purchasing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              3. Customer Support Timings
            </h2>
            <p className={classes.box__content__item__head__title__sub}>
              Our customer support team is available:
            </p>
          </div>
          <div className={classes.box__content__item__info}>
            <div className={classes.box__content__item__info__main}>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    <span
                      style={{ paddingRight: "4px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      Monday to Saturday:
                    </span>
                    10:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    <span
                      style={{ paddingRight: "4px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      Sunday:
                    </span>
                    Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              4. Order & Payment Assistance
            </h2>
          </div>
          <div className={classes.box__content__item__info}>
            <div className={classes.box__content__item__info__main}>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    If you face any issues while placing an order, please
                    contact our support team.
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    We accept multiple payment methods, including credit/debit
                    cards, UPI, net banking, and COD (where applicable).
                  </p>
                </div>
              </div>
              <div className={classes.box__content__item__info__main__point}>
                <span
                  className={
                    classes.box__content__item__info__main__point__bullet
                  }
                />
                <div
                  className={
                    classes.box__content__item__info__main__point__text
                  }
                >
                  <p
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    For refund-related queries, please visit our Refund Policy
                    page or contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              5. Technical Support
            </h2>
            <p className={classes.box__content__item__head__title__sub}>
              If you are experiencing any technical difficulties with our
              website or application, please reach out via email at
              contact@mobigarage.com with details about the issue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
