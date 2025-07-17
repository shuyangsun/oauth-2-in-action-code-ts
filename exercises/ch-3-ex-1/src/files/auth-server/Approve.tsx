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
      <p>The client is requesting access to the following:</p>
      <ul>
        {scopes.map((scope) => (
          <li key={scope}>
            <input
              type="checkbox"
              name={`scope_${scope}`}
              id={`scope_${scope}`}
              checked
            />
            <label htmlFor={`scope_${scope}`}>{scope}</label>
          </li>
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
      <div className="container">
        <div className="jumbotron">
          <h2>Approve this client?</h2>
          <p>
            <b>ID:</b> <code>{clientConfig.clientId}</code>
          </p>

          <form className="form" action="/approve" method="post">
            <input type="hidden" name="reqid" value={requestId} />
            {scopes && <Scope scopes={scopes} />}
            <input
              type="submit"
              className="btn btn-success"
              name="approve"
              value="Approve"
            />
            <input
              type="submit"
              className="btn btn-danger"
              name="deny"
              value="Deny"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};
