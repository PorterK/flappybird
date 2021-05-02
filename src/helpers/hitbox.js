export const getBirdHitbox = () => {
  const elem = document.getElementById('bird');

  const pos = elem.getBoundingClientRect();

  return { top: pos.top + 8, bottom: pos.bottom + 45, left: pos.left + 14, right: pos.right + 33 };
}

export const getFloorHitbox = () => {
  const elem = document.getElementById('ground');

  const { top, bottom, left, right } = elem.getBoundingClientRect();

  return { top, bottom, left, right };
}

export const getPipeHitbox = (pipe) => {
  const { top, bottom, left, right } = pipe.getBoundingClientRect();

  return { top, bottom, left, right };
}
