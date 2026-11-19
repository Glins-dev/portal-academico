// O plugin do Reanimated/Worklets NAO deve ser declarado aqui: o
// `babel-preset-expo` ja o configura automaticamente (Expo SDK 58 + Reanimated 4).
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
