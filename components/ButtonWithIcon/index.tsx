import styles from './styles.module.css';

type Props = {
  color: string;
  leftIcon?: string;
  rightIcon?: string;
  value: string;
  onClick?: () => void;
  fill?: boolean;
}
export const ButtonWithIcon = ({ color, leftIcon, rightIcon, value, onClick, fill}: Props) => {
  return (
    <div className={styles.container}>
      ...
    </div>
  );
}