import { useEffect, useState } from 'react';
// import { getLastestdAds, getFilterAdvert } from '../service';
import styles from './AnnouncementsPage.module.css';
import Layout from '../../Layout/Layout';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import './AnnouncementsPage.css';
import placeholder from '../../../assets/placeholder.png';
import { loadAdverts } from "../../store/actions";
import { getAdverts } from "../../store/selector";
import { useDispatch, useSelector } from "react-redux";

const EmptyAds = () => (
  <div syle={{ textAlign: 'center' }}>
    <p> Create your first ADS</p>
    <Button as={Link} to="/adverts/new" variant="primary">
      ADS</Button>
  </div>
);

// const NotFoundList = () => (
//   <div style={{ textAlign: "center" }}>
//     <p>No results found</p>
//     <p>Try Again</p>

//   </div>
// );

function AnnouncementsPage({ history, ...props }) {
  // const [announcements, setAnnouncements] = useState([]);
  // const [filteredAdverts, setFilteredAdverts] = useState([]);
  // const [filters, setFilters] = useState([]);

  const dispatch = useDispatch();
  const announcements = useSelector(getAdverts);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);
  console.log(announcements)
  // useEffect(() => {
  //   if (filters.length === 0) {
  //     getLastestdAds().then((announcements) => {
  //       setAnnouncements(announcements);
  //       setFilteredAdverts(announcements);
  //     });
  //   } else {
  //     getFilterAdvert(filters).then((announcements) => setFilteredAdverts(announcements));
  //   }
  // }, [filters]);


  // const handleSearch = (search) => {
  //   setFilters(search);
  // };

  return (
    <>
      <Layout title="Welcome to Ads"{...props}>
        <div className={styles.AnnouncementsPage}>
          {announcements.length ? (
            <article >
              {announcements.map(({ id, ...announcement }) => (
                <article key={id}>
                  <Link to={`/adverts/${id}`}>
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
                        <span>{announcement.tags}  </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </article>
          ) : (
            <EmptyAds />
          )}
        </div>
      </Layout>
    </>
  );
}

export default AnnouncementsPage;
