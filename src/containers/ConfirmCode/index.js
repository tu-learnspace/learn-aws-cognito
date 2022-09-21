import React from 'react';
import { Flex, Heading, TextField, Button, useTheme, } from '@aws-amplify/ui-react';

const ConfirmCodePopUp = () => {
  const { tokens } = useTheme();

  return (
    <Flex as="form" direction="column" gap={tokens.space.medium}>
      <Heading level={3}>Sign Up</Heading>
      <TextField label="Confirmation Code" name="confirmation-code" />
      <Button type="submit" onClick={(e) => e.preventDefault()}>
        Sign Up
      </Button>
      <Button type="submit" onClick={(e) => e.preventDefault()}>
        Resend
      </Button>
    </Flex>
  );
};

export default ConfirmCodePopUp;
