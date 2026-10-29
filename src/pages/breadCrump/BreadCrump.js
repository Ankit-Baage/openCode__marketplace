import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterOptions, setFilterOption } from "../../store/category/categorySlice";
import { breadcrumbLabels } from "./breadCrumpLabels";
import classes from "./breadCrump.module.css";

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const filters = useSelector(selectFilterOptions);

  // ---------- Helpers ----------
  const decodeVal = (v) => {
    if (v == null) return "";
    try {
      return decodeURIComponent(String(v)).replace(/\+/g, " ").trim();
    } catch {
      return String(v).replace(/\+/g, " ").trim();
    }
  };

  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    if (typeof val === "string") {
      return val
        .split(",")
        .map((s) => decodeVal(s))
        .filter(Boolean);
    }
    return [];
  };

  const formatSegment = (seg) =>
    String(decodeVal(seg))
      .split("-")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
      .join(" ");

  const displayJoin = (arr) => {
  if (!arr?.length) return "";
  const formatted = arr.map((v) => formatSegment(v));
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return formatted.join(" & ");
  return formatted.slice(0, -1).join(", ") + " & " + formatted[formatted.length - 1];
};


  const buildFilterPath = ({ brands = [], models = [], parts = [] } = {}) => {
    const params = new URLSearchParams();
    if (brands.length) params.set("brand", brands.map((b) => encodeURIComponent(b)).join(","));
    if (models.length) params.set("model", models.map((m) => encodeURIComponent(m)).join(","));
    if (parts.length) params.set("spare", parts.map((p) => encodeURIComponent(p)).join(","));
    const qs = params.toString();
    return `/spares${qs ? `?${qs}` : ""}`;
  };

  // ---------- Parse pathname ----------
  const segments = (pathname || "").split("/").filter(Boolean);
  const lastSeg = segments[segments.length - 1];
  const pathSegments = /^\d+$/.test(lastSeg) ? segments.slice(0, -1) : segments.slice();

  const isSparesPath = pathSegments[0] === "spares";
  const routeBrand = isSparesPath ? pathSegments[1] ?? null : null;
  const routeModel = isSparesPath ? pathSegments[2] ?? null : null;
  const routeSpare = isSparesPath ? pathSegments[3] ?? null : null;

  // ---------- Get filter values ----------
  const reduxBrands = toArray(filters?.brand ?? filters?.brands ?? null);
  const reduxModels = toArray(filters?.model ?? filters?.models ?? null);
  const reduxSpares = toArray(filters?.spare ?? filters?.spares ?? null);

  const brandValues = routeBrand ? [routeBrand] : reduxBrands;
  const modelValues = routeModel ? [routeModel] : reduxModels;
  const spareValues = routeSpare ? [routeSpare] : reduxSpares;

  // ---------- Build crumb list ----------
  const breadcrumbs = [];
  const atRoot = pathSegments.length === 0 && Object.keys(new URLSearchParams(search)).length === 0;
  if (atRoot) return null;

  // Always start with Home
  breadcrumbs.push({ label: breadcrumbLabels["/"] ?? "Home", level: "home", path: "/" });

  if (isSparesPath) {
    // Spares-specific
    breadcrumbs.push({ label: breadcrumbLabels["spares"] ?? "Spares", level: "spares", path: "/spares" });

    if (brandValues.length > 0) {
      breadcrumbs.push({
        label: displayJoin(brandValues),
        level: "brand",
        path: buildFilterPath({ brands: brandValues }),
      });
    }

    if (modelValues.length > 0) {
      breadcrumbs.push({
        label: displayJoin(modelValues),
        level: "model",
        path: buildFilterPath({ brands: brandValues, models: modelValues }),
      });
    }

    if (spareValues.length > 0) {
      breadcrumbs.push({
        label: displayJoin(spareValues),
        level: "spare",
        path: buildFilterPath({ brands: brandValues, models: modelValues, parts: spareValues }),
      });
    }
  } else {
    // Generic non-spares path
    pathSegments.forEach((seg, idx) => {
      const label = breadcrumbLabels[seg] || formatSegment(seg);
      const path = `/${pathSegments.slice(0, idx + 1).join("/")}`;
      breadcrumbs.push({ label, level: seg, path });
    });
  }

  // ---------- Click handler ----------
 const handleCrumbClick = (crumb, idx) => {
  if (idx === breadcrumbs.length - 1) return; // last not clickable

  if (isSparesPath) {
    switch (crumb.level) {
      case "home":
        dispatch(setFilterOption({ brand: [], model: [], spare: [] }));
        navigate("/");
        break;

      case "spares":
        // 🧹 clear all filters
        dispatch(setFilterOption({ brand: [], model: [], spare: [] }));
        navigate("/spares");
        break;

      case "brand":
        // 🧹 keep brand, clear model + spare
        dispatch(setFilterOption({ brand: brandValues, model: [], spare: [] }));
        navigate(buildFilterPath({ brands: brandValues }));
        break;

      case "model":
        // 🧹 keep brand + model, clear spare
        dispatch(setFilterOption({ brand: brandValues, model: modelValues, spare: [] }));
        navigate(buildFilterPath({ brands: brandValues, models: modelValues }));
        break;

      default:
        break;
    }
  } else {
    navigate(crumb.path);
  }
};


  // ---------- Render ----------
  return (
    <nav className={classes.breadcrumbs} aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <span key={idx} className={classes.breadcrumbs__link} aria-label={`showing ${crumb.label}`}>
            {idx > 0 && <span className={classes.breadcrumbs__separator}> &gt; </span>}
            {!isLast ? (
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleCrumbClick(crumb, idx)}
                onKeyDown={(e) => (e.key === "Enter" ? handleCrumbClick(crumb, idx) : null)}
                className={classes.breadcrumbs__link}
              >
                {crumb.label}
              </span>
            ) : (
              <span className={classes.breadcrumbs__current}>{crumb.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
