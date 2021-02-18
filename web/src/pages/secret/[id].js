import { useEffect, useState } from 'react';

import AdminSecretHeader from '../../components/Headers/AdminSecretHeader';
import SecretHeader from '../../components/Headers/SecretHeader';
import Participants from '../../components/Participants';

function Secret ({ participants, hasDrew, isAdmin }) {
  const [localParticipants, setLocalParticipants] = useState([]);

  useEffect(() => {
    setLocalParticipants(participants);
  }, []);
  
  return (
    <>
      {
        isAdmin && <AdminSecretHeader />
      }
      {
        !isAdmin && <SecretHeader 
          onAddParticipant={
            (participant) => setLocalParticipants([...localParticipants, participant])
          }
        />
      }
      <Participants 
        showButton={isAdmin}
        participants={localParticipants}
        setParticipants={setLocalParticipants}
      />
    </>
  );
};

export async function getServerSideProps (context) {
  // vai retornar os parâmetros do Back-end
  const data = await getSecretById(context.query);

  return {
    props: { ...data, ...context.query }
  }
};

async function getSecretById({ id, adminKey }) {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/secret/${id}`, {
    method: 'GET',
    headers: new Headers({
      'admin-key': adminKey
    })
  });

  return response.json();
};

export default Secret;