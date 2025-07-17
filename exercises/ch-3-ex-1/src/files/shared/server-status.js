// Client-side script for server status monitoring

const PORTS = {
  client: 9000,
  authServer: 9001,
  protectedResource: 9002,
};

const STATUS_IDS = {
  client: 'client-status',
  authServer: 'auth-server-status',
  resourceServer: 'resource-server-status',
};

function getPingEndpointURI(port) {
  return `http://localhost:${port}/ping`;
}

async function pingServer(port) {
  console.log(`Pinging ${port}`);
  try {
    const response = await fetch(getPingEndpointURI(port), {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function getStatusElements() {
  return {
    client: document.getElementById(STATUS_IDS.client),
    authServer: document.getElementById(STATUS_IDS.authServer),
    resourceServer: document.getElementById(STATUS_IDS.resourceServer),
  };
}

function updateStatusIndicator(element, isOnline) {
  if (element) {
    element.className = `w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`;
  }
}

async function checkServerStatus() {
  const [client, auth, resource] = await Promise.all([
    pingServer(PORTS.client),
    pingServer(PORTS.authServer),
    pingServer(PORTS.protectedResource),
  ]);

  const elements = getStatusElements();

  updateStatusIndicator(elements.client, client);
  updateStatusIndicator(elements.authServer, auth);
  updateStatusIndicator(elements.resourceServer, resource);
}

// Initial check and then check every 3 seconds
document.addEventListener('DOMContentLoaded', () => {
  void checkServerStatus();
  setInterval(() => void checkServerStatus(), 3000);
});
