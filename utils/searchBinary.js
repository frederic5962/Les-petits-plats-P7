export function trieParDivion(sortedArray, searchTerm) {
  console.log('trieParDivion appelé', sortedArray, searchTerm);

  const results = [];
  let left = 0; // 1er élément du tableau
  let right = sortedArray.length - 1; // Fin du tableau
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const addMatchingElements = (index) => {
    while (index >= left && index <= right && sortedArray[index].toLowerCase().startsWith(lowerCaseSearchTerm)) {
      results.push(sortedArray[index]);
      index++;
    }
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedArray[mid].toLowerCase();

    console.log('Comparaison en cours avec midValue', midValue);

    if (midValue.startsWith(lowerCaseSearchTerm)) {
      // Ajoute l'élément correspondant
      results.push(sortedArray[mid]);

      // Vérifie les éléments voisins pour des correspondances
      addMatchingElements(mid - 1);
      addMatchingElements(mid + 1);

      console.log('Éléments trouvés:', results);
      return results; // Retourne tous les éléments correspondants
    } else if (midValue < lowerCaseSearchTerm) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  console.log('Aucun élément trouvé');
  return results;
}
