import styled from 'styled-components';

import ImageContainer from '../Containers/ImageContainer';
import Logo from '../Logo';
import Input from '../Input';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.light};
`;

const DivForm = styled.div`
  max-width: 400px;
  
  color: ${({ theme }) => theme.colors.light};

  padding: 20px;
`;

export default function AdminSecretHeader () {
  const link = "https://link.com/sala";
  
  return (
    <ImageContainer>
      <Container>
        <Logo />
      </Container>
      <DivForm>
        <p>Compartilhe essa sala com seus amigos!</p>
        <Input value={link} disabled />
      </DivForm>
    </ImageContainer>
  );
};