import { useRouter } from 'next/router';
import { useState } from 'react';

import styled from 'styled-components';

import Button from './Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Sort ({ hasDrew }) {
  const router = useRouter();
  const { id, adminKey } = router.query;

  const [drew, setDrew] = useState(false);

  const DREW_STATUS = drew || hasDrew;

  const handleSort = async () => {
    const { NEXT_PUBLIC_API_URL } = process.env;

    const { status } = await fetch(`${NEXT_PUBLIC_API_URL}/dev/secret/${id}/draw`, {
      method: 'PUT',
      headers: new headers({
        'admin-key': adminKey
      })
    });

    if (status === 200) setDrew(true);
  };

  return (
    <Container>
      {
        DREW_STATUS && <p>Sorteio já foi realizado.</p>
      }
      {
        !DREW_STATUS && <Button onClick={handleSort}>Sortear</Button>
      }
    </Container>
  );
};