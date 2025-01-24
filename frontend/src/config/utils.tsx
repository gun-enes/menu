export const replaceSpecialChars = (str: String) => {
    return str
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ş/g, 's')
      .replace(/Ç/g, 'C')
      .replace(/Ğ/g, 'G')
      .replace(/Ş/g, 'S')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'U')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'I')
      .replace(/ /g, '-')
      .toLowerCase();
  };