import React, {useState} from 'react';
import {IDataColumn, ITask} from './models/items';

import BanyanColumn from './components/banyanColumn';

import './App.css';

const data: IDataColumn[] = [{
  colNum: 0,
  header: 'Backlog',
  tasks: []
},
{
  colNum: 1,
  header: 'In Progress',
  tasks: []
},
{
  colNum: 2,
  header: 'QA',
  tasks: []
},
{
  colNum: 3,
  header: 'Done',
  tasks: []
}


]

function App() {
  const[userName, setUserName] = useState('Jacob');
  const[updated, setUpdate] = useState(false);
  const[dataColumns, setDataColumns] = useState<IDataColumn[]>(data);
  const[currentItemId, setCurrentItemId] = useState(0);

  const onAddItem = (colType: number, item: ITask) => {
    item.id = currentItemId +1;
    setCurrentItemId(currentItemId+1);

    let dcTemp = dataColumns;
    dcTemp[colType].tasks.push(item);

    setDataColumns(dcTemp);    

  }

  const onMoveItem = (item: ITask, fromColumn: number, toColumn: number) => {
    let dcTemp = dataColumns;
    let moveItem =  dcTemp[fromColumn].tasks.find(task => task.id == item.id);
    if (moveItem)  {
      dcTemp[fromColumn].tasks.splice(dcTemp[fromColumn].tasks.indexOf(moveItem, 0));
      dcTemp[toColumn].tasks.push(moveItem);

      setDataColumns(dcTemp);
      setUpdate(!updated);
    }

  }
  
  return (
    <div className="App">
      <div id="header">
        <div className='header' >
          Hello, {userName}
        </div>
        <div className='dateTime'>
          Friday, August 14
        </div>
        <div className='headerLine'>
        </div>
      </div>

      <div className='col1'>
        <BanyanColumn
          columnType={0}
          columnHeader='Backlog'
          columnData={dataColumns[0]}
          onAddItem={onAddItem}
          onMoveItem={onMoveItem}
        />
      </div>
      <div className='col2'>
        <BanyanColumn
            columnType={1}
            columnHeader='In Progress'
            columnData={dataColumns[1]}
            onAddItem={onAddItem}
            onMoveItem={onMoveItem}
          />
        
      </div>
      <div className='col3'>
        <BanyanColumn
            columnType={2}
            columnHeader='QA'
            columnData={dataColumns[2]}
            onAddItem={onAddItem}
            onMoveItem={onMoveItem}
          />
        
      </div>
      <div className='col4'>
        <BanyanColumn
            columnType={3}
            columnHeader='Done'
            columnData={dataColumns[3]}
            onAddItem={onAddItem}
            onMoveItem={onMoveItem}
          />
        
      </div>

    </div>
  );
}

export default App;
