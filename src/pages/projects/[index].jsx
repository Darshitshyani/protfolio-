import { useRouter } from 'next/router';
import { memo } from 'react';
import Projects from '../../components/projects';

const Index = () => {
    const router = useRouter()
  console.log(router.query.index)
  return (
    <div >
      <Projects index={router.query.index}/>
    </div>
  );
};

export default memo(Index);