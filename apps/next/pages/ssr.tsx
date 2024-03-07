import { GetServerSideProps } from "next";
import { Demo } from '../src/demo';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id||''
  return {
    props:{
      id,
    }
  }
}


export default function Index(props:{id:string}) {
  console.log('getServerSideProps-index');
  return (
    <div >
      id: {props.id||'暂无'}
      <Demo />
    </div>
  );
}


