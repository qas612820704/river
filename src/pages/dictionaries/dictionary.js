import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Row, Col, Card, Badge } from 'antd';

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
