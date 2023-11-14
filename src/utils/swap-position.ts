export type ArrType<T> = T & {
  id?: number;
  position: number | null;
};

/**
 * Método responsável por trocar a posição de um item de um array
 * A função updatePosition recebe o id e a nova posição do item que foi trocado de posição
 * @param arr
 * @param id1
 * @param id2
 * @param updatePosition
 * @returns
 */
export function swapPositions<T>(
  arr: ArrType<T>[],
  id1: number | string,
  id2: number | string,
  updatePosition?: (id: number, position: number | null) => void,
) {
  const oldPosition = arr.findIndex(item => item.id === Number(id1));

  if (oldPosition === -1) return arr;

  const newPosition = arr.findIndex(item => item.id === Number(id2));

  const item = arr.splice(oldPosition, 1)[0];
  arr.splice(newPosition, 0, item);

  arr.forEach((item, index) => {
    item.position = index + 1;
  });

  const itemUpdate = arr.find(item => item.id === Number(id1)) ?? null;

  if (itemUpdate?.id && updatePosition) {
    updatePosition(itemUpdate.id, itemUpdate.position);
  }

  return arr;
}
