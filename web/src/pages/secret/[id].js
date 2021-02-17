import AdminSecretHeader from '../../components/Headers/AdminSecretHeader';
import SecretHeader from '../../components/Headers/SecretHeader';
import Participants from '../../components/Participants';

function Secret ({ participants, hasDrew, isAdmin }) {
  return (
    <>
      {
        isAdmin && <AdminSecretHeader />
      }
      {
        !isAdmin && <SecretHeader />
      }
      <Participants 
        showButton={isAdmin}
      />
    </>
  );
};

export async function getServerSideProps (context) {
  // vai retornar os parâmetros do Back-end
  return {
    props: {
      participants: [],
      hasDrew: false,
      isAdmin: true
    }
  }
};

export default Secret;