

const AppPallet = {
  'primary': {
    background: '#503F95',
    color: '#fff',
  },
  'secondary': {
    background: '#F1F1F1',
    color: '#333',
  },
  'success': {
    background: '#6DE893',
    color: '#fff',
  },
  'danger': {
    background: '#DD6966',
    color: '#fff',
  },
};

export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'

//type ColorType = 'primary' | 'secondary' | 'success' | danger'

export const GetBackgroundColor = (color : ColorType) => {
  if (!color) return null;
  const pallet = AppPallet[color];
  if (!color) return null;
  return pallet.background;
};
export const GetColor = (color : ColorType) => {
  if (!color) return null;
  const pallet = AppPallet[color];
  if (!color) return null;
  return pallet.color;
};

// export default { GetBackgroundColor, GetColor };
