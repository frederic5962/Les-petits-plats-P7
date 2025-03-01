export function trieParDivion(sortedArray, searchTerm) {
  console.log('trieParDivion appelé', sortedArray, searchTerm);

  const results = [];
  let left = 0;// 1er element de tableau
  let right = sortedArray.length - 1; // Fin de tableau
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedArray[mid].toLowerCase();

    console.log('Comparaison en cours avec midValue', midValue);

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
