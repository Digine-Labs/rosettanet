import BigNumber from 'bignumber.js'

export function hexPadding(value: string, targetLength: number): string {
  if (value.length === 0) {
    return '0x' + '0'.repeat(targetLength)
  }
  if (!isHex(value) || value.length > targetLength) {
    return value
  }
  if (value.startsWith('0x')) {
    return '0x' + value.substring(2).padStart(targetLength, '0')
  }
  return '0x' + value.padStart(targetLength, '0')
}

export function removeHexZeroes(val: string): string {
  const prefixRemoved = removeHexPrefix(val)

  const bn = new BigNumber(prefixRemoved, 16)

  return addHexPrefix(bn.toString(16))
}

export function addHexPadding(
  value: string,
  targetLength: number,
  prefix: boolean,
): string {
  if (value.length === 0) {
    return prefix ? '0x' + '0'.repeat(targetLength) : '0'.repeat(targetLength)
  }
  if ((value.startsWith('0x') ? value.length - 2 : value.length) >= targetLength) {
    return value
  }
  if (value.startsWith('0x')) {
    return prefix
      ? '0x' + value.substring(2).padStart(targetLength, '0')
      : value.substring(2).padStart(targetLength, '0')
  }
  return prefix
    ? '0x' + value.padStart(targetLength, '0')
    : value.padStart(targetLength, '0')
}

// Also account of 0x prefix
function isHex(h: string): boolean {
  return /^0x[0-9A-Fa-f]*$/.test(h)
}
export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/i, '')
}
export function addHexPrefix(hex: string): string {
  return `0x${removeHexPrefix(hex)}`
}
// data must be 256 bits
export function getLast160Bits(data: string): string {
  if (data.startsWith('0x')) {
    data = data.slice(2);
  }

  // Eğer 64 karakterden kısaysa başa sıfır ekleyerek tamamla
  if (data.length < 64) {
    data = data.padStart(64, '0');
  } else if (data.length > 64) {
    // İstersen fazla gelen datayı da kesebiliriz (bu isteğe bağlı)
    data = data.slice(-64);
  }

  const last160Bits = data.slice(-40);

  return '0x' + last160Bits;
}

export function padHashTo64(data: string): string {
  // Eğer '0x' ile başlıyorsa çıkar
  let hex = data.startsWith('0x') ? data.slice(2) : data;

  // Sadece hex karakterlerden oluşuyor mu diye kontrol (opsiyonel ama iyi olur)
  if (!/^[0-9a-fA-F]*$/.test(hex)) {
    throw new Error('Invalid characters in hash');
  }

  // Eğer çok uzun olursa hata verelim
  if (hex.length > 64) {
    throw new Error(`Hash too long: ${hex.length} characters`);
  }

  // Eğer kısa ise, başa sıfır ekle
  hex = hex.padStart(64, '0');

  return '0x' + hex;
}

export function padTo256Byte(data: string): string {
  // Eğer '0x' ile başlıyorsa çıkar
  let hex = data.startsWith('0x') ? data.slice(2) : data;

  // Sadece hex karakterlerden oluşuyor mu diye kontrol (opsiyonel ama iyi olur)
  if (!/^[0-9a-fA-F]*$/.test(hex)) {
    throw new Error('Invalid characters in hash');
  }

  // Eğer çok uzun olursa hata verelim
  if (hex.length > 512) {
    throw new Error(`Hash too long: ${hex.length} characters`);
  }

  // Eğer kısa ise, başa sıfır ekle
  hex = hex.padStart(512, '0');

  return '0x' + hex;
}