import type { FC } from 'hono/jsx';
import { Layout } from './Layout';
import { Navbar } from '../shared/Navbar';

interface Props {
  error: string | undefined;
}

export const ErrorPage: FC<Props> = ({ error }: Props) => {
  return (
    <Layout>
      <Navbar name="OAuth Client" />

      <div>
        <h2>Error</h2>
        <p>{error ?? 'NONE'}</p>
      </div>
    </Layout>
  );
};
