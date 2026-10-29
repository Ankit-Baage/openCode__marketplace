import React from "react";
import category_vrp from "../../assets/category_vrp.png";
import category_spares from "../../assets/category_spares.png";
import category_newPhones from "../../assets/Category_newPhones.png";
import category_openBox from "../../assets/category__openBox.png";
import classes from "./category.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useGetSubCategory from "../../tanstack-query/subCategory/useGetSubCategory";

export const Category = () => {
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    data: subCategoryData,
    isSuccess,
    isLoading,
  } = useGetSubCategory("spares");

  const onClickHandler = (item) => {
    navigate(`/${item.redirect_to}`);

    // Parse query string (e.g., "part_name=Battery")
    if (item?.params) {
      const [key, value] = item.params.split("=");
      if (key && value) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set(key === "part_name" ? "spare" : key, value);
          return newParams;
        });
      }
    }

    console.log(item);
  };

  return (
    <div className={classes.box}>
      {/* <h1 className={classes.box__title}>Product Category</h1> */}
      <div className={classes.box__category__head}>
        <h1 className={classes.box__title}>Spares Category</h1>
        <Link to="/spares" className={classes.box__category__head__link}>View All</Link>
      </div>
      {/* <Link className={classes.box__vrp} to="/vrp">
        <div className={classes.box__vrp__content}>
          <h2 className={classes.box__vrp__content__title}>VRP</h2>
          <p className={classes.box__vrp__content__para}>
            High-quality products under various quality grades to meet your
            specific needs.
          </p>
        </div>
        <img className={classes.box__vrp__img} src={category_vrp} alt="/vrp" />
      </Link> */}
      {/* <div className={classes.box__others}>
        <Link className={classes.box__others__prexo} to="/openBox">
          <h2 className={classes.box__others__prexo__title}>Open Box</h2>
          <img
            className={classes.box__others__prexo__img}
            src={category_openBox}
            alt="Open Box"
          />
        </Link>
        <Link className={classes.box__others__spares} to="/spares">
          <h2 className={classes.box__others__spares__title}>Spares</h2>
          <img
            className={classes.box__others__spares__img}
            src={category_spares}
            alt="spares"
          />
        </Link>
      </div>
      <Link className={classes.box__newPhones} to="/newPhone">
        <div className={classes.box__newPhones__content}>
          <h2 className={classes.box__newPhones__content__title}>New Phones</h2>
          <p className={classes.box__newPhones__content__para}>
            Seal-packed, brand-new phones with latest technology and untouched
            quality.
          </p>
        </div>
        <img
          className={classes.box__newPhones__img}
          src={category_newPhones}
          alt="newPhones"
        />
      </Link> */}

      <div className={classes.box__category}>
        {subCategoryData?.data?.data?.map((category) => (
          <div
            key={category.id}
            className={classes.box__category__item}
            // onClick={() => handleCategoryClick(button)}
            aria-label={`Category ${category.label}`}
          >
            <div className={classes.box__category__item__menu}>
              <span className={classes.box__category__item__menu__icon} />

              <h2 className={classes.box__category__item__menu__title}>
                {category.label}
              </h2>
            </div>

            <div className={classes.box__category__item__subitems}>
              {category.items.map((item) => (
                <div
                  className={classes.box__category__item__subitems__element}
                  key={item.id}
                >
                  <div
                    className={
                      classes.box__category__item__subitems__element__info
                    }
                    onClick={() => onClickHandler(item)}
                  >
                    <img
                      className={
                        classes.box__category__item__subitems__element__info__img
                      }
                      src={item.url}
                      alt={item.id}
                    />
                  </div>

                  <h3
                    className={
                      classes.box__category__item__subitems__element__name
                    }
                  >
                    {item.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
