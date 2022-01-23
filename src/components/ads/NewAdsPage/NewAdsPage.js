import Layout from '../../Layout/Layout';
import { Button, NameInput, PriceInput, SaleInput, TagsInput } from '../../common';
import './NewAdsPage.css';
import { useState } from 'react';
import PhotoFile from '../../common/PhotoFile';
import { createAds } from '../service';

function NewAdsPage({ history }) {

  const [value, setValue] = useState({ name: '', sale: '', price: '', tags: [], photo: "" });


  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
    console.log(event.target)
  };

  const handlePhoto = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.files[0],
    });
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    const form = new FormData()
    form.append("name", value.name);
    form.append("sale", value.sale);
    form.append("price", value.price);
    form.append("tags", value.tags);
    // form.append("photo", value.photo);

    console.log(value.photo)
    if (value.photo !== "") {
      form.append("photo", value.photo);
    }

    try {
      await createAds(form);
      history.push('/adverts')
    } catch (error) {
      if (error.status === 401) {
        return history.push('/login');
      }
    }
  };



  return (
    <Layout title="Create your Ads">
      <div className="newAdsPage">
        <form onSubmit={handleSubmit} >
          <div >
            <NameInput
              type="text"
              name="name"
              className="NameInput"
              placeholder="NAME PRODUCT"
              value={value.name}
              onChange={handleChange}
            />
            {/* name*	string */}
          </div>

          <div>
            <SaleInput
              name="sale"

              onChange={handleChange}
            />


          </div>
          {/* sale*	boolean */}
          <PriceInput
            type="number"
            name="price"
            placeholder="PRICE"
            value={value.price}
            onChange={handleChange}
          />
          {/* price*	number */}
          <div >
            <TagsInput
              name="tags"
              value={value.tags}
              onChange={handleChange}

            />
          </div>
          {/* tags*	[...] */}
          <div >

            <PhotoFile
              name="photo"
              label="Upload Photo"
              type="file"
              onChange={handlePhoto}
            />
          </div>
          {/* photo	string($binary) */}
          <Button
            type="Submit"
            variant="primary"
            disabled={!value.name || !value.sale || !value.price || !value.tags}
          > CREATE ADS
        </Button>
        </form>
      </div>
    </Layout >
  );
}

export default NewAdsPage;