import styled from 'styled-components';

const Background = styled.div`
  background-image: url('/giftBackground.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  margin-top: -20px;
`;

export default function GiftContainer ({ children }) {
  return <Background>{children}</Background>
};