import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAdvert } from "../../store/actions";
import { getAdvert } from "../../store/selector";
import AdsDetails from "../AdPage/AdsDetails";
import AdPage from './AdPage';




function AdsDetailsPage(...props) {
  // const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(getAdvert);

  useEffect(() => {
    dispatch(loadAdvert(id));
  }, [id, dispatch]);


  return (
    <Layout title="Details Ads" {...props}>
      <div className="details">
        <AdPage {...ad} />
      </div>
    </Layout>
  );
}

export default AdsDetailsPage;