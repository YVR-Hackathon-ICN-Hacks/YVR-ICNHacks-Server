export default function checkForDuplicates(areaCode, dates, dbData) {
  // Find the corresponding entry in the database data
  const dbEntry = dbData.areaCodes.find(entry => entry.areaCode === areaCode);

  if (!dbEntry) {
      // If the areaCode doesn't exist in the database data, no duplicates
      return false;
  }

  // Check if any date in the incoming data exists in the database entry
  for (const date of dates) {
      if (dbEntry.dates.includes(date)) {
          // If any date exists in the database entry, it's a duplicate
          return true;
      }
  }

  // No duplicates found
  return false;
}