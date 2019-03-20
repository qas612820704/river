import React, { useCallback, useEffect, useMemo } from 'react';
import { Avatar, Badge, Spin, Tabs, Icon, List, Typography, Skeleton, Tooltip } from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getWord, increaseWordSearchCount } from '../../redux/actions';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function Word({ word }) {
  const translation = useMappedState(
    useCallback(
      state => state.getIn(['words', word]),
      [word],
    ),
  );
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(increaseWordSearchCount(word));
    },
    [word]
  );

  if (!translation) {
    dispatch(getWord(word));
    return  (
      <Spin>
        <Skeleton />
      </Spin>
    );
  }

  return (
    <section style={{ margin: '16px 0' }}>
      <Spin spinning={translation.get('isFetching')}>
        <Title>{word}</Title>
        <Tabs>
        { translation.get('explanations').map((explaination, i) => (
          <TabPane
            tab={
              <span>
                <Avatar style={{ background: '#008dff', marginRight: 8 }}>{explaination.get('pos')}</Avatar>
                {explaination.get('pos')}
              </span>
            }
            key={i}
          >
          { renderExplaination(explaination) }
          </TabPane>
        ))}
        </Tabs>
      </Spin>
    </section>
  );
}

function renderExplaination(explaination) {
  return (
    <div>
      <Paragraph style={{ marginBottom: 16 }}>
        <Icon type="notification" style={{marginRight: 16}} />
        <IpaAction region="US" {...explaination.get('ipaUS').toJS()} />
        <IpaAction region="UK" {...explaination.get('ipaUK').toJS()} />
      </Paragraph>
      <List
        itemLayout="vertical"
        dataSource={explaination.get('senses')}
        renderItem={renderSense}
      />
    </div>
  )
}

function renderSense(sense) {
  return (
    <List.Item>
      { sense.get('guideWord') &&
        <Title level={4}>
          <Icon type="radar-chart" style={{ marginRight: 8 }} />
          {sense.get('guideWord')}
        </Title>
      }
      <List bordered
        itemLayout="vertical"
        dataSource={sense.get('definations')}
        renderItem={renderDefination}
      />
    </List.Item>
  )
}

function renderDefination(defination) {
  return (
    <List.Item>
      <List.Item.Meta
        title={
          <span>
            <Badge
              style={{ marginRight: 8, background: '#52c41a' }}
              count={defination.get('level')}
            />
            { defination.get('text') }
          </span>
        }
        description={
          <span>
            <Tooltip title="Click to save">
              <Icon type="save" style={{ marginRight: 8, cursor: 'pointer' }} />
            </Tooltip>
            <span style={{ color: '#1890ff' }}>{defination.get('translate')}</span>
          </span>
        }
      />
      <List
        itemLayout="vertical"
        dataSource={defination.get('examples')}
        renderItem={renderExample}
      />
    </List.Item>
  )
}

function renderExample(example) {
  return (
    <List.Item>
      <Paragraph>{example.get('text')}</Paragraph>
      <Paragraph style={{ color: '#40a9ff' }}>{example.get('translate')}</Paragraph>
    </List.Item>
  )
}

function IpaAction({ region, html, audioUrl }) {
  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  const handleTextClick = useCallback(
    () => audio.play(),
    [audio],
  );

  return (
    <span
      style={{ marginRight: 16, cursor: 'pointer' }}
      onClick={handleTextClick}
    >
      <Avatar style={{marginRight: 8}}>{region}</Avatar>
      /<span dangerouslySetInnerHTML={{ __html: html }}/>/
    </span>
  )
}
