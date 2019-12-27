/** */
export const scrollTo = id => {
  const li = document.getElementById(id);
  if (li) {
    const parent = li.parentNode;
    const pr = parent.getBoundingClientRect();
    const lr = li.getBoundingClientRect();
    const top = lr.top - pr.top + parent.scrollTop;
    const bottom = lr.bottom - pr.top + parent.scrollTop;

    if (bottom > parent.scrollTop + pr.height) {
      parent.scrollTo(0, bottom - pr.height);
    } else if (top < parent.scrollTop) {
      parent.scrollTo(0, top);
    }
  }
};
