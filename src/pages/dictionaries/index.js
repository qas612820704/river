import React, { useState, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Router } from '@reach/router';
import { navigate } from '../../lib/router';
import { map } from 'lodash';
import { Input, Icon, Card, List } from 'antd';
import  Dictionary from './dictionary';
import { addDictionary as reduxAddDictionary, delDictionary as reduxDelDictionary } from '../../redux/actions';

export default function Dictionaries() {
  return (
    <div>
      <Router>
        <DictionaryIndex path="/" />
        <Dictionary path=":dictionaryId" />
      </Router>
    </div>
  );
}

function DictionaryIndex() {
  const [newDictionaryName, setNewDictionaryName] = useState('');
  const dispatch = useDispatch();
  const addDictionary = useCallback(
    () => {
      setNewDictionaryName('');
      dispatch(reduxAddDictionary({ name: newDictionaryName }));
    },
    [newDictionaryName],
  );

  const dictionaries = useMappedState(
    state => map(state.dictionaries),
    [],
  );

  return (
    <div>
      <Input
        value={newDictionaryName}
        onChange={e => setNewDictionaryName(e.target.value)}
        onPressEnter={addDictionary}
        placeholder='Add dictionary'
        suffix={<Icon onClick={addDictionary} type='plus'/>}
        style={{ marginBottom: '2em' }}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={dictionaries}
        renderItem={dictionary => <DictionaryCard dictionary={dictionary} />}
      />
    </div>
  );
}

function DictionaryCard({ dictionary }) {
  const dispatch = useDispatch();
  const delDictionary = useCallback(
    () => dispatch(reduxDelDictionary(dictionary.id)),
    [dictionary.id],
  );

  return (
    <List.Item
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/dictionaries/${dictionary.id}`)}
    >
      <Card>
        <Card.Meta
          title={
            <span>
              { dictionary.id !== 'default' && (
                <Icon
                  type="minus"
                  style={{ marginRight: 8, color: '#f5222d' }}
                  onClick={delDictionary}
                />
              )}
              { dictionary.name }
            </span>
          }
        />
      </Card>
    </List.Item>
  )
}
