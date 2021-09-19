import Nav from "../components/nav";
import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          Interview Experience EC`22
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons
            .slice(0, reasons.length - 1)
            .map(({ name, company, position}) => (
              <a
                className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
                href="#"
              >
                <h3 className="font-bold mb-2">{name}</h3>
                <div dangerouslySetInnerHTML={{ __html: company }} />
                <span className="mt-4 block">

               </span>
              </a>
            ))}
        </div>
        <div className="text-center mt-8">
          {reasons.slice(reasons.length - 1).map(({ name, company }) => (
            <div className="markdown inline-p">
              <strong>{name}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: company }} />
            </div>
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
