import styled from 'styled-components';

import Input from './Input';
import Button from './Button';

const Form = styled.form`
  max-width: 900px;

  flex: 1;
  display: flex;

  padding: 20px;

  @media(max-width: 500px) {
    flex-direction: column;
  }

  > input, button {
    margin: 10px;
  }
`;

function NameEmailForm ({ buttonText }) {
  return (
    <Form>
      <Input 
        placeholder="Seu nome"
        required
      />

      <Input
        type="email"
        placeholder="Seu E-mail"
        required
      />

      <Button>{buttonText}</Button>
    </Form>
  );
};

// defaultProps são propriedades padrões do arquivo
NameEmailForm.defaultProps = {
  buttonText: "Criar"
};

export default NameEmailForm;