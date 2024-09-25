export interface PeriodicElement {
  name: string;
  symbol: string;
  atomicNumber: number;
}

export const periodicTable: { [key: number]: PeriodicElement } = {
  1: { name: "Hydrogen", symbol: "H", atomicNumber: 1 },
  2: { name: "Helium", symbol: "He", atomicNumber: 2 },
  3: { name: "Lithium", symbol: "Li", atomicNumber: 3 },
  4: { name: "Beryllium", symbol: "Be", atomicNumber: 4 },
  5: { name: "Boron", symbol: "B", atomicNumber: 5 },
  6: { name: "Carbon", symbol: "C", atomicNumber: 6 },
  7: { name: "Nitrogen", symbol: "N", atomicNumber: 7 },
  8: { name: "Oxygen", symbol: "O", atomicNumber: 8 },
  9: { name: "Fluorine", symbol: "F", atomicNumber: 9 },
  10: { name: "Neon", symbol: "Ne", atomicNumber: 10 },
  11: { name: "Sodium", symbol: "Na", atomicNumber: 11 },
  12: { name: "Magnesium", symbol: "Mg", atomicNumber: 12 },
  13: { name: "Aluminum", symbol: "Al", atomicNumber: 13 },
  14: { name: "Silicon", symbol: "Si", atomicNumber: 14 },
  15: { name: "Phosphorus", symbol: "P", atomicNumber: 15 },
  16: { name: "Sulfur", symbol: "S", atomicNumber: 16 },
  17: { name: "Chlorine", symbol: "Cl", atomicNumber: 17 },
  18: { name: "Argon", symbol: "Ar", atomicNumber: 18 },
  19: { name: "Potassium", symbol: "K", atomicNumber: 19 },
  20: { name: "Calcium", symbol: "Ca", atomicNumber: 20 },
  21: { name: "Scandium", symbol: "Sc", atomicNumber: 21 },
  22: { name: "Titanium", symbol: "Ti", atomicNumber: 22 },
  23: { name: "Vanadium", symbol: "V", atomicNumber: 23 },
  24: { name: "Chromium", symbol: "Cr", atomicNumber: 24 },
  25: { name: "Manganese", symbol: "Mn", atomicNumber: 25 },
  26: { name: "Iron", symbol: "Fe", atomicNumber: 26 },
  27: { name: "Cobalt", symbol: "Co", atomicNumber: 27 },
  28: { name: "Nickel", symbol: "Ni", atomicNumber: 28 },
  29: { name: "Copper", symbol: "Cu", atomicNumber: 29 },
  30: { name: "Zinc", symbol: "Zn", atomicNumber: 30 },
  31: { name: "Gallium", symbol: "Ga", atomicNumber: 31 },
  32: { name: "Germanium", symbol: "Ge", atomicNumber: 32 },
  33: { name: "Arsenic", symbol: "As", atomicNumber: 33 },
  34: { name: "Selenium", symbol: "Se", atomicNumber: 34 },
  35: { name: "Bromine", symbol: "Br", atomicNumber: 35 },
  36: { name: "Krypton", symbol: "Kr", atomicNumber: 36 },
  37: { name: "Rubidium", symbol: "Rb", atomicNumber: 37 },
  38: { name: "Strontium", symbol: "Sr", atomicNumber: 38 },
  39: { name: "Yttrium", symbol: "Y", atomicNumber: 39 },
  40: { name: "Zirconium", symbol: "Zr", atomicNumber: 40 },
  41: { name: "Niobium", symbol: "Nb", atomicNumber: 41 },
  42: { name: "Molybdenum", symbol: "Mo", atomicNumber: 42 },
  43: { name: "Technetium", symbol: "Tc", atomicNumber: 43 },
  44: { name: "Ruthenium", symbol: "Ru", atomicNumber: 44 },
  45: { name: "Rhodium", symbol: "Rh", atomicNumber: 45 },
  46: { name: "Palladium", symbol: "Pd", atomicNumber: 46 },
  47: { name: "Silver", symbol: "Ag", atomicNumber: 47 },
  48: { name: "Cadmium", symbol: "Cd", atomicNumber: 48 },
  49: { name: "Indium", symbol: "In", atomicNumber: 49 },
  50: { name: "Tin", symbol: "Sn", atomicNumber: 50 },
  51: { name: "Antimony", symbol: "Sb", atomicNumber: 51 },
  52: { name: "Tellurium", symbol: "Te", atomicNumber: 52 },
  53: { name: "Iodine", symbol: "I", atomicNumber: 53 },
  54: { name: "Xenon", symbol: "Xe", atomicNumber: 54 },
  55: { name: "Cesium", symbol: "Cs", atomicNumber: 55 },
  56: { name: "Barium", symbol: "Ba", atomicNumber: 56 },
  57: { name: "Lanthanum", symbol: "La", atomicNumber: 57 },
  58: { name: "Cerium", symbol: "Ce", atomicNumber: 58 },
  59: { name: "Praseodymium", symbol: "Pr", atomicNumber: 59 },
  60: { name: "Neodymium", symbol: "Nd", atomicNumber: 60 },
  61: { name: "Promethium", symbol: "Pm", atomicNumber: 61 },
  62: { name: "Samarium", symbol: "Sm", atomicNumber: 62 },
  63: { name: "Europium", symbol: "Eu", atomicNumber: 63 },
  64: { name: "Gadolinium", symbol: "Gd", atomicNumber: 64 },
  65: { name: "Terbium", symbol: "Tb", atomicNumber: 65 },
  66: { name: "Dysprosium", symbol: "Dy", atomicNumber: 66 },
  67: { name: "Holmium", symbol: "Ho", atomicNumber: 67 },
  68: { name: "Erbium", symbol: "Er", atomicNumber: 68 },
  69: { name: "Thulium", symbol: "Tm", atomicNumber: 69 },
  70: { name: "Ytterbium", symbol: "Yb", atomicNumber: 70 },
  71: { name: "Lutetium", symbol: "Lu", atomicNumber: 71 },
  72: { name: "Hafnium", symbol: "Hf", atomicNumber: 72 },
  73: { name: "Tantalum", symbol: "Ta", atomicNumber: 73 },
  74: { name: "Tungsten", symbol: "W", atomicNumber: 74 },
  75: { name: "Rhenium", symbol: "Re", atomicNumber: 75 },
  76: { name: "Osmium", symbol: "Os", atomicNumber: 76 },
  77: { name: "Iridium", symbol: "Ir", atomicNumber: 77 },
  78: { name: "Platinum", symbol: "Pt", atomicNumber: 78 },
  79: { name: "Gold", symbol: "Au", atomicNumber: 79 },
  80: { name: "Mercury", symbol: "Hg", atomicNumber: 80 },
  81: { name: "Thallium", symbol: "Tl", atomicNumber: 81 },
  82: { name: "Lead", symbol: "Pb", atomicNumber: 82 },
  83: { name: "Bismuth", symbol: "Bi", atomicNumber: 83 },
  84: { name: "Polonium", symbol: "Po", atomicNumber: 84 },
  85: { name: "Astatine", symbol: "At", atomicNumber: 85 },
  86: { name: "Radon", symbol: "Rn", atomicNumber: 86 },
  87: { name: "Francium", symbol: "Fr", atomicNumber: 87 },
  88: { name: "Radium", symbol: "Ra", atomicNumber: 88 },
  89: { name: "Actinium", symbol: "Ac", atomicNumber: 89 },
  90: { name: "Thorium", symbol: "Th", atomicNumber: 90 },
  91: { name: "Protactinium", symbol: "Pa", atomicNumber: 91 },
  92: { name: "Uranium", symbol: "U", atomicNumber: 92 },
  93: { name: "Neptunium", symbol: "Np", atomicNumber: 93 },
  94: { name: "Plutonium", symbol: "Pu", atomicNumber: 94 },
  95: { name: "Americium", symbol: "Am", atomicNumber: 95 },
  96: { name: "Curium", symbol: "Cm", atomicNumber: 96 },
  97: { name: "Berkelium", symbol: "Bk", atomicNumber: 97 },
  98: { name: "Californium", symbol: "Cf", atomicNumber: 98 },
  99: { name: "Einsteinium", symbol: "Es", atomicNumber: 99 },
  100: { name: "Fermium", symbol: "Fm", atomicNumber: 100 },
  101: { name: "Mendelevium", symbol: "Md", atomicNumber: 101 },
  102: { name: "Nobelium", symbol: "No", atomicNumber: 102 },
  103: { name: "Lawrencium", symbol: "Lr", atomicNumber: 103 },
  104: { name: "Rutherfordium", symbol: "Rf", atomicNumber: 104 },
  105: { name: "Dubnium", symbol: "Db", atomicNumber: 105 },
  106: { name: "Seaborgium", symbol: "Sg", atomicNumber: 106 },
  107: { name: "Bohrium", symbol: "Bh", atomicNumber: 107 },
  108: { name: "Hassium", symbol: "Hs", atomicNumber: 108 },
  109: { name: "Meitnerium", symbol: "Mt", atomicNumber: 109 },
  110: { name: "Darmstadtium", symbol: "Ds", atomicNumber: 110 },
  111: { name: "Roentgenium", symbol: "Rg", atomicNumber: 111 },
  112: { name: "Copernicium", symbol: "Cn", atomicNumber: 112 },
  113: { name: "Nihonium", symbol: "Nh", atomicNumber: 113 },
  114: { name: "Flerovium", symbol: "Fl", atomicNumber: 114 },
  115: { name: "Moscovium", symbol: "Mc", atomicNumber: 115 },
  116: { name: "Livermorium", symbol: "Lv", atomicNumber: 116 },
  117: { name: "Tennessine", symbol: "Ts", atomicNumber: 117 },
  118: { name: "Oganesson", symbol: "Og", atomicNumber: 118 }
};
