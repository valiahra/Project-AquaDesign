import { useState, useEffect } from 'react';
import styles from './ConstructorPage.module.css';
import { Checkbox, CheckboxGroup, Stack, Heading, Box } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import FountainCard from '../../components/FountainCard/FountainCard';

const ConstructorPage = () => {
  const [places, setPlaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/constructors/places`)
      .then((res) => {
        setPlaces(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || 'Unknown error');
        console.error('Ошибка fetch place', err);
      });

    axiosInstance
      .get(`${import.meta.env.VITE_API}/constructors/types`)
      .then((res) => {
        setTypes(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || 'Хз че случилось');
        console.error('Ошибка fetch types:', err);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPlaces.length > 0) {
      params.append('places', selectedPlaces.join(','));
    }
    if (selectedTypes.length > 0) {
      params.append('types', selectedTypes.join(','));
    }
    const url = `${
      import.meta.env.VITE_API
    }/constructors/selection?${params.toString()}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setEntries(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data.error || 'Unknown error');
        console.error('Ошибка fetch fountains:', err);
      });
  }, [selectedPlaces, selectedTypes]);

  const handlePlaceChange = (values: string[]) => {
    console.log('Selected Places:', values);
    setSelectedPlaces(values);
  };

  const handleTypeChange = (values: string[]) => {
    console.log('Selected Types:', values);
    setSelectedTypes(values);
  };

  return (
    <div className={styles.wrapper}>
    <h1 className={styles.selection}>Подбор фонтанов</h1>
    <div className={styles.filtersContainer}>
      <div className={styles.filterBox}>
        <Heading size="md">Место установки</Heading>
        <CheckboxGroup value={selectedPlaces} onChange={handlePlaceChange}>
          <div className={styles.filter}>
            {places.map((place: any) => (
              <Checkbox
                key={place.id}
                value={place.id}
                colorScheme="teal"
                size="lg"
                isChecked={selectedPlaces.includes(place.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPlaces([...selectedPlaces, place.id]);
                  } else {
                    setSelectedPlaces(
                      selectedPlaces.filter((id) => id !== place.id)
                    );
                  }
                }}
              >
                {place.place}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className={styles.filterBox}>
        <Heading size="md">Тип фонтана</Heading>
        <CheckboxGroup value={selectedTypes} onChange={handleTypeChange}>
          <div className={styles.filter}>
            {types.map((type: any) => (
              <Checkbox
                key={type.id}
                value={type.id}
                colorScheme="teal"
                size="lg"
                isChecked={selectedTypes.includes(type.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTypes([...selectedTypes, type.id]);
                  } else {
                    setSelectedTypes(
                      selectedTypes.filter((id) => id !== type.id)
                    );
                  }
                }}
              >
                {type.nameType}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>
    </div>
    <div className={styles.list}>
      {entries.map((entry) => (
        <FountainCard
          key={entry.id}
          el={{
            ...entry,
            photos: entry.photos.sort((a, b) => a.id - b.id),
          }}
        />
      ))}
    </div>
  </div>
  );
};

export default ConstructorPage;
