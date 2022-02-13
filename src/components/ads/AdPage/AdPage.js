import React, { useState, useEffect } from "react";
import { deleteAdvert } from '../../store/actions';
import placeholder from '../../../assets/placeholder.png';
import { useHistory } from "react-router-dom";
import { Button } from '../../common';
import './AdPage.css';
import { Confirm } from "semantic-ui-react";
import { useDispatch } from "react-redux";



const AdPage = ({ ...announcement }) => {
  const history = useHistory();
  const [state, setState] = useState({ open: false });
  const [SupAdvert, setSupAdvert] = useState(false);
  const dispatch = useDispatch();


  const show = () => setState({ open: true });

  const handleConfirm = () => {
    setSupAdvert(true);
  };


  const handleCancel = () => setState({ open: false });


  useEffect(() => {
    if (SupAdvert === true) {
      dispatch(deleteAdvert(announcement.id));
      setState({ open: false });
      // return history.push("/adverts");
    }
  }, [announcement.id, SupAdvert, history, dispatch]);

  // useEffect(() => {
  //   dispatch(loadAdvert());
  // }, [dispatch]);


  return (
    <div >
      <div className="card"  >
        <div className="card-photo" >
          <img
            src={
              announcement.photo ? `http://localhost:3001${announcement.photo}` : placeholder} />
        </div>
        <div className="card-name">
          <h5 className="name">{announcement.name} </h5>
        </div>
        <div className="card-price">
          <h5 className="price">{announcement.price}<span>€</span></h5>
          <h4  >{announcement.sale ? <p className="sale" > true </p> : <p className="sale"> false </p>}</h4>
          <span>{announcement.tags}  </span>                    </div>
        <div className="field is-grouped">
          <Button
            onClick={show} >
            Delete ADS
            </Button>
          <Confirm
            open={state.open}
            header="Delete Ads"
            content="¿Are you sure delete Ads?"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            size="tiny"
            cancelButton="Cancel"
            confirmButton="Delete"
          />
        </div>
      </div>


    </div>

  );
}

export default AdPage;