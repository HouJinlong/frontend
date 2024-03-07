import { Demo } from '../src/demo';
export async function getStaticProps() {
  console.log('getStaticProps');
  const res = await fetch(`http://npm.ixiaochuan.cn/@xc/hiya-jsbridge`);
  const data = await res.json();
  return { props: { data } };
}

export default function Index(props: { data: Record<string, unknown> }) {
  console.log('getStaticProps-Index');
  return (
    <>
      <textarea
        style={{
          width: '100%',
          height: '300px',
        }}
        value={JSON.stringify(props.data, null, 2)}
      ></textarea>
      <br />
      <Demo />
    </>
  );
}
