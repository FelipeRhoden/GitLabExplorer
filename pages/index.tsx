import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Chart from 'chart.js/auto';
import { Doughnut } from "react-chartjs-2"
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

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({resolvedUrl}) => {
  const url = `${process.env.URL}${resolvedUrl}`;
  const headers = new Headers();
  headers.set("PRIVATE-TOKEN", process.env.TOKEN || "")
  const data: Data = await (await (await fetch(url, { headers: headers }))).json();
  console.log(data);
  return {
    props: {
      data
    }
  }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ( { data } ) => {
  Chart;
  const { all, closed, opened } = data.statistics.counts;
  const chart = {
    labels: [
      `Abertas`,
      'Fechadas'
    ],
    datasets: [{
      data: [opened, closed],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FE6283',
        '#35A1EA',
      ]
    }]
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Git Lab Explorer</title>
        <meta name="description" content="Git Lab Explorer" />
      </Head>

      <main className={styles.main}>
        <h1>Abertas: {opened} | Fechadas: {closed} | Todas: {all}</h1>
        <div style={{ height: 500, width: 500 }}>
          <Doughnut
            data={chart}
            width={400}
            height={400}
          />
        </div>
      </main>

    </div>
  )
}

export default Home
