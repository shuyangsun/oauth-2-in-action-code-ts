import type { FC } from 'hono/jsx';
import { Layout } from '../shared/Layout';
import { Navbar } from '../shared/Navbar';
import { ClientConfig } from '../shared/model/server-configs';

interface Prop {
  clientConfig: ClientConfig;
  requestId: string;
  scope: string[] | undefined;
}

export const Approve: FC<Prop> = ({ clientConfig, requestId, scope }: Prop) => {
  return (
    <Layout>
      <Navbar name="OAuth Authorization Server" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <p>
          TODO: approve page {clientConfig}, {requestId}, {scope}
        </p>
      </div>
    </Layout>
  );
};
