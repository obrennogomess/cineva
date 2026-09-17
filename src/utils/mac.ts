import { DeviceInfo, DeviceType, PlayerApp, AppOption } from '../types';

export function formatMacAddress(input: string): string {
  // Remove non-hex characters
  const clean = input.replace(/[^a-fA-F0-9]/g, '').toUpperCase().slice(0, 12);
  // Group into pairs of 2 separated by colons
  const parts: string[] = [];
  for (let i = 0; i < clean.length; i += 2) {
    parts.push(clean.slice(i, i + 2));
  }
  return parts.join(':');
}

export function isValidMacAddress(mac: string): boolean {
  const clean = mac.replace(/[^a-fA-F0-9]/g, '');
  return clean.length === 12;
}

export const DEVICES_DATA: Record<DeviceType, DeviceInfo> = {
  samsung: {
    id: 'samsung',
    name: 'Samsung Smart TV (Tizen)',
    brand: 'Samsung',
    iconName: 'Tv',
    badge: 'Tizen OS',
    macFormat: '00:1A:79:XX:XX:XX',
    hasDeviceKey: true,
    keyLabel: 'Device Key (6 dígitos)',
    instructions: 'Abra o app Cineva ou IBO Player na sua TV Samsung. O MAC Address e o Device Key aparecem na tela inicial ou em Configurações > Informações do Dispositivo.',
  },
  lg: {
    id: 'lg',
    name: 'LG Smart TV (webOS)',
    brand: 'LG',
    iconName: 'Tv',
    badge: 'webOS',
    macFormat: 'A4:C3:F0:XX:XX:XX',
    hasDeviceKey: true,
    keyLabel: 'Device Key',
    instructions: 'Na sua Smart TV LG, abra o Cineva Player ou IBO Player. Copie o endereço MAC e a Device Key exibidos na tela.',
  },
  android_tv: {
    id: 'android_tv',
    name: 'Android TV / Google TV',
    brand: 'Android / TCL / Philips / Sony',
    iconName: 'MonitorPlay',
    badge: 'Google Play',
    macFormat: '00:80:A3:XX:XX:XX',
    hasDeviceKey: false,
    instructions: 'Disponível na Google Play Store. Baixe o Cineva TV Pro e insira o MAC ou faça login direto com Usuário e Senha.',
  },
  fire_stick: {
    id: 'fire_stick',
    name: 'Amazon Fire TV Stick',
    brand: 'Amazon',
    iconName: 'Flame',
    badge: 'Fire OS',
    macFormat: '38:F7:3D:XX:XX:XX',
    hasDeviceKey: false,
    instructions: 'Instale via app Downloader usando o código oficial Cineva ou baixe na Amazon Appstore.',
  },
  tv_box: {
    id: 'tv_box',
    name: 'TV Box / MXQ / TX3 / Aquário',
    brand: 'TV Box Universal',
    iconName: 'Box',
    badge: 'Android Box',
    macFormat: 'E0:76:D0:XX:XX:XX',
    hasDeviceKey: false,
    instructions: 'Compatível com qualquer TV Box Android. Baixe o APK Cineva TV Pro diretamente pelo navegador ou pendrive.',
  },
  roku: {
    id: 'roku',
    name: 'Roku Express / Roku TV',
    brand: 'Roku / AOC / Philco',
    iconName: 'Radio',
    badge: 'Roku OS',
    macFormat: 'B0:EE:7B:XX:XX:XX',
    hasDeviceKey: true,
    keyLabel: 'Roku Device ID / Key',
    instructions: 'Na Roku TV, utilize o reprodutor compatível Cineva Player (IPTV Smarters / IBO) exibindo o ID do aparelho.',
  },
  smartphone: {
    id: 'smartphone',
    name: 'Celular / Tablet (Android & iOS)',
    brand: 'Android / iPhone / iPad',
    iconName: 'Smartphone',
    badge: 'Mobile App',
    macFormat: 'XX:XX:XX:XX:XX:XX',
    hasDeviceKey: false,
    instructions: 'Baixe o Cineva Mobile na Play Store / App Store ou use via link Xtream Codes e M3U no seu reprodutor favorito.',
  },
  pc: {
    id: 'pc',
    name: 'Computador (Windows / Mac / Web)',
    brand: 'Windows / MacOS / Linux',
    iconName: 'Laptop',
    badge: 'Web & Desktop',
    macFormat: 'XX:XX:XX:XX:XX:XX',
    hasDeviceKey: false,
    instructions: 'Assista no navegador via Web Player Cineva ou no VLC / IPTV Smarters Pro para computador.',
  },
};

export const APPS_DATA: AppOption[] = [
  {
    id: 'cineva_pro',
    name: 'Cineva TV Pro 2026',
    tagline: 'App oficial exclusivo com troca rápida de canal e EPG automático',
    popular: true,
  },
  {
    id: 'cineva_plus',
    name: 'Cineva Plus Player',
    tagline: 'Interface premium inspirada em streaming com catálogo 4K e sinopses',
    popular: true,
  },
  {
    id: 'cineva_smarters',
    name: 'Cineva Smarters Edition',
    tagline: 'Super leve e rápido para Smart TVs antigas e TV Boxes',
  },
  {
    id: 'ibo_player',
    name: 'IBO Player / IBO Pro',
    tagline: 'Ativação direta por MAC Address e Device Key para Samsung & LG',
  },
  {
    id: 'smart_iptv',
    name: 'Smart IPTV / SS IPTV',
    tagline: 'Carga remota de lista M3U Plus automatizada',
  },
  {
    id: 'xciptv',
    name: 'XCIPTV / OTT Navigator',
    tagline: 'Conexão direta por API Xtream Codes com múltiplos servidores',
  },
  {
    id: 'other',
    name: 'Outro Aplicativo / Genérico',
    tagline: 'Receba lista M3U, EPG e dados completos de servidor',
  },
];

export function generateMockCredentials(phone: string, mac: string) {
  const cleanPhone = phone.replace(/\D/g, '').slice(-4) || '2026';
  const cleanMac = mac.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toLowerCase() || 'cine';
  
  const user = `cine_${cleanPhone || cleanMac}`;
  const pass = `cv${Math.floor(100000 + Math.random() * 900000)}`;
  const dns = 'http://cdn-play.cineva.tv:8080';
  
  return {
    serverDns: dns,
    serverHost: 'cdn-play.cineva.tv',
    serverPort: '8080',
    username: user,
    password: pass,
    m3uUrl: `${dns}/get.php?username=${user}&password=${pass}&type=m3u_plus&output=ts`,
    epgUrl: `${dns}/xmltv.php?username=${user}&password=${pass}`,
  };
}
