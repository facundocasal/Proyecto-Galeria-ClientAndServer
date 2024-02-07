import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from '../../styles/Forms.module.css';

const AutocompleteChips = ({ options, getProvincesLocked, provincesSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectOption = (selected) => {
    setSelectedOptions(selected);
    getProvincesLocked(selected);
  };

  useEffect(() => {
    if (provincesSelect) {
      setSelectedOptions(provincesSelect);
    }
  }, [provincesSelect]);
  return (
    <Form.Group>
      <Form.Label className={`${styles.title}`}>
        Seleccione las provincias a las que desea bloquear su contenido
      </Form.Label>
      <Typeahead
        id="tags-outlined"
        options={options}
        labelKey="name"
        multiple
        filterBy={['name']}
        selected={selectedOptions}
        onChange={handleSelectOption}
        placeholder=""
        className={'customChip text-white'}
        inputProps={{ style: { color: '#fff' } }}

      />
    </Form.Group>
  );
};

export default AutocompleteChips;
