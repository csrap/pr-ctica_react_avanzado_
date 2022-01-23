import { useState } from 'react';
import React from "react";
import { NameInput } from '../../common';
import './filters.css';
import { Button, Select } from "semantic-ui-react";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const saleOptions = [
  { key: "true", value: true, text: "Sale" },
  { key: "false", value: false, text: "Buy" },
];

const tagsOptions = [
  { key: "lifestyle ", value: "lifestyle ", text: "lifestyle" },
  { key: "mobile ", value: "mobile ", text: "mobile" },
  { key: "motor ", value: "motor ", text: "motor" },
  { key: "work ", value: "work ", text: "work" },
];

const initialStateForm = {
  name: "",
  sale: "",
  price: [],
  tags: [],
};


function FiltersForm(props) {

  const [state, setState] = useState(initialStateForm);

  const { handleSearch } = props;



  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(event.target)
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

  };


  const handleClean = () => {
    setState(initialStateForm);
    handleSearch(initialStateForm);

  };

  const handleChangeRange = (event) => {
    setState({
      ...state,
      ['price']: event,
    });

  }


  return (
    <div className="filtersForm">
      <form onSubmit={handleSubmit} >
        <h3>Buscador de Anuncios</h3>

        <div >
          <NameInput
            type="text"
            name="name"
            className="NameInput"
            placeholder="NAME PRODUCT"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Select
            name="sale"
            placeholder="¿SALE or BUY?"
            value={state.sale}
            onChange={(e, { value }) =>
              setState({
                ...state,
                [Object.keys(state)[1]]: value,
              })
            }
            options={saleOptions}
          />

        </div>
        <NameInput
          type="text"
          name="name"
          className="NameInput"
          placeholder="MIN"
          value={state.price[0] || ""}
          onChange={handleChange}
        />
        <NameInput
          type="text"
          name="name"
          className="NameInput"
          placeholder="MAX"
          value={state.price[1] || ""}
          onChange={handleChange}
        />
        <Range
          allowCross={false}
          defaultValue={[0, 50]}
          min={0}
          max={2500}
          draggableTrack
          onChange={handleChangeRange}
        />

        <div >
          <Select
            className="Select-tags"
            multiple
            name="tags"
            placeholder="TAGS"
            value={state.tags}
            onChange={(e, { value }) =>
              setState({
                ...state,
                [Object.keys(state)[3]]: value,
              })
            }
            options={tagsOptions}
          />

        </div>
        <div>
          <Button
            type="submit"
            className=""
            variant="primary"
            onClick={() => handleSearch(state)}
          >
            FILTERS
        </Button>
        </div>
        <div>
          <Button
            className=""
            variant="primary"
            onClick={handleClean}
          >
            CLEAR
        </Button>

        </div>



      </form>
    </div>

  );
}

export default FiltersForm;