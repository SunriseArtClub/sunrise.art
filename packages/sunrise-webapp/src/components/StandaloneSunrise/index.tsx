import { BigNumber as EthersBN } from 'ethers';
import { ISunriseToken } from '../../wrappers/sunriseToken';
import Sunrise from '../Sunrise';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { generatePinataRestUrl } from '../../utils/ipfs';
import config from '../../config';

interface StandaloneSunriseProps {
  sunriseId: EthersBN;
}

const initialSunriseState = {
  description: '',
  image: '',
  name: '',
  attributes: [],
};

const StandaloneSunrise: React.FC<StandaloneSunriseProps> = (props: StandaloneSunriseProps) => {
  const { sunriseId } = props;
  const id = sunriseId.toNumber();
  const sunriseURI = config.app.ipfsUri + '/' + id;
  const [currentSunrise, setCurrentSunrise] = useState<ISunriseToken>(initialSunriseState);

  const getSunrise = async (sunriseURI: string) => {
    const sunriseTokenData = await axios.get<ISunriseToken>(generatePinataRestUrl(sunriseURI));

    const sunriseImageData = await axios.get(generatePinataRestUrl(sunriseTokenData.data.image), {
      responseType: 'arraybuffer',
    });

    const sunriseImageBase64 = Buffer.from(sunriseImageData.data, 'binary').toString('base64');

    setCurrentSunrise({
      ...sunriseTokenData.data,
      image: `data:image/png;base64, ${sunriseImageBase64}`,
    });
  };

  useEffect(() => {
    setCurrentSunrise(initialSunriseState);
    if (sunriseURI) {
      getSunrise(sunriseURI);
    }
  }, [sunriseURI]);

  return (
    <>
      <Sunrise
        imgPath={currentSunrise.image}
        alt={currentSunrise.description}
      />
    </>
  );
};

export default StandaloneSunrise;