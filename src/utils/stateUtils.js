const stateMap = {
  BC: 'British Columbia',
  ON: 'Ontario',
  QC: 'Quebec',
  NB: 'New Brunswick',
  NS: 'Nova Scotia',
  PE: 'Prince Edward Island',
  NL: 'Newfoundland and Labrador',
  AB: 'Alberta',
  SK: 'Saskatchewan',
  MB: 'Manitoba',
  YT: 'Yukon',
  NT: 'Northwest Territories',
  NU: 'Nunavut'
  // Add other state mappings as needed
};

export const getStateFullName = (abbreviation) => {
  return stateMap[abbreviation] || 'Unknown State';
};