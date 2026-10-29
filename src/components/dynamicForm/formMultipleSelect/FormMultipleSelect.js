import React, { useState } from "react";
import classes from "./formMultipleSelect.module.css";
import { useController } from "react-hook-form";

export const FormMultipleSelect = ({ label, options, control, id }) => {
  const {
    field: { value = [], onChange },
  } = useController({ name: id, control });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (optionId) => {
    let newValue;
    if (value.includes(optionId)) {
      newValue = value.filter((val) => val !== optionId);
    } else {
      newValue = [...value, optionId];
    }
    onChange(newValue);
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__select} onClick={toggleDropdown}>
        {label}
      </div>
      {isOpen && (
        <div className={classes.dropdown}>
          {options.map((option) => (
            <label key={option.id} className={classes.option}>
              <input
                type="checkbox"
                checked={value.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
