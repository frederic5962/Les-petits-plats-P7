/**
 * Effectue une recherche binaire dans un tableau trié.
 * @param {string} sortedArray Le tableau trié dans lequel effectuer la recherche.
 * @param {string} searchTerm Le terme à rechercher.
 * @returns {string} Un tableau contenant les éléments correspondants.
 */
export function trieParDivion(sortedArray, searchTerm) {
  console.log(sortedArray);
  const results = [];
  let left = 0;
  let right = sortedArray.length - 1;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedArray[mid].toLowerCase();

    if (midValue.startsWith(lowerCaseSearchTerm)) {
      // Ajoute l'élément correspondant
      results.push(sortedArray[mid]);

      // Vérifie les éléments voisins pour des correspondances
      let i = mid - 1;
      while (i >= left && sortedArray[i].toLowerCase().startsWith(lowerCaseSearchTerm)) {
        results.push(sortedArray[i]);
        i--;
      }

      i = mid + 1;
      while (i <= right && sortedArray[i].toLowerCase().startsWith(lowerCaseSearchTerm)) {
        results.push(sortedArray[i]);
        i++;
      }

      return results; // Retourne tous les éléments correspondants
    } else if (midValue < lowerCaseSearchTerm) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return results;
}
  