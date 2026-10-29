import React, { useState, useMemo } from "react";
import classes from "./spareBrandModelFilter.module.css";

export const SpareBrandModelFilter = ({
  brandData,
  selectedBrands = [],
  selectedModels = [],
  onBrandChange,
  onModelChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

 const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return brandData.filter_options;

    const lowerSearch = searchTerm.toLowerCase();

    return brandData.filter_options
      .map((brand) => {
        const brandMatch = brand.label.toLowerCase().includes(lowerSearch);

        const matchedModels =
          brand.models?.filter((m) =>
            m.label.toLowerCase().includes(lowerSearch)
          ) || [];

        // If brand matches → show all its models
        // If model matches → show only the matched models
        if (brandMatch || matchedModels.length > 0) {
          return {
            ...brand,
            models: brandMatch ? brand.models : matchedModels,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchTerm, brandData.filter_options]);
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h2 className={classes.box__head__title}>{brandData.filter_label}</h2>
        <label htmlFor="brand-search" className={classes.box__head__label}>
          <input
            type="search"
            placeholder="Search brand or model..."
            id="brand-search"
            className={classes.box__head__input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <div className={classes.box__content}>
        {filteredBrands.map((item) => (
          <div key={item.id} className={classes.box__content__brand}>
            <div className={classes.box__content__brand__info}>
              <label
                className={classes.box__content__brand__info__label}
                htmlFor={`brand-${item.id}`}
              >
                <input
                  type="checkbox"
                  id={`brand-${item.id}`}
                  className={classes.box__content__brand__info__input}
                  checked={selectedBrands.includes(item.id)}
                  onChange={() => onBrandChange(item.id, item.models?.map((m) => m.id) || [])}
                />
                <span className={classes.box__content__brand__info__checkbox}></span>
                <span className={classes.box__content__brand__info__title}>
                  {item.label}
                </span>
              </label>

              {item.models?.length > 0 && (
                <label
                  htmlFor={`expand-${item.id}`}
                  className={classes.box__content__brand__info__expandIcon}
                ></label>
              )}
            </div>

            {/* <hr className={classes.box__sep} /> */}

            {item.models?.length > 0 && (
              <>
                <input
                  type="checkbox"
                  id={`expand-${item.id}`}
                  className={classes.box__content__brand__info__expandInput}
                />
                <div
                  className={classes.box__content__brand__info__expandContent}
                >
                  {item.models.map((model) => (
                    <label
                      key={model.id}
                      className={classes.box__content__brand__model__label}
                      htmlFor={`model-${model.id}`}
                    >
                      <input
                        type="checkbox"
                        id={`model-${model.id}`}
                        className={classes.box__content__brand__model__input}
                        checked={selectedModels.includes(model.id)}
                         onChange={() => onModelChange(item.id, model.id)}
                      />
                      <span
                        className={classes.box__content__brand__model__checkbox}
                      ></span>
                      <span
                        className={classes.box__content__brand__model__title}
                      >
                        {model.label}
                      </span>
                    </label>
                  ))}
                </div>
                {/* <hr className={classes.box__sep} /> */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
