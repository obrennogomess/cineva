import QRCode from 'qrcode';

// Helper to format EMVCo TLV (Tag-Length-Value)
function formatTLV(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

// Calculate standard CRC16-CCITT for PIX
function crc16(str: string): string {
  let crc = 0xffff;
  const strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
}

export interface GeneratePixParams {
  key: string;
  name: string;
  city: string;
  amount: number;
  txid?: string;
}

export function generatePixPayload({
  key,
  name,
  city,
  amount,
  txid = 'CINEVA1REAL',
}: GeneratePixParams): string {
  // Clean values: if CNPJ or CPF formatted with dots/slashes, strip them for the standard EMV tag
  let cleanKey = key.trim();
  if (!cleanKey.includes('@') && /[\.\-\/]/.test(cleanKey)) {
    cleanKey = cleanKey.replace(/\D/g, '');
  }
  const cleanName = (name || 'CINEVA STREAMING').trim().slice(0, 25).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleanCity = (city || 'SAO PAULO').trim().slice(0, 15).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const formattedAmount = amount.toFixed(2);
  const cleanTxid = txid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 25) || 'CINEVA1REAL';

  // 26 Merchant Account Information
  const gui = formatTLV('00', 'br.gov.bcb.pix');
  const keyTLV = formatTLV('01', cleanKey);
  const merchantAccountInfo = formatTLV('26', `${gui}${keyTLV}`);

  // 52 Merchant Category Code
  const mcc = formatTLV('52', '0000');

  // 53 Transaction Currency (986 = BRL)
  const currency = formatTLV('53', '986');

  // 54 Transaction Amount
  const amountTLV = formatTLV('54', formattedAmount);

  // 58 Country Code
  const country = formatTLV('58', 'BR');

  // 59 Merchant Name
  const merchantName = formatTLV('59', cleanName);

  // 60 Merchant City
  const merchantCity = formatTLV('60', cleanCity);

  // 62 Additional Data Field (TxID)
  const txidTLV = formatTLV('05', cleanTxid);
  const additionalData = formatTLV('62', txidTLV);

  // Assemble before CRC
  const payloadWithoutCRC = `000201010212${merchantAccountInfo}${mcc}${currency}${amountTLV}${country}${merchantName}${merchantCity}${additionalData}6304`;

  // Append CRC16
  const calculatedCRC = crc16(payloadWithoutCRC);
  return `${payloadWithoutCRC}${calculatedCRC}`;
}

export async function generateQrCodeDataUrl(payload: string): Promise<string> {
  try {
    return await QRCode.toDataURL(payload, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0a0a0f',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    // fallback SVG data url or simple string
    return '';
  }
}
