import type { FC } from 'hono/jsx';
import { Layout } from '../shared/Layout';
import { Navbar } from '../shared/Navbar';
import { ClientConfig } from '../shared/model/server-configs';

interface Prop {
  clientConfig: ClientConfig;
  requestId: string;
  scopes: string[] | undefined;
}

const Scope: FC<{ scopes: string[] }> = ({ scopes }: { scopes: string[] }) => {
  return (
    <>
      <h2>Scope</h2>
      <ul>
        {scopes.map((scope) => (
          <li key={scope}>scope</li>
        ))}
      </ul>
    </>
  );
};

export const Approve: FC<Prop> = ({
  clientConfig,
  requestId,
  scopes,
}: Prop) => {
  return (
    <Layout>
      <Navbar name="OAuth Authorization Server" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <h2>Approve this client?</h2>
        <p>
          ID: <span>{clientConfig.clientId}</span>
        </p>
        {scopes && <Scope scopes={scopes} />}
        <p>TODO: approve page {requestId}</p>
      </div>
    </Layout>
  );
};
