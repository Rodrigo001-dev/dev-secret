import styled from 'styled-components';
import { RiDeleteBin2Fill } from 'react-icons/ri';

const H4 = styled.h4`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  padding: 5px 20px;

  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ParticipantDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantDelete = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Participant = ({ showButton }) => {
  return ( 
    <ParticipantDiv>
      {
        showButton &&
        <ParticipantDelete>
          <RiDeleteBin2Fill />
        </ParticipantDelete>
      }
      Nome (email@gmail.com)
    </ParticipantDiv>
  );
};

export default function Participants ({ showButton }) {
  return (
    <>
      <H4>Participantes:</H4>
      <Container>
        <Participant showButton={showButton} />
      </Container>
    </>
  );
};