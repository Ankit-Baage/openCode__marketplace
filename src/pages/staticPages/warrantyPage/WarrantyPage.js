import React from "react";
import classes from "./warrantyPage.module.css";

export const WarrantyPage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}>Warranty Policy</h1>
        <div className={classes.box__head__title__sub}>
          <div className={classes.box__head__title__sub__content}>
            <h2 className={classes.box__head__title__sub__content__highlighted}>
              Effective Date:
            </h2>
            <p className={classes.box__head__title__sub__content__para}>
              April 3, 2025
            </p>
          </div>
          <p className={classes.box__head__title__sub__para}>
            MobiGarage, a brand of Fuevation Technology Solutions Private
            Limited ("we," "our," or "us"), provides a functional warranty on
            all eligible products and services. This policy outlines the terms
            and conditions of our warranty coverage. By using our website,
            application, and services, you agree to the following terms.
          </p>
        </div>
      </div>
      <div className={classes.box__content}>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              1. Warranty Coverage
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
                    The warranty is valid only for the specific device repaired,
                    product purchased, and the original customer. It is
                    non-transferable.
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
                    If a product is covered under warranty, the warranty period
                    starts from the delivery date of the first shipment or five
                    (5) days from the first shipment, whichever is earlier.
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
                    MobiGarage reserves the right to validate claims through
                    internal processes and testing before approving warranty
                    coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              2. Warranty Limitations and Conditions
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
                    Warranty does not cover damages or losses caused by postal
                    or shipping services. We recommend customers inspect the
                    package contents upon delivery before accepting the
                    shipment.
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
                    Products must be returned in their original condition,
                    including packaging and accessories. Failure to do so may
                    invalidate the warranty.
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
                    Any broken or tampered warranty seal will result in the
                    warranty being void. Products may have multiple seals, and
                    all seals must be intact for the warranty to remain valid.
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
                    style={{ paddingBottom: "14px" }}
                    className={
                      classes.box__content__item__info__main__point__para
                    }
                  >
                    The following items have specific limitations:
                  </p>
                  <div className={classes.box__content__item__info}>
                    <div className={classes.box__content__item__info__main}>
                      <div
                        className={
                          classes.box__content__item__info__main__point
                        }
                      >
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
                              style={{ paddingRight: "2px" }}
                              className={
                                classes.box__content__item__info__main__point__highlighted
                              }
                            >
                              In-screen fingerprint sensor, proximity sensor,
                              and other built-in sensors
                            </span>
                            may not work on compatible combo display folders.
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          classes.box__content__item__info__main__point
                        }
                      >
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
                              style={{ paddingRight: "2px" }}
                              className={
                                classes.box__content__item__info__main__point__highlighted
                              }
                            >
                              Battery capacity (mAh)
                            </span>
                            may vary from supplier to supplier and may differ
                            from the original handset battery.
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          classes.box__content__item__info__main__point
                        }
                      >
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
                              style={{ paddingRight: "2px" }}
                              className={
                                classes.box__content__item__info__main__point__highlighted
                              }
                            >
                              Flex, PCB, and modules
                            </span>
                            do not come with pre-installed components
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          classes.box__content__item__info__main__point
                        }
                      >
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
                              style={{ paddingRight: "2px" }}
                              className={
                                classes.box__content__item__info__main__point__highlighted
                              }
                            >
                              Full housings or bodies
                            </span>
                            do not include middle or side keys.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    Before purchasing, customers must verify compatibility with
                    their device. MobiGarage is not responsible for
                    incompatibility issues.
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
                    Warranty claims should be made by contacting our support
                    team at{" "}
                    <span
                      style={{ paddingLeft: "2px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      contact@mobigarage.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              3. Warranty Exclusions
            </h2>
            <p className={classes.box__content__item__head__title__sub}>
              The warranty does not cover the following scenarios:
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
                    Accidental or direct damage, including damage due to
                    excessive drops or mishandling.
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
                    Display issues arising without manual intervention, such as
                    visible lines or blank screens.
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
                    Subsequent mishandling that bends, twists, or cracks the
                    frame.
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
                    Damage to internal components due to excessive visible
                    damage to the device.
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
                    Water damage, tampering with internal hardware, or damage
                    due to customer self-repair attempts.
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
                    Software issues unrelated to the repair or modification of
                    the device.
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
                    Jail-broken devices or software modifications that lead to
                    malfunctions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              4. Warranty Claim Process
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
                    Customers must contact our support team at{" "}
                    <span
                      style={{ paddingRight: "2px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      contact@mobigarage.com
                    </span>
                    before sending any product for warranty service.
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
                    Please allow up to{" "}
                    <span
                      style={{ paddingRight: "2px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      10 business days
                    </span>
                    for our technical team to inspect the returned item.
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
                    Any product sent for replacement, repair, or other purposes
                    must be collected within{" "}
                    <span
                      style={{ paddingRight: "2px" }}
                      className={
                        classes.box__content__item__info__main__point__highlighted
                      }
                    >
                      14 days
                    </span>
                    of arrival at our service center. If not collected, the
                    product will be discarded without storage charges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.box__content__item}>
          <div className={classes.box__content__item__head}>
            <h2 className={classes.box__content__item__head__title}>
              5. Important Notes
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
                    The protective film and warranty seals on LCDs and
                    touchscreens should be intact. Before removing them,
                    customers must verify that the product functions correctly.
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
                    The warranty seal should not show any signs of repositioning
                    or tampering.
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
                    The warranty does not cover careless handling, such as
                    exposure to external factors like electrostatic discharges,
                    misuse of voltage, or liquid ingress.
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
                    Product images on the website may differ from the actual
                    product received.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={classes.box__content__item__info__main__point__para}>
        For further assistance, please reach out to our customer support at contact@mobigarage.com.
          </p>
      </div>
    </div>
  );
};
