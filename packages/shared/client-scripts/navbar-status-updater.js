// Client-side hydration for navbar status indicators
const OAUTH_ENTITIES = {
  client: 'http://localhost:9000',
  auth_server: 'http://localhost:9001',
  protected_resource: 'http://localhost:9002',
};

async function pingServer(uri) {
  try {
    const response = await fetch(`${uri}/ping`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function updateStatusIndicator(entity, isOnline) {
  // Find all status indicators for this entity (there may be multiple in different navbar components)
  const indicators = document.querySelectorAll(
    `[data-entity="${entity}"] .status-indicator`,
  );

  indicators.forEach((indicator) => {
    indicator.className = `status-indicator absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 w-1.5 h-1.5 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`;
  });
}

async function checkAndUpdateStatuses() {
  const entities = Object.keys(OAUTH_ENTITIES);
  const results = await Promise.all(
    entities.map((entity) => pingServer(OAUTH_ENTITIES[entity])),
  );

  entities.forEach((entity, index) => {
    updateStatusIndicator(entity, results[index]);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  void checkAndUpdateStatuses();
  setInterval(() => void checkAndUpdateStatuses(), 3000);
});
