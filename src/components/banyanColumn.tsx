import react, { useState } from 'react'
import { IDataColumn, ITask } from '../models/items';
import Modal from 'react-modal';
import 'semantic-ui-css/semantic.min.css'


import '../App.css';


interface IColumnParameters {
    columnType: number,
    columnData: IDataColumn,
    columnHeader: string,
    onAddItem: (columnType: number, item: ITask) => void,
    onMoveItem: (item: ITask, fromColumn: number, toColumn: number) => void,
}

const BanyanColumn: React.FC<IColumnParameters> = ({ columnType, columnData, columnHeader, onAddItem, onMoveItem }) => {
    const [popup, showPopup] = useState(false);
    const [currentDesc, setCurrentDesc] = useState('');

    const onTaskAdd = () => {
    
        showPopup(true);
    }

    function toggleModal() {
        showPopup(!popup);
      }

    function moveRight (e: React.FormEvent<HTMLDivElement>, item: ITask) {
        onMoveItem(item, columnType, columnType + 1);
        e.preventDefault();
    }

    function addItem () {
        const newItem: ITask = {
            desc: currentDesc
        }
        
        onAddItem(columnType, newItem);
        setCurrentDesc('');
        showPopup(!popup);
    }

    const onDescChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setCurrentDesc( e.currentTarget.value);
    }

    return (
        <>
        <div className="banyanHeader">{columnHeader}</div>
        <div className="banyanHeaderSub">{columnData.tasks.length} Task{columnData.tasks.length == 1 ? '': 's'} </div>

        <div className="banyanColumn">
            {columnData.tasks.map(item => {
                return [
                    <div key={item.id} className='banyanColumnInner'>
                        <div onClick={(e) => moveRight(e, item)}>{item.desc}</div>
                    </div>
                ]
            })}
        </div>
        <div className='addTask'>
            <span onClick={onTaskAdd}>+ Add Task</span>
        </div>


        <Modal
            isOpen={popup}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
        >
        <div style={{marginBottom: '10px'}}>Add New Task for {columnData.header}</div>

        <div style={{width: '100%'}}>
            <label>Task Description:  </label>
        </div>

        <div style={{width: '100%'}}>
            <textarea value={currentDesc} onChange={onDescChange}  style={{height: '150px', width: '500px'}}></textarea>
        </div>
            <div style={{width: '100%'}}>
                <button onClick={addItem}>Add</button>
                <button onClick={toggleModal}>Cancel</button>
            </div>
        </Modal>

        </>
    )

}

export default BanyanColumn;
