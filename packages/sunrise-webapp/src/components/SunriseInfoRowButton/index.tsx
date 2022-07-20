import React from 'react';
import { Image } from 'react-bootstrap';
import classes from './SunriseInfoRowButton.module.css';

interface SunriseInfoRowButtonProps {
  iconImgSource: string;
  btnText: string;
  onClickHandler: () => void;
}

const SunriseInfoRowButton: React.FC<SunriseInfoRowButtonProps> = props => {
  const { iconImgSource, btnText, onClickHandler } = props;
  return (
    <div className={classes.sunriseButton} onClick={onClickHandler}>
      <div className={classes.sunriseButtonContents}>
        <Image src={iconImgSource} className={classes.buttonIcon} />
        {btnText}
      </div>
    </div>
  );
};

export default SunriseInfoRowButton;
