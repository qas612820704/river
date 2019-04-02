import React, { useState, useCallback } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { Layout, Input, AutoComplete, Avatar, Menu, Icon } from 'antd';
import Words from './pages/words';
import Word from './pages/words/word';
import Dictionaries from './pages/dictionaries';
import { useDictionaries } from './redux/hooks';
import { fetchAutoCompleteJson } from './api/cambridge';
import './App.scss';

const { Header ,Content, Sider } = Layout;

export default function App() {
  return (
    <Router>
      <Main path="/">
        <Words path="words">
          <Word path=":wordId"/>
        </Words>
        <Dictionaries path="dictionaries/*" />
      </Main>
    </Router>
  );
};

function Main({ children }) {
  const { dictionaries } = useDictionaries();

  const [ suggestions, handleSuggestion ] = useSuggestion();

  const handleSearch = useCallback(
    word => navigate(`/words/${word}`),
    [],
  );

  return (
    <Layout>
      <Sider className="sider" collapsible collapsedWidth="0">
        <div className="sider__brand">
          <Avatar className="sider__brand__avatar">R</Avatar>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['dictionaries']}
        >
          <Menu.SubMenu
            key='dictionaries'
            title={<span><Icon type="book" /><span>Dictionaries</span></span>}
          >
          { dictionaries.map(dictionary => (
            <Menu.Item key={dictionary.id}>
              <Link to={`/dictionaries/${dictionary.id}`}>{ dictionary.name }</Link>
            </Menu.Item>
          ))}
            <Menu.Item key='new-dictionary'>
              <Link to='/dictionaries'><Icon type="plus" /><span>New Dictionary</span></Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className='main'>
        <Header className="header">
          <AutoComplete
            className='header__search-bar'
            dataSource={suggestions}
            onSelect={handleSearch}
            onSearch={handleSuggestion}
          >
            <Input.Search
              placeholder="translate..."
              onSearch={handleSearch}
            />
          </AutoComplete>
        </Header>
        <Content className='content__container'>
          <div className='content'>
            { children }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

function useSuggestion() {
  const [ suggestions, setSuggestion ] = useState([]);

  const handleSuggestion = useCallback(
    async (value) => {
      if (value === '') return;
      const { results: suggestions } = await fetchAutoCompleteJson(value);
      setSuggestion(suggestions.map(s => s.searchtext));
    },
    [],
  );

  return [ suggestions, handleSuggestion ];
}
