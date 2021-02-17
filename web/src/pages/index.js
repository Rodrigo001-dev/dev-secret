import HomePageHeader from '../components/Headers/HomePageHeader';
import GiftContainer from '../components/GiftContainer';
import Steps from '../components/Steps';

export default function HomePage () {
  return (
    <>
      <HomePageHeader />
      <GiftContainer>
        <Steps />
      </GiftContainer>
    </>
  );
};