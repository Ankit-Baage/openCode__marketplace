import React, { useMemo, useState } from 'react';
import classes from "./sparePartOptions.module.css"

export const SparePartOptions = ({
  sparePartsData,
  selectedFilters = {},
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter spare parts based on search
  const filteredSpareParts = useMemo(() => {
    if (!searchTerm.trim()) return sparePartsData.filter_options;

    const lowerSearch = searchTerm.toLowerCase();
    return sparePartsData.filter_options.filter((part) =>
      part.label.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, sparePartsData.filter_options]);

  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
       
        <label htmlFor="spare-search" className={classes.box__head__label}>
          <input
            type="search"
            placeholder="Search spare parts..."
            id="spare-search"
            className={classes.box__head__input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <div className={classes.box__content}>
        {filteredSpareParts.map((part) => (
          <label
            key={part.id}
            className={classes.box__content__spare__label}
            htmlFor={`spare-${part.id}`}
          >
            <input
              type="checkbox"
              id={`spare-${part.id}`}
              className={classes.box__content__spare__input}
              checked={selectedFilters.spares?.includes(part.id) || false}
              onChange={() => onChange(part.id)}
            />
            <span className={classes.box__content__spare__checkbox}></span>
            <span className={classes.box__content__spare__title}>
              {part.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
