import styles from './styles.module.scss';
import { VscSignOut } from 'react-icons/all';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../servies/api';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;

    await api.post('messages', { message });

    setMessage('');
  }

  return (
    <section className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatarUrl} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          <span>{user?.login}</span>
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua espectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </section>
  );
}
