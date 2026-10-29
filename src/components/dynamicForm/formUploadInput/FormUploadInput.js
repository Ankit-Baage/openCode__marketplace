import React, { useEffect, useState } from "react";
import { uploadImageRequest } from "../../../http-request/uploadImageRequest";

import uploadIcon from "../../../assets/upload-icon.svg";
import classes from "./formUploadInput.module.css";
import { extractReadableLabel } from "../../../utils/buildQueryString";

export const FormUploadInput = ({
  id,
  urlLabel,
  url,
  onSelection,
  onChange,
  disabled,
}) => {
  const [uploadImage, setUploadImage] = useState("");
  const [ext, setExt] = useState("");

  // Sync `uploadImage` state with the `url` prop
  useEffect(() => {
    if (url) {
      setUploadImage(url);
    }
  }, [url]);

  const fileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    try {
      // Upload the selected file using the provided request function
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response.data.fileUrl;
      const showUrl = extractReadableLabel(imageUrl);

      // Update the local state and trigger callbacks
      setUploadImage(imageUrl);
      if (onChange) onChange(id, imageUrl); // Sync with the parent form
      if (onSelection) onSelection(imageUrl); // Optional callback
      setExt(showUrl);
    } catch (error) {
      console.error(`File upload failed for ${id}:`, error);
    }
  };

  return (
    <div className={classes.form__group__upload}>
      <label
        htmlFor={`upload-${id}`}
        className={classes.form__field__upload__label}
      >
        <img src={uploadIcon} alt="upload" className={classes.upload__img} />
        <h3 className={classes.upload__label}>Upload File</h3>
        <input
          name={`upload-${id}`}
          type="file"
          id={`upload-${id}`}
          className={classes.form__field__upload}
          onChange={fileUpload}
          disabled={disabled}
        />
      </label>
      <span className={classes.uploadedUrl}>{ext||urlLabel}</span>
    </div>
  );
};
