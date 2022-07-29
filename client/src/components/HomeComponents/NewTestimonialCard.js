import React, { useState } from 'react'
import styles from './NewTestimonialCard.module.css'
import { BiImageAdd } from "react-icons/bi";
function NewTestimonialCard({ active }) {
  const [data, setData] = useState({
    img: undefined,
    name: "",
    quote: "",
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    }
    )
    console.log(data.img);
  }
  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setData({
        ...data,
        img: data.img || undefined
      });
      return;
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      setData({
        ...data,
        img: e.target.result
      });
    }
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={`${styles.new_testimonial_container} ${active && styles.new_testimonial_container_active}`}>
      <div className={`${styles.img_container} ${active && styles.active}`}>
        <label htmlFor="img-input">
          <BiImageAdd size="50px" />
        </label>
        <input name="image" id="img-input" type="file" onChange={onSelectFile} />

        {data.img &&
          <img src={data.img} alt="upload-image" />
        }
      </div>
      <div className={styles.input_container}>
        <label >Name</label>
        <input type="text" name="name" id="name" placeholder="Enter your name" value={data.name} onChange={handleChange} />
        <label >Quote</label>
        <input type="text" name="quote" id="quote" placeholder="Enter the quote" value={data.quote} onChange={handleChange} />
        <button>Add</button>
      </div>
    </div>
  )
}

export default NewTestimonialCard