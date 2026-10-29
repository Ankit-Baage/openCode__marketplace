import { useRef, useCallback, Fragment, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SpareItem } from "../../../components/spares/SpareItem";
import {
  selectFilterOptions,
  setFilterOption,
} from "../../../store/category/categorySlice";
import useGetSpareList from "../../../tanstack-query/spares/useGetSpareList";

import useAddToWishListMutation from "../../../tanstack-query/wishList/useAddToWishListMutation";
import { toSlug } from "../../../utils/toSlug";
import { BestSellingCardMessage } from "../../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { Spinner } from "../../../components/ui/spinner/Spinner";
import { ProductSkeleton } from "../../../components/skeletons/productSkeleton/ProductSkeleton";

import classes from "./spareListingPage.module.css";
import { AdvertisementPage } from "../../advertisement/AdvertisementPage";

export const SpareListingPage = () => {
  const filters = useSelector(selectFilterOptions);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  const [searchParams] = useSearchParams();
  const params = useParams();

  const {
    category: paramCategory,
    brand: paramBrand,
    model: paramModel,
  } = params;
  const category ="spares"
  const page = "listing";
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");

  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;

  const memoizedFilters = useMemo(
    () => ({
      brand: filters.brand ?? null,
      model: filters.model ?? null,
      spare: filters.spare ?? null,
      start: filters.start ?? null,
      end: filters.end ?? null,
      sort: filters.sort ?? null,
    }),
    [
      filters.brand,
      filters.model,
      filters.spare,
      filters.start,
      filters.end,
      filters.sort,
    ]
  );

  const {
    data: sparesListData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetSpareList(memoizedFilters, user_id, medium);

  const { mutateAsync: addToWishList } = useAddToWishListMutation();


  // Infinite scroll observer
  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [handleObserver]);

  useEffect(() => {
    const newFilters = {};

    const spare = paramCategory || searchParams.get("spare");
    const brand = paramBrand || searchParams.get("brand");
    const model = paramModel || searchParams.get("model");
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const sort = searchParams.get("sort");

    if (spare) newFilters.spare = spare;
    if (brand) newFilters.brand = brand;
    if (model) newFilters.model = model;
    if (start) newFilters.start = Number(start);
    if (end) newFilters.end = Number(end);
    if (sort) newFilters.sort = sort;

    dispatch(setFilterOption(newFilters));
  }, [dispatch, paramCategory, paramBrand, paramModel, searchParams]);

  const navigateToSpareDetail = useCallback(
    (item) => {
      if (!item?.id) return;
      const brand = toSlug(item.brand ?? "");
      const model = toSlug(item.model ?? "");
      const spareName = toSlug(item.part ?? "");
      navigate(`${brand}/${model}/${spareName}/${item.id}`, {
        state: { item },
      });
    },
    [navigate]
  );

  const handleAddToWishList = useCallback(
    async (item) => {
      try {
        const res = await addToWishList({
          category_id: item.category_id,
          item_id: item.id,
          master_product_id: item.master_product_id,
        });
        toast.success(res?.data?.message?.displayMessage);
      } catch (error) {
        toast.error(error?.response?.data?.message?.displayMessage);
      }
    },
    [addToWishList]
  );
  if (isLoading) {
    return (
      <div className={classes.box}>
        <ProductSkeleton />
      </div>
    );
  }

  return (
    <div className={classes.box}>
      <AdvertisementPage category={category} page={page} />

      <div
        className={
          sparesListData?.pages?.some((page) => page.data.length > 0)
            ? classes.box__content
            : classes.box__content__empty
        }
      >
        {sparesListData?.pages?.some((page) => page.data.length > 0) ? (
          sparesListData.pages.flatMap((page, index) => (
            <Fragment key={index}>
              {page.data.map((item) => (
                <SpareItem
                  key={item.id}
                  item={item}
                  onClick={() => navigateToSpareDetail(item)}
                  onWishList={() => handleAddToWishList(item)}
                />
              ))}
            </Fragment>
          ))
        ) : (
          <BestSellingCardMessage />
        )}
        <div ref={loadMoreRef} />
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
};
