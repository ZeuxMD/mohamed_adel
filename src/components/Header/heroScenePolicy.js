export function normalizeHeroPointer(pointer, rect) {
  const x = (pointer.clientX - rect.left) / rect.width;
  const y = (pointer.clientY - rect.top) / rect.height;

  return {
    x: Number(((x - 0.5) * 2).toFixed(4)),
    y: Number(((0.5 - y) * 2).toFixed(4)),
  };
}

export function advanceHeroPointer(
  current,
  target,
  deltaSeconds,
  settleSpeed = 6.5,
) {
  const safeDelta = Math.max(deltaSeconds ?? 0, 0);

  if (safeDelta === 0) {
    return current;
  }

  const alpha = 1 - Math.exp(-settleSpeed * safeDelta);

  return {
    x: Number((current.x + (target.x - current.x) * alpha).toFixed(4)),
    y: Number((current.y + (target.y - current.y) * alpha).toFixed(4)),
  };
}

export function isHeroPointerSettled(current, target, epsilon = 0.002) {
  return (
    Math.abs(current.x - target.x) <= epsilon &&
    Math.abs(current.y - target.y) <= epsilon
  );
}
