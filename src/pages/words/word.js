import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Avatar, Badge, Spin, Tabs, Icon, List, Typography, Skeleton, Tooltip } from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import {
  getWord, increaseWordSearchCount,
  addDefinationInDictionary, delDefinationInDictionary,
} from '../../redux/actions';
import {
  selectWord
} from '../../redux/selectors';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Word({ wordId }) {
  const word = useMappedState(
    useCallback(
      state => selectWord(state, wordId),
      [wordId],
    ),
  );

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(increaseWordSearchCount(wordId));
    },
    [wordId]
  );

  if (!word) {
    dispatch(getWord(wordId));
    return  (
      <Spin>
        <Skeleton />
      </Spin>
    );
  }

  return (
    <section style={{ margin: '16px 0' }}>
      <Spin spinning={word.isFetching}>
        <Title>{wordId}</Title>
        <Tabs>
        { word.explanations.map((explaination, i) => (
          <TabPane
            tab={
              <span>
                <Avatar style={{ background: '#008dff', marginRight: 8 }}>{explaination.pos}</Avatar>
                {explaination.pos}
              </span>
            }
            key={explaination.pos}
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
        <IpaAction region="US" {...explaination.ipaUS} />
        <IpaAction region="UK" {...explaination.ipaUK} />
      </Paragraph>
      <List
        itemLayout="vertical"
        dataSource={explaination.senses}
        renderItem={renderSense}
      />
    </div>
  )
}

function renderSense(sense) {
  return (
    <List.Item>
      { sense.guideWord &&
        <Title level={4}>
          <Icon type="radar-chart" style={{ marginRight: 8 }} />
          {sense.guideWord}
        </Title>
      }
      <List bordered
        itemLayout="vertical"
        dataSource={sense.definations}
        renderItem={defination => <Defination defination={defination}/>}
      />
    </List.Item>
  )
}

export function Defination({ defination }) {
  const isInMyDictionary = true;

  const dispatch = useDispatch();

  const handleSaveClick = useCallback(
    () => {
      const handler = isInMyDictionary
        ? delDefinationInDictionary
        : addDefinationInDictionary;
      dispatch(handler(defination.id))},
    [isInMyDictionary],
  )

  return (
    <List.Item style={{ flexDirection: 'column' }}>
      <List.Item.Meta
        title={
          <span>
            <Badge
              style={{ marginRight: 8, background: '#52c41a' }}
              count={defination.level}
            />
            { defination.text }
          </span>
        }
        description={
          <span>
            <Tooltip title="Click to save">
              <Icon
                type="save"
                style={{ marginRight: 8, cursor: 'pointer', color: isInMyDictionary ? '#fa8c16' : '' }}
                onClick={handleSaveClick}
              />
            </Tooltip>
            <span style={{ color: '#1890ff' }}>{defination.translate}</span>
          </span>
        }
      />
      <List
        itemLayout="vertical"
        dataSource={defination.examples}
        renderItem={renderExample}
      />
    </List.Item>
  )
}

function renderExample(example) {
  return (
    <List.Item>
      <Paragraph>{example.text}</Paragraph>
      <Paragraph style={{ color: '#40a9ff' }}>{example.translate}</Paragraph>
    </List.Item>
  )
}

function IpaAction({ region, html, audioUrl }) {
  const [ isPlaying, setPlaying ] = useState(false);

  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setPlaying(false);
    });
  }, [audio]);


  const handleTextClick = useCallback(
    () => {
      setPlaying(true);
      audio.play();
    },
    [audio],
  );

  return (
    <span
      style={{ marginRight: 16, cursor: 'pointer' }}
      onClick={handleTextClick}
    >
      <Avatar style={{marginRight: 8, background: isPlaying ? '#fa8c16' : '' }}>{region}</Avatar>
      /<span dangerouslySetInnerHTML={{ __html: html }}/>/
    </span>
  )
}
