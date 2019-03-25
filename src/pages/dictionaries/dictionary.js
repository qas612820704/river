import React, { useState, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Row, Col, Card, Button, Badge } from 'antd';
import { Defination } from '../words/word';

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

  const [ isExpanded, enableExpanded ] = useState(false);
  const handleExpandedClick = useCallback(
    () => enableExpanded(!isExpanded),
    [isExpanded],
  );

  return (
    <Row gutter={16}>
    { dictionary.definations.map(defination => (
      <Col key={defination.id} span={6}>
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
      </Col>
    ))}
    </Row>
  );
}
