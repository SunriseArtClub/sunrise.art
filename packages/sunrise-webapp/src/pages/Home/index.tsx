import classes from './Home.module.css';
import SunriseInfo from '../../components/SunriseInfo';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import SunriseNFTs from '../../components/SunriseNFTs';

const HomePage: React.FC = () => {
  return (
    <div className={`${classes.wrapper}`}>
      <NavBar />
      <SunriseNFTs />
      <SunriseInfo />
      <Footer />
    </div>
  );
};
export default HomePage;
