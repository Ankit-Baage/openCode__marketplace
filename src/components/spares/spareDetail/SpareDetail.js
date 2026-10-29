import React, { useCallback, useEffect, useState } from "react";
import { ProductCarousel } from "../../ui/productCarousel/ProductCarousel";
import classes from "./spareDetail.module.css";
import { SpareColors } from "../spareColor/SpareColors";
import { SparePrice } from "../sparePrice/SparePrice";
import { SpareHighlights } from "../spareHighlights/SpareHighlights";
import { SpareOffers } from "../spareOffers/SpareOffers";
import { validateImages } from "../../../utils/helpers/imageValidator";
import dummy from "../../../assets/dummyPreview.png";
import Cookies from "js-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useCartListDeleteItemMutation from "../../../tanstack-query/cartList/useCartListDeleteItemMutation";
import { toast } from "react-toastify";
import { CustomTable } from "../../customTable/CustomTable";
import { sparesDetailColumnsConfig } from "./spareDetailColumnConfig";
import { BestSellingSparesPage } from "../../../pages/home/bestSellingProducts/BestSellingSparesPage";
import { RecentlyAddedSparesPage } from "../../../pages/recentlyAddedSpares/RecentlyAddedSparesPage";
import { useGetHotDealsSpareList } from "../../../tanstack-query/hotDealsSpares/useGetHotDealsSparesList";
import { BestSellingSkeleton } from "../../skeletons/bestSellingSkeleton/BestSellingSkeleton";
import { BestSellingCardMessage } from "../../skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { BestSellingSpares } from "../../bestSellingProduct/bestSellingSpares/BestSellingSpares";
import { useGetBestSparesProductList } from "../../../tanstack-query/bestSellingProduct/useGetBestSellingProductList";
import { SwipeableItemList } from "../../swipeableItemList/SwipeableItemList";
import { toSlug } from "../../../utils/toSlug";

const dummyArray = [dummy];

const resonsToBuy = [
  "100% QC Passed - tested for touch, brightness, and pixels",
  "OEM Standard Quality at affordable prices",
  "Warranty & reliable customer support",
  "Dealer & bulk pricing available",
];

export const SpareDetail = ({
  images,
  prices,
  colors,
  descriptions,
  color,
  spareData,
  partName,
  onColorSelect,
  onAddToCart,
  cart_status,
  wishlist_status,
  onWishList,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [validationResults, setValidationResults] = useState({});
  const navigate = useNavigate();
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const handleRemove = useCallback(async () => {
    const { category_id, master_product_id, request_id } = spareData;

    const data = {
      category_id,
      ...(category_id === 5 ? { request_id } : { master_product_id }),
    };

    try {
      const response = await deleteItem(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(
        error.response?.data?.message?.displayMessage || "Delete failed."
      );
    }
  }, [spareData, deleteItem]);

  // Function to check if an image URL is valid
  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // Image loaded successfully
      img.onerror = () => resolve(false); // Error loading image
      img.src = url;
    });
  };

  // Function to validate all image URLs
  const validateImages = useCallback(async (images) => {
    const results = {};
    for (const url of images) {
      console.log("url:", url.image_url);
      results[url.image_url] = await checkImageUrl(url.image_url);
    }
    setValidationResults(results);
  }, []);

  useEffect(() => {
    validateImages(images);
  }, [images, validateImages]);

  console.log(validationResults);
  console.log("sparesDetail ", spareData?.data?.data);

  const handleBrandFilter = () => {
    const brand = spareData?.data?.data?.brand;
    if (brand) {
      const params = new URLSearchParams();
      params.set("brand", brand);
      navigate(`/spares?${params.toString()}`);
    }
  };

  const handleModelFilter = () => {
    const model = toSlug(spareData?.data?.data?.model);
    
    if (model) {
      // const params = new URLSearchParams();
      // params.set("model", model);
      navigate(`/spares?model=${model}`);
    }
  };

  const imageArray = Object.keys(validationResults).filter(
    (key) => validationResults[key] === true
  );
  console.log(imageArray);
  const authToken = Cookies.get("authToken");
  const header = false;
  const { data, isSuccess, isLoading } = useGetBestSparesProductList();
  const spares = data?.data?.data || [];

   const navigateToSpareDetail = useCallback(
      (item) => {
        if (!item?.id) return;
  
        const brand = toSlug(item.brand ?? "");
        const model = toSlug(item.model ?? "");
        const spareName = toSlug(item.part ?? "spare");
  
        navigate(`/spares/${brand}/${model}/${spareName}/${item.id}`, {
          state: { item },
        });
        // console.log("item",item)
      },
      [navigate]
    );
  return (
    <div className={classes.box}>
      <div className={classes.box__content__head}>
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
        <ProductCarousel
          imageData={imageArray.length < 1 ? dummyArray : imageArray}
          stockStatus={spareData?.data?.data?.stock_status}
        />

        <div className={classes.box__detail}>
          <div className={classes.box__detail__head}>
            <h1 className={classes.box__detail__head__title}>{partName}</h1>
            <hr className={classes.box__divider} />
          </div>
          <div className={classes.box__detail__colors}>
            <h2 className={classes.box__detail__colors__title}>Colors</h2>
            <SpareColors
              colors={colors}
              color={color}
              onColorSelect={onColorSelect}
            />
            <hr className={classes.box__divider} />
          </div>
          <div className={classes.box__detail__price}>
            <SparePrice prices={prices} item={spareData?.data?.data} />
          </div>
          {descriptions && (
            <div className={classes.box__detail__info__highlights}>
              <h2 className={classes.box__detail__info__highlights__title}>
                Highlights
              </h2>

              <div className={classes.box__detail__info__highlights__content}>
                {descriptions?.map((description) => (
                  <div
                    className={
                      classes.box__detail__info__highlights__content__points
                    }
                    key={description.id}
                  >
                    <span
                      className={
                        classes.box__detail__info__highlights__content__points__bullet
                      }
                    />
                    <p
                      className={
                        classes.box__detail__info__highlights__content__points__para
                      }
                    >
                      {description.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className={classes.box__divider} />
      <div className={classes.box__content__body}>
        {spareData?.data?.data.about_this_item.length > 0 && (
          <div className={classes.box__detail__info__about}>
            <h2 className={classes.box__detail__info__about__title}>
              About this item
            </h2>

            <div className={classes.box__detail__info__about__content}>
              {spareData?.data?.data.about_this_item.map((detail, index) => (
                <div
                  className={classes.box__detail__info__about__content__points}
                  key={index}
                >
                  <span
                    className={
                      classes.box__detail__info__about__content__points__bullet
                    }
                  />
                  <p
                    className={
                      classes.box__detail__info__about__content__points__para
                    }
                  >
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <hr className={classes.box__divider__mob} />
          </div>
        )}

        {resonsToBuy.length > 0 && (
          <div className={classes.box__detail__info}>
            <div className={classes.box__detail__info__why}>
              <h2 className={classes.box__detail__info__why__title}>
                Why Buy from Mobigarage?
              </h2>
              <div className={classes.box__detail__info__why__content}>
                {resonsToBuy.map((detail, index) => (
                  <div
                    className={classes.box__detail__info__why__content__points}
                    key={index}
                  >
                    <span
                      className={
                        classes.box__detail__info__why__content__points__bullet
                      }
                    />
                    <p
                      className={
                        classes.box__detail__info__why__content__points__para
                      }
                    >
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <hr className={classes.box__divider} />
      <div className={classes.box__content}>
        <div className={classes.box__content__head__more}>
          <h1 className={classes.box__content__head__title}>
            More spares for {spareData?.data?.data.brand}{" "}
            {spareData?.data?.data.model}
          </h1>
          <button className={classes.box__content__head__subTitle} onClick={handleModelFilter}>View All</button>
        </div>
        <div className={classes.box__content__container}>
          {isLoading ? (
            <BestSellingSkeleton />
          ) : isSuccess && spares.length === 0 ? (
            <BestSellingCardMessage />
          ) : (
            <SwipeableItemList
              items={spares}
              renderItem={(spare) => (
                <BestSellingSpares spare={spare} key={spare.id} onClick={() => navigateToSpareDetail(spare)}/>
              )}
            />
          )}
        </div>
        <hr className={classes.box__divider} />
        {spareData?.data?.data?.FAQs.length > 0 && (
          <div className={classes.box__detail__info__faqs}>
            <h2 className={classes.box__detail__info__faqs__title}>FAQS</h2>

            <div className={classes.box__detail__info__faqs__content}>
              {spareData.data.data.FAQs.map((faq, index) => (
                <div
                  key={index}
                  className={classes.box__detail__info__faqs__block}
                >
                  <div className={classes.box__detail__info__faqs__item}>
                    <span
                      className={classes.box__detail__info__faqs__item__mark}
                    >
                      Q:
                    </span>
                    <h3
                      className={
                        classes.box__detail__info__faqs__item__question
                      }
                    >
                      {faq.name}
                    </h3>
                  </div>
                  <div className={classes.box__detail__info__faqs__item}>
                    <span
                      className={classes.box__detail__info__faqs__item__mark}
                    >
                      A:
                    </span>
                    <h3
                      className={classes.box__detail__info__faqs__item__answer}
                    >
                      {faq.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
