
import  { useEffect,  useState }  from 'react';
import { YMaps, Map, ObjectManager } from '@pbe/react-yandex-maps';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/react';

export default function WorksMap() {
  const [value, setValue] = useState([]);
  
useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/fountains`)
      .then((res) => {
        //  console.log(res.data)
        setValue(res.data);

        //  сonsole.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
// console.log(value)

  const defaultState = {
    center: [55.677123, 35.616378],
    zoom: 5,
  };


  const collection = {
    type: "FeatureCollection",
    features: value?.map((el, id) => {
      return {
        id: id,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [el.coordinateX, el.coordinateY]
        },
        properties: {
          balloonContent: `
          <div style="background-color: #fff; padding: 10px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
            <h6 style="font-weight: bold; margin-bottom: 10px;">${el.title}</h6>
            <a target='_blank' href= /ourWorks/${el.id} style="text-decoration: none; color: #337ab7;">Подробная информация</a>
            <img src=${el.photos[0].image} style="width: 600px; height: 250px; border-radius: 4px; margin-top: 10px;"/>
          </div>
        `,
          clusterCaption: `Метка №${id + 1}`
        }
      };
    })
  };

  return (
<div>
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton
          bg="blue.500" 
          color="white" 
          _hover={{ bg: "blue.700" }} 
          _expanded={{ bg: "blue.700" }} 
          // size="lg"
          borderRadius='4px'
          width='150px'
          paddingLeft='50px'
        >
          Карта
        </AccordionButton>
        <AccordionPanel>
            <YMaps>
              <Map 
              width="1920px" 
              height="390px" 
              defaultState={defaultState}
              >
                <ObjectManager
                  objects={{
                    openBalloonOnClick: true
                  }}
                  clusters={{}}
                  options={{
                    clusterize: true,
                    gridSize: 32
                  }}
                  defaultFeatures={collection}
                  modules={[
                    "objectManager.addon.objectsBalloon",
                    "objectManager.addon.clustersBalloon"
                  ]}
                />
              </Map>
            </YMaps>
      
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>
  );
}