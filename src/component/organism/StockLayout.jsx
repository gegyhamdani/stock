/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Carousel, { consts } from 'react-elastic-carousel';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import styles from './index.module.css';

const StockLayout = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionAvail, setSuggestionAvail] = useState(false);
  const [search, setSearch] = useState('');
  const timeoutHandler = useRef(null);
  const timeoutDuration = 1000;

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  const matchSearch = value => {
    const { ticker_name: tickerName } = value;
    return tickerName.toLowerCase().indexOf(search.toLowerCase()) > -1;
  };

  useEffect(() => {
    if (search.length <= 2) return;
    if (timeoutHandler.current) clearTimeout(timeoutHandler);
    timeoutHandler.current = setTimeout(() => {
      setSuggestion(options.filter(matchSearch));
    }, timeoutDuration);
  }, [search]);

  useEffect(() => {
    if (options.filter(matchSearch).length > 0) return setSuggestionAvail(true);
    return setSuggestionAvail(false);
  }, [search]);

  useEffect(() => {
    if (search.length > 1) return setDisplay(true);
    return setDisplay(false);
  }, [search]);

  useEffect(() => {
    const KEY =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDgsInVzZXJuYW1lIjoidGVzQGFza2xvcmEuYWkiLCJleHAiOjE1OTM5NDIzNzgsImVtYWlsIjoidGVzQGFza2xvcmEuYWkiLCJvcmlnX2lhdCI6MTU5Mzc2OTU3OH0.UvU4hXoVfZ22fAiTFrQQ4HEnV4FjaoGp6LPRFtZlvY0';

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

  const arrowCarousel = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <FaCaretLeft size={40} />
      ) : (
        <FaCaretRight size={40} />
      );
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isEdge}
        className={`${styles['button-carousel']}`}
      >
        {pointer}
      </button>
    );
  };

  return (
    <>
      <h2>Search</h2>
      <div className={`${styles['autocomplete-container']}`}>
        <input
          id="auto"
          autoComplete="off"
          placeholder="Search"
          value={search}
          onChange={e => onChangeSearch(e)}
          className={`${styles['autocomplete-input']}`}
        />
        {display && (
          <div className={`${styles['suggestion-container']}`}>
            {options.filter(matchSearch).map((value, i) => {
              return (
                <div
                  onClick={() => onClickSearch(value.ticker_name)}
                  className={styles.suggestion}
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
      <h4
        style={{ marginTop: display && suggestionAvail ? '220px' : 0 }}
        className={styles.title}
      >
        Click to See the Graph
      </h4>
      <div className={`${styles['item-container']}`}>
        <Carousel
          breakPoints={breakPoints}
          renderPagination={() => {
            return <div />;
          }}
          renderArrow={arrowCarousel}
        >
          <div className={styles.item} style={{ backgroundColor: '#B4D7FF' }}>
            One
          </div>
          <div className={styles.item} style={{ backgroundColor: '#B4D7FF' }}>
            Two
          </div>
          <div className={styles.item} style={{ backgroundColor: '#B4D7FF' }}>
            Three
          </div>
          <div className={styles.item} style={{ backgroundColor: '#FFC0BA' }}>
            Four
          </div>
          <div className={styles.item} style={{ backgroundColor: '#FFC0BA' }}>
            Five
          </div>
          <div className={styles.item} style={{ backgroundColor: '#FFC0BA' }}>
            Six
          </div>
        </Carousel>
      </div>
      <h2>Calculation Form</h2>
      <div className={`${styles['calculation-form']}`}>
        <div
          className={`${styles['calculation-item']}`}
          style={{ backgroundColor: '#E9F3FF' }}
        >
          Test
        </div>
        <div
          className={`${styles['calculation-item']}`}
          style={{ backgroundColor: '#FEECE9' }}
        >
          Test
        </div>
      </div>
    </>
  );
};

export default StockLayout;
