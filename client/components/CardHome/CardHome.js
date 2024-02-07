import Link from 'next/link';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import styles from './cardhome.module.css';

const CardHome = ({ coverImage, name, seccion }) => {
  const jwt = localStorage.getItem('accessToken');
  const role = jwt ? jwtDecode(jwt).role : undefined;
  const router = useRouter();
  const handleEditArtis = () => {
    router.push(`/editArtis/${name}`);
  };
  return (
    <div className="position-relative">
      {role === 'admin' && seccion !== 'home' && (
        <div
          className="position-absolute"
          style={{ left: '15px', top: '15px', zIndex: '1' }}
        >
          <button
            onClick={handleEditArtis}
            className={`btn btn-primary m-1  ${styles.btnAdmin}`}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      )}
      <Link href={`/galleries/${name}`} passHref className="m-2 col-md-12 ">
        <img
          src={coverImage}
          alt={name}
          className={`position-relative ${styles.cardHome}`}
        />
      </Link>
    </div>
  );
};

CardHome.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default CardHome;
