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

const TEXT_IDS = {
  client: 'client-text',
  authServer: 'auth-server-text',
  resourceServer: 'resource-server-text',
};

const URLS = {
  client: 'http://localhost:9000',
  authServer: 'http://localhost:9001',
  resourceServer: 'http://localhost:9002',
};

function getPingEndpointURI(port) {
  return `http://localhost:${port}/ping`;
}

async function pingServer(port) {
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

function getTextElements() {
  return {
    client: document.getElementById(TEXT_IDS.client),
    authServer: document.getElementById(TEXT_IDS.authServer),
    resourceServer: document.getElementById(TEXT_IDS.resourceServer),
  };
}

function updateStatusIndicator(element, isOnline) {
  if (element) {
    element.className = `w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`;
  }
}

function updateTextElement(element, isOnline, url, text) {
  if (element) {
    if (isOnline) {
      element.innerHTML = `<a href="${url}" class="text-blue-400 hover:text-blue-300 underline" target="_blank">${text}</a>`;
    } else {
      element.innerHTML = text;
      element.className = 'text-gray-400 text-lg';
    }
  }
}

async function checkServerStatus() {
  const [client, auth, resource] = await Promise.all([
    pingServer(PORTS.client),
    pingServer(PORTS.authServer),
    pingServer(PORTS.protectedResource),
  ]);

  const elements = getStatusElements();
  const textElements = getTextElements();

  updateStatusIndicator(elements.client, client);
  updateStatusIndicator(elements.authServer, auth);
  updateStatusIndicator(elements.resourceServer, resource);

  updateTextElement(textElements.client, client, URLS.client, 'Client');
  updateTextElement(
    textElements.authServer,
    auth,
    URLS.authServer,
    'Authorization Server',
  );
  updateTextElement(
    textElements.resourceServer,
    resource,
    URLS.resourceServer,
    'Protected Resource',
  );
}

// Initial check and then check every 3 seconds
document.addEventListener('DOMContentLoaded', () => {
  void checkServerStatus();
  setInterval(() => void checkServerStatus(), 3000);
});
