interface Props {
  accessToken: string | undefined;
}

export function ClientHome({ accessToken }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OAuth in Action: OAuth Client</title>
        <link rel="stylesheet" href="/static/client/Index.css" />
      </head>
      <body>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                OAuth in Action:
                <span className="label label-primary">OAuth Client</span>
              </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="jumbotron">
            <p>
              Access token value:
              <span className="label label-danger">
                {accessToken ?? 'NONE'}
              </span>
            </p>
            <a className="btn btn-default" href="/authorize">
              Get OAuth Token
            </a>
            <a className="btn btn-default" href="/fetch_resource">
              Get Protected Resource
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
