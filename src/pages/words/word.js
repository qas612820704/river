import React, { useState, useCallback, useEffect, useMemo, useContext, createContext } from 'react';
import { Avatar, Badge, Spin, Tabs, Icon, List, Typography, Skeleton, Tooltip } from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getWord, increaseWordSearchCount, toggleWordToDictionary } from '../../redux/actions';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const WordContext = createContext();

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
    <WordContext.Provider value={word}>
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
    </WordContext.Provider>
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
        renderItem={defination => <Defination defination={defination}/>}
      />
    </List.Item>
  )
}

function Defination({ defination }) {
  const word = useContext(WordContext);

  const isInMyDictionary = useMappedState(
    useCallback(
      state => state.getIn(['myDictionary', 'wordList']).has(word),
    ),
  );

  const dispatch = useDispatch();

  const handleSaveClick = useCallback(
    () => dispatch(toggleWordToDictionary(word)),
    [word],
  )

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
              <Icon
                type="save"
                style={{ marginRight: 8, cursor: 'pointer', color: isInMyDictionary ? '#fa8c16' : '' }}
                onClick={handleSaveClick}
              />
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
