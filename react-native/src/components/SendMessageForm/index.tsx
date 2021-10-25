import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { styles } from './styles';
import { Button } from '../Button';
import { COLORS } from '../../theme';
import { api } from '../../services/api';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post('/messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
    } else {
      Alert.alert('Escreva a mensagem para enviar.');
    }
  }

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
        onChangeText={setMessage}
        value={message}
      />
      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
