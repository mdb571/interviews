import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons }) {
  return (
    <div>
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          Interview Exp EC`22
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons
            .slice(0, reasons.length)
            .map(({ name, company, technical,hr,suggestion,status }) => (
              <a
                className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
              >
                <h3 className="font-bold mb-2">{name} ({company} {status})</h3>
                <h4 className="fon-bold mb-3"> Technical Questions </h4>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: technical }} />
               
                <h4 className="fon-bold mb-3"> HR Questions </h4>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: hr }} />
                
                 <h4 className="fon-bold mb-3"> Suggestions </h4>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: suggestion }} />
                
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
