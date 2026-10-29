import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./globalSearchPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import useGetSearchQuery from "../../tanstack-query/searchTextQuery/useGetSearchQuery";
import { useSelector } from "react-redux";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { SpareItem } from "../../components/spares/SpareItem";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import useCartListDeleteItemMutation from "../../tanstack-query/cartList/useCartListDeleteItemMutation";
import Cookies from "js-cookie";
import { toSlug } from "../../utils/toSlug";

export const GlobalSearchPage = () => {
  const placeholder = "Search....";
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const user_id = authToken ? userId : guestId;
  const navigate = useNavigate();
  const { searchText } = useSelector((state) => state.searchText);
  const { mutateAsync } = useAddToWishListMutation();
  const loadMoreRef = useRef(null);

  const { patchCart } = useCartListSparesMutation();
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();

  const {
    data: sparesListData,
    isLoading,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetSearchQuery(searchText, user_id);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const navigateToSpareDetail = useCallback(
      (item) => {
        if (!item?.id) return;
        const brand = toSlug(item.brand ?? "");
        const model = toSlug(item.model ?? "");
        const spareName = toSlug(item.part ?? "");
        navigate(`/spares/${brand}/${model}/${spareName}/${item.id}`, {
          state: { item },
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
        <p className={classes.box__intro__desc}>Showing results for</p>
        <p
          className={classes.box__intro__search}
        >{`"${searchText}"`}</p>
      </div>
      <div className={classes.box}>
        {content}
        <div ref={loadMoreRef}></div>
      </div>
    </>
  );
};
