import styled from 'styled-components';

const Input = styled.input`
  width: 88%;
  padding: 20px;

  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};

  border: 0;
  border-radius: 10px;

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function InputComponent (props) {
  return (
    <Input {...props} />
  );
};