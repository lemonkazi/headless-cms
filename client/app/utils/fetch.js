export default async function getData(pageId) {
  const url = `http://localhost:8080/wp-json/wp/v2/pages/${pageId}`;
  const path = url.toString();
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error("api is not here");
  }
  return res.json();
}
