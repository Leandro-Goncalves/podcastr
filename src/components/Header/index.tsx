import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useWindowSize } from '../../hook/windowsSize';

import style from './styles.module.scss';

export function Header() {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  const { width } = useWindowSize();

  return(
    <header className={style.headerContainer}>
      <img src="/logo.svg" alt="Podcastr" />
      {width > 1000 && (
        <>
          <p>O melhor para você ouvir, sempre</p>

          <span>{currentDate}</span>
        </>
      )}
    </header>
  )
}