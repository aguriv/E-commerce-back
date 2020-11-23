const productsCleaning = [
  {
    name: "Lavarropas",
    description:
      "Lavarropas blanco que se apaga cuando las prendas están secas",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/190982/ppal-desktop-1x.jpg",
    price: 10,
    stock: 5,

    featured: true,
    slug: "lavarropas-blanco",
  },
  {
    name: "Aspiradora Robot",
    description: "Tanque polvo de 500 ml",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/10735/ppal-desktop-1x.jpg",
    price: 20,
    stock: 4,

    feature: false,
    slug: "aspiradora-robot",
  },
  {
    name: "Enceradora roja",
    description:
      "1 juego de cepillos y 1 juego de franelas. Cómodo mango ergonómico.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/51445/ppal-desktop-1x.jpg",
    price: 30,
    stock: 3,

    feature: false,
    slug: "enceradora-roja",
  },
];
const productsImage = [
  {
    name: "TV Smart LED",
    description: "TV & Monitor Smart LED con conexión a internet",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/201156/ppal-desktop-1x.jpg",
    price: 40,
    stock: 4,

    feature: true,
    slug: "tv-smart-led",
  },
  {
    name: "Radio vieja",
    description: "Radio negra de bolsillo con auriculares incluidos",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/188419/ppal-mobile-1x.jpg",
    price: 5,
    stock: 10,

    feature: false,
    slug: "radio-de-bolsillo",
  },

  {
    name: "Nikon D3500 18- 55",
    description: "Aguante Canon",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/33135/ppal-mobile-1x.jpg",
    price: 50,
    stock: 2,

    feature: false,
    slug: "camara-nikon",
  },
];
const productsOthers = [
  {
    name: "Respaldo Masajeador",
    description:
      "Es un masaje con movimiento circular en profundidad a lo largo de su espalda. Su intensa acción, simula las manos de un masajista profesional trabajando sobre tus nudos y tensiones.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/132110/ppal-desktop-1x.jpg",
    price: 21,
    stock: 2,

    feature: true,
    slug: "respaldo-masajeador-bronx",
  },

  {
    name: "Bordeadora/ Desmalezadora",
    description: "Bordeadora amarilla a nafta.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/32483/ppal-desktop-1x.jpg",
    price: 28,
    stock: 3,

    feature: true,
    slug: "bordeadora-desmalezadora-amarilla",
  },

  {
    name: "Máquina de coser",
    description:
      "Costura recta y costura invisible con puntadas elásticas. Detalle innovador es que hace ojales en un solo paso. Magique.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/131605/ppal-desktop-1x.jpg",
    price: 41,
    stock: 7,

    feature: true,
    slug: "maquina-de-coser-blanca-y-turquesa",
  },
];
const productsClimatizacion = [
  {
    name: "Calefactor  NSB-200A",
    description:
      "Calo-ventilador, frío y calor. Gasta un montón, ni lo compre.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/53138/ppal-mobile-1x.jpg",
    price: 35,
    stock: 3,

    feature: false,
    slug: "calefactor-ventilador",
  },
  {
    name: "Ventilador de techo",
    description:
      "Ventilador de techo blanco con tres velocidades y aspas de metal.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/220799/ppal-mobile-1x.jpg",
    price: 48,
    stock: 9,

    feature: false,
    slug: "ventilador-de-techo",
  },

  {
    name: "Aire acondicionado INV",
    description:
      "Incluye 4 metros de caños y control remoto con termómetro digital.",
    image:
      "https://api.carlosgutierrez.com.uy/fotos/fotos/20388/ppal-desktop-1x.jpg",
    price: 14,
    stock: 7,

    feature: true,
    slug: "aire-acondicionado",
  },
];

module.exports = {
  productsCleaning,
  productsImage,
  productsOthers,
  productsClimatizacion,
};
