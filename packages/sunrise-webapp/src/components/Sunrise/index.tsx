import classes from './Sunrise.module.css';
import React from 'react';
import loadingSunrise from '../../assets/placeholder-auction.jpg';
import Image from 'react-bootstrap/Image';

export const LoadingSunrise = () => {
  return (
    <div className={classes.imgWrapper}>
      <Image
        className={`${classes.loadingSunrise} ${classes.img}`}
        src={loadingSunrise}
        alt={'Loading sunrise...'}
        fluid
      />
      <p className={classes.location}>41.8979314, -87.6377869</p>
    </div>
  );
};

const Sunrise: React.FC<{
  imgPath: string;
  alt: string;
  name?: string;
  description?: string;
  className?: string;
  wrapperClassName?: string;
  noDescription?: Boolean;
}> = props => {
  const { imgPath, alt, className } = props;
  return (
    <div className={classes.imgWrapper}>
      <Image
        className={`${classes.img} ${className} ${!imgPath ? classes.loadingSunrise : ''}`}
        src={imgPath ? imgPath : loadingSunrise}
        alt={alt}
        fluid
      />
      <p className={classes.location}>41.8979314, -87.6377869</p>
    </div>
  );
};

export default Sunrise;
