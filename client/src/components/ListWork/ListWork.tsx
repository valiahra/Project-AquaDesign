import { useState, useEffect } from 'react';
import styles from './ListWork.module.css';
import { Checkbox, CheckboxGroup, Stack, Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import FountainCard from '../../components/FountainCard/FountainCard';
import Pagination from '../Pagination/Pagination';

const ListWork = () => {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/ourWorks/cities`)
      .then((res) => {
        setCities(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || 'Unknown error');
        console.error('Ошибка fetch cities', err);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCities.length > 0) {
      params.append('cities', selectedCities.join(','));
    }
    const url = `${
      import.meta.env.VITE_API
    }/ourWorks/filter?${params.toString()}`;

    axiosInstance
      .get(url)
      .then((res) => {
        // const arr = res.data.filter((el) => el.viewId === 1)
        setEntries(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data.error || 'Unknown error');
        console.error('Ошибка fetch fountains:', err);
      });
  }, [selectedCities]);
  // console.log('aaaaaaaaaaaa', entries)

  const handleCityChange = (values: string[]) => {
    console.log('Selected Cities:', values);
    setSelectedCities(values);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [fountainsPerPage] = useState(10);

  const lastFountainsIndex = currentPage * fountainsPerPage;
  const firstFountainsIndex = lastFountainsIndex - fountainsPerPage;
  const currentFountains = entries.slice(
    firstFountainsIndex,
    lastFountainsIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.wrapper}>
    <Box width="100%">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Stack direction="row" spacing={4} justify="center" align="center" mb={4}>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton bg="blue.500" color="white" _hover={{ bg: "blue.700" }} _expanded={{ bg: "blue.700" }} size="lg" borderRadius='4px'>
              Выбрать город
            </AccordionButton>
            <AccordionPanel>
              <CheckboxGroup value={selectedCities} onChange={handleCityChange}>
                <Stack direction="row" spacing={4} wrap="wrap" justify="center">
                  {cities.map((city) => (
                    <Checkbox
                      key={city.id}
                      value={city.id}
                      colorScheme="blue"
                      size="lg"
                      isChecked={selectedCities.includes(city.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCities([...selectedCities, city.id]);
                        } else {
                          setSelectedCities(selectedCities.filter((id) => id !== city.id));
                        }
                      }}
                    >
                      {city.nameCity}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
      <div className={styles.list}>
        {currentFountains.map((entry) => (
          <FountainCard key={entry.id} el={entry} />
        ))}
      </div>
    </Box>
    <Pagination fountainsPerPage={fountainsPerPage} totalFoutains={entries.length} paginate={paginate} />
  </div>
  );
};

export default ListWork;
