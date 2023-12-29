import React, { useState } from 'react';
import { Form, BtnSearch, Input } from './Searchbar.styled';
import { toast } from 'react-toastify';

export const SubmitForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSearch = ({ currentTarget: { value } }) => {
    setText(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (text.trim() === '') {
      return toast.warn('Ви не ввели текст для пошуку!');
    }
    onSubmit(text);
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="text"
        value={text}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleSearch}
      />
      <BtnSearch type="submit">Search</BtnSearch>
    </Form>
  );
};
