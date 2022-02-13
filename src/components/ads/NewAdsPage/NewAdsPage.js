import Layout from '../../Layout/Layout';
import { Button, NameInput, PriceInput, SaleInput, TagsInput } from '../../common';
import './NewAdsPage.css';
import { useState } from 'react';
import PhotoFile from '../../common/PhotoFile';
import { createAds } from '../service';
import { Redirect, useHistory } from "react-router";


function NewAdsPage() {
  const history = useHistory();

  const [createdAdvertId, setCreatedAdvertId] = useState("");


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
      const newAdvert = await createAds(form);
      setCreatedAdvertId(newAdvert.id);

    } catch (error) {
      if (error.status === 401) {
        return history.push('/login');
      }
    }
  };

  if (createdAdvertId) {
    return <Redirect to={`/adverts/`} />;
  }



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
          <Button
            type="Submit"
            variant="primary"
            disabled={!value.name || !value.sale || !value.price || !value.tags}
          > CREATE ADS
        </Button>
        </form>
      </div>
    </Layout>
  );
}

export default NewAdsPage;