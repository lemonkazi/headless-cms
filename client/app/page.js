import "./page.css";
import getData from "./utils/fetch";

export default async function Home() {
  const data = await getData(2);
  return (
    <main className={`mt-4 pb-6 ${data.title.rendered.toLowerCase()}`}>
      <h1
        className="text-4xl my-2 text-center font-bold uppercase"
        dangerouslySetInnerHTML={{ __html: data.title.rendered }}
      />
      <section dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
    </main>
  );
}
