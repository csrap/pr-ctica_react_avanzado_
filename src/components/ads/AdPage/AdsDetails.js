import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import AdPage from './AdPage';
import { useDispatch, useSelector } from "react-redux";
import { loadAdverts } from "../../store/actions";
import { getAdverts } from "../../store/selector";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import placeholder from '../../../assets/placeholder.png';


const AdsDetails = ({ ...ads }) => {


  return (

    <div className="card">
      <div className="card-photo">
        <img
          src={
            ads.photo
              ? `http://localhost:3001${ads.photo}`
              : placeholder
          }
          alt={ads.name}
        />
      </div>
      <div className="card-name">
        <h5 className="name">{ads.name} </h5>
      </div>
      <div className="card-price">
        <h5 className="price">{ads.price}<span>€</span></h5>
        <h4  >{ads.sale ? <p className="sale" > true </p> : <p className="sale"> false </p>}</h4>
        <span>{ads.tags}  </span>
      </div>
    </div>


  );

};


export default AdsDetails;
