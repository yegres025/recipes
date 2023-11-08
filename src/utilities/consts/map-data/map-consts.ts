import { nanoid } from "nanoid";

const popularCuisines = [
    {
      name: 'Asian',
      src: 'https://img.povar.ru/mobile/da/4f/94/c8/teplii_taiskii_salat_s_govyadinoi-761432.JPG',
      id: nanoid(),
    },
    {
      name: 'American',
      src: 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger.jpg',
      id: nanoid(),
    },
    {
      name: 'British',
      src: 'https://вкуснофф.рф/img/recepty/2650/listing.jpg',
      id: nanoid(),
    },
    {
      name: 'Indian',
      src: 'https://www.zdorovieinfo.ru/wp-content/uploads/2019/09/shutterstock_1312092353.jpg',
      id: nanoid(),
    },
    {
      name: 'Italian',
      src: 'https://img.freepik.com/free-photo/authentic-italian-pasta_24972-2334.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697673600&semt=ais',
      id: nanoid(),
    },
    {
      name: 'Mexican',
      src: 'https://meksika.info/wp-content/uploads/2018/08/Natsionalnye-blyuda-i-kuhnya-Meksiki.jpg',
      id: nanoid(),
    },
  ];

  export const curatedCollections = [
    {
      name: 'Sushi',
      src: 'src/assets/curated/sushi.jpeg',
      id: nanoid(),
    },
    {
      name: 'Soup ',
      src: 'src/assets/curated/soup.jpg',
      id: nanoid(),
    },
    {
      name: 'Pizza',
      src: 'src/assets/curated/pizza.jpg',
      id: nanoid(),
    },
    {
      name: 'Burger',
      src: 'src/assets/curated/burger.jpg',
      id: nanoid(),
    },
    {
      name: 'Steak',
      src: 'src/assets/curated/steak.jpg',
      id: nanoid(),
    },
    {
      name: 'Salad',
      src: 'src/assets/curated/salad.jpg',
      id: nanoid(),
    },
  ];

  export {popularCuisines}