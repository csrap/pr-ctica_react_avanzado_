import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import AdPage from './AdPage';
import { useDispatch, useSelector } from "react-redux";
import { loadAdverts } from "../../store/actions";
import { getAdverts } from "../../store/selector";
function AdsDetails(...props) {

  const [data] = useState(null);
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);
  return (
    <Layout title="Details Ads" {...adverts}>
      <div className="details">

        <AdPage {...adverts} />
      </div>
    </Layout>

  );
}


export default AdsDetails;
