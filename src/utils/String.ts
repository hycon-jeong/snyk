export const generateUserKey = () => {
  const prefix = 'MYCAR';
  const datetime = Date.now();
  return prefix + datetime;
};
