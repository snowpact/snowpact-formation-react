import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <ul>
      <li>
        <Link to="/form/basic">Form Basic</Link>
      </li>
      <li>
        <Link to="/form/rhf">Form RHF</Link>
      </li>
      <li>
        <Link to="/form/rhf-evolved">Form RHF Evolved</Link>
      </li>
    </ul>
  );
}
