import React, { useState, useEffect } from "react";
import { getAd, deleteAdvert } from '../service';
import placeholder from '../../../assets/placeholder.png';


import { useParams, useHistory } from "react-router-dom";
import { Button } from '../../common';
import './AdPage.css';
import { Confirm } from "semantic-ui-react";






const AdPage = ({ ...props }) => {
  const history = useHistory();
  const [state, setState] = useState({ open: false });
  const [SupAdvert, setSupAdvert] = useState(false);
  const [announcement, setAnnouncement] = useState([]);
  const { id } = useParams();
  const show = () => setState({ open: true });



  const handleConfirm = () => {
    setSupAdvert(true);
  };
  const handleCancel = () => setState({ open: false });


  useEffect(() => {
    if (SupAdvert === true) {
      deleteAdvert(id); // este es del servicio 
      setState({ open: false });
      return history.push("/");
    }
    getAd(id).then((details) => setAnnouncement(details));
  }, [id, SupAdvert, history]);



  return (
    <div>
      <article {...props}>
        <article key={announcement.id}>
          <div className="card">
            <div className="card-photo">
              <img src={announcement.photo ? `http://localhost:3001${announcement.photo}` : placeholder} />
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
        </article>
      </article>
    </div>

  );
}

export default AdPage;