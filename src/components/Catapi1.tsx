import { Col, Row, Spin, Select } from "antd";
import { API_KEY } from "../constants/appDetail";
import Catapi2 from "./Catapi2";
import React, { useEffect, useState } from "react";

const Catapi1 = () => {

  const [cats, setCats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestCats = async (value: string) => {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${value}`;

    console.log(apiUrl);
    
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    
    try {
      setIsLoading(true);

      const apiResponse = await fetch(apiUrl, { headers });
      const jsonResult = await apiResponse.json();

      // Logging for debugging
      console.log("cats result", jsonResult);

      setCats(jsonResult);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestCats();
  }, []);

  return (
    <>
      <Select
      defaultValue="abob"
      style={{ width: 400 }}
      onChange={requestCats}
      options={[
{  value: 'abob', label: 'Abyssinian',  },
{  value: 'abys', label: 'Aegean',  },
{  value: 'acur', label: 'American Bobtail',  },
{  value: 'aege', label: 'American Curl',  },
{  value: 'amau', label: 'American Shorthair',  },
{  value: 'amis', label: 'American Wirehair',  },
{  value: 'asho', label: 'Arabian Mau',  },
{  value: 'awir', label: 'Australian Mist',  },
{  value: 'bali', label: 'Balinese',  },
{  value: 'bamb', label: 'Bambino',  },
{  value: 'beng', label: 'Bengal',  },
{  value: 'birm', label: 'Birman',  },
{  value: 'bomb', label: 'Bombay',  },
{  value: 'bsho', label: 'British Longhair',  },
{  value: 'bslo', label: 'British Shorthair',  },
{  value: 'bure', label: 'Burmese',  },
{  value: 'buri', label: 'Burmilla',  },
{  value: 'char', label: 'California Spangled',  },
{  value: 'chau', label: 'Chantilly-Tiffany',  },
{  value: 'chee', label: 'Chartreux',  },
{  value: 'crex', label: 'Chausie',  },
{  value: 'csho', label: 'Cheetoh',  },
{  value: 'cspa', label: 'Colorpoint Shorthair',  },
{  value: 'ctif', label: 'Cornish Rex',  },
{  value: 'cymr', label: 'Cymric',  },
{  value: 'cypr', label: 'Cyprus',  },
{  value: 'dons', label: 'Devon Rex',  },
{  value: 'drex', label: 'Donskoy',  },
{  value: 'ebur', label: 'Dragon Li',  },
{  value: 'emau', label: 'Egyptian Mau',  },
{  value: 'esho', label: 'European Burmese',  },
{  value: 'hbro', label: 'Exotic Shorthair',  },
{  value: 'hima', label: 'Havana Brown',  },
{  value: 'java', label: 'Himalayan',  },
{  value: 'jbob', label: 'Japanese Bobtail',  },
{  value: 'khao', label: 'Javanese',  },
{  value: 'kora', label: 'Khao Manee',  },
{  value: 'kuri', label: 'Korat',  },
{  value: 'lape', label: 'Kurilian',  },
{  value: 'lihu', label: 'LaPerm',  },
{  value: 'mala', label: 'Maine Coon',  },
{  value: 'manx', label: 'Malayan',  },
{  value: 'mcoo', label: 'Manx',  },
{  value: 'munc', label: 'Munchkin',  },
{  value: 'nebe', label: 'Nebelung',  },
{  value: 'norw', label: 'Norwegian Forest Cat',  },
{  value: 'ocic', label: 'Ocicat',  },
{  value: 'orie', label: 'Oriental',  },
{  value: 'pers', label: 'Persian',  },
{  value: 'pixi', label: 'Pixie-bob',  },
{  value: 'raga', label: 'Ragamuffin',  },
{  value: 'ragd', label: 'Ragdoll',  },
{  value: 'rblu', label: 'Russian Blue',  },
{  value: 'sava', label: 'Savannah',  },
{  value: 'sfol', label: 'Scottish Fold',  },
{  value: 'siam', label: 'Selkirk Rex',  },
{  value: 'sibe', label: 'Siamese',  },
{  value: 'sing', label: 'Siberian',  },
{  value: 'snow', label: 'Singapura',  },
{  value: 'soma', label: 'Snowshoe',  },
{  value: 'sphy', label: 'Somali',  },
{  value: 'srex', label: 'Sphynx',  },
{  value: 'tang', label: 'Tonkinese',  },
{  value: 'tonk', label: 'Toyger',  },
{  value: 'toyg', label: 'Turkish Angora',  },
{  value: 'tvan', label: 'Turkish Van',  },
{  value: 'ycho', label: 'York Chocolate',  },

      ]}
      />
      
        <Row className="justify-content-center">
          {isLoading ? (
            <Spin animation="grow" />
          ) : cats ? (
            <>
              {Object.values(cats).map((cat) => (
                <Col key={cat.id} >
                  <Catapi2 Catapi2={cat} />
                </Col>
              ))}
            </>
          ) : (
            <h3>
              Impossible to retrieve cats
            </h3>
          )}
        </Row>

    </>
  );
};

export default Catapi1;