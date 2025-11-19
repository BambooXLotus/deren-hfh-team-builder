import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.item.deleteMany();
  await prisma.synergy.deleteMany();
  await prisma.team.deleteMany();
  await prisma.character.deleteMany();
  await prisma.userPreferences.deleteMany();
  await prisma.user.deleteMany();

  // Seed Characters
  console.log('👤 Seeding characters...');

  const characters = [
    // Karasuno Characters
    {
      id: 'kageyama-ur',
      name: 'Kageyama',
      rarity: 'UR',
      position: 'S',
      school: 'Karasuno',
      imageUrl: '/characters/kageyama-ur.png',
      releaseDate: new Date('2026-01-12'),
      stats: JSON.stringify({
        serve: 1783,
        spike: 1680,
        set: 1869,
        receive: 1508,
        block: 1682,
        save: 1415,
      }),
      skills: JSON.stringify([
        {
          name: 'Genius Setter',
          description: 'Sets with 120-150% of Set stat and boosts Quick Attack by 15% of his Set for 2 net crossings',
          power: '120% - 150%',
        },
        {
          name: 'Murder Serve',
          description: 'Jump serve at 130-160% of Serve stat; Critical Hit grants allies +10% Attack Technique for 6 net crossings',
          power: '130% - 160%',
        },
        {
          name: 'Silent King',
          description: 'Increases Attack Technique by 8-12%; stacks Competitive Spirit up to 5, boosting teammate Awareness by 20-30%',
          power: '8% - 12%',
        },
        {
          name: 'Dominate the Game',
          description: 'Setter Dump at 240-300% of Set; unblockable, increases opponent blocker cooldowns by 4 net crossings',
          power: '240% - 300%',
        },
      ]),
      bonds: JSON.stringify(['Eccentric Duo', 'Karasuno Geniuses', 'King and Great King']),
      symbols: JSON.stringify(['quick', 'serve', 'setter']),
    },
    {
      id: 'kageyama-ssr',
      name: 'Kageyama',
      rarity: 'SSR',
      position: 'S',
      school: 'Karasuno',
      imageUrl: '/characters/kageyama-ssr.png',
      stats: JSON.stringify({
        serve: 1402,
        spike: 1328,
        set: 1470,
        receive: 1189,
        block: 1329,
        save: 1117,
      }),
      skills: JSON.stringify([
        {
          name: 'Tricky Serve',
          description: 'Jump Serve at 120-150% of Serve stat',
          power: '120% - 150%',
        },
        {
          name: 'Sharp Observer',
          description: 'Set at 115-145% power; spikers\' Strength +10%',
          power: '115% - 145%',
        },
        {
          name: 'The King Awakens',
          description: 'On-court Awareness +10%, Spike power +6-10% of stat',
          power: '6% - 10%',
        },
        {
          name: 'Surprise Dump',
          description: 'Unblockable Setter Dump at 225% of Set stat',
          power: '225%',
        },
      ]),
      bonds: JSON.stringify([]),
      symbols: JSON.stringify(['quick', 'serve', 'setter']),
    },
    {
      id: 'hinata-sp',
      name: 'Hinata',
      rarity: 'SP',
      position: 'MB',
      school: 'Karasuno',
      imageUrl: '/characters/hinata-sp.png',
      releaseDate: new Date('2026-01-27'),
      stats: JSON.stringify({
        serve: 1663,
        spike: 1950,
        set: 1580,
        receive: 1856,
        block: 1758,
        save: 1579,
      }),
      skills: JSON.stringify([
        {
          name: 'Manipulate the Moment',
          description: 'Defensive Technique +10-16% for front liners; grants stacking Offensive Technique boost (max 4 stacks) on Critical hits',
          power: '10% - 16%',
        },
        {
          name: 'A Foot Hold',
          description: 'Receives at 140-180% of Receive stat; team stats increase 12% for 6 net crossings',
          power: '140% - 180%',
        },
        {
          name: 'Counterattack',
          description: 'Back row Defensive Technique +10-16%; Quick Attack stat increases 12-20% after non-BAD receives',
          power: '10% - 16%',
        },
        {
          name: 'High Jump',
          description: 'Quick attack at 260-290% of Quick Attack stat, with additional 40-50% boost on Critical',
          power: '260% - 290%',
        },
      ]),
      bonds: JSON.stringify(['Eccentric Duo', 'Cherry Blossom Viewing', 'Sun vs Moon']),
      symbols: JSON.stringify(['quick', 'receive']),
    },
    {
      id: 'hinata-ssr',
      name: 'Hinata',
      rarity: 'SSR',
      position: 'MB',
      school: 'Karasuno',
      imageUrl: '/characters/hinata-ssr.png',
      stats: JSON.stringify({
        serve: 1251,
        spike: 1475,
        set: 1191,
        receive: 1275,
        block: 1333,
        save: 1336,
      }),
      skills: JSON.stringify([
        {
          name: 'The Greatest Decoy',
          description: 'Boosts Power/Quick Attack of teammates by 7%',
          power: '7%',
        },
        {
          name: 'Quick Duo',
          description: 'Quick Attack power increases 15% of setter\'s Quick Attack when setter is Quick-type',
          power: '15%',
        },
        {
          name: 'On The Ball',
          description: 'Awareness +6%, stacking +4% per Critical (max 1 stack)',
          power: '6%',
        },
        {
          name: 'Soaring Teen',
          description: 'Quick Attack at 235% power; Critical hits add 20% bonus',
          power: '235%',
        },
      ]),
      bonds: JSON.stringify(['Eccentric Duo']),
      symbols: JSON.stringify(['quick', 'power']),
    },
    {
      id: 'nishinoya-sp',
      name: 'Nishinoya',
      rarity: 'SP',
      position: 'L',
      school: 'Karasuno',
      imageUrl: '/characters/nishinoya-sp.png',
      releaseDate: new Date('2026-03-13'),
      stats: JSON.stringify({
        serve: 1615,
        spike: 1615,
        set: 1769,
        receive: 1950,
        block: 1571,
        save: 1862,
      }),
      skills: JSON.stringify([
        {
          name: 'World-Class Acceleration',
          description: 'Increases Reflex by 10-16% and Receive by 12-18%',
          power: '10% - 16%',
        },
        {
          name: 'A-Pass',
          description: 'Sets with 140-180% of Set stat; increases Awareness by 100% of Reflex',
          power: '140% - 180%',
        },
        {
          name: 'Save the Team in Crisis',
          description: 'Increases Spirit by 20-30%',
          power: '20% - 30%',
        },
        {
          name: 'Foot Receive',
          description: 'Performs receive with 260-320% of Receive stat',
          power: '260% - 320%',
        },
      ]),
      bonds: JSON.stringify(['Karasuno Geniuses', 'After School']),
      symbols: JSON.stringify(['receive', 'setter']),
    },
    {
      id: 'nishinoya-ssr',
      name: 'Nishinoya',
      rarity: 'SSR',
      position: 'L',
      school: 'Karasuno',
      imageUrl: '/characters/nishinoya-ssr.png',
      stats: JSON.stringify({
        serve: 1206,
        spike: 1206,
        set: 1338,
        receive: 1483,
        block: 1172,
        save: 1416,
      }),
      skills: JSON.stringify([
        {
          name: 'Guardian Deity',
          description: 'Next Power Spike +15% of Power Attack stat after good Save',
          power: '15%',
        },
        {
          name: 'Libero Supreme',
          description: 'Save at 120% of Save stat',
          power: '120%',
        },
        {
          name: 'Inspire Morale',
          description: 'Team Morale +18 on court entry',
          power: '+18 Morale',
        },
        {
          name: 'Rolling Thunder',
          description: 'Receive at 220% power; reduces next Power Spike cooldown by 6',
          power: '220%',
        },
      ]),
      bonds: JSON.stringify(['Guardian God and Wing Spiker', 'Kiyoko Squad']),
      symbols: JSON.stringify(['receive']),
    },
    {
      id: 'tsukishima-sp',
      name: 'Tsukishima',
      rarity: 'SP',
      position: 'MB',
      school: 'Karasuno',
      imageUrl: '/characters/tsukishima-sp.png',
      stats: JSON.stringify({
        serve: 1668,
        spike: 1948,
        set: 1579,
        receive: 1661,
        block: 1769,
        save: 1753,
      }),
      skills: JSON.stringify([
        {
          name: 'Great Brain',
          description: 'Increases Awareness/Reflex by 15-25% when opponent debuffed',
          power: '15% - 25%',
        },
        {
          name: 'Block is a System',
          description: 'Blocks with 300-350% of Block stat',
          power: '300% - 350%',
        },
        {
          name: 'Calmly Analyze the Court',
          description: 'Adaptive skill changing based on stat comparison',
          power: 'Adaptive',
        },
        {
          name: 'Spikes that Make Use of His Height',
          description: 'Quick attack with 260-340% of Quick Attack',
          power: '260% - 340%',
        },
      ]),
      bonds: JSON.stringify(['Sun vs Moon', 'Fireworks Festival', 'Teammates At Training Camp']),
      symbols: JSON.stringify(['quick', 'block']),
    },
    {
      id: 'tsukishima-ssr',
      name: 'Tsukishima',
      rarity: 'SSR',
      position: 'MB',
      school: 'Karasuno',
      imageUrl: '/characters/tsukishima-ssr.png',
      stats: JSON.stringify({
        serve: 1291,
        spike: 1403,
        set: 1229,
        receive: 1251,
        block: 1481,
        save: 1176,
      }),
      skills: JSON.stringify([
        {
          name: 'Karasuno\'s Composure',
          description: 'Quick Attack-type Strength +10%',
          power: '10%',
        },
        {
          name: 'Tactical Quick Attack',
          description: 'Quick Attack at 115%; next teammate Spike gets Awareness +5%',
          power: '115%',
        },
        {
          name: 'Moonrise',
          description: 'Front-row Block power +8% of Block stat',
          power: '8%',
        },
        {
          name: 'Kei\'s Retort',
          description: 'Block at 195%; applies Enrage debuff (-10% Power/Quick Attack)',
          power: '195%',
        },
      ]),
      bonds: JSON.stringify([]),
      symbols: JSON.stringify(['quick', 'block']),
    },
    {
      id: 'tanaka-ssr',
      name: 'Tanaka',
      rarity: 'SSR',
      position: 'WS',
      school: 'Karasuno',
      imageUrl: '/characters/tanaka-ssr.png',
      stats: JSON.stringify({
        serve: 1270,
        spike: 1475,
        set: 1194,
        receive: 1403,
        block: 1330,
        save: 1203,
      }),
      skills: JSON.stringify([
        {
          name: 'The Ace Arrives',
          description: 'First Power Spike each match +25% of Power Attack stat',
          power: '25%',
        },
        {
          name: 'Tenacious Spirit',
          description: 'Receive at 115% power; Reflex +10%',
          power: '115%',
        },
        {
          name: 'Burning Passion',
          description: 'Power Spike +10%; reduces opponent Stamina by 5',
          power: '10%',
        },
        {
          name: 'Super Inner Cross',
          description: 'Short Diagonal Spike at 250% power; first spike +30% bonus',
          power: '250%',
        },
      ]),
      bonds: JSON.stringify(['Kiyoko Squad']),
      symbols: JSON.stringify(['power']),
    },
    {
      id: 'daichi-ssr',
      name: 'Daichi',
      rarity: 'SSR',
      position: 'WS',
      school: 'Karasuno',
      imageUrl: '/characters/daichi-ssr.png',
      stats: JSON.stringify({
        serve: 1260,
        spike: 1333,
        set: 1197,
        receive: 1476,
        block: 1331,
        save: 1271,
      }),
      skills: JSON.stringify([
        {
          name: 'Steady Reception',
          description: 'Restores 3 Stamina to lowest teammate',
          power: '+3 Stamina',
        },
        {
          name: 'Sledgehammer Spike',
          description: 'Power Spike at 120%',
          power: '120%',
        },
        {
          name: 'Team Backbone',
          description: 'Back-row Receive +10% of Receive stat',
          power: '10%',
        },
        {
          name: 'Reliable Defense',
          description: 'Receive at 220%; next Power Spike +15% bonus',
          power: '220%',
        },
      ]),
      bonds: JSON.stringify([]),
      symbols: JSON.stringify(['receive']),
    },
    {
      id: 'azumane-ssr',
      name: 'Azumane',
      rarity: 'SSR',
      position: 'WS',
      school: 'Karasuno',
      imageUrl: '/characters/azumane-ssr.png',
      stats: JSON.stringify({
        serve: 1410,
        spike: 1478,
        set: 1191,
        receive: 1337,
        block: 1269,
        save: 1196,
      }),
      skills: JSON.stringify([
        {
          name: 'Proficient Defense',
          description: 'Receive at 120%',
          power: '120%',
        },
        {
          name: 'Bullet Serve',
          description: 'Jump Serve at 120%',
          power: '120%',
        },
        {
          name: 'Ace\'s Aura',
          description: 'Power Spike +15% when Stamina >70%',
          power: '15%',
        },
        {
          name: 'Charged Spike',
          description: 'Power Spike at 235%; gains Power Charge stacks (+50% per stack)',
          power: '235%',
        },
      ]),
      bonds: JSON.stringify(['Guardian God and Wing Spiker']),
      symbols: JSON.stringify(['power', 'serve']),
    },
    {
      id: 'sugawara-sp',
      name: 'Sugawara',
      rarity: 'SP',
      position: 'S',
      school: 'Karasuno',
      imageUrl: '/characters/sugawara-sp.png',
      releaseDate: new Date('2026-04-12'),
      stats: JSON.stringify({
        serve: 1856,
        spike: 1746,
        set: 1950,
        receive: 1580,
        block: 1758,
        save: 1487,
      }),
      skills: JSON.stringify([
        {
          name: 'Support the Attack',
          description: 'Increases block/receive stats based on allied member totals',
          power: 'Variable',
        },
        {
          name: 'A Skillful Serve That Exploit Weaknesses',
          description: 'Serves with 140-180% of Serve stat',
          power: '140% - 180%',
        },
        {
          name: 'Careful Setup',
          description: 'Increases Set by 13-20%; restores 15 stamina per rally',
          power: '13% - 20%',
        },
        {
          name: 'Sign Play',
          description: 'Setter skill with 260-340% of Set stat',
          power: '260% - 340%',
        },
      ]),
      bonds: JSON.stringify(['After School']),
      symbols: JSON.stringify(['block', 'serve', 'setter']),
    },

    // Nekoma Characters
    {
      id: 'kenma-sp',
      name: 'Kenma',
      rarity: 'SP',
      position: 'S',
      school: 'Nekoma',
      imageUrl: '/characters/kenma-sp.png',
      releaseDate: new Date('2026-02-26'),
      stats: JSON.stringify({
        serve: 1669,
        spike: 1668,
        set: 1950,
        receive: 1856,
        block: 1665,
        save: 1576,
      }),
      skills: JSON.stringify([
        {
          name: 'Leadership',
          description: 'Increases ally reflex by 10-16%, gains stacks from ally receives/saves',
          power: '10% - 16%',
        },
        {
          name: 'Set With No Wasted Movement',
          description: '140-180% set power, boosts back-row attacks by 20%',
          power: '140% - 180%',
        },
        {
          name: 'Look For Flaws',
          description: 'Increases awareness from reflex, reduces opponent spike power',
          power: 'Variable',
        },
        {
          name: 'Play That Confuses Opponent',
          description: '255-315% unblockable setter dump, reduces opponent power',
          power: '255% - 315%',
        },
      ]),
      bonds: JSON.stringify(['Cherry Blossom Viewing', 'Brain and Commander']),
      symbols: JSON.stringify(['receive', 'setter']),
    },
    {
      id: 'kenma-ssr',
      name: 'Kenma',
      rarity: 'SSR',
      position: 'S',
      school: 'Nekoma',
      imageUrl: '/characters/kenma-ssr.png',
      stats: JSON.stringify({
        serve: 1261,
        spike: 1393,
        set: 1479,
        receive: 1196,
        block: 1390,
        save: 1131,
      }),
      skills: JSON.stringify([
        {
          name: 'Divine Vision',
          description: 'Increases receive power by 8% of stat, gains stacks from perfect plays',
          power: '8%',
        },
        {
          name: 'Steady Setting',
          description: '120% set power',
          power: '120%',
        },
        {
          name: 'The Brain',
          description: 'Increases receive/save by 6%, converts fails to perfect with stacks',
          power: '6%',
        },
        {
          name: 'Deceptive Dump',
          description: '220% unblockable setter dump',
          power: '220%',
        },
      ]),
      bonds: JSON.stringify(['Brain and Commander']),
      symbols: JSON.stringify(['receive', 'setter']),
    },
    {
      id: 'kuroo-ur',
      name: 'Kuroo',
      rarity: 'UR',
      position: 'MB',
      school: 'Nekoma',
      imageUrl: '/characters/kuroo-ur.png',
      stats: JSON.stringify({
        serve: 1497,
        spike: 1616,
        set: 1406,
        receive: 1453,
        block: 1703,
        save: 1376,
      }),
      skills: JSON.stringify([
        {
          name: 'Supreme Captain',
          description: 'Increases Quick Attack by 10-14%; Block and Quick Attack stack by 5% per net crossing (max 5 stacks)',
          power: '10% - 14%',
        },
        {
          name: 'A Quick',
          description: 'Quick attack at 125-155% of Quick Attack, gaining Charge stacks that boost power by 5% per stack (max 3)',
          power: '125% - 155%',
        },
        {
          name: 'Conductor',
          description: 'Block stat increased 14-18%; Perfect Block result inflicts Enrage debuff reducing opponent Power/Quick Attack by 10%',
          power: '14% - 18%',
        },
        {
          name: 'Reactive Block',
          description: 'Block at 235-295% of Block stat; additional 20% boost if opponent has debuffs',
          power: '235% - 295%',
        },
      ]),
      bonds: JSON.stringify(['Brain and Commander']),
      symbols: JSON.stringify(['quick', 'block']),
    },
    {
      id: 'kuroo-ssr',
      name: 'Kuroo',
      rarity: 'SSR',
      position: 'MB',
      school: 'Nekoma',
      imageUrl: '/characters/kuroo-ssr.png',
      stats: JSON.stringify({
        serve: 1302,
        spike: 1405,
        set: 1224,
        receive: 1264,
        block: 1481,
        save: 1197,
      }),
      skills: JSON.stringify([
        {
          name: 'Expert\'s Aura',
          description: 'Increases quick attack strength by 16% for team',
          power: '16%',
        },
        {
          name: 'Steady Offense',
          description: '125% quick attack, gains power charge stacks',
          power: '125%',
        },
        {
          name: 'Block Control Tower',
          description: 'Increases team block stat by 8%',
          power: '8%',
        },
        {
          name: 'Lockdown',
          description: '170% block power, bonus 15% with other block-types present',
          power: '170%',
        },
      ]),
      bonds: JSON.stringify([]),
      symbols: JSON.stringify(['block', 'quick']),
    },
    {
      id: 'yaku-ssr',
      name: 'Yaku',
      rarity: 'SSR',
      position: 'L',
      school: 'Nekoma',
      imageUrl: '/characters/yaku-ssr.png',
      stats: JSON.stringify({
        serve: 1206,
        spike: 1206,
        set: 1336,
        receive: 1483,
        block: 1172,
        save: 1412,
      }),
      skills: JSON.stringify([
        {
          name: 'Key To Defense',
          description: 'Increases receive/save by 3-5% per stack, max 5',
          power: '3% - 5%',
        },
        {
          name: 'Reliable Defense',
          description: 'Increases quick attack by 8-12% when on court',
          power: '8% - 12%',
        },
        {
          name: 'Super Libero',
          description: 'Increases receive 11-15%, converts normal to perfect',
          power: '11% - 15%',
        },
        {
          name: 'Perfect Receive',
          description: '240-300% receive power',
          power: '240% - 300%',
        },
      ]),
      bonds: JSON.stringify(['Educational Guidance']),
      symbols: JSON.stringify(['receive']),
    },
    {
      id: 'lev-ssr',
      name: 'Lev',
      rarity: 'SSR',
      position: 'MB',
      school: 'Nekoma',
      imageUrl: '/characters/lev-ssr.png',
      stats: JSON.stringify({
        serve: 1287,
        spike: 1407,
        set: 1213,
        receive: 1244,
        block: 1471,
        save: 1174,
      }),
      skills: JSON.stringify([
        {
          name: 'Triggered Burst',
          description: 'Gains 15% spike power after perfect receives',
          power: '15%',
        },
        {
          name: 'Momentum Block',
          description: '105% block power',
          power: '105%',
        },
        {
          name: 'Gifted Athlete',
          description: 'Reduces blocker power by 10% if debuffed',
          power: '10%',
        },
        {
          name: 'Talented Spike',
          description: '245% quick attack power',
          power: '245%',
        },
      ]),
      bonds: JSON.stringify(['Educational Guidance']),
      symbols: JSON.stringify(['quick', 'block']),
    },

    // Date Tech Characters
    {
      id: 'aone-sp',
      name: 'Aone',
      rarity: 'SP',
      position: 'MB',
      school: 'Date Tech',
      imageUrl: '/characters/aone-sp.png',
      releaseDate: new Date('2026-06-18'),
      stats: JSON.stringify({
        serve: 1865,
        spike: 1776,
        set: 1755,
        receive: 1581,
        block: 1911,
        save: 1491,
      }),
      skills: JSON.stringify([
        {
          name: 'Mighty Wall',
          description: 'Increases reflex 10-16%, boosts block/serve when stamina low',
          power: '10% - 16%',
        },
        {
          name: 'Team Motivating Jump Serve',
          description: '140-180% serve, cooldown penalties',
          power: '140% - 180%',
        },
        {
          name: 'Strong and High Walls',
          description: 'Tracks opponent attacks with stacks, gains tough blocks',
          power: 'Stacking',
        },
        {
          name: 'Sharp, Leading Block',
          description: '260-320% block power, increases morale by 15',
          power: '260% - 320%',
        },
      ]),
      bonds: JSON.stringify(['Swimming', 'Iron Wall']),
      symbols: JSON.stringify(['block', 'serve']),
    },
    {
      id: 'aone-ssr',
      name: 'Aone',
      rarity: 'SSR',
      position: 'MB',
      school: 'Date Tech',
      imageUrl: '/characters/aone-ssr.png',
      stats: JSON.stringify({
        serve: 1300,
        spike: 1403,
        set: 1223,
        receive: 1251,
        block: 1481,
        save: 1176,
      }),
      skills: JSON.stringify([
        {
          name: 'Lock Down Ace',
          description: 'Marks spikers after perfect blocks, reduces spike power',
          power: 'Debuff',
        },
        {
          name: 'Heavy Strike',
          description: '120% quick attack',
          power: '120%',
        },
        {
          name: 'Tri-Wall Formation',
          description: 'Increases block by 1% per block-type ally',
          power: '1% per ally',
        },
        {
          name: 'Iron Pillar',
          description: '195% block, bonus 9% vs power spikes',
          power: '195%',
        },
      ]),
      bonds: JSON.stringify(['The Silent and the Sarcastic']),
      symbols: JSON.stringify(['quick', 'block']),
    },
    {
      id: 'futakuchi-ssr',
      name: 'Futakuchi',
      rarity: 'SSR',
      position: 'WS',
      school: 'Date Tech',
      imageUrl: '/characters/futakuchi-ssr.png',
      stats: JSON.stringify({
        serve: 1299,
        spike: 1404,
        set: 1223,
        receive: 1262,
        block: 1476,
        save: 1196,
      }),
      skills: JSON.stringify([
        {
          name: 'Captain\'s Authority',
          description: 'Increases team block power by 8% of stat',
          power: '8%',
        },
        {
          name: 'Initiate Attack',
          description: '120% jump serve',
          power: '120%',
        },
        {
          name: 'Raising Defense',
          description: 'Increases block by 0.5% per block-type ally',
          power: '0.5% per ally',
        },
        {
          name: 'Unbreakable Iron Wall',
          description: '195% block, bonus 10% vs debuffed spikers',
          power: '195%',
        },
      ]),
      bonds: JSON.stringify(['The Silent and the Sarcastic', 'The New Captain and the Tall Rookie', 'Iron Wall']),
      symbols: JSON.stringify(['block', 'serve']),
    },
    {
      id: 'koganegawa-ssr',
      name: 'Koganegawa',
      rarity: 'SSR',
      position: 'S',
      school: 'Date Tech',
      imageUrl: '/characters/koganegawa-ssr.png',
      stats: JSON.stringify({
        serve: 1256,
        spike: 1402,
        set: 1470,
        receive: 1184,
        block: 1406,
        save: 1110,
      }),
      skills: JSON.stringify([
        {
          name: 'Rookie Setter',
          description: '120% set power',
          power: '120%',
        },
        {
          name: 'Block Spark',
          description: '105% block, allies gain 3% block bonus vs power spikes',
          power: '105%',
        },
        {
          name: 'Iron Wall III',
          description: 'Increases ally block by 2% when on court',
          power: '2%',
        },
        {
          name: 'Flash Dump',
          description: '210% unblockable setter dump',
          power: '210%',
        },
      ]),
      bonds: JSON.stringify(['The New Captain and the Tall Rookie']),
      symbols: JSON.stringify(['block', 'setter']),
    },

    // Aoba Johsai Characters
    {
      id: 'oikawa-ur',
      name: 'Oikawa',
      rarity: 'UR',
      position: 'S',
      school: 'Aoba Johsai',
      imageUrl: '/characters/oikawa-ur.png',
      releaseDate: new Date('2025-09-14'),
      stats: JSON.stringify({
        serve: 1705,
        spike: 1533,
        set: 1627,
        receive: 1378,
        block: 1530,
        save: 1290,
      }),
      skills: JSON.stringify([
        {
          name: 'The King\'s Set',
          description: 'Sets at 120-150% of Set power; Perfect results grant Offensive Rhythm stacks boosting Awareness +1% each (max 10)',
          power: '120% - 150%',
        },
        {
          name: 'Unparalleled Talent',
          description: 'Setter dump at 115% of Set power, unblockable; grants Power Attack allies +20% Power boost',
          power: '115%',
        },
        {
          name: 'Conductor',
          description: 'When 6+ Offensive Rhythm stacks exist, guarantees Perfect Power Attack results by consuming 6 stacks',
          power: 'Perfect guarantee',
        },
        {
          name: 'The Great King\'s Jump Serve',
          description: 'Jump Serve at 260-320% of Serve stat; grants +20% Awareness and Power boost',
          power: '260% - 320%',
        },
      ]),
      bonds: JSON.stringify(['Perfect Harmony', 'King and Great King']),
      symbols: JSON.stringify(['power', 'serve', 'setter']),
    },
    {
      id: 'iwaizumi-ssr',
      name: 'Iwaizumi',
      rarity: 'SSR',
      position: 'WS',
      school: 'Aoba Johsai',
      imageUrl: '/characters/iwaizumi-ssr.png',
      stats: JSON.stringify({
        serve: 1269,
        spike: 1476,
        set: 1191,
        receive: 1402,
        block: 1332,
        save: 1203,
      }),
      skills: JSON.stringify([
        {
          name: 'Ace\'s Strength',
          description: 'Increases awareness 5%, strength 10%',
          power: '5% / 10%',
        },
        {
          name: 'Focused Defense',
          description: '120% receive',
          power: '120%',
        },
        {
          name: 'Vice-Captain\'s Rally',
          description: 'Increases team strength by 6%',
          power: '6%',
        },
        {
          name: 'Head-to-Head',
          description: '240% power spike, bonus 15% on critical',
          power: '240%',
        },
      ]),
      bonds: JSON.stringify(['Perfect Harmony', 'The Pack']),
      symbols: JSON.stringify(['power']),
    },
    {
      id: 'kyotani-ssr',
      name: 'Kyotani',
      rarity: 'SSR',
      position: 'OP',
      school: 'Aoba Johsai',
      imageUrl: '/characters/kyotani-ssr.png',
      stats: JSON.stringify({
        serve: 1408,
        spike: 1476,
        set: 1180,
        receive: 1318,
        block: 1258,
        save: 1183,
      }),
      skills: JSON.stringify([
        {
          name: 'Fierce Attack',
          description: 'Increases awareness 8%, power attack 5%',
          power: '8% / 5%',
        },
        {
          name: 'Mad Dog Serve',
          description: '130% serve with 10% fail chance',
          power: '130%',
        },
        {
          name: 'Strength Burst',
          description: 'Increases strength by 18%',
          power: '18%',
        },
        {
          name: 'Mad Dog\'s Fang',
          description: '210% power spike, reduces opponent stamina',
          power: '210%',
        },
      ]),
      bonds: JSON.stringify(['The Pack']),
      symbols: JSON.stringify(['power', 'serve']),
    },

    // Shiratorizawa Characters
    {
      id: 'ushijima-ur',
      name: 'Ushijima',
      rarity: 'UR',
      position: 'OP',
      school: 'Shiratorizawa',
      imageUrl: '/characters/ushijima-ur.png',
      stats: JSON.stringify({
        serve: 1626,
        spike: 1707,
        set: 1368,
        receive: 1537,
        block: 1459,
        save: 1367,
      }),
      skills: JSON.stringify([
        {
          name: 'In The Groove',
          description: 'Increases Awareness by 8%; gains additional 3% per turn',
          power: '8% + 3%/turn',
        },
        {
          name: 'Dominating Serve',
          description: 'Jump serve at 125-155% of Serve stat',
          power: '125% - 155%',
        },
        {
          name: 'Strength Burst',
          description: 'Increases Strength by 18%',
          power: '18%',
        },
        {
          name: 'Crushing Spike',
          description: 'Power spike at 220% of Power Attack stat; deals 30% additional damage to opposing Libero',
          power: '220%',
        },
      ]),
      bonds: JSON.stringify(['Besties for Life', 'Absolute Champion and Steady Setter']),
      symbols: JSON.stringify(['power', 'serve']),
    },
    {
      id: 'tendo-ssr',
      name: 'Tendo',
      rarity: 'SSR',
      position: 'MB',
      school: 'Shiratorizawa',
      imageUrl: '/characters/tendo-ssr.png',
      stats: JSON.stringify({
        serve: 1295,
        spike: 1402,
        set: 1217,
        receive: 1255,
        block: 1480,
        save: 1175,
      }),
      skills: JSON.stringify([
        {
          name: 'My Own Pace',
          description: 'Increases reflex 12-22%',
          power: '12% - 22%',
        },
        {
          name: 'A Surprise Attack',
          description: '120-150% quick attack',
          power: '120% - 150%',
        },
        {
          name: 'Block Psychological Warfare',
          description: 'Reduces skill cooldown on good blocks',
          power: 'Cooldown reduction',
        },
        {
          name: 'Sharp Reading',
          description: '220-280% block power, increases reflex 15% on nice plays',
          power: '220% - 280%',
        },
      ]),
      bonds: JSON.stringify(['Besties for Life']),
      symbols: JSON.stringify(['block']),
    },
    {
      id: 'shirabu-ssr',
      name: 'Shirabu',
      rarity: 'SSR',
      position: 'S',
      school: 'Shiratorizawa',
      imageUrl: '/characters/shirabu-ssr.png',
      stats: JSON.stringify({
        serve: 1391,
        spike: 1326,
        set: 1474,
        receive: 1193,
        block: 1322,
        save: 1110,
      }),
      skills: JSON.stringify([
        {
          name: 'As Usual',
          description: 'Increases set 10-16%, boosts power spikes by 8%',
          power: '10% - 16%',
        },
        {
          name: 'Simple Setter Dump',
          description: '120-150% unblockable dump',
          power: '120% - 150%',
        },
        {
          name: 'Correction Ability',
          description: 'Increases awareness 9-15%',
          power: '9% - 15%',
        },
        {
          name: 'Set That Makes Most of Spiker',
          description: '210-270% set, increases awareness 10%',
          power: '210% - 270%',
        },
      ]),
      bonds: JSON.stringify(['Absolute Champion and Steady Setter']),
      symbols: JSON.stringify(['power', 'setter']),
    },
    {
      id: 'goshiki-ssr',
      name: 'Goshiki',
      rarity: 'SSR',
      position: 'WS',
      school: 'Shiratorizawa',
      imageUrl: '/characters/goshiki-ssr.png',
      stats: JSON.stringify({
        serve: 1268,
        spike: 1475,
        set: 1189,
        receive: 1402,
        block: 1322,
        save: 1196,
      }),
      skills: JSON.stringify([
        {
          name: 'Meet Expectations',
          description: 'Increases morale by 8-12% per score',
          power: '8% - 12%',
        },
        {
          name: 'Pure Receive',
          description: '120-150% receive',
          power: '120% - 150%',
        },
        {
          name: 'Next Ace',
          description: 'Gains sharpness stacks, increases power attack 2.5-5% per stack',
          power: '2.5% - 5%',
        },
        {
          name: 'Make a Miracle',
          description: '225-285% power attack, increases awareness 10%',
          power: '225% - 285%',
        },
      ]),
      bonds: JSON.stringify(['Shiratorizawa\'s WS']),
      symbols: JSON.stringify(['power', 'serve']),
    },
    {
      id: 'ohira-ssr',
      name: 'Ohira',
      rarity: 'SSR',
      position: 'WS',
      school: 'Shiratorizawa',
      imageUrl: '/characters/ohira-ssr.png',
      stats: JSON.stringify({
        serve: 1272,
        spike: 1477,
        set: 1188,
        receive: 1399,
        block: 1332,
        save: 1197,
      }),
      skills: JSON.stringify([
        {
          name: 'Strong Defense',
          description: '40-70% receive power on opponent nice plays',
          power: '40% - 70%',
        },
        {
          name: 'Defense That Changes Flow',
          description: '120-150% receive',
          power: '120% - 150%',
        },
        {
          name: 'The Gentle Benkei',
          description: 'Increases awareness 5-8%, reflex 10-15%',
          power: '5% - 8%',
        },
        {
          name: 'Power Spikes',
          description: '240-300% power attack',
          power: '240% - 300%',
        },
      ]),
      bonds: JSON.stringify(['Shiratorizawa\'s WS']),
      symbols: JSON.stringify(['receive']),
    },

    // Fukurodani Characters
    {
      id: 'bokuto-ur',
      name: 'Bokuto',
      rarity: 'UR',
      position: 'WS',
      school: 'Fukurodani',
      imageUrl: '/characters/bokuto-ur.png',
      releaseDate: new Date('2025-08-30'),
      stats: JSON.stringify({
        serve: 1623,
        spike: 1705,
        set: 1369,
        receive: 1537,
        block: 1461,
        save: 1376,
      }),
      skills: JSON.stringify([
        {
          name: 'In The Groove',
          description: 'Increases Awareness by 8%; gains additional 3% per turn',
          power: '8% + 3%/turn',
        },
        {
          name: 'Dominating Serve',
          description: 'Jump serve at 125-155% of Serve stat',
          power: '125% - 155%',
        },
        {
          name: 'Strength Burst',
          description: 'Increases Strength by 18%',
          power: '18%',
        },
        {
          name: 'Ace Style',
          description: 'Gains 1.5% to all stats per critical spike (max 8 stacks)',
          power: '1.5%/stack',
        },
      ]),
      bonds: JSON.stringify(['Miracle Ace and Caring Setter']),
      symbols: JSON.stringify(['power', 'serve']),
    },
    {
      id: 'bokuto-sp',
      name: 'Bokuto',
      rarity: 'SP',
      position: 'WS',
      school: 'Fukurodani',
      imageUrl: '/characters/bokuto-sp.png',
      stats: JSON.stringify({
        serve: 1673,
        spike: 1950,
        set: 1574,
        receive: 1856,
        block: 1760,
        save: 1572,
      }),
      skills: JSON.stringify([
        {
          name: 'Enliven',
          description: 'Increases Power Attack by 13-19%; generates \'United\' effect stacks',
          power: '13% - 19%',
        },
        {
          name: 'Defensive Participation',
          description: 'Receives with 140-180% of Receive stat',
          power: '140% - 180%',
        },
        {
          name: 'Always Cheerful!',
          description: 'Power Attack bonus based on \'United\' stacks (up to 70%)',
          power: 'Up to 70%',
        },
        {
          name: 'Miracle Spike',
          description: 'Power attack with 260-340% of Power Attack stat',
          power: '260% - 340%',
        },
      ]),
      bonds: JSON.stringify(['Swimming', 'Miracle Ace and Caring Setter']),
      symbols: JSON.stringify(['power', 'receive']),
    },
    {
      id: 'akaashi-sp',
      name: 'Akaashi',
      rarity: 'SP',
      position: 'S',
      school: 'Fukurodani',
      imageUrl: '/characters/akaashi-sp.png',
      stats: JSON.stringify({
        serve: 1848,
        spike: 1754,
        set: 1949,
        receive: 1581,
        block: 1758,
        save: 1489,
      }),
      skills: JSON.stringify([
        {
          name: 'Team Organizer',
          description: 'Increases set 13-18%, gains calm mind stacks from morale',
          power: '13% - 18%',
        },
        {
          name: 'Bring Out 100% of Training',
          description: '140-170% set with follow-up bonuses',
          power: '140% - 170%',
        },
        {
          name: 'Attacking Set',
          description: 'Consumes stacks, increases teammate power attack bonuses',
          power: 'Variable',
        },
        {
          name: 'Decisive Blow',
          description: '260-340% unblockable dump, reduces cooldown on critical',
          power: '260% - 340%',
        },
      ]),
      bonds: JSON.stringify(['Swimming', 'Miracle Ace and Caring Setter']),
      symbols: JSON.stringify(['power', 'setter']),
    },
    {
      id: 'akaashi-ssr',
      name: 'Akaashi',
      rarity: 'SSR',
      position: 'S',
      school: 'Fukurodani',
      imageUrl: '/characters/akaashi-ssr.png',
      stats: JSON.stringify({
        serve: 1396,
        spike: 1331,
        set: 1476,
        receive: 1191,
        block: 1334,
        save: 1123,
      }),
      skills: JSON.stringify([
        {
          name: 'Instant Insight',
          description: 'Resets adverse effects on perfect blocks/receives',
          power: 'Status clear',
        },
        {
          name: 'The Brain of Fukurodani',
          description: '120-150% dump, boosts ally serves',
          power: '120% - 150%',
        },
        {
          name: 'Devoted Set',
          description: 'Increases set 8-12%, morale-based awareness scaling',
          power: '8% - 12%',
        },
        {
          name: 'The Usual Set',
          description: '240-300% set power',
          power: '240% - 300%',
        },
      ]),
      bonds: JSON.stringify(['Miracle Ace and Caring Setter']),
      symbols: JSON.stringify(['power', 'setter']),
    },
  ];

  for (const character of characters) {
    await prisma.character.create({ data: character });
  }

  console.log(`✅ Created ${characters.length} characters`);

  // Seed Synergies
  console.log('🔗 Seeding synergies...');

  const synergies = [
    {
      id: 'eccentric-duo',
      name: 'Eccentric Duo',
      description: 'The legendary quick attack duo of Karasuno',
      requiredCharacters: JSON.stringify(['kageyama-ur', 'hinata-sp']),
      statBonus: JSON.stringify({
        spike: 150,
        set: 100,
      }),
    },
    {
      id: 'karasuno-geniuses',
      name: 'Karasuno Geniuses',
      description: 'The talented duo who push each other to greater heights',
      requiredCharacters: JSON.stringify(['kageyama-ur', 'nishinoya-sp']),
      statBonus: JSON.stringify({
        set: 100,
        receive: 150,
      }),
    },
    {
      id: 'king-and-great-king',
      name: 'King and Great King',
      description: 'The rivalry between two genius setters',
      requiredCharacters: JSON.stringify(['kageyama-ur', 'oikawa-ur']),
      statBonus: JSON.stringify({
        set: 200,
        serve: 150,
      }),
    },
    {
      id: 'cherry-blossom-viewing',
      name: 'Cherry Blossom Viewing',
      description: 'Bonds formed during cherry blossom season',
      requiredCharacters: JSON.stringify(['hinata-sp', 'kenma-sp']),
      statBonus: JSON.stringify({
        receive: 100,
      }),
    },
    {
      id: 'sun-vs-moon',
      name: 'Sun vs Moon',
      description: 'The contrasting personalities that complement each other',
      requiredCharacters: JSON.stringify(['hinata-sp', 'tsukishima-sp']),
      statBonus: JSON.stringify({
        spike: 100,
        block: 100,
      }),
    },
    {
      id: 'after-school',
      name: 'After School',
      description: 'Teammates who bond after practice',
      requiredCharacters: JSON.stringify(['nishinoya-sp', 'sugawara-sp']),
      statBonus: JSON.stringify({
        receive: 100,
        set: 100,
      }),
    },
    {
      id: 'brain-and-commander',
      name: 'Brain and Commander',
      description: 'Nekoma\'s strategic duo who have played together since childhood',
      requiredCharacters: JSON.stringify(['kenma-sp', 'kuroo-ur']),
      statBonus: JSON.stringify({
        set: 100,
        block: 100,
      }),
    },
    {
      id: 'educational-guidance',
      name: 'Educational Guidance',
      description: 'The senpai-kouhai relationship between Yaku and Lev',
      requiredCharacters: JSON.stringify(['yaku-ssr', 'lev-ssr']),
      statBonus: JSON.stringify({
        receive: 80,
        block: 80,
      }),
    },
    {
      id: 'swimming',
      name: 'Swimming',
      description: 'Bonds formed during summer swimming activities',
      requiredCharacters: JSON.stringify(['aone-sp', 'bokuto-sp', 'akaashi-sp']),
      statBonus: JSON.stringify({
        spike: 100,
      }),
    },
    {
      id: 'iron-wall',
      name: 'Iron Wall',
      description: 'Date Tech\'s legendary blocking specialists',
      requiredCharacters: JSON.stringify(['aone-sp', 'futakuchi-ssr']),
      statBonus: JSON.stringify({
        block: 200,
      }),
    },
    {
      id: 'silent-and-sarcastic',
      name: 'The Silent and the Sarcastic',
      description: 'An unlikely friendship between opposites',
      requiredCharacters: JSON.stringify(['aone-ssr', 'futakuchi-ssr']),
      statBonus: JSON.stringify({
        block: 100,
      }),
    },
    {
      id: 'new-captain-and-tall-rookie',
      name: 'The New Captain and the Tall Rookie',
      description: 'Building Date Tech\'s future together',
      requiredCharacters: JSON.stringify(['futakuchi-ssr', 'koganegawa-ssr']),
      statBonus: JSON.stringify({
        set: 80,
        block: 80,
      }),
    },
    {
      id: 'perfect-harmony',
      name: 'Perfect Harmony',
      description: 'Aoba Johsai\'s ace and setter duo with perfect synchronization',
      requiredCharacters: JSON.stringify(['oikawa-ur', 'iwaizumi-ssr']),
      statBonus: JSON.stringify({
        set: 150,
        spike: 150,
      }),
    },
    {
      id: 'the-pack',
      name: 'The Pack',
      description: 'Aoba Johsai teammates who fight together',
      requiredCharacters: JSON.stringify(['iwaizumi-ssr', 'kyotani-ssr']),
      statBonus: JSON.stringify({
        spike: 100,
      }),
    },
    {
      id: 'besties-for-life',
      name: 'Besties for Life',
      description: 'Ushijima and Tendo\'s unbreakable friendship',
      requiredCharacters: JSON.stringify(['ushijima-ur', 'tendo-ssr']),
      statBonus: JSON.stringify({
        spike: 120,
        block: 120,
      }),
    },
    {
      id: 'absolute-champion-and-steady-setter',
      name: 'Absolute Champion and Steady Setter',
      description: 'Shiratorizawa\'s powerful ace-setter combination',
      requiredCharacters: JSON.stringify(['ushijima-ur', 'shirabu-ssr']),
      statBonus: JSON.stringify({
        spike: 150,
        set: 100,
      }),
    },
    {
      id: 'shiratorizawa-ws',
      name: 'Shiratorizawa\'s WS',
      description: 'Shiratorizawa\'s wing spiker duo',
      requiredCharacters: JSON.stringify(['goshiki-ssr', 'ohira-ssr']),
      statBonus: JSON.stringify({
        spike: 100,
      }),
    },
    {
      id: 'miracle-ace-and-caring-setter',
      name: 'Miracle Ace and Caring Setter',
      description: 'Fukurodani\'s dynamic ace and setter partnership',
      requiredCharacters: JSON.stringify(['bokuto-ur', 'akaashi-ssr']),
      statBonus: JSON.stringify({
        spike: 150,
        set: 150,
      }),
    },
    {
      id: 'guardian-god-and-wing-spiker',
      name: 'Guardian God and Wing Spiker',
      description: 'Nishinoya and Azumane\'s supportive partnership',
      requiredCharacters: JSON.stringify(['nishinoya-ssr', 'azumane-ssr']),
      statBonus: JSON.stringify({
        save: 100,
        spike: 100,
      }),
    },
    {
      id: 'kiyoko-squad',
      name: 'Kiyoko Squad',
      description: 'Karasuno members who admire their manager',
      requiredCharacters: JSON.stringify(['nishinoya-ssr', 'tanaka-ssr']),
      statBonus: JSON.stringify({
        receive: 80,
        spike: 80,
      }),
    },
  ];

  for (const synergy of synergies) {
    await prisma.synergy.create({ data: synergy });
  }

  console.log(`✅ Created ${synergies.length} synergies`);

  // Seed Items
  console.log('🎁 Seeding items...');

  const items = [
    // Memory Items
    {
      id: 'memory-first-quick',
      name: 'First Quick Attack Memory',
      type: 'Memory',
      effects: JSON.stringify([
        'Quick Attack +8%',
        'Spike +50',
      ]),
      imageUrl: '/items/memory-first-quick.png',
      thumbnailUrl: '/items/thumbs/memory-first-quick.png',
    },
    {
      id: 'memory-genius-setter',
      name: 'Genius Setter Memory',
      type: 'Memory',
      effects: JSON.stringify([
        'Set +10%',
        'Team coordination +5%',
      ]),
      imageUrl: '/items/memory-genius-setter.png',
      thumbnailUrl: '/items/thumbs/memory-genius-setter.png',
    },
    {
      id: 'memory-rolling-thunder',
      name: 'Rolling Thunder Memory',
      type: 'Memory',
      effects: JSON.stringify([
        'Receive +12%',
        'Save +80',
      ]),
      imageUrl: '/items/memory-rolling-thunder.png',
      thumbnailUrl: '/items/thumbs/memory-rolling-thunder.png',
    },
    {
      id: 'memory-iron-wall',
      name: 'Iron Wall Memory',
      type: 'Memory',
      effects: JSON.stringify([
        'Block +15%',
        'Defensive power +100',
      ]),
      imageUrl: '/items/memory-iron-wall.png',
      thumbnailUrl: '/items/thumbs/memory-iron-wall.png',
    },
    {
      id: 'memory-ace-spike',
      name: 'Ace Spike Memory',
      type: 'Memory',
      effects: JSON.stringify([
        'Spike +10%',
        'Power Attack +120',
      ]),
      imageUrl: '/items/memory-ace-spike.png',
      thumbnailUrl: '/items/thumbs/memory-ace-spike.png',
    },

    // Potential Sets
    {
      id: 'potential-karasuno-spirit',
      name: 'Karasuno Fighting Spirit Set',
      type: 'Potential Set',
      effects: JSON.stringify([
        'All stats +5%',
        'Karasuno characters: Additional +3%',
      ]),
      imageUrl: '/items/potential-karasuno.png',
      thumbnailUrl: '/items/thumbs/potential-karasuno.png',
    },
    {
      id: 'potential-offensive-power',
      name: 'Offensive Power Set',
      type: 'Potential Set',
      effects: JSON.stringify([
        'Spike +12%',
        'Serve +8%',
        'Critical hit rate +5%',
      ]),
      imageUrl: '/items/potential-offensive.png',
      thumbnailUrl: '/items/thumbs/potential-offensive.png',
    },
    {
      id: 'potential-defensive-wall',
      name: 'Defensive Wall Set',
      type: 'Potential Set',
      effects: JSON.stringify([
        'Block +10%',
        'Receive +10%',
        'Save +10%',
      ]),
      imageUrl: '/items/potential-defensive.png',
      thumbnailUrl: '/items/thumbs/potential-defensive.png',
    },
    {
      id: 'potential-quick-attack',
      name: 'Quick Attack Mastery Set',
      type: 'Potential Set',
      effects: JSON.stringify([
        'Quick Attack power +15%',
        'MB position: Additional +5%',
      ]),
      imageUrl: '/items/potential-quick.png',
      thumbnailUrl: '/items/thumbs/potential-quick.png',
    },
    {
      id: 'potential-setter-vision',
      name: 'Setter Vision Set',
      type: 'Potential Set',
      effects: JSON.stringify([
        'Set +15%',
        'Team spike power +5%',
      ]),
      imageUrl: '/items/potential-setter.png',
      thumbnailUrl: '/items/thumbs/potential-setter.png',
    },
  ];

  for (const item of items) {
    await prisma.item.create({ data: item });
  }

  console.log(`✅ Created ${items.length} items`);

  console.log('✨ Database seed completed successfully!');
  console.log(`
📊 Seed Summary:
   - ${characters.length} characters (8 UR, 10 SP, 29 SSR)
   - ${synergies.length} synergies/bonds
   - ${items.length} items (5 memories, 5 potential sets)
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
