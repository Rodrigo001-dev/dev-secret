import { useState } from 'react';

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

function NameEmailForm ({ buttonText, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email });
    setName('');
    setEmail('');
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        placeholder="Seu nome"
        required
        value={name}
        onChange={({ target }) => setName(target.value)}
      />

      <Input
        type="email"
        placeholder="Seu E-mail"
        required
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />

      <Button>{buttonText}</Button>
    </Form>
  );
};

// defaultProps são propriedades padrões do arquivo
NameEmailForm.defaultProps = {
  buttonText: "Criar",
  onSubmit: () => {}
};

export default NameEmailForm;