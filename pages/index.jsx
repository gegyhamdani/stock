/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import Pages from '../src/templates/Pages';

const Home = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const timeoutHandler = useRef(null);
  const timeoutDuration = 3000;

  const matchSearch = value => {
    const { ticker_name: tickerName } = value;
    return tickerName.toLowerCase().indexOf(search.toLowerCase()) > -1;
  };

  useEffect(() => {
    if (search.length <= 2) return;
    if (timeoutHandler.current) clearTimeout(timeoutHandler);
    timeoutHandler.current = setTimeout(() => {
      setData(options.filter(matchSearch));
    }, timeoutDuration);
  }, [search]);

  useEffect(() => {
    if (search.length > 1) return setDisplay(true);
    return setDisplay(false);
  }, [search]);

  useEffect(() => {
    const KEY =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDgsInVzZXJuYW1lIjoidGVzQGFza2xvcmEuYWkiLCJleHAiOjE1OTM4Njg5MzEsImVtYWlsIjoidGVzQGFza2xvcmEuYWkiLCJvcmlnX2lhdCI6MTU5MzY5NjEzMX0.c0S1KmrTXQEPwBXhVaE5KLm3aUDanKfQlVoogOZRDQ0';

    const URL =
      'https://services.asklora.ai/api-universe/universe/?fields=ticker,ticker_name,ticker_fullname,country_code,latest_price,latest_price_change,currency,stock_image&amp;page_size=900';

    Axios.get(URL, { headers: { Authorization: `Bearer ${KEY}` } })
      .then(response => {
        setOptions(response.data.results);
      })
      .catch(() => {});
  }, []);

  const onClickSearch = val => {
    setSearch(val);
  };

  const onChangeSearch = e => {
    setSearch(e.target.value);
    setDisplay(false);
  };

  return (
    <Pages>
      <div className="autoComplete-container">
        <input
          id="auto"
          autoComplete="off"
          placeholder="Type to search"
          value={search}
          onChange={e => onChangeSearch(e)}
        />
        {display && (
          <div className="autoContainer">
            {options.filter(matchSearch).map((value, i) => {
              return (
                <div
                  onClick={() => onClickSearch(value.ticker_name)}
                  className="option"
                  key={i.toString()}
                  role="button"
                  aria-hidden="true"
                >
                  <span>{value.ticker_name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Pages>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
