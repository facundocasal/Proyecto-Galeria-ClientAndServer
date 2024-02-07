import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import CardCarousel from '../CardCarousel/CardCarousel';
import styles from './tab.module.css';
import { useShuffle } from '../../context/shuffleContext';

const Tab = ({ galleries, artiss }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { shuffleArray } = useShuffle();
  const className = undefined;
  const long = galleries.length / 2;
  const longArtis = artiss.length / 2;
  const galleries1 = [];
  const galleries2 = [];
  const artiss1 = [];
  const artiss2 = [];

  galleries?.forEach((res, idx) => {
    if (idx < long) {
      galleries1.push(res);
    } else {
      galleries2.push(res);
    }
  });

  artiss?.forEach((res, idx) => {
    if (idx < longArtis) {
      artiss1.push(res);
    } else {
      artiss2.push(res);
    }
  });
  const [randomArtisPicture, SetRandomArtisPicture] = useState([]);

  useEffect(() => {
    const TAB_RANDOM_ARTIS = shuffleArray(artiss)
      ?.sort(() => Math.random() - 0.5)
      .slice(0, 3);
    SetRandomArtisPicture(TAB_RANDOM_ARTIS);
  }, []);

  const TAB_INDEXS = ['pills-galerias', 'pills-artiss', 'pills-films'];
  return (
    <>
      <ul
        className={`row gx-0 nav mb-3 ${styles['nav-pills']} ${className}`}
        id="pills-tab"
        role="tablist"
      >
        {randomArtisPicture?.map((item, index) => {
          if (!item) return;

          return (
            <div key={index} className="col-12 col-md-4 p-1">
              <li
                className={`nav-item ${styles.bgTab}`}
                role="presentation"
                style={{
                  backgroundImage: `url("${item.photoCarrusel}")`,
                  backgroundPosition: 'center',
                }}
              >
                <button
                  className={`text-uppercase w-100 py-5 ${
                    activeTab === index && styles.active
                  } ${styles['tab-nav-link']}`}
                  id={`${TAB_INDEXS[index]}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#${TAB_INDEXS[index]}`}
                  type="button"
                  role="tab"
                  aria-controls={TAB_INDEXS[index]}
                  aria-selected="true"
                  onClick={() => setActiveTab(index)}
                >
                  <p className={`fs-5 m-0 ${styles.text}`}>
                    {index === 0 && 'Galerías'}
                    {index === 1 && 'Artiss'}
                    {index === 2 && 'Videos'}
                  </p>
                  <div className="d-flex justify-content-center">
                    <i
                      className={`bi bi-caret-down-fill position-absolute ${
                        styles.icon
                      } ${activeTab !== index && styles.iconColor}`}
                    />
                  </div>
                </button>
              </li>
            </div>
          );
        })}
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade"
          id="pills-galerias"
          role="tabpanel"
          aria-labelledby="pills-galerias-tab"
        >
          <CardCarousel carouselInfo={galleries1} gallery={5} />
          <CardCarousel carouselInfo={galleries2} gallery={5} />
        </div>

        <div
          className="tab-pane fade show active"
          id="pills-artiss"
          role="tabpanel"
          aria-labelledby="pills-artiss-tab"
        >
          <CardCarousel carouselInfo={artiss1} artis={5} />
          <CardCarousel carouselInfo={artiss2} artis={5} />
        </div>

        <div
          className="tab-pane fade"
          id="pills-films"
          role="tabpanel"
          aria-labelledby="pills-films-tab"
        >
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <h3 className="text-white">Proximamente...</h3>
          </div>
        </div>
      </div>
    </>
  );
};

Tab.propTypes = {
  className: PropTypes.string,
};

export default Tab;
