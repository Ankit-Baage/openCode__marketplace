export const baseUrl =
  process.env.REACT_APP_PROD_ENV === "TRUE"
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_DEV_BASE_URL;

export const razorpay_key =
  process.env.REACT_APP_PROD_ENV === "TRUE"
    ? process.env.REACT_APP_RAZORPAY_KEY__PROD
    : process.env.REACT_APP_RAZORPAY_KEY__DEV;

export const cancelDuration = "12";

const version = "v1/";
const mode = "mp/";
const role = "accounts/";
const sendOtpEndPoint = "send_otp";
const otpVerificationEndPoint = "verify_otp";
const resendOtpEndPoint = "resend_otp";
const profileDataEndPoint = "get_profile";
const updateProfileDataEndPoint = "update_profile";
const uploadImageEndPoint = "upload_gov_id?file_name=hmmm.zip";

const globals = "globals/";
const search = "search";
const hotSelling = "hot_selling";

/**VRP**/

const vrpListEndPoint = "vrp/";
const vrpProductDetailEndPoint = (requestId) =>
  `details?request_id=${requestId}`;

const vrpProductModelTableEndPoint = (requestId) =>
  `item_n_price?request_id=${requestId}`;

const vrpProductBrandTableEndPoint = (requestId) =>
  `brand_details?request_id=${requestId}`;

const vrpProductModelTableExpandedEndPoint = "&mode=all";

const vrpProductLotTableEndPoint = (requestId) =>
  `vrp_wise_details?request_id=${requestId}`;

const vrpProductDetailDownloadEndPoint = "download_file?request_id=";

const vrpSortingListEndPoint = "sorting_list";

//***********************************************************//

//**Spares***//

const spareListEndPoint = "spares/";
const filterSortEndPoint = "filter?mode=spare";
const filterBrandEndPoint = "filter?mode=brand";
const filterModelEndPoint = "filter?mode=model";
const filterPriceEndPoint = "filter?mode=price";
const spareColorEndPoint = (sellerId, brand, model, part) =>
  `color_details?seller_id=${sellerId}&brand=${brand}&model=${model}&part_name=${part}`;

const spareDetailEndPoint = (requestId) => `details?request_id=${requestId}`;

export const requestOtpUrl = `${baseUrl}${version}${mode}${role}${sendOtpEndPoint}`;

export const otpVerificationUrl = `${baseUrl}${version}${mode}${role}${otpVerificationEndPoint}`;

export const resendOtpUrl = `${baseUrl}${version}${mode}${role}${resendOtpEndPoint}`;

export const profileDataUrl = `${baseUrl}${version}${mode}${role}${profileDataEndPoint}`;

export const updateProfileDataUrl = `${baseUrl}${version}${mode}${role}${updateProfileDataEndPoint}`;

export const uploadImageUrl = `${baseUrl}${version}${mode}${role}${uploadImageEndPoint}`;

export const vrpListUrl = (user_id, medium) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}?user_id=${user_id}&mode=${medium}`;

export const vrpProductDetailUrl = (requestId, user_id, medium) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductDetailEndPoint(
    requestId
  )}&user_id=${user_id}&mode=${medium}`;

export const vrpProductModelTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductModelTableEndPoint(
    requestId
  )}`;

export const vrpProductBrandTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductBrandTableEndPoint(
    requestId
  )}`;

export const vrpProductLotTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductLotTableEndPoint(
    requestId
  )}`;

export const vrpProductModelTableExpandedUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductModelTableEndPoint(
    requestId
  )}${vrpProductModelTableExpandedEndPoint}`;

export const vrpProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductDetailDownloadEndPoint}${requestId}`;

export const vrpSortingListUrl = `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpSortingListEndPoint}`;

//***********************************************************//

//**Spares***//

export const spareListUrl = (user_id, medium) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}?user_id=${user_id}&mode=${medium}`;

export const spareDetailUrl = (requestId, user_id, medium) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareDetailEndPoint(
    requestId
  )}&user_id=${user_id}&mode=${medium}`;

export const spareColorUrl = (sellerId, brand, model, partName) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareColorEndPoint(
    sellerId,
    brand,
    model,
    partName
  )}`;

export const filterSpareUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterSortEndPoint}`;
export const filterBrandUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterBrandEndPoint}`;
export const filterModelUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterModelEndPoint}`;
export const filterPriceUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterPriceEndPoint}`;
const spareFilterEndPoint = (filterType) => `filter?mode=${filterType}`;
export const spareFilterUrl = (filterType) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareFilterEndPoint(
    filterType
  )}`;

/////////////********newPhone*********************///////
const newPhoneDetailEndPoint = (requestId) => `details?request_id=${requestId}`;
const newPhoneListEndPoint = "new_phones/";
export const newPhoneListUrl = (user_id, medium) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}?user_id=${user_id}&mode=${medium}`;

const newPhoneFilterEndPoint = (filterType) => `filter?mode=${filterType}`;
export const newPhoneFilterUrl = (filterType) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneFilterEndPoint(
    filterType
  )}`;

export const newPhoneDetailUrl = (requestId, user_id, medium) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneDetailEndPoint(
    requestId
  )}&user_id=${user_id}&mode=${medium}`;

const newPhoneColorEndPoint = (sellerId, brand, model, ram, rom) =>
  `color_details?seller_id=${sellerId}&brand=${brand}&model=${model}&ram=${ram}&rom=${rom}`;

export const newPhoneColorUrl = (sellerId, brand, model, ram, rom) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneColorEndPoint(
    sellerId,
    brand,
    model,
    ram,
    rom
  )}`;

const newPhoneVariantEndPoint = (sellerId, brand, model, color) =>
  `variant_details?seller_id=${sellerId}&brand=${brand}&model=${model}&color=${color}`;

export const newPhoneVariantUrl = (sellerId, brand, model, color) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneVariantEndPoint(
    sellerId,
    brand,
    model,
    color
  )}`;

//////////////*******open_box**********///////////////

const openBoxDetailEndPoint = (requestId) => `details?request_id=${requestId}`;
const openBoxListEndPoint = "open_box/";
export const openBoxListUrl = (user_id, medium) =>
  `${baseUrl}${version}${mode}${openBoxListEndPoint}?user_id=${user_id}&mode=${medium}`;

const openBoxFilterEndPoint = (filterType) => `filter?mode=${filterType}`;
export const openBoxFilterUrl = (filterType) =>
  `${baseUrl}${version}${mode}${openBoxListEndPoint}${openBoxFilterEndPoint(
    filterType
  )}`;

export const openBoxDetailUrl = (requestId, user_id, medium) =>
  `${baseUrl}${version}${mode}${openBoxListEndPoint}${openBoxDetailEndPoint(
    requestId
  )}&user_id=${user_id}&mode=${medium}`;

const openBoxColorEndPoint = (sellerId, brand, model, ram, rom) =>
  `color_details?seller_id=${sellerId}&brand=${brand}&model=${model}&ram=${ram}&rom=${rom}`;

export const openBoxColorUrl = (sellerId, brand, model, ram, rom) =>
  `${baseUrl}${version}${mode}${openBoxListEndPoint}${openBoxColorEndPoint(
    sellerId,
    brand,
    model,
    ram,
    rom
  )}`;

const openBoxVariantEndPoint = (sellerId, brand, model, color) =>
  `variant_details?seller_id=${sellerId}&brand=${brand}&model=${model}&color=${color}`;

export const openBoxVariantUrl = (sellerId, brand, model, color) =>
  `${baseUrl}${version}${mode}${openBoxListEndPoint}${openBoxVariantEndPoint(
    sellerId,
    brand,
    model,
    color
  )}`;

////////CART/////////////////
const cart = "cart/";
const guest = "guest/";
const qty = "qty";

export const cartListUrl = `${baseUrl}${version}${mode}${cart}`;
export const cartListUpdateUrl = `${baseUrl}${version}${mode}${cart}${qty}`;
export const cartListGuestUpdateUrl = `${baseUrl}${version}${mode}${cart}${guest}${qty}`;

export const cartGetListGuestUrl = (guestId, coupon_code) => {
  let url = `${baseUrl}${version}${mode}${cart}guest?user_id=${guestId}`;
  url += coupon_code ? `&coupon_code=${coupon_code}` : "";
  return url;
};

export const cartLisGuestUrl = `${baseUrl}${version}${mode}${cart}guest`;

export const cartGetListUrl = (coupon_code) => {
  let url = baseUrl + version + mode + cart;
  url += coupon_code ? `?coupon_code=${coupon_code}` : "";

  return url;
};

///////////review Page//////////////////

export const reviewListUrl = (coupon_code, address_id) => {
  // Base URL
  let url = `${baseUrl}${version}${mode}${cart}review?address_id=${address_id}`;

  // Append coupon_code if provided
  if (coupon_code) {
    url += `&coupon_code=${coupon_code}`;
  }

  // Append beta=1 at the end
  url += "&beta=1";

  return url;
};

/////////addresses//////////////////
const addresses = "addresses";
export const addressUrl = `${baseUrl}${version}${mode}${addresses}/`;

export const selectAddressUrl = (id) => `${addressUrl}?id=${id}`;
export const selectedAddressDetailUrl = (id) => `${addressUrl}?id=${id}`;

////////save for later/////////////////

const later = "save_for_later";
export const laterListUrl = `${baseUrl}${version}${mode}${cart}${later}`;

////////wishList/////////////////
const wishList = "wishlist";
export const wishListListUrl = `${baseUrl}${version}${mode}${cart}${wishList}`;

//////////////////Best Selling Products///////////////////

export const bestVrpProductUrl = `${baseUrl}${version}${mode}vrp/?limit=4`;
export const bestSparesProductUrl = `${baseUrl}${version}${mode}spares/?limit=4`;
export const bestNewPhonesProductUrl = `${baseUrl}${version}${mode}new_phones/?limit=4`;
export const bestOpenBoxProductUrl = `${baseUrl}${version}${mode}open_box/?limit=4`;


/////////////////////hotDeals/////////
export const hotDealsSparesUrl = `${baseUrl}${version}${mode}${globals}${hotSelling}?limit=4`;



//////////////////coupons///////////////////
const coupons = "coupons";

export const couponsListUrl = `${baseUrl}${version}${mode}${role}${coupons}`;

//////////////////orders///////////////////
const orders = "orders";
export const ordersListUrl = `${baseUrl}${version}${mode}${orders}/`;

export const orderDetailUrl = (order_id) =>
  `${baseUrl}${version}${mode}${orders}/details?order_id=${order_id}`;

/////////////placeOrder////////////////
export const placeOrderUrl = (coupon_code, address_id) => {
  let url = `${baseUrl}${version}${mode}${orders}/payment_processing_approval?address_id=${address_id}&mode=cart`;
  if (coupon_code) {
    url += `&coupon_code=${coupon_code}`;
  }
  return url;
};

///////////UserProfile////////////////

export const userProfileUrl = (user_id) =>
  `${baseUrl}${version}${mode}accounts/user_profile?user_id=${user_id}`;

//////////optimization//////////////

export const categoryListUrl = (category, user_id, medium) =>
  `${baseUrl}${version}${mode}${category}/?user_id=${user_id}&mode=${medium}`;

///////////////////////advertisement////////////////
const advertisementEndPoint = "advertisement";
export const advertisementUrl = `${baseUrl}${version}${mode}${advertisementEndPoint}`;

export const productsListUrl = (category) =>
  `${baseUrl}${version}${mode}${category}/`;

const verify_payment = "verify_payment";
export const paymentRecordUrl = `${baseUrl}${version}${mode}${orders}/${verify_payment}`;

const returns = "returns";

export const returnUrl = `${baseUrl}${version}${mode}${orders}/${returns}`;

 const autocomplete = "autocomplete"

export const searchTextUrl = `${baseUrl}${version}${mode}${globals}${search}`;
export const searchTextSuggestionUrl = `${baseUrl}${version}${mode}${globals}${autocomplete}`;

export const hotSellingUrl = `${baseUrl}${version}${mode}${globals}${hotSelling}`;
const subCat = "bysubcat";
export const buyBySubCategoryHomeUrl = (category) =>
  `${baseUrl}${version}${mode}${category}/${subCat}`;

export const buyBySubCategoryUrl = (category) =>
  `${baseUrl}${version}${mode}${category}/${subCat}?source=category`;

const byBrands = "bybrands";

export const buyByBrandUrl = (category) =>
  `${baseUrl}${version}${mode}${category}/${byBrands}`;

export const cancelOrderUrl = (order_id) =>
  `${baseUrl}${version}${mode}${orders}/cancel/?order_id=${order_id}`;



const filterEndPoint = (category) => `${baseUrl}${version}${mode}${category}/filter_v3`;

export const filterUrl = (category) => filterEndPoint(category);