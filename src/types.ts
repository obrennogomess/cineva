export type DeviceType =
  | 'samsung'
  | 'lg'
  | 'android_tv'
  | 'fire_stick'
  | 'tv_box'
  | 'roku'
  | 'smartphone'
  | 'pc';

export type PlayerApp =
  | 'cineva_pro'
  | 'cineva_plus'
  | 'cineva_smarters'
  | 'ibo_player'
  | 'smart_iptv'
  | 'xciptv'
  | 'other';

export type ActivationMode = 'mac_key' | 'credentials' | 'both';

export type ActivationStatus = 'pending_payment' | 'processing' | 'active' | 'expired';

export interface DeviceInfo {
  id: DeviceType;
  name: string;
  brand: string;
  iconName: string;
  badge: string;
  macFormat: string;
  hasDeviceKey: boolean;
  keyLabel?: string;
  instructions: string;
}

export interface AppOption {
  id: PlayerApp;
  name: string;
  tagline: string;
  popular?: boolean;
}

export interface ActivationFormState {
  deviceType: DeviceType;
  playerApp: PlayerApp;
  activationMode: ActivationMode;
  macAddress: string;
  deviceKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  durationDays: number;
}

export interface ActivationRecord {
  id: string;
  code: string;
  deviceType: DeviceType;
  playerApp: PlayerApp;
  macAddress: string;
  deviceKey?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  createdAt: string;
  expiresAt: string;
  status: ActivationStatus;
  amount: number;
  credentials: {
    serverDns: string;
    serverHost: string;
    serverPort: string;
    username: string;
    password: string;
    m3uUrl: string;
    epgUrl: string;
  };
  pixData?: {
    payload: string;
    txid: string;
    qrCodeDataUrl: string;
  };
}

export interface AppSettings {
  pixKey: string;
  pixKeyType: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  receiverName: string;
  receiverCity: string;
  priceAmount: number;
  whatsappSupportNumber: string;
  defaultDns: string;
  backupDns: string;
  trialHours: number;
}

export interface SpeedTestResult {
  ping: number;
  downloadMbps: number;
  jitter: number;
  loss: number;
  quality: '4K Ultra HD (60fps)' | 'Full HD 1080p' | 'HD 720p' | 'Instável';
  serverLocation: string;
}
