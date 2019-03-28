import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { List, Card, Badge } from 'antd';

export default function Dictionary({ dictionaryId }) {
  const dictionary = useMappedState(
    useCallback(
      state => {
        const dictionary = state.dictionaries[dictionaryId];
        return {
          ...dictionary,
          definations: dictionary.definations.map(
            defId => state.definations[defId],
          )
        }
      },
      [dictionaryId],
    ),
  );

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={dictionary.definations}
      renderItem={renderDefination}
    />
  )
}

function renderDefination(defination) {
  return (
    <List.Item>
      <Card>
        <Card.Meta
          title={
            <span>
              <Badge
                style={{ marginRight: 8, background: '#52c41a' }}
                count={defination.level}
              />
              {defination.word}
            </span>
          }
          description={defination.translate}
        />
      </Card>
    </List.Item>
  )
}
