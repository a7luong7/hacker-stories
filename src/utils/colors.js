const AppPallet = {
  primary: {
    background: '#503F95',
    color: '#fff',
  },
  secondary: {
    background: '#F1F1F1',
    color: '#333',
  },
  success: {
    background: '#6DE893',
    color: '#fff',
  },
  danger: {
    background: '#DD6966',
    color: '#fff',
  },
};

export const GetBackgroundColor = (color) => {
  if (!color) return null;
  const pallet = AppPallet[color.trim().toLowerCase()];
  if (!color) return null;
  return pallet.background;
};
export const GetColor = (color) => {
  if (!color) return null;
  const pallet = AppPallet[color.trim().toLowerCase()];
  if (!color) return null;
  return pallet.color;
};

// export default { GetBackgroundColor, GetColor };
