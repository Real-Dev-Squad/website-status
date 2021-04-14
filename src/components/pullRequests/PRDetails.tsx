const index = (prData:any) => {
  const PR:any[] = [];
  const getPr = () => {
    Object.entries(prData).forEach(([key, value]) => {
      PR.push({ key, value });
    });
    return PR;
  };
  return getPr();
};

export default index;
