const nextElementInList = (list, value) => {
  const currentIndex = list.indexOf(value);
  const nextValueIndex = (currentIndex + 1) % list.length;
  return list[nextValueIndex];
};

export default nextElementInList;
