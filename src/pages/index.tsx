import { GetStaticProps } from "next"
import { api } from "../server/api"
import Head from 'next/head';

import { format, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"

import styles from './home.module.scss';
import { Itens } from "../components/Itens";
import { useWindowSize } from "../hook/windowsSize";
import { ItensMobile } from "../components/itensMobile";

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

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {

  const { width } = useWindowSize()

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | podcast</title>
      </Head>
      {width > 1500 ? (
        <Itens allEpisodes={allEpisodes} latestEpisodes={latestEpisodes}/>
      ) : (
        <ItensMobile allEpisodes={allEpisodes} latestEpisodes={latestEpisodes}/>
      )}
      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc"
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale:ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}