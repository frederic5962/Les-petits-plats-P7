function binarySearchInSubMenu(sortedItems, searchTerm) {
  let left = 0;
  let right = sortedItems.length - 1;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const item = sortedItems[mid].toLowerCase();

    if (item === lowerCaseSearchTerm) {
      return [sortedItems[mid]]; // Retourne l'élément correspondant sous forme de tableau
    } else if (item < lowerCaseSearchTerm) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return []; // Retourne un tableau vide si aucun résultat n'est trouvé
}

export default binarySearchInSubMenu;
