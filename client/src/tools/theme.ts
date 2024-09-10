import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Card: {
      baseStyle: {
        borderRadius: "0",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
        backgroundImage:'/фон2.jpg',
        backgroundSize: 'cover',       // Изображение будет растянуто на весь экран
        backgroundPosition: 'center',  // Изображение будет центрировано
        backgroundAttachment: 'fixed',
      },
      a: {
        color: 'black',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: 'black',
      },
      h2: {
        color: 'black',
      },
      p: {
        color: 'black',
      },
    },
  },
  fonts: {
    heading: `'Nunito'`,
    body: `'Nunito'`,
  },
});

export default theme;
