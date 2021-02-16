import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  cursor: pointer;

  padding: 15px 30px;
  font-size: 14px;

  display: block;
  border-radius: 50px;
  margin: 10px 0;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default function Button (props) {
  return <StyledButton {...props} />;
};