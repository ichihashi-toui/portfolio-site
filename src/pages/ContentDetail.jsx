import { useParams } from 'react-router-dom';

export default function ContentDetail() {
  const { id } = useParams();
  return (
    <div className="container">
      <h1>Content Detail: {id}</h1>
    </div>
  );
}