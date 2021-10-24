import { VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';

export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua imagem</strong>
      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        <span>Entrar com o Github</span>
      </a>
    </div>
  );
}
