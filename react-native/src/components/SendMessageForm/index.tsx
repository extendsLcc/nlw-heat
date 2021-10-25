import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import { styles } from './styles';
import { Button } from '../Button';
import { COLORS } from '../../theme';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        placeholder="Qual sua expectativa para o evento"
        multiline
        maxLength={140}
        style={styles.input}
        editable={!sendingMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
      />
    </View>
  );
}
