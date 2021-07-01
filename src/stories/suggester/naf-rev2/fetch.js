async function fetchNaf(path = "") {
  const response = await fetch(`${path}/naf-rev2.json`);
  const naf = await response.json();
  return Object.values(naf).map(function (rubrique) {
    const { code } = rubrique;
    return { ...rubrique, id: code };
  });
}

export default fetchNaf;
