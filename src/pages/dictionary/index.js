import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Row, Col, Card } from 'antd';
import { Defination } from '../words/word';

export default function Dictionary() {
  const definations = useMappedState(
    useCallback(
      state => {
        return [...state.myDictionary.words].map(
          definationId => state.definations[definationId],
        );
      },
      [],
    )
  )


  return (
    <Row gutter={16}>
    { definations.map(def => (
      <Col key={def.id} span={6}>
        <Card
          title={def.word}
        >
          <Defination definationId={def.id} />
        </Card>
      </Col>
    ))}
    </Row>
  );
}
