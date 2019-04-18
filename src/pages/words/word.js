import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { map } from 'lodash';
import { Avatar, Badge, Spin, Tabs, Icon, List, Typography, Skeleton, Menu, Checkbox, Dropdown } from 'antd';
import {
  useWord, useDefination
} from '../../redux/hooks';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { toggleMappingDefinationToDictionary as reduxToggleMappingDefinationToDictionary } from '../../redux/actions';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Word({ wordId }) {
  const { word } = useWord(wordId);

  if (!word) {
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
        { word.explanations.map(explaination => (
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
        renderItem={definationId => <Defination definationId={definationId}/>}
      />
    </List.Item>
  )
}

export function Defination({ definationId }) {
  const { defination } = useDefination(definationId);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const dictionaries = useMappedState(
    state => map(state.dictionaries),
    [],
  );

  const dispatch = useDispatch();
  const toggleMappingDefinationToDictionary = useCallback(
    (definationId, dictionaryId) => dispatch(reduxToggleMappingDefinationToDictionary(definationId, dictionaryId)),
    [],
  );

  const menu = (
    <Menu onMouseLeave={() => setDropdownVisibility(false)}>
    { dictionaries.map(d => (
      <Menu.Item key={d.id}>
        <Checkbox
          checked={d.definations.includes(definationId)}
          onChange={() => toggleMappingDefinationToDictionary(definationId, d.id)}
        >
        {d.name}
        </Checkbox>
      </Menu.Item>
    ))}
    </Menu>
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
            <Dropdown
              overlay={menu}
              visible={dropdownVisibility}
              onMouseEnter={() => setDropdownVisibility(true)}
            >
              <Icon
                type="plus"
                style={{ marginRight: 8, cursor: 'pointer' }}
              />
            </Dropdown>
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
