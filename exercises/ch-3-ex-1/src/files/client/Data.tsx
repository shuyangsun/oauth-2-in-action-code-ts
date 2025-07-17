import type { FC } from 'hono/jsx';
import { Layout } from './Layout';
import { Navbar } from '../shared/Navbar';

interface Props {
  name: string | undefined;
  description: string | undefined;
}

export const Data: FC<Props> = (props: Props) => {
  return (
    <Layout>
      <Navbar name="OAuth Client" />

      <div>
        <h2>Data from protected resource:</h2>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </Layout>
  );
};
