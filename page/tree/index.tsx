import React, { useMemo, useState } from 'react';

import styles from './index.less';

const nodeKey = 'key';
const nodeName = 'value';
const nodeChildren = 'children';

interface IniType {
  key: string,
  value: string,
  children?: Array<IniType>,
  open?: boolean,
  checked?: boolean,
  parent?: IniType,
}

interface TreeNodeProps {
  data: Array<IniType>,
  level?: number,
}

const init:(data:Array<IniType>, parent?:IniType) => Array<IniType> = (data, parent) => {
  return data.map((item) => {
    item.open = false;
    item.checked = false;
    item.parent = parent;
    if (item[nodeChildren]) {
      init(item[nodeChildren], item);
    }
    return item;
  });
};

const initData:Array<IniType> = init([
  {
    key: 'a1',
    value: 'sony',
    children: [
      { key: 'a21', value: 'a21' },
      { key: 'a22', value: 'a22' },
      { key: 'a23', value: 'a23' },
      { key: 'a24', value: 'a24' },
      { key: 'a25', value: 'a25' },
      { key: 'a26', value: 'a26' },
    ],
  },
  {
    key: 'b1',
    value: 'haier',
    children: [
      {
        key: 'b21',
        value: 'b21',
        children: [
          {
            key: 'b31',
            value: 'b31',
            children: [{ key: 'b41', value:'b41' }],
          },
          { key: 'b32', value: 'b32' },
          { key: 'b33', value: 'b33' },
        ],
      },
      { key: 'b22', value: 'b22' },
      {
        key: 'b23',
        value: 'b23',
        children: [
          {
            key: 'b31a',
            value: 'b31a',
            children: [{ key: 'b41a', value:'b41a' }],
          },
          { key: 'b32a', value: 'b32a' },
          { key: 'b33a', value: 'b33a' },
        ],
      },
      { key: 'b24', value: 'b24' },
      { key: 'b25', value: 'b25' },
      { key: 'b26', value: 'b26' },
    ],
  },
  { key: 'c1', value: 'appple' },
  { key: 'd1', value: 'huawei' },
]);

const Cascader = () => {
  const [ARR, setARR] = useState(initData);
  const [checkedItem, setCheckedItem] = useState<Array<IniType>>([]); // 当前被选择的所有项目
  const [currentItem, setCurrentItem] = useState<IniType | { key?:string,  value?: string }>({}); // 当前被选择的项目

  const isMobile = useMemo(() => {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i);
  }, [navigator.userAgent]);

  const notChecked = () => {
    checkedItem.forEach(item => {
      item.checked = false;
      item.open = false;
    });
  };

  const tempCheckedItem:Array<IniType> = [];
  // 把当前点击的菜单和它的父级菜单选中
  const setHierarchy = (nodeItem:IniType) => {
    nodeItem.checked = true;
    nodeItem.open = true;
    tempCheckedItem.push(nodeItem); // 保存当前被选择的菜单
    if (nodeItem.parent) {
      setHierarchy(nodeItem.parent);
    }
  };

  const levelHasChecked = [1];
  const hasChenked = (data:Array<IniType>, level:number) => {
    if (levelHasChecked[level - 1]) {
      return false;
    }
    const tempARR = data.filter((item) => item.checked);
    if (tempARR.length !== 0) levelHasChecked[level - 1] = level;
    return tempARR.length !== 0;
  };

  const TreeNode = ({ data, level = 1 }:TreeNodeProps) => (
    <ul style={
      data[0]
      && data[0].parent
      && (level > checkedItem.length || !hasChenked(data, level))
        ? { animation:'moveRight 0.1s', display: 'none', background: '#f0f0f0' }
        : {}
      }
      className={styles.treeNode_ul}
    >
      {
        data.map((nodeItem, index) => (
          <li
            className={styles.treeNode_li}
            key={index}
            style={nodeItem.checked ? { background: '#fdf3f3', color: '#e95550' } : { color: '#333' }}
          >
            <div
              className={styles.treeNode_item}
              onClick={()=>{
                if (nodeItem[nodeKey] === currentItem[nodeKey]) return;
                notChecked();
                setHierarchy(nodeItem);
                tempCheckedItem.reverse();
                setARR([...ARR]);
                setCurrentItem(nodeItem);
                setCheckedItem([...tempCheckedItem]);
              }}
            >
              <div className={styles.treeNode_item_text}>
                {nodeItem[nodeName]}
                {/* &nbsp;{level + '层'} */}
              </div>
              { nodeItem[nodeChildren] && nodeItem[nodeChildren].length !== 0 && '>'}
            </div>
            {
              nodeItem[nodeChildren] && nodeItem[nodeChildren].length !== 0 ? <TreeNode data={nodeItem[nodeChildren]} level={level + 1}/> : null
            }
          </li>
        ))
      }
    </ul>
  );

  return (
    isMobile ? <div>请用pc浏览器打开</div> : <TreeNode data={ARR}/>
  );
};

export default Cascader;
