function finalize(withScore, max = 30) {
  return withScore
    .sort(function (a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    })
    .slice(0, max);
}

function compute(results) {
  const listOfDocs = Object.values(results);
  const mapResults = {};

  listOfDocs.forEach(function (docs) {
    docs.forEach(function (doc) {
      const { id } = doc;
      if (id in mapResults) {
        mapResults[id].score++;
      } else {
        mapResults[id] = { ...doc, score: 1 };
      }
    });
  });

  return finalize(Object.values(mapResults));
}

export default compute;
