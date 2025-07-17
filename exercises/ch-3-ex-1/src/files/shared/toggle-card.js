function toggleClient(clientId) {
  const clientDiv = document.querySelector('[data-client="' + clientId + '"]');
  if (!clientDiv) return;

  const details = clientDiv.querySelector('.client-details');
  const expandIcon = clientDiv.querySelector('.expand-icon');
  const collapseIcon = clientDiv.querySelector('.collapse-icon');

  if (details.classList.contains('hidden')) {
    details.classList.remove('hidden');
    expandIcon.classList.add('hidden');
    collapseIcon.classList.remove('hidden');
  } else {
    details.classList.add('hidden');
    expandIcon.classList.remove('hidden');
    collapseIcon.classList.add('hidden');
  }
}

// Make the function globally available
window.toggleClient = toggleClient;
