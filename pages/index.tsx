import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

type Data = {
  statistics: {
		counts: {
			all: number,
			closed: number,
			opened: number
		}
	}
}

export const getServerSideProps: GetServerSideProps = async ({resolvedUrl}) => {
  const url = `${process.env.URL}${resolvedUrl}`;
  const headers = new Headers();
  headers.set("PRIVATE-TOKEN", process.env.TOKEN)
  const data: Data = await (await (await fetch(url, { headers: headers }))).json();
  console.log(data);
  return {
    props: {
      data
    }
  }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ( { data } ) => {
  const { all, closed, opened } = data.statistics.counts;
  return (
    <div className={styles.container}>
      <Head>
        <title>Git Lab Explorer</title>
        <meta name="description" content="Git Lab Explorer" />
      </Head>

      <main className={styles.main}>
        <h1> Todas: {all}</h1>
        <h1> Abertas: {opened}</h1>
        <h1> Fechadas: {closed}</h1>
      </main>

    </div>
  )
}

export default Home
