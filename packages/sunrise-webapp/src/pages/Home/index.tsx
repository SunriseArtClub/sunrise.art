import classes from './Home.module.css';
import SunriseInfo from '../../components/SunriseInfo';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className={`${classes.wrapper}`}>
      <NavBar />
      <SunriseInfo />
      <Footer />
    </div>
  );
};
export default HomePage;
