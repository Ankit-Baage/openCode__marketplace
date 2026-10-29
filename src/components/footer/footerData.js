import home from "../../assets/home.svg";
import homeActive from "../../assets/homeActive.svg";
import category from "../../assets/category.svg";
import categoryActive from "../../assets/categoryActive.svg";
import help from "../../assets/help.svg";
import helpActive from "../../assets/helpActive.svg";
import cart from "../../assets/cart.svg";
import cartActive from "../../assets/cartActive.svg";
import profile from "../../assets/profile.svg";
import profileActive from "../../assets/profileActive.svg";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import linkedin from "../../assets/linkedin.svg";
import { redirect } from "react-router-dom";

export const footerData__sm = [
  {
    image: home,
    activeImage: homeActive,
    text: "Home",
    path: "/",
  },
  {
    image: category,
    activeImage: categoryActive,
    text: "Category",
    path: "/category",
  },
  {
    image: help,
    activeImage: helpActive,
    text: "Help",
    path: "/help",
  },
  {
    image: cart,
    activeImage: cartActive,
    text: "Cart",
    path: "/cart",
    badge: true,
  },
  {
    image: profile,
    activeImage: profileActive,
    text: "Profile",
    path: "/profileInfo",
  },
];

export const footerData__lg = [
  {
    title: "Company",
    links: [
      {
        id: "home",
        label: "Home Page",
      },
      {
        id: "about",
        label: "About Us",
        redirectTo: "/policies/aboutUs",
      },
      {
        id: "privacy",
        label: "Privacy Policy",
        redirectTo: "/policies/privacy",
      },
      {
        id: "blog",
        label: "Blog",
      },
      {
        id: "careers",
        label: "Careers",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        id: "help",
        label: "Help & Support",
        redirectTo: "/policies/support",
      },
      {
        id: "refund",
        label: "Refund & Replacement Policy",
        redirectTo: "/policies/refundAndReplacement",
      },
      {
        id: "warranty",
        label: "Warranty Policy",
        redirectTo: "/policies/warranty",
      },
      {
        id: "termsAndConditions",
        label: "Terms and conditions",
        redirectTo: "/policies/termsAndConditions",
      },
      { id: "faq", label: "FAQs", redirectTo: "/policies/faqs" },
    ],
  },
];

export const footerData__media = [
  {
    id: "socialMedia",
    title: "Social Media",
    links: [
      {
        id: "twitter",
        label: "Twitter",
        icon: twitter,
        url: "https://x.com/mobi_garage",
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: facebook,
        url: "https://www.facebook.com/mobigarage?mibextid=ZbWKwL",
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: instagram,
        url: "https://www.instagram.com/mobi_garage/?igshid=ZDdkNTZiNTM%3D",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: linkedin,
        url: "https://www.linkedin.com/company/mobigarage/",
      },
    ],
  },
];
