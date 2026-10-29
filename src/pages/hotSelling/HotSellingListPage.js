import React, { useCallback, useEffect, useMemo, useRef } from "react";
import classes from "./hotSellingListPage.module.css";
import useGetHotSellingList from "../../tanstack-query/hotSelling/useGetHotSellingList";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { SpareItem } from "../../components/spares/SpareItem";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toSlug } from "../../utils/toSlug";

export const HotSellingListPage = () => {
  const placeholder = "Search...";

  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const user_id = authToken ? userId : guestId;

  const loadMoreRef = useRef(null);

  const {
    data: sparesListData,
    isLoading,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetHotSellingList(user_id);
  const navigate = useNavigate();
  const { mutateAsync } = useAddToWishListMutation();
  const navigateToSpareDetail = useCallback(
    (item) => {
      if (!item?.id) return;

      // Slugify each param for SEO
      const brand = toSlug(item.brand ?? "");
      const model = toSlug(item.model ?? "");
      const spareName = toSlug(item.part ?? "");

      // Final URL -> /spares/apple/iphone-12/sub-board/52153
      navigate(`/spares/${brand}/${model}/${spareName}/${item.id}`, {
        state: { item }, // pass data if already available
      });
    },
    [navigate]
  );

  const handleAddToWishList = useCallback(
    async (item) => {
      try {
        const response = await mutateAsync({
          category_id: item.category_id,
          item_id: item.id,
          master_product_id: item.master_product_id,
        });

        toast.success(response?.data?.message?.displayMessage);
      } catch (error) {
        toast.error(error?.response?.data?.message?.displayMessage);
      }
    },
    [mutateAsync]
  );

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const content = useMemo(() => {
    if (isLoading) return <CartLoader />;

    if (isSuccess && sparesListData?.pages?.length > 0) {
      const allItems = sparesListData.pages.flatMap((page) => page?.data || []);

      if (allItems.length === 0) return <BestSellingCardMessage />;

      return allItems.map((item) => {
        switch (item.category_id) {
          // case 5:
          //   return <VrpItem key={item.request_id} item={item} />;
          case 6:
            return (
              <SpareItem
                key={item.id}
                item={item}
                onClick={() => navigateToSpareDetail(item)}
                onWishList={() => handleAddToWishList(item)}
              />
            );
          // case 7:
          //   return <NewPhoneItem key={item.id} item={item} />;
          // case 8:
          //   return <OpenBoxItem key={item.id} item={item} />;
          default:
            return null;
        }
      });
    }

    return <EmptyCart />;
  }, [
    handleAddToWishList,
    isLoading,
    isSuccess,
    navigateToSpareDetail,
    sparesListData?.pages,
  ]);
  return (
    <>
      <div className={classes.box__intro}>
        <h1 className={classes.box__intro__title}>Spares (Hot deals)</h1>
        <Link to="/spares" className={classes.box__intro__link}>
          Explore All Spares
        </Link>
      </div>
      <div className={classes.box}>
        {content}
        <div ref={loadMoreRef}></div>
      </div>
    </>
  );
};
