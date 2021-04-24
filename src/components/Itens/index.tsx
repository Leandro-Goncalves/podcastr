import Image from 'next/image';
import Link from 'next/link';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './style.module.scss';

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}
interface HomeProps {
  allEpisodes: Episode[],
  latestEpisodes: Episode[]
}

export function Itens({allEpisodes, latestEpisodes }:HomeProps) {

  const { playList } = usePlayer()
  const episodeList = [...latestEpisodes, ...allEpisodes];

  return(
    <>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode:Episode, index) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={ episode.thumbnail }
                alt={episode.title}
                objectFit="cover"
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button" onClick={()=> playList(episodeList, index)}>
                <img src="/play-green.svg" alt="Tocar Episodio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td style={{width: 72}}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={()=> playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </>
  )
}