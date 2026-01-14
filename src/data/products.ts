// ═══════════════════════════════════════════════════════════════════════════════
// DEMO PRODUCTS DATA
// ═══════════════════════════════════════════════════════════════════════════════

import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Mechanical Keyboard MK-7700',
    slug: 'mechanical-keyboard-mk-7700',
    description: 'Cherry MX Blue switches, RGB backlight, full ANSI layout',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  MECHANICAL KEYBOARD MK-7700 - SPECIFICATION SHEET               ║
╠══════════════════════════════════════════════════════════════════╣
║  SWITCHES    : Cherry MX Blue (Clicky, 50g actuation)            ║
║  LAYOUT      : Full ANSI 104-key                                 ║
║  BACKLIGHT   : Per-key RGB with 16.7M colors                     ║
║  CABLE       : Detachable USB-C to USB-A (1.8m braided)          ║
║  N-KEY       : Full N-Key Rollover + Anti-ghosting               ║
║  POLLING     : 1000Hz                                            ║
║  FRAME       : Anodized aluminum top plate                       ║
║  KEYCAPS     : Double-shot PBT                                   ║
╚══════════════════════════════════════════════════════════════════╝

Perfect for developers who appreciate tactile feedback and the 
satisfying click of mechanical switches. Built for marathon coding 
sessions with ergonomic design and premium materials.
    `,
    price: 14999,
    originalPrice: 17999,
    category: 'keyboards',
    tags: ['mechanical', 'rgb', 'cherry-mx', 'full-size'],
    images: ['/images/keyboard-1.jpg'],
    ascii_art: `
    ┌──────────────────────────────────────────┐
    │ [Esc] [F1][F2][F3][F4] [F5][F6][F7][F8]  │
    │ [\`][1][2][3][4][5][6][7][8][9][0][-][=] │
    │ [Tab][Q][W][E][R][T][Y][U][I][O][P][\\]  │
    │ [Caps][A][S][D][F][G][H][J][K][L][;][']  │
    │ [Shift][Z][X][C][V][B][N][M][,][.][/]    │
    │ [Ctrl][Win][Alt][  Space  ][Alt][Ctrl]   │
    └──────────────────────────────────────────┘`,
    stock: 45,
    featured: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_002',
    name: 'Terminal Monitor 27" 4K',
    slug: 'terminal-monitor-27-4k',
    description: 'IPS 4K display with green phosphor mode and CRT filters',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  TERMINAL MONITOR 27" 4K - SPECIFICATION SHEET                   ║
╠══════════════════════════════════════════════════════════════════╣
║  PANEL       : IPS (In-Plane Switching)                          ║
║  RESOLUTION  : 3840 x 2160 (4K UHD)                              ║
║  REFRESH     : 144Hz                                             ║
║  RESPONSE    : 1ms GtG                                           ║
║  HDR         : HDR10+ certified                                  ║
║  PORTS       : 2x HDMI 2.1, 2x DP 1.4, USB-C PD 90W              ║
║  SPECIAL     : Green Phosphor Mode, Scanline Filter, CRT Sim     ║
║  STAND       : Height/Tilt/Swivel/Pivot adjustable               ║
╚══════════════════════════════════════════════════════════════════╝

Experience modern clarity with retro aesthetics. Our exclusive
Green Phosphor Mode and CRT simulation filters let you code like
it's 1985, with all the benefits of modern display technology.
    `,
    price: 59999,
    originalPrice: 69999,
    category: 'monitors',
    tags: ['4k', 'ips', '144hz', 'retro-mode'],
    images: ['/images/monitor-1.jpg'],
    ascii_art: `
    ╔═══════════════════════════════╗
    ║  ┌─────────────────────────┐  ║
    ║  │ user@term:~$ ls -la     │  ║
    ║  │ drwxr-xr-x  2 user      │  ║
    ║  │ -rw-r--r--  1 user      │  ║
    ║  │ █                       │  ║
    ║  └─────────────────────────┘  ║
    ╚═══════════════╤═══════════════╝
                    │
              ══════╧══════`,
    stock: 23,
    featured: true,
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_003',
    name: 'Hacker Hoodie v2.0',
    slug: 'hacker-hoodie-v2',
    description: 'Premium cotton blend with ASCII art print, hidden pockets',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  HACKER HOODIE v2.0 - SPECIFICATION SHEET                        ║
╠══════════════════════════════════════════════════════════════════╣
║  MATERIAL    : 80% Cotton, 20% Polyester (320gsm)                ║
║  PRINT       : ASCII art skull with matrix code                  ║
║  POCKETS     : 2 front kangaroo + 2 hidden zip pockets           ║
║  HOOD        : Adjustable drawstring, built-in earphone loop     ║
║  CUFFS       : Ribbed with thumb holes                           ║
║  COLORS      : #000000 (Black), #0d1117 (GitHub Dark)            ║
║  SIZES       : XS, S, M, L, XL, 2XL, 3XL                         ║
║  FEATURES    : RFID blocking pocket, headphone cable routing     ║
╚══════════════════════════════════════════════════════════════════╝

The official uniform of late-night coding sessions. Features 
practical design elements like hidden pockets for your devices 
and cable routing for your headphones.
    `,
    price: 7999,
    category: 'apparel',
    tags: ['hoodie', 'cotton', 'ascii-art', 'hacker'],
    images: ['/images/hoodie-1.jpg'],
    ascii_art: `
       ████████████████████
      ██                  ██
     ██   ┌──────────────┐ ██
     ██   │  01001000    │ ██
     ██   │  01000001    │ ██
     ██   │  01000011    │ ██
     ██   │  01001011    │ ██
     ██   └──────────────┘ ██
      ██                  ██
       ██  ████    ████  ██
        ████  ██████  ████`,
    stock: 150,
    featured: true,
    createdAt: '2025-01-03T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_004',
    name: 'USB Hub Commander',
    slug: 'usb-hub-commander',
    description: '7-port USB 3.2 hub with individual power switches and LEDs',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  USB HUB COMMANDER - SPECIFICATION SHEET                         ║
╠══════════════════════════════════════════════════════════════════╣
║  PORTS       : 7x USB 3.2 Gen 2 (10Gbps)                         ║
║  POWER       : 60W total, 2.4A per port max                      ║
║  SWITCHES    : Individual toggle switches per port               ║
║  INDICATORS  : Green LED per port (activity + power)             ║
║  CABLE       : 1m USB-C to host                                  ║
║  ENCLOSURE   : Brushed aluminum, military-spec design            ║
║  FEATURES    : Over-current protection, surge protection         ║
║  MOUNTING    : Magnetic base + desk clamp included               ║
╚══════════════════════════════════════════════════════════════════╝

Take command of your peripherals. Individual switches let you 
control exactly what's connected, while status LEDs keep you 
informed at a glance.
    `,
    price: 4999,
    originalPrice: 5999,
    category: 'accessories',
    tags: ['usb', 'hub', 'usb-c', 'powered'],
    images: ['/images/usb-hub-1.jpg'],
    ascii_art: `
    ╔═══════════════════════════════════╗
    ║ [○][○][○][○][○][○][○]  ◄─ PORTS  ║
    ║ [▪][▪][▪][▪][▪][▪][▪]  ◄─ LEDs   ║
    ║ [/][/][/][/][/][/][/]  ◄─ SWITCH ║
    ╚═══════════════════════════════════╝`,
    stock: 89,
    featured: false,
    createdAt: '2025-01-04T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_005',
    name: 'Terminal Mug - sudo coffee',
    slug: 'terminal-mug-sudo-coffee',
    description: 'Ceramic mug with heat-reactive terminal commands',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  TERMINAL MUG - SPECIFICATION SHEET                              ║
╠══════════════════════════════════════════════════════════════════╣
║  CAPACITY    : 350ml (12oz)                                      ║
║  MATERIAL    : Premium ceramic with matte finish                 ║
║  PRINT       : Heat-reactive thermochromic ink                   ║
║  FEATURE     : Commands appear when hot liquid is added          ║
║  DISHWASHER  : Safe (top rack)                                   ║
║  MICROWAVE   : Not recommended (thermochromic coating)           ║
║  DESIGN      : "$ sudo make coffee" + ASCII steam animation      ║
╚══════════════════════════════════════════════════════════════════╝

Watch terminal commands execute as you pour your hot beverage.
Heat-reactive ink reveals hidden ASCII art and command outputs
as the mug warms up.
    `,
    price: 2499,
    category: 'accessories',
    tags: ['mug', 'ceramic', 'heat-reactive', 'coffee'],
    images: ['/images/mug-1.jpg'],
    ascii_art: `
        ╭───────────╮
        │ $ sudo    │
        │   make    │
        │   coffee  │
        │ [sudo]    │
        │ password: │
        │ ******    │
        ╰─────┬─────╯
              │
           ═══╧═══`,
    stock: 200,
    featured: false,
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_006',
    name: 'Vim Cheatsheet Mousepad XXL',
    slug: 'vim-cheatsheet-mousepad-xxl',
    description: 'Extended mousepad with complete Vim commands reference',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  VIM CHEATSHEET MOUSEPAD XXL - SPECIFICATION SHEET               ║
╠══════════════════════════════════════════════════════════════════╣
║  SIZE        : 900mm x 400mm x 4mm                               ║
║  SURFACE     : Micro-textured cloth (speed & control balanced)   ║
║  BASE        : Natural rubber (non-slip)                         ║
║  EDGES       : Stitched (anti-fray)                              ║
║  PRINT       : Full Vim reference (motion, edit, visual, etc.)   ║
║  WASHABLE    : Yes (hand wash, air dry)                          ║
║  THEME       : Green on black (classic terminal)                 ║
╚══════════════════════════════════════════════════════════════════╝

Never forget a Vim command again. This desk-sized mousepad features
a complete Vim reference organized by category, always within sight.
    `,
    price: 3499,
    category: 'accessories',
    tags: ['mousepad', 'vim', 'cheatsheet', 'xxl'],
    images: ['/images/mousepad-1.jpg'],
    ascii_art: `
    ┌──────────────────────────────────────────────┐
    │  :wq  :q!  dd  yy  p  /search  gg  G        │
    │  hjkl  w  b  0  $  ^  %  *  n  N  .         │
    │  i  a  o  O  c  d  v  V  Ctrl+v  u  Ctrl+r  │
    └──────────────────────────────────────────────┘`,
    stock: 120,
    featured: false,
    createdAt: '2025-01-06T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_007',
    name: 'Raspberry Pi 5 Starter Kit',
    slug: 'raspberry-pi-5-starter-kit',
    description: 'Complete kit with 8GB Pi 5, case, power supply, and SD card',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  RASPBERRY PI 5 STARTER KIT - SPECIFICATION SHEET                ║
╠══════════════════════════════════════════════════════════════════╣
║  BOARD       : Raspberry Pi 5 (8GB RAM)                          ║
║  CPU         : Broadcom BCM2712 2.4GHz quad-core 64-bit Arm      ║
║  GPU         : VideoCore VII, OpenGL ES 3.1, Vulkan 1.2          ║
║  STORAGE     : 64GB microSD (Class 10, preloaded with OS)        ║
║  CASE        : Aluminum heatsink case with fan                   ║
║  POWER       : Official USB-C 27W power supply                   ║
║  EXTRAS      : HDMI cable, USB-C to USB-A adapter, GPIO ref      ║
╚══════════════════════════════════════════════════════════════════╝

Everything you need to get started with the most powerful Pi yet.
Perfect for servers, learning Linux, or retro gaming projects.
    `,
    price: 12999,
    originalPrice: 14999,
    category: 'hardware',
    tags: ['raspberry-pi', 'sbc', 'linux', 'kit'],
    images: ['/images/rpi-1.jpg'],
    ascii_art: `
    ┌─────────────────────────────┐
    │ ┌───┐ ┌───┐ [USB][USB]     │
    │ │RAM│ │CPU│         [ETH]  │
    │ └───┘ └───┘         [━━━]  │
    │ [GPIO HEADER 40-PIN]       │
    │ [HDMI] [HDMI] [USB-C PWR]  │
    └─────────────────────────────┘`,
    stock: 35,
    featured: true,
    createdAt: '2025-01-07T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_008',
    name: 'SSH Key Yubikey 5 NFC',
    slug: 'ssh-key-yubikey-5-nfc',
    description: 'Hardware security key with SSH, GPG, FIDO2, and NFC',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  YUBIKEY 5 NFC - SPECIFICATION SHEET                             ║
╠══════════════════════════════════════════════════════════════════╣
║  PROTOCOLS   : FIDO2/WebAuthn, FIDO U2F, PIV, OATH, OpenPGP      ║
║  SSH         : Hardware-backed SSH keys (Ed25519, ECDSA, RSA)    ║
║  NFC         : Yes (13.56 MHz ISO 14443)                         ║
║  USB         : USB-A (USB 2.0)                                   ║
║  CRYPTO      : ECC p256/p384, RSA 2048/4096, AES-256             ║
║  WATER       : IP68 rated                                        ║
║  CRUSH       : Resistant to 500N force                           ║
║  OTP         : Yubico OTP, HOTP, TOTP                            ║
╚══════════════════════════════════════════════════════════════════╝

Protect your servers with hardware-backed authentication.
Store your SSH and GPG keys securely, with NFC for mobile auth.
    `,
    price: 5499,
    category: 'security',
    tags: ['yubikey', 'ssh', '2fa', 'security', 'nfc'],
    images: ['/images/yubikey-1.jpg'],
    ascii_art: `
    ┌─────────────────┐
    │    ╭───────╮    │
    │    │ [Y]   │    │
    │    │  ___  │    │
    │    │ (   ) │◄── touch
    │    │  ~~~  │    │
    │    ╰───────╯    │
    └────────┬────────┘
             │USB`,
    stock: 67,
    featured: false,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_009',
    name: 'Retro CRT Clock',
    slug: 'retro-crt-clock',
    description: 'Nixie-style digital clock with VFD display and alarm',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  RETRO CRT CLOCK - SPECIFICATION SHEET                           ║
╠══════════════════════════════════════════════════════════════════╣
║  DISPLAY     : VFD (Vacuum Fluorescent Display)                  ║
║  DIGITS      : 6 (HH:MM:SS) + 2 for date                         ║
║  COLOR       : Classic green/cyan phosphor glow                  ║
║  FEATURES    : Time, date, alarm, countdown timer                ║
║  SYNC        : NTP via WiFi (automatic time sync)                ║
║  POWER       : USB-C (5V/1A)                                     ║
║  CASE        : Walnut wood with acrylic front                    ║
║  SIZE        : 180mm x 60mm x 40mm                               ║
╚══════════════════════════════════════════════════════════════════╝

Bring retro aesthetics to your desk with this VFD clock.
Features WiFi time sync so it's always accurate.
    `,
    price: 8999,
    originalPrice: 9999,
    category: 'accessories',
    tags: ['clock', 'vfd', 'retro', 'nixie', 'wifi'],
    images: ['/images/clock-1.jpg'],
    ascii_art: `
    ╔═════════════════════════════════╗
    ║   ╔═══╗╔═══╗ ╔═══╗╔═══╗ ╔═══╗  ║
    ║   ║ 2 ║║ 3 ║:║ 5 ║║ 9 ║:║ 4 ║  ║
    ║   ╚═══╝╚═══╝ ╚═══╝╚═══╝ ╚═══╝  ║
    ╚════════════════════════════════╝`,
    stock: 28,
    featured: false,
    createdAt: '2025-01-09T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_010',
    name: 'Split Ergonomic Keyboard',
    slug: 'split-ergonomic-keyboard',
    description: 'Programmable split keyboard with tenting, QMK/VIA support',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  SPLIT ERGONOMIC KEYBOARD - SPECIFICATION SHEET                  ║
╠══════════════════════════════════════════════════════════════════╣
║  LAYOUT      : Split 60% (36 keys per side)                      ║
║  SWITCHES    : Hot-swappable (MX compatible)                     ║
║  FIRMWARE    : QMK/VIA compatible (fully programmable)           ║
║  CONNECTION  : USB-C (wired) or Bluetooth 5.0 (wireless)         ║
║  TENTING     : Adjustable (0-15 degrees)                         ║
║  PALM REST   : Magnetic wood palm rests included                 ║
║  BATTERY     : 4000mAh per half (3 months typical use)           ║
║  FEATURES    : RGB underglow, OLED displays, rotary encoders     ║
╚══════════════════════════════════════════════════════════════════╝

Built for developers who value ergonomics. Full programmability
means every key does exactly what you want.
    `,
    price: 29999,
    category: 'keyboards',
    tags: ['split', 'ergonomic', 'qmk', 'wireless', 'programmable'],
    images: ['/images/split-kb-1.jpg'],
    ascii_art: `
    ┌───────────────┐   ┌───────────────┐
    │ [Q][W][E][R]  │   │  [U][I][O][P] │
    │ [A][S][D][F]  │   │  [J][K][L][;] │
    │ [Z][X][C][V]  │   │  [M][,][.][/] │
    │    [░][░]     │   │     [░][░]    │
    └───────────────┘   └───────────────┘`,
    stock: 15,
    featured: true,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_011',
    name: 'Linux Penguin Plush',
    slug: 'linux-penguin-plush',
    description: 'Official Tux mascot plushie, 30cm tall, super soft',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  LINUX PENGUIN PLUSH - SPECIFICATION SHEET                       ║
╠══════════════════════════════════════════════════════════════════╣
║  HEIGHT      : 30cm (12 inches)                                  ║
║  MATERIAL    : Ultra-soft plush with polyester fill              ║
║  DESIGN      : Classic Tux with happy expression                 ║
║  DETAILS     : Embroidered features, no loose parts              ║
║  WASHABLE    : Surface wash only                                 ║
║  OFFICIALLY  : Licensed Linux mascot merchandise                 ║
╚══════════════════════════════════════════════════════════════════╝

Every Linux user needs a Tux on their desk. This cuddly companion
reminds you of the power of open source every day.
    `,
    price: 2999,
    category: 'accessories',
    tags: ['plush', 'linux', 'tux', 'mascot'],
    images: ['/images/tux-1.jpg'],
    ascii_art: `
          .--.
         |o_o |
         |:_/ |
        //   \\ \\
       (|     | )
      /'\\_   _/\`\\
      \\___)=(___/`,
    stock: 180,
    featured: false,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod_012',
    name: 'Terminal T-Shirt - "No Place Like 127.0.0.1"',
    slug: 'terminal-tshirt-localhost',
    description: 'Premium cotton tee with nerdy localhost print',
    longDescription: `
╔══════════════════════════════════════════════════════════════════╗
║  TERMINAL T-SHIRT - SPECIFICATION SHEET                          ║
╠══════════════════════════════════════════════════════════════════╣
║  MATERIAL    : 100% Ring-spun combed cotton (180gsm)             ║
║  FIT         : Regular fit, pre-shrunk                           ║
║  PRINT       : DTG (Direct-to-Garment) eco-friendly inks         ║
║  DESIGN      : "There's No Place Like 127.0.0.1" in terminal     ║
║  COLORS      : Black, Dark Gray, Navy                            ║
║  SIZES       : XS - 3XL                                          ║
║  CARE        : Machine wash cold, tumble dry low                 ║
╚══════════════════════════════════════════════════════════════════╝

Show your love for localhost with this comfy tee. Perfect for
casual Fridays at the office or weekend hackathons.
    `,
    price: 2999,
    category: 'apparel',
    tags: ['t-shirt', 'cotton', 'localhost', 'nerdy'],
    images: ['/images/tshirt-1.jpg'],
    ascii_art: `
      ╭─────────────────────────╮
      │                         │
      │  There's No Place Like  │
      │      127.0.0.1          │
      │        ~$  _            │
      │                         │
      ╰─────────────────────────╯`,
    stock: 95,
    featured: false,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}
