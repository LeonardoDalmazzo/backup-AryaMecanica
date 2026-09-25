document.querySelectorAll('[data-models-open]').forEach((button) => {
  const dialog = document.getElementById(button.dataset.modelsOpen);
  if (!dialog || typeof dialog.showModal !== 'function') return;

  button.hidden = false;
  button.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('is-models-open');
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-models-open');
    button.focus({ preventScroll: true });
  });

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
});
