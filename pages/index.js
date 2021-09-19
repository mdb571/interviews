import { getWhyNextReasons } from "../lib/api";
import Head from 'next/head'

export default function IndexPage({ reasons }) {
  return (
    <div className="bg-gray-900">
    <Head>
        <title>InterviewXP</title>
      </Head>
      <div className="dark container mx-auto py-20 px-8">
        <h1 className="text-white text-5xl text-center text-accent-1 mb-16">
          Interview XP EC`22
        </h1>

        <div className="dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons
            .slice(0, reasons.length)
            .map(({ name, company, technical,hr,suggestion }) => (
              <a
                className="dark border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
              >
                <h3 className="text-white font-bold mb-2">{name} ({company})</h3>
                <h4 className="text-white font-bold mb-3"> Technical Questions </h4>
                <div className="text-white mb-3" dangerouslySetInnerHTML={{ __html: technical }} />
               
                <h4 className="text-white font-bold mb-3"> HR Questions </h4>
                <div className="text-white mb-3" dangerouslySetInnerHTML={{ __html: hr }} />
                
                 <h4 className="text-white font-bold mb-3"> Suggestions </h4>
                <div className="text-white mb-3" dangerouslySetInnerHTML={{ __html: suggestion }} />
                
              </a>
            ))}
        </div>
     </div>
  </div>
  );
}

export async function getStaticProps(context) {
  const reasons = await getWhyNextReasons();

  return {
    props: {
      reasons,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
